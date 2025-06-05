import { useLocation } from "react-router-dom";
import React from "react";
import {
    Container,
    Typography,
    Box,
    Link,
    Divider,
    Paper,
    Stack,
    Avatar,
    Grid,
    Tooltip,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function About(){
    
    const location = useLocation()

    if(location.pathname === "/about"){
        return(
            <>
                <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
                    <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
                        <Typography variant="h3" gutterBottom>
                            About Org Chart
                        </Typography>

                        <Typography variant="body1" paragraph>
                            <strong>Org Chart</strong> è un progetto open source creato per visualizzare e gestire strutture organizzative in modo semplice, efficace e accessibile. È uno strumento pensato per team, aziende o gruppi che vogliono rappresentare gerarchie e relazioni tra membri senza complicazioni.
                        </Typography>

                        <Typography variant="body1" paragraph>
                            Questo progetto è completamente digitale e non ha una sede fisica. Tutto il codice è disponibile pubblicamente su GitHub ed è sviluppato con tecnologie moderne.
                        </Typography>

                        <Divider sx={{ my: 3 }} />

                        <Typography variant="h5" gutterBottom>
                            Chi sono
                        </Typography>

                        <Typography variant="body1" paragraph>
                            Mi chiamo <strong>Mattia Brizi</strong> e sono uno sviluppatore full stack con la passione per l’open source. Org Chart è un progetto personale che porto avanti nel tempo libero, con l'obiettivo di offrire uno strumento utile e ben strutturato.
                        </Typography>

                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
                            <GitHubIcon color="action" />
                            <Link href="https://github.com/Abrige"
                                  target="_blank" rel="noopener"
                                  underline="none"
                                  sx={{ color: 'grey',
                                      '&:hover': {
                                          textDecoration: 'underline',
                                      },
                                  }}
                            >
                                &#64;Abrige
                            </Link>
                        </Stack>

                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
                            <EmailIcon color="action" />
                            <Link
                                href="mailto:mattiabrizi94@gmail.com"
                                underline="hover"
                                color="inherit"
                                variant="body2"
                            >
                                mattiabrizi94@gmail.com
                            </Link>
                        </Stack>

                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
                            <LocationOnIcon color="action" />
                            <Typography variant="body2">Basato online – progetto senza sede fisica</Typography>
                        </Stack>

                        <Divider sx={{ my: 4 }} />

                        <Typography variant="h5" gutterBottom>
                            Tecnologie usate
                        </Typography>

                        <Grid container spacing={3} sx={{ mt: 1 }}>
                            <Grid item xs={6} sm={4}>
                                <Tooltip title="Spring Boot" arrow>
                                    <Box textAlign="center">
                                        <Avatar
                                            alt="Spring Boot"
                                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/spring/spring-original.svg"
                                            sx={{ width: 56, height: 56, mx: "auto", mb: 1 }}
                                        />
                                        <Typography variant="body2">Spring Boot</Typography>
                                    </Box>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <Tooltip title="Hibernate" arrow>
                                    <Box textAlign="center">
                                        <Avatar
                                            alt="Hibernate"
                                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/hibernate/hibernate-plain.svg"
                                            sx={{ width: 56, height: 56, mx: "auto", mb: 1, bgcolor: "#fff" }}
                                        />
                                        <Typography variant="body2">Hibernate</Typography>
                                    </Box>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <Tooltip title="MySQL" arrow>
                                    <Box textAlign="center">
                                        <Avatar
                                            alt="MySQL"
                                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg"
                                            sx={{ width: 56, height: 56, mx: "auto", mb: 1 }}
                                        />
                                        <Typography variant="body2">MySQL</Typography>
                                    </Box>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <Tooltip title="React JS" arrow>
                                    <Box textAlign="center">
                                        <Avatar
                                            alt="React"
                                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg"
                                            sx={{ width: 56, height: 56, mx: "auto", mb: 1 }}
                                        />
                                        <Typography variant="body2">React JS</Typography>
                                    </Box>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <Tooltip title="Material UI" arrow>
                                    <Box textAlign="center">
                                        <Avatar
                                            alt="Material UI"
                                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg"
                                            sx={{ width: 56, height: 56, mx: "auto", mb: 1 }}
                                        />
                                        <Typography variant="body2">Material UI</Typography>
                                    </Box>
                                </Tooltip>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 4 }} />

                        <Typography variant="body2" color="text.secondary">
                            © {new Date().getFullYear()} Org Chart – Progetto open source sviluppato da Mattia Brizi
                        </Typography>
                    </Paper>
                </Container>
            </>
        );
    }
    if(location.pathname === "/cookie"){
        return(
            <> 
                <h2>Cookie Page</h2>
            </>
        );
    }
    if(location.pathname === "/contact"){
        return(
            <> 
                <h2>Contact Page</h2>
            </>
        );
    }
}

export default About;