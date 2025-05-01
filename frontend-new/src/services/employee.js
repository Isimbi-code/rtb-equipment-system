import axios from "axios";

const API_URL = "http://localhost:5000/api/employees";

const getEmployees = async (page = 1, limit = 10) => {
    const user = JSON.parse(localStorage.getItem("user"));
    return axios.get(`${API_URL}?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error("Error fetching employees:", error.response.data);
            throw error.response.data;
        });

}

const addEmployee = async (employeeData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    return axios.post(API_URL, employeeData, {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error("Error adding employee:", error.response.data);
            throw error.response.data;
        });
}

const deleteEmployee = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    return axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error("Error deleting employee:", error.response.data);
            throw error.response.data;
        });
}

const updateEmployee = async (id, employeeData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    return axios.put(`${API_URL}/${id}`, employeeData, {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error("Error updating employee:", error.response.data);
            throw error.response.data;
        });
}





export default {
    getEmployees,
    addEmployee,
    deleteEmployee,
    updateEmployee,
};