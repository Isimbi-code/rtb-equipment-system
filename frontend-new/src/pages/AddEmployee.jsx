import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    firstname: '',
    lastname: '',
    national_identity: '',
    telephone: '',
    email: '',
    department: '',
    position: '',
    laptop_manufacturer: '',
    model: '',
    serialNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(employee)
      });

      if (!response.ok) {
        throw new Error('Failed to add employee');
      }

      navigate('/dashboard'); // Redirect to dashboard after successful addition
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Equipment Distribution System</h1>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Add Employee</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Column 1 */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">FIRSTNAME</h3>
                  <input
                    type="text"
                    name="firstname"
                    value={employee.firstname}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">LASTNAME</h3>
                  <input
                    type="text"
                    name="lastname"
                    value={employee.lastname}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">NATIONAL IDENTITY</h3>
                  <input
                    type="text"
                    name="national_identity"
                    value={employee.national_identity}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">EMAIL</h3>
                  <input
                    type="email"
                    name="email"
                    value={employee.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">TELEPHONE</h3>
                  <input
                    type="tel"
                    name="telephone"
                    value={employee.telephone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">DEPARTMENT</h3>
                  <input
                    type="text"
                    name="department"
                    value={employee.department}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              {/* Column 3 */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">POSITION</h3>
                  <input
                    type="text"
                    name="position"
                    value={employee.position}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">LAPTOP MANUFACTURER</h3>
                  <input
                    type="text"
                    name="laptop_manufacturer"
                    value={employee.laptop_manufacturer}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              {/* Column 4 */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">MODEL</h3>
                  <input
                    type="text"
                    name="model"
                    value={employee.model}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">SERIAL NUMBER</h3>
                  <input
                    type="text"
                    name="serialNumber"
                    value={employee.serialNumber}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {loading ? 'Adding...' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default AddEmployee;