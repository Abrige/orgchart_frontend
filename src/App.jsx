import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Add from "./pages/Add.jsx"
import About from "./pages/About.jsx"
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Box from "@mui/material/Box";
import Companies from "./components/Companies.jsx";
import Company from "./components/Company.jsx";
import Employee from "./components/Employee.jsx";
import AddForm from "./components/AddForm.jsx";
import LoginForm from "./pages/LoginForm.jsx";
import EmployeeEditForm from "./pages/EmployeeEditForm.jsx";
import CompanyEditForm from "./pages/CompanyEditForm.jsx";

function App() {

  return (
    <>
      <Router>
        <Box
            sx={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
            }}
        >
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Companies />}></Route>
              <Route path="/add" element={<Add />}></Route>
              <Route path="/about" element={<About />}></Route>
                <Route path="/loginform" element={<LoginForm />}></Route>
              <Route path="/contact" element={<About />}></Route>
              <Route path="/cookie" element={<About />}></Route>


                <Route path="/company" element={<Company />}></Route>
                <Route path="/employee" element={<Employee />}></Route>
                <Route path="/addform" element={<AddForm />}></Route>
                <Route path="/modifyemployee" element={<EmployeeEditForm />}></Route>
                <Route path="/modifycompany" element={<CompanyEditForm />}></Route>

            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </>
  );
}

export default App;
