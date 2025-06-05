import React, { useState } from 'react';
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
    Chip,
    Fade,
    Slide
} from '@mui/material';
import {
    Business,
    Person,
    CloudUpload,
    PhotoCamera
} from '@mui/icons-material';

const AddForm = () => {
    const [selectedForm, setSelectedForm] = useState('company');
    const [companies, setCompanies] = useState([
        { id: 1, name: 'Azienda Example SRL' },
        { id: 2, name: 'Tech Solutions SpA' }
    ]);

    // Form states
    const [companyForm, setCompanyForm] = useState({
        nome: '',
        codiceFiscale: '',
        nomeCitta: '',
        nomeCountry: '',
        iso: '',
        logo: null
    });

    const [employeeForm, setEmployeeForm] = useState({
        firstName: '',
        lastName: '',
        birthdate: '',
        sex: '',
        cityName: '',
        countryName: '',
        iso: '',
        company: ''
    });

    const [uploadFile, setUploadFile] = useState(null);

    const handleCompanyChange = (field, value) => {
        setCompanyForm(prev => ({ ...prev, [field]: value }));
    };

    const handleEmployeeChange = (field, value) => {
        setEmployeeForm(prev => ({ ...prev, [field]: value }));
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
                codiceFiscale: '',
                nomeCitta: '',
                nomeCountry: '',
                iso: '',
                logo: null
            });
        } else if (selectedForm === 'employee') {
            console.log('Dati impiegato:', employeeForm);
            setEmployeeForm({
                firstName: '',
                lastName: '',
                birthdate: '',
                sex: '',
                cityName: '',
                countryName: '',
                iso: '',
                company: ''
            });
        } else {
            console.log('File caricato:', uploadFile);
            setUploadFile(null);
        }
    };

    const navigationTabs = [
        {
            key: 'company',
            label: 'Azienda',
            icon: Business,
            color: 'primary',
            theme: '#1976d2'
        },
        {
            key: 'employee',
            label: 'Dipendente',
            icon: Person,
            color: 'success',
            theme: '#2e7d32'
        },
        {
            key: 'upload',
            label: 'Carica File',
            icon: CloudUpload,
            color: 'warning',
            theme: '#ed6c02'
        }
    ];

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
                            value={companyForm.codiceFiscale}
                            onChange={(e) => handleCompanyChange('codiceFiscale', e.target.value)}
                            required
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Nome Città"
                            value={companyForm.nomeCitta}
                            onChange={(e) => handleCompanyChange('nomeCitta', e.target.value)}
                            required
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Nome Country"
                            value={companyForm.nomeCountry}
                            onChange={(e) => handleCompanyChange('nomeCountry', e.target.value)}
                            required
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="ISO"
                            value={companyForm.iso}
                            onChange={(e) => handleCompanyChange('iso', e.target.value)}
                            required
                            inputProps={{ maxLength: 3 }}
                            variant="outlined"
                        />
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
                            value={employeeForm.firstName}
                            onChange={(e) => handleEmployeeChange('firstName', e.target.value)}
                            required
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Cognome"
                            value={employeeForm.lastName}
                            onChange={(e) => handleEmployeeChange('lastName', e.target.value)}
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
                        <TextField
                            fullWidth
                            label="Nome Città"
                            value={employeeForm.cityName}
                            onChange={(e) => handleEmployeeChange('cityName', e.target.value)}
                            required
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Nome Country"
                            value={employeeForm.countryName}
                            onChange={(e) => handleEmployeeChange('countryName', e.target.value)}
                            required
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="ISO"
                            value={employeeForm.iso}
                            onChange={(e) => handleEmployeeChange('iso', e.target.value)}
                            required
                            inputProps={{ maxLength: 3 }}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel>Azienda</InputLabel>
                            <Select
                                value={employeeForm.company}
                                onChange={(e) => handleEmployeeChange('company', e.target.value)}
                                label="Azienda"
                            >
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

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={4}>
                {/* Navigation Sidebar */}
                <Grid item xs={12} md={3}>
                    <Paper
                        elevation={4}
                        sx={{
                            p: 3,
                            position: 'sticky',
                            top: 20,
                            borderRadius: 4,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white'
                        }}
                    >
                        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold' }}>
                            🚀 Seleziona Azione
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {navigationTabs.map((tab) => {
                                const IconComponent = tab.icon;
                                const isActive = selectedForm === tab.key;

                                return (
                                    <Slide
                                        key={tab.key}
                                        direction="right"
                                        in={true}
                                        timeout={300 + navigationTabs.indexOf(tab) * 100}
                                    >
                                        <Chip
                                            icon={<IconComponent />}
                                            label={tab.label}
                                            clickable
                                            onClick={() => setSelectedForm(tab.key)}
                                            variant={isActive ? "filled" : "outlined"}
                                            sx={{
                                                justifyContent: 'flex-start',
                                                height: 56,
                                                fontSize: '1rem',
                                                fontWeight: isActive ? 'bold' : 'medium',
                                                backgroundColor: isActive ? 'rgba(255,255,255,0.9)' : 'transparent',
                                                color: isActive ? tab.theme : 'white',
                                                borderColor: 'rgba(255,255,255,0.3)',
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                '&:hover': {
                                                    backgroundColor: isActive ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.1)',
                                                    transform: 'translateX(8px) scale(1.02)',
                                                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                                                },
                                                '& .MuiChip-icon': {
                                                    color: isActive ? tab.theme : 'white',
                                                    fontSize: '1.3rem'
                                                }
                                            }}
                                        />
                                    </Slide>
                                );
                            })}
                        </Box>
                    </Paper>
                </Grid>

                {/* Form principale */}
                <Grid item xs={12} md={9}>
                    <Paper
                        elevation={6}
                        sx={{
                            p: 4,
                            minHeight: 700,
                            borderRadius: 4,
                            background: 'white',
                            position: 'relative',
                            overflow: 'hidden',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '4px',
                                background: navigationTabs.find(tab => tab.key === selectedForm)?.theme || '#1976d2'
                            }
                        }}
                    >
                        {selectedForm === 'company' && renderCompanyForm()}
                        {selectedForm === 'employee' && renderEmployeeForm()}
                        {selectedForm === 'upload' && renderFileUploadForm()}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AddForm;