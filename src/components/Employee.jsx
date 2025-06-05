import React, {useEffect, useState} from 'react';
import {
    Box,
    Typography,
    Button,
    Avatar,
    Paper, Stack
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Person as PersonIcon,
} from '@mui/icons-material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import CakeIcon from '@mui/icons-material/Cake';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PublicIcon from '@mui/icons-material/Public';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {setEditingEmployeeId} from "../redux/slices/employeeSlice.js";

const EmployeeDetailPage = () => {
    // Dati di esempio per l'impiegato

    const employeeId = useSelector((state) => state.employee.currentEmployeeSelected);
    const [employee, setEmployee] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (employeeId) {
            fetch(`http://localhost:8100/home/employee/${employeeId}`)
                .then(res => res.json())
                .then(data => setEmployee(data))
                .catch(err => console.error('Errore fetch impiegato:', err));
        }
    }, [employeeId]);

    if (!employee) {
        return <Typography>Caricamento dati dipendente...</Typography>;
    }

    let formattedDate = 'Data non disponibile';
    if (employee.birthdate) {
        const birthdate = new Date(employee.birthdate);
        if (!isNaN(birthdate.getTime())) {
            formattedDate = birthdate.toLocaleDateString('it-IT', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });
        }
    }

    const handleGoBack = () => {
        navigate(-1) // come "indietro" del browser
    };

    const handleModifyEmployee = (event) => {
        event.stopPropagation();
        dispatch(setEditingEmployeeId(employee.id));
        navigate("/modifyemployee");
    }

    const handleEmployeeDelete = (employee) => {
        // aggiungere logica per la delete al database
        console.log(`ID: ${employee.id}, name: ${employee.first_name} ${employee.last_name}, ###### DELETED ######`)
    }

    return (
        <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
            {/* Pulsante Indietro */}
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={handleGoBack}
                sx={{ mb: 3 }}
                variant="outlined"
            >
                Torna a {employee.company.name}
            </Button>

            {/* Header con foto e nome */}
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Avatar
                        src={employee.photo}
                        sx={{
                            width: 120,
                            height: 120,
                            bgcolor: 'grey.400'
                        }}
                    >
                        {!employee.photo && <PersonIcon sx={{ fontSize: 60 }} />}
                    </Avatar>

                    <Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                            <Typography variant="h4" component="h1" gutterBottom>
                                {employee.first_name} {employee.last_name}
                            </Typography>
                            <Box sx={{display: 'flex', gap: 1, justifyContent: 'flex-end'}}>
                                <IconButton
                                    size="small"
                                    color="primary"
                                    onClick={(event) => handleModifyEmployee(event)}
                                    aria-label={`modifica ${employee.first_name} ${employee.last_name}`}
                                >
                                    <EditIcon/>
                                </IconButton>
                                <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => handleEmployeeDelete(employee)}
                                    aria-label={`elimina ${employee.first_name} ${employee.last_name}`}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </Box>
                        </Box>
                        <Stack direction="row" alignItems="center">
                            {employee.sex === "M" ? (
                                <>
                                    <MaleIcon sx={{ color: 'blue' }} />
                                    <Typography>Maschio</Typography>
                                </>
                            ) : employee.sex === "F" ? (
                                <>
                                    <FemaleIcon sx={{ color: 'hotpink' }} />
                                    <Typography>Femmina</Typography>
                                </>
                            ) : (
                                <Typography>Non specificato</Typography>
                            )}
                        </Stack>
                        <Stack direction="row" alignItems="center">
                            <CakeIcon sx={{ color: 'black' }} />
                            <Typography>
                                {formattedDate}
                            </Typography>
                        </Stack>
                        <Stack>
                            <Stack direction="row" alignItems="center">
                                <LocationOnIcon color="action" />
                                <Typography variant="body2">{employee.city?.name || 'Città non disponibile'}</Typography>
                            </Stack>

                            <Stack direction="row" alignItems="center">
                                <PublicIcon color="action" />
                                <Typography variant="body2">{employee.city?.country?.name || 'Paese non disponibile'}</Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default EmployeeDetailPage;