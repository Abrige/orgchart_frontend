import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Button,
    TextField,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Container,
    Grid,
    IconButton,
    Input,
    Card,
    CardContent,
    Fade,
    Tab,
    Tabs
} from '@mui/material';
import {
    Business,
    Person,
    CloudUpload,
    PhotoCamera
} from '@mui/icons-material';

const AddForm = () => {
    const [selectedForm, setSelectedForm] = useState('company');
    const [companies, setCompanies] = useState([]);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [employeeCities, setEmployeeCities] = useState([]);

    // Form states
    // COMPANY FORM 
    const [companyForm, setCompanyForm] = useState({
        name: '',
        fiscalCode: '',
        city_fk: '',
        logo: ''
    });
    // EMPLOYEE FORM 
    const [employeeForm, setEmployeeForm] = useState({
        first_name: '',
        last_name: '',
        birthdate: '',
        sex: '',
        city_fk: '',
        company_fk: ''
    });

    const [uploadFile, setUploadFile] = useState(null);

    // Fetch functions
    const fetchCountries = async () => {
        try {
            const response = await fetch('http://localhost:8100/home/countries', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCountries(data);
            }
        } catch (error) {
            console.error('Errore nel caricamento paesi:', error);
        }
    };

    const fetchCities = async (countryId) => {
        try {
            const response = await fetch(`http://localhost:8100/home/countries/${countryId}/cities`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCities(data);
            }
        } catch (error) {
            console.error('Errore nel caricamento città:', error);
        }
    };

    const fetchEmployeeCities = async (countryId) => {
        try {
            const response = await fetch(`http://localhost:8100/home/countries/${countryId}/cities`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setEmployeeCities(data);
            }
        } catch (error) {
            console.error('Errore nel caricamento città:', error);
        }
    };

    const fetchCompanies = async () => {
        try {
            const response = await fetch('http://localhost:8100/home/companies', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCompanies(data);
            }
        } catch (error) {
            console.error('Errore nel caricamento aziende:', error);
        }
    };
    
    // fetch dei dati al caricamento della pagina
    useEffect(() => {
        fetchCountries();
        fetchCompanies();
    }, []);
    
    
    // HANDLERS
    const handleCompanyChange = (field, value) => {
        setCompanyForm(prev => ({ ...prev, [field]: value }));

        if (field === 'countryId' && value) {
            fetchCities(value);
            setCompanyForm(prev => ({ ...prev, city_fk: '' }));
        }
    };

    const handleEmployeeChange = (field, value) => {
        setEmployeeForm(prev => ({ ...prev, [field]: value }));

        if (field === 'countryId' && value) {
            fetchEmployeeCities(value);
            setEmployeeForm(prev => ({ ...prev, city_fk: '' }));
        }
    };

    const handleLogoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setCompanyForm(prev => ({ ...prev, logo: file }));
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadFile(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedForm === 'company') {
            console.log('Dati azienda:', companyForm);
            const newCompany = {
                id: companies.length + 1,
                name: companyForm.nome
            };
            setCompanies(prev => [...prev, newCompany]);
            setCompanyForm({
                nome: '',
                fiscalCode: '',
                city_fk: '',
                logo: null
            });
            setCities([]);
        } else if (selectedForm === 'employee') {
            console.log('Dati impiegato:', employeeForm);
            setEmployeeForm({
                first_name: '',
                last_name: '',
                birthdate: '',
                sex: '',
                city_fk: '',
                company_fk: ''
            });
            setEmployeeCities([]);
        } else {
            console.log('File caricato:', uploadFile);
            setUploadFile(null);
        }
    };

    const handleTabChange = (event, newValue) => {
        setSelectedForm(newValue);
    };
    
    // ####### FORMS #######
    
    // COMPANY FORM
    const renderCompanyForm = () => (
        <Fade in={selectedForm === 'company'} timeout={300}>
            <Box component="form" onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, pb: 2, borderBottom: '2px solid #1976d2' }}>
                    <Business sx={{ fontSize: 32, color: '#1976d2', mr: 2 }} />
                    <Typography variant="h4" color="primary" fontWeight="bold">
                        Aggiungi Azienda
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Nome Azienda"
                            value={companyForm.nome}
                            onChange={(e) => handleCompanyChange('nome', e.target.value)}
                            required
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Codice Fiscale"
                            value={companyForm.fiscalCode}
                            onChange={(e) => handleCompanyChange('fiscalCode', e.target.value)}
                            required
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth required>
                            <InputLabel>Paese</InputLabel>
                            <Select
                                value={companyForm.countryId}
                                onChange={(e) => handleCompanyChange('countryId', e.target.value)}
                                label="Paese"
                            >
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.name} ({country.iso})
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth required disabled={!companyForm.countryId}>
                            <InputLabel>Città</InputLabel>
                            <Select
                                value={companyForm.city_fk}
                                onChange={(e) => handleCompanyChange('city_fk', e.target.value)}
                                label="Città"
                            >
                                {cities.map((city) => (
                                    <MenuItem key={city.id} value={city.id}>
                                        {city.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body1" gutterBottom fontWeight="medium">
                                Logo Azienda
                            </Typography>
                            <Input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="logo-upload"
                                type="file"
                                onChange={handleLogoUpload}
                            />
                            <label htmlFor="logo-upload">
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <IconButton color="primary" component="span" size="large">
                                        <PhotoCamera />
                                    </IconButton>
                                    <Button variant="outlined" component="span" color="primary">
                                        Carica Logo
                                    </Button>
                                </Box>
                            </label>
                            {companyForm.logo && (
                                <Typography variant="body2" sx={{ mt: 1, color: 'success.main' }}>
                                    File selezionato: {companyForm.logo.name}
                                </Typography>
                            )}
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{
                                mt: 2,
                                py: 1.5,
                                fontSize: '1.1rem',
                                fontWeight: 'bold'
                            }}
                        >
                            Aggiungi Azienda
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Fade>
    );

    // EMPLOYEE FORM
    const renderEmployeeForm = () => (
        <Fade in={selectedForm === 'employee'} timeout={300}>
            <Box component="form" onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, pb: 2, borderBottom: '2px solid #2e7d32' }}>
                    <Person sx={{ fontSize: 32, color: '#2e7d32', mr: 2 }} />
                    <Typography variant="h4" color="success.main" fontWeight="bold">
                        Aggiungi Dipendente
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Nome"
                            value={employeeForm.first_name}
                            onChange={(e) => handleEmployeeChange('first_name', e.target.value)}
                            required
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Cognome"
                            value={employeeForm.last_name}
                            onChange={(e) => handleEmployeeChange('last_name', e.target.value)}
                            required
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Data di Nascita"
                            type="date"
                            value={employeeForm.birthdate}
                            onChange={(e) => handleEmployeeChange('birthdate', e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            required
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend" sx={{ fontWeight: 'medium' }}>Sesso</FormLabel>
                            <RadioGroup
                                row
                                value={employeeForm.sex}
                                onChange={(e) => handleEmployeeChange('sex', e.target.value)}
                            >
                                <FormControlLabel value="M" control={<Radio />} label="Maschio" />
                                <FormControlLabel value="F" control={<Radio />} label="Femmina" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth required>
                            <InputLabel>Paese</InputLabel>
                            <Select
                                value={employeeForm.countryId}
                                onChange={(e) => handleEmployeeChange('countryId', e.target.value)}
                                label="Paese"
                            >
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.name} ({country.iso})
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth required disabled={!employeeForm.countryId}>
                            <InputLabel>Città</InputLabel>
                            <Select
                                value={employeeForm.city_fk}
                                onChange={(e) => handleEmployeeChange('city_fk', e.target.value)}
                                label="Città"
                            >
                                {employeeCities.map((city) => (
                                    <MenuItem key={city.id} value={city.id}>
                                        {city.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Azienda (Opzionale)</InputLabel>
                            <Select
                                value={employeeForm.company_fk}
                                onChange={(e) => handleEmployeeChange('company_fk', e.target.value)}
                                label="Azienda (Opzionale)"
                            >
                                <MenuItem value="">
                                    <em>Nessuna azienda</em>
                                </MenuItem>
                                {companies.map((company) => (
                                    <MenuItem key={company.id} value={company.id}>
                                        {company.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                            size="large"
                            fullWidth
                            sx={{
                                mt: 2,
                                py: 1.5,
                                fontSize: '1.1rem',
                                fontWeight: 'bold'
                            }}
                        >
                            Aggiungi Dipendente
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Fade>
    );

    // FILE UPLOADS
    const renderFileUploadForm = () => (
        <Fade in={selectedForm === 'upload'} timeout={300}>
            <Box component="form" onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, pb: 2, borderBottom: '2px solid #ed6c02' }}>
                    <CloudUpload sx={{ fontSize: 32, color: '#ed6c02', mr: 2 }} />
                    <Typography variant="h4" color="warning.main" fontWeight="bold">
                        Carica File Dati
                    </Typography>
                </Box>

                <Box sx={{ textAlign: 'center', py: 6 }}>
                    <Input
                        accept=".csv,.xlsx,.xls,.json"
                        style={{ display: 'none' }}
                        id="file-upload"
                        type="file"
                        onChange={handleFileUpload}
                    />
                    <label htmlFor="file-upload">
                        <Paper
                            elevation={0}
                            sx={{
                                p: 6,
                                border: '2px dashed #ed6c02',
                                borderRadius: 3,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#fff3e0',
                                    borderColor: '#e65100'
                                }
                            }}
                        >
                            <CloudUpload sx={{ fontSize: 64, color: '#ed6c02', mb: 2 }} />
                            <Typography variant="h6" gutterBottom>
                                Seleziona File
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Formati supportati: CSV, XLSX, XLS, JSON
                            </Typography>
                        </Paper>
                    </label>

                    {uploadFile && (
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="h6" color="success.main">
                                File selezionato: {uploadFile.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Dimensione: {(uploadFile.size / 1024).toFixed(2)} KB
                            </Typography>
                        </Box>
                    )}
                </Box>

                <Button
                    type="submit"
                    variant="contained"
                    color="warning"
                    size="large"
                    disabled={!uploadFile}
                    fullWidth
                    sx={{
                        mt: 2,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 'bold'
                    }}
                >
                    Carica File
                </Button>
            </Box>
        </Fade>
    );


    // NAVIGATION TABS
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden' }}>
                {/* Navigation Tabs */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={selectedForm}
                        onChange={handleTabChange}
                        centered
                        sx={{
                            '& .MuiTab-root': {
                                minHeight: 80,
                                fontSize: '1rem',
                                fontWeight: 'medium',
                                textTransform: 'none',
                                minWidth: 120
                            }
                        }}
                    >
                        <Tab
                            value="company"
                            label="Azienda"
                            icon={<Business />}
                            iconPosition="start"
                            sx={{ color: '#1976d2' }}
                        />
                        <Tab
                            value="employee"
                            label="Dipendente"
                            icon={<Person />}
                            iconPosition="start"
                            sx={{ color: '#2e7d32' }}
                        />
                        <Tab
                            value="upload"
                            label="Carica File"
                            icon={<CloudUpload />}
                            iconPosition="start"
                            sx={{ color: '#ed6c02' }}
                        />
                    </Tabs>
                </Box>

                {/* Form Container */}
                <Box sx={{ p: 4, minHeight: 600 }}>
                    {selectedForm === 'company' && renderCompanyForm()}
                    {selectedForm === 'employee' && renderEmployeeForm()}
                    {selectedForm === 'upload' && renderFileUploadForm()}
                </Box>
            </Paper>
        </Container>
    );
};

export default AddForm;