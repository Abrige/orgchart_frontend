import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Toolbar from '@mui/material/Toolbar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import {NavLink} from "react-router-dom";


const navItems = [
    { label: 'Contact Us', path: '/contact' },
    { label: 'MIT License', path: 'https://mit-license.org/', external:true },
    { label: 'Cookie Policy', path: '/cookie' },
];

function Footer() {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 'auto', width: '100%' }}>
            <Box component="footer"
                 sx={{
                     backgroundColor: '#1976d2',
                     color: '#fff',
                     py: 2,
                     px: { xs: 2, sm: 4 },
                 }}
            >
                <Toolbar sx={{ px: 0, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <Box
                        component={NavLink}
                        to="/"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: 'inherit',
                            mb: { xs: 1, sm: 0 },
                        }}
                    >
                        <Box
                            component="img"
                            src="https://picsum.photos/id/237/100/100" // o il path corretto
                            alt="Company-Logo"
                            sx={{ height: 40,  mr: 1 }}
                        />
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            OrgChart &copy; {new Date().getFullYear()}
                        </Typography>
                    </Box>

                    <List
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            p: 0,
                            m: 0,
                            listStyle: 'none',
                        }}
                    >
                        {navItems.map((item) => (
                            <ListItem
                                key={item.label}
                                component={item.external ? 'a' : NavLink}
                                to={item.external ? undefined : item.path}
                                href={item.external ? item.path : undefined}
                                target={item.external ? '_blank' : undefined}
                                rel={item.external ? 'noopener noreferrer' : undefined}
                                sx={{
                                    width: 'auto',
                                    p: 0,
                                    ml: 3,
                                    color: 'white',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                <ListItemText primary={item.label}/>
                            </ListItem>
                        ))}
                    </List>
                </Toolbar>
            </Box>
        </Box>
    );
}

export default Footer;
