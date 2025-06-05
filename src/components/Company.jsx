import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Box from "@mui/material/Box";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentEmployeeSelected, setEditingEmployeeId} from '../redux/slices/employeeSlice.js';
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {
    ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import {setEditingCompany} from "../redux/slices/companySlice.js";

function Company() {
    // STATE
    const [employees, setEmployees] = useState([]);
    // REDUX
    const selectedCompanyId = useSelector((state) => state.company.currentCompanySelected);
    // NAVIGATE
    const navigate = useNavigate();
    // DISPATCH
    const dispatch = useDispatch();

    useEffect(() => {
       if(selectedCompanyId) {
            fetch(`http://localhost:8100/home/companies/${selectedCompanyId}/employees`)
                .then(res => res.json()) // 👈 converte in oggetto JS
                .then(data => {
                    setEmployees(data);
                })
                .catch(err => console.error('Errore nella fetch:', err));
        }
    }, [selectedCompanyId]);

    let isAdmin = true;

    const handleEmployeeRedirect = (employee) => {
        dispatch(setCurrentEmployeeSelected(employee.id));
        navigate('/employee');
    };

    const handleGoBack = () => {
        navigate(-1) // come "indietro" del browser
    }

    const handleModifyCompany = (company) => {
        dispatch(setEditingCompany(company));
        navigate("/modifycompany");
    };
    const handleModifyEmployee = (event, employee) => {
        event.stopPropagation();
        dispatch(setEditingEmployeeId(employee.id));
        navigate("/modifyemployee");
    };

    const handleCompanyDelete = (company) => {
        // aggiungere logica per la delete al database
        console.log(`ID: ${company.id}, name: ${company.name}, ###### DELETED ######`)
    }

    const handleEmployeeDelete = (event, employee) => {
        // aggiungere logica per la delete al database
        event.stopPropagation()
        console.log(`ID: ${employee.id}, name: ${employee.first_name} ${employee.last_name}, ###### DELETED ######`)
    }

    return (
        <>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={handleGoBack}
                sx={{ mb: 3 }}
                variant="outlined"
            >
                Torna a tutte le aziende
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography variant="h5">
                    Company name: {employees[0]?.company?.name}
                </Typography>
                {isAdmin && <Box sx={{display: 'flex', gap: 1}}>
                    <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleModifyCompany(employees[0].company)}
                        aria-label="modifica azienda"
                    >
                        <EditIcon/>
                    </IconButton>
                    <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleCompanyDelete(employees[0].company)}
                        aria-label="elimina azienda"
                    >
                        <DeleteIcon/>
                    </IconButton>
                </Box>}
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell align="right">Last Name</TableCell>
                            <TableCell align="right">Sex</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow
                                hover
                                onClick={() => handleEmployeeRedirect(employee)}
                                tabIndex={-1}
                                key={`${employee.id}`} // Key più robusta per duplicati
                                sx={{ cursor: 'pointer' }}
                            >
                                <TableCell>{employee.first_name}</TableCell>
                                <TableCell align="right">{employee.last_name}</TableCell>
                                <TableCell align="right">{employee.sex}</TableCell>
                                {isAdmin &&
                                    <TableCell align="right">
                                        <Box sx={{display: 'flex', gap: 1, justifyContent: 'flex-end'}}>
                                            <IconButton
                                                size="small"
                                                color="primary"
                                                onClick={(event) => handleModifyEmployee(event, employee)}
                                                aria-label={`modifica ${employee.first_name} ${employee.last_name}`}
                                            >
                                                <EditIcon/>
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={(event) => handleEmployeeDelete(event, employee)}
                                                aria-label={`elimina ${employee.first_name} ${employee.last_name}`}
                                            >
                                                <DeleteIcon/>
                                            </IconButton>
                                        </Box>
                                    </TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default Company;