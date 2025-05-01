import axios from "axios";
const API_URL = "http://localhost:5000/api/auth";

const signup = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error("Error during signup:", error.response.data);
        throw error.response.data;
    }
}


const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password,
        }).then((response) => {
            if(response.data.token){
                localStorage.setItem('user', JSON.stringify(response.data));
                
            }

        
                return response.data;
    });
    } catch (error) {
        console.error("Error during login:", error.response.data);
        throw error.response.data;
    }
}  


const logout = () => {
    localStorage.removeItem('user');
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}

export default { signup, login, logout, getCurrentUser };