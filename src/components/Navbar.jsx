import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

const drawerWidth = 240;

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Add', path: '/addform' },
  { label: 'About', path: '/about' },
//  { label: `Login`, path: '/loginform' }
];

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const username = useSelector(state => state.auth.username)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        OrgChart
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component={NavLink}
                            to={item.path}
                            sx={{
                              textAlign: 'center',
                            }} >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" elevation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
            <Box
                component={NavLink}
                to="/"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    color: 'inherit',        // aggiungi per ereditare il colore bianco
                    flexGrow: 1,
                }}
            >
                <Box
                    component="img"
                    src="https://picsum.photos/id/237/100/100"
                    alt="Company-Logo"
                    sx={{ height: 40, borderRadius: "50%", mr: 1 }}
                />
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        fontWeight: 'bold',   // testo più marcato come i bottoni
                        color: 'inherit',     // coerente con i bottoni (bianco)
                        display: { xs: 'none', sm: 'block' },
                    }}
                >
                    OrgChart
                </Typography>
            </Box>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button
                  key={item.label}
                  component={NavLink}
                  to={item.path}
                  sx={{
                    color: '#fff',
                  }}
              >
                {item.label}
              </Button>
            ))}
            <Button
                key="Login"
                component={NavLink}
                to={username ? '' : '/loginform'}
                sx={{
                    color: '#fff',
                }}
            >
                {username ? username : 'Login'}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

export default Navbar;
