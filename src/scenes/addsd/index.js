import React, { useState, useEffect } from 'react';
import '../../styles/addsd.css';
import axios from 'axios';

function AddSD() {
  // State variables
  const [schoolName, setSchoolName] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [departmentSchoolId, setDepartmentSchoolId] = useState('');
  const [schools, setSchools] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showAddSchoolForm, setShowAddSchoolForm] = useState(false);
  const [showAddDepartmentForm, setShowAddDepartmentForm] = useState(false);

  // Fetch schools on component mount
  useEffect(() => {
    fetchSchools();
  }, []);

  // Fetch schools from API
  const fetchSchools = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/admin/getSchool');
      setSchools(response.data.data);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch schools. Please try again later.');
    }
  };

  // Add a new school
  const handleAddSchool = async () => {
    // Validate school name
    if (schoolName.trim() === '') {
      setError('Please enter a school name.');
      return;
    }

    // Generate shorted name from school name
    const shortedName = schoolName.trim().split(/\s+/).map(word => word.charAt(0)).join('').toUpperCase();

    try {
      // Send request to add school
      const response = await axios.post('http://localhost:4000/api/admin/addSchool', {
        name: schoolName,
        shortedName
      });
      console.log(response.data);
      
      // Set success message and reset form and state
      setSuccessMessage('School added successfully');
      setSchoolName('');
      setShowAddSchoolForm(false);
    } catch (error) {
      console.error(error);
      setError('Failed to add school. Please try again later.');
    }
  };

  // Add a new department
  const handleAddDepartment = async () => {
    // Validate department name and selected school
    if (departmentName.trim() === '') {
      setError('Please enter a department name.');
      return;
    }

    if (departmentSchoolId === '') {
      setError('Please select a school.');
      return;
    }

    try {
      // Send request to add department
      const response = await axios.post('http://localhost:4000/api/admin/addDep', {
        name: departmentName,
        shortedName: departmentName.trim().split(/\s+/).map(word => word.charAt(0)).join('').toUpperCase(),
        schoolId: departmentSchoolId
      });
      console.log(response.data);

      // Set success message and reset form and state
      setSuccessMessage('Department added successfully');
      setDepartmentName('');
      setDepartmentSchoolId('');
      setShowAddDepartmentForm(false);
    } catch (error) {
      console.error(error);
      setError('Failed to add department. Please try again later.');
    }
  };

  return (
    <div className="container">
      <h3>Add School</h3>
      {/* Show the add school form if enabled */}
      {showAddSchoolForm ? (
        <div>
          <input type="text" placeholder="School Name" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
          <button onClick={handleAddSchool}>Add School</button>
        </div>
      ) : (
        // Show the add school button if form is not visible
        <button onClick={() => setShowAddSchoolForm(true)}>Add School</button>
      )}

      <h3>Add Department</h3>
      {/* Show error message if there is an error */}
      {error && <p className="error">{error}</p>}
      {/* Show success message if available */}
      {successMessage && <p className="success">{successMessage}</p>}
      {/* Show the add department form if enabled */}
      {showAddDepartmentForm ? (
        <div>
          <input type="text" placeholder="Department Name" value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} />
          <select value={departmentSchoolId} onChange={(e) => setDepartmentSchoolId(e.target.value)}>
            <option value="">Select a School</option>
            {/* Render the list of schools */}
            {schools.map((school) => (
              <option key={school.schoolId} value={school.schoolId}>
                {school.ShortedName}
              </option>
            ))}
          </select>
          <button onClick={handleAddDepartment}>Add Department</button>
        </div>
      ) : (
        // Show the add department button if form is not visible
        <button onClick={() => setShowAddDepartmentForm(true)}>Add Department</button>
      )}
    </div>
  );
}

export default AddSD;
