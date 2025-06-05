import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import {setCurrentCompanySelected, setEditingCompany} from '../redux/slices/companySlice.js';
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Supporta "city.name", "city.country.name", ecc.
function getValueByPath(obj, path) {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
}

function descendingComparator(a, b, orderBy) {
    const aValue = getValueByPath(a, orderBy);
    const bValue = getValueByPath(b, orderBy);

    if (bValue < aValue) return -1;
    if (bValue > aValue) return 1;
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
    {
        id: 'id',
        numeric: true,
        disablePadding: true,
        label: 'ID',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'fiscalCode',
        numeric: false,
        disablePadding: false,
        label: 'Fiscal Code',
    },
    {
        id: 'city.name',
        numeric: false,
        disablePadding: false,
        label: 'City',
    },
    {
        id: 'city.country.name',
        numeric: false,
        disablePadding: false,
        label: 'Country',
    },
    {
        id: 'numOfEmployees',
        numeric: true,
        disablePadding: false,
        label: 'Employees',
    },
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

export default function Companies() {
    // Stati per la tabella
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Stati per i dati
    const [companies, setCompanies] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [responseData, setResponseData] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Funzione per formattare i dati (definita fuori dal useEffect)
    const formatData = () => {
        if(responseData) {
            setCompanies(responseData.content);
            setPage(responseData.pageable.pageNumber);
        }
    };

    useEffect(formatData, [responseData])

    // Fetch dei dati dal server
    useEffect(() => {
        setIsLoading(true);
        setError(null);

        fetch('http://localhost:8100/home/companies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                page: page,
                pageSize: rowsPerPage
            })
        })
            .then(async response => {
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! ${response.status} - ${errorText}`);
                }
                return response.json();
            })
            .then(data => {
                setResponseData(data);
            })
            .catch(error => {
                console.error('Errore fetch:', error);
                setError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [page, rowsPerPage]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        setPage(0); // Reset alla prima pagina quando si ordina
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    if (error) {
        return (
            <Box sx={{ p: 2, color: 'error.main' }}>
                Errore nel caricamento: {error}
            </Box>
        );
    }

    const handleCompanyRedirect = (company) => {
        dispatch(setCurrentCompanySelected(company.id)); // puoi anche passare l'intero oggetto company
        navigate(`/company`); // se usi react-router-dom
    }

    const handleModifyCompany = (event, company) => {
        event.stopPropagation();
        dispatch(setEditingCompany(company));
        navigate("/modifycompany");
    }

    const handleCompanyDelete = (event, company) => {
        // aggiungere logica per la delete al database
        event.stopPropagation();
        console.log(`ID: ${company.id}, name: ${company.name}, ###### DELETED ######`)
    }

    const isAdmin = true;

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 1200, // Limita la larghezza della tabella
                    px: 2,           // Padding orizzontale (utile su mobile)
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Companies
                </Typography>

                <Paper sx={{ width: '100%', mb: 2, overflowX: 'auto' }}>
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={companies.length}
                            />
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center">
                                            Caricamento...
                                        </TableCell>
                                    </TableRow>
                                ) : companies.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center">
                                            Nessun dato disponibile
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    companies
                                        .slice()
                                        .sort(getComparator(order, orderBy))
                                        .map((company) => (
                                            <TableRow
                                                hover
                                                onClick={() => handleCompanyRedirect(company)}
                                                tabIndex={-1}
                                                key={`${company.id}-${company.fiscalCode}`}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <TableCell align="right">{company.id}</TableCell>
                                                <TableCell component="th" scope="row">
                                                    {company.name}
                                                </TableCell>
                                                <TableCell align="right">{company.fiscalCode}</TableCell>
                                                <TableCell align="right">{company.city?.name || 'N/A'}</TableCell>
                                                <TableCell align="right">{company.city?.country?.name || 'N/A'}</TableCell>
                                                <TableCell align="right">{company.numOfEmployees}</TableCell>
                                                {isAdmin && (
                                                    <TableCell align="right">
                                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                                            <IconButton
                                                                size="small"
                                                                color="primary"
                                                                onClick={(event) => handleModifyCompany(event, company)}
                                                                aria-label="modifica azienda"
                                                            >
                                                                <EditIcon />
                                                            </IconButton>
                                                            <IconButton
                                                                size="small"
                                                                color="error"
                                                                onClick={(event) => handleCompanyDelete(event, company)}
                                                                aria-label="elimina azienda"
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Box>
                                                    </TableCell>
                                                )}
                                            </TableRow>
                                        ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={-1}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>

                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense} />}
                    label="Dense padding"
                />
            </Box>
        </Box>

    );
}