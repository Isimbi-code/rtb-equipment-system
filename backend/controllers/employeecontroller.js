const pool = require('../config/db');

const addEmployee = async (req, res) => {

    try{
        const{
            firstname,
            lastname,
            national_identity,
            telephone,
            email,
            department,
            position,
            laptop_manufacturer,
            model,
            serialNumber
        } = req.body;

        await pool.query('INSERT INTO employees (firstname, lastname, national_identity, telephone, email, department, position, laptop_manufacturer, model, serialNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [firstname, lastname, national_identity, telephone, email, department, position, laptop_manufacturer, model, serialNumber]);
        res.status(201).json({ message: 'Employee added successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }

};


const getEmployees = async (req, res) => {  
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;  
        const offset = (page - 1) * limit;

        const [countResult] = await pool.query('SELECT COUNT(*) as total FROM employees');
        const total = countResult[0].total;
        const totalPages = Math.ceil(total / limit);

        const [employees] = await pool.query('SELECT * FROM employees LIMIT ? OFFSET ?', [limit, offset]);
        res.status(200).json({
            employees,
            pagination: {
                total,
                page,
                limit,
                totalPages,
                totalEmployees: total,
            }
        });

      
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM employees WHERE id = ?', [id]);
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, national_identity, telephone, email, department, position, laptop_manufacturer, model, serialNumber } = req.body;
    try {
        await pool.query('UPDATE employees SET firstname = ?, lastname = ?, national_identity = ?, telephone = ?, email = ?, department = ?, position = ?, laptop_manufacturer = ?, model = ?, serialNumber = ? WHERE id = ?', [firstname, lastname, national_identity, telephone, email, department, position, laptop_manufacturer, model, serialNumber, id]);
        res.status(200).json({ message: 'Employee updated successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const searchEmployees = async (req, res) => {
    try {
        const { query } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        if (!query || query.trim() === '') {
            return res.status(400).json({ message: 'Search query is required' });
        }

        const searchTerm = `%${query}%`;
        
        // Get total count for pagination
        const [countResult] = await pool.query(
            `SELECT COUNT(*) as total FROM employees 
             WHERE firstname LIKE ? OR 
                   lastname LIKE ? OR 
                   email LIKE ? OR 
                   department LIKE ? OR 
                   position LIKE ? OR 
                   laptop_manufacturer LIKE ? OR 
                   model LIKE ? OR 
                   serialNumber LIKE ?`,
            [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm]
        );
        
        const total = countResult[0].total;
        const totalPages = Math.ceil(total / limit);

        // Get paginated results
        const [employees] = await pool.query(
            `SELECT * FROM employees 
             WHERE firstname LIKE ? OR 
                   lastname LIKE ? OR 
                   email LIKE ? OR 
                   department LIKE ? OR 
                   position LIKE ? OR 
                   laptop_manufacturer LIKE ? OR 
                   model LIKE ? OR 
                   serialNumber LIKE ?
             LIMIT ? OFFSET ?`,
            [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, limit, offset]
        );

        res.json({
            employees,
            pagination: {
                total,
                totalPages,
                totalEmployees: total,
                currentPage: page,
                limit
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    addEmployee,
    getEmployees,
    deleteEmployee,
    updateEmployee,
    searchEmployees
};