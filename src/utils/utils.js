import BASE_API_URL from "../config/config.js";
import {refreshTable} from "../components/Companies.jsx";


const handleCompanyDelete = async (event, company) => {
    event.stopPropagation();
    try {
        const response = await fetch(`${BASE_API_URL}/home/company/${company.id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert("Eliminazione riuscita");
            refreshTable();
        } else {
            throw new Error(`Errore: ${response.status}`);
        }
    } catch (error) {
        console.error('Errore durante l\'eliminazione:', error);
        alert('Errore durante l\'eliminazione dell\'azienda.');
    }
}

const handleEmployeeDelete = async (event, employee) => {
    event?.stopPropagation();
    try {
        const response = await fetch(`${BASE_API_URL}/home/employee/${employee.id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert("Eliminazione riuscita");

        } else {
            throw new Error(`Errore: ${response.status}`);
        }
    } catch (error) {
        console.error('Errore durante l\'eliminazione:', error);
        alert('Errore durante l\'eliminazione del dipendente.');
    }
};

export {handleCompanyDelete, handleEmployeeDelete};