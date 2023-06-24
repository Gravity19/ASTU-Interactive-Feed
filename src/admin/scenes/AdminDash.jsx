import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '../styles/dashboard.css';
import './common.css';
import Sidebar from "./global/Sidebar";

// Then import environment variable
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

function Dashboard() {
  const [data, setData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  // Fetches data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/admin/getAllData`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handles the click event on a dashboard item
  const handleItemClick = (label) => {
    setSelectedItem(label);
  };

  // Handles the click event on the back button
  const handleBackButtonClick = () => {
    setSelectedItem(null);
  };

  return (
    <div className='mainAdmin'>
      <div className="adminSidebar">
      <Sidebar></Sidebar>
      </div>
      <div className="adminContent">
    <div className="dashboard">
      {data ? (
        <>
          {!selectedItem ? (
            <>
              {/* Render the dashboard items */}
              <DashboardItem
                label="Students"
                value={data.counts.students}
                additionalInfo="total number of students..."
                onClick={handleItemClick}
              />
              <DashboardItem
                label="Staff"
                value={data.counts.staff}
                additionalInfo="total number of staff..."
                onClick={handleItemClick}
              />
              <DashboardItem
                label="Departments"
                value={data.counts.departments}
                additionalInfo="total number of departments..."
                onClick={handleItemClick}
              />
              <DashboardItem
                label="Posts"
                value={data.counts.posts}
                additionalInfo="total number of posts..."
                onClick={handleItemClick}
              />
              <DashboardItem
                label="Categories"
                value={data.counts.categories}
                additionalInfo="total number of categories..."
                onClick={handleItemClick}
              />
              <DashboardItem
                label="Schools"
                value={data.counts.schools}
                additionalInfo="total number of schools..."
                onClick={handleItemClick}
              />
            </>
          ) : (
            <>
              {data && selectedItem && (
                <div className="data-table">
                  {/* Render the selected data table */}
                  <DataTable label={selectedItem} data={data.data} />
                  <button className="back-button" onClick={handleBackButtonClick}>
                    Back
                  </button>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </div>
    </div>
  );
}

function DashboardItem({ label, value, additionalInfo, onClick }) {
  const handleClick = () => {
    onClick(label);
  };
  return (
    <div className="rectangle" onClick={handleClick}>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      <div className="additional-info">{additionalInfo}</div>
    </div>
  );
}

function DataTable({ label, data }) {
  let tableData;

  switch (label) {
    case 'Students':
      // Render the students table
      tableData = data.students.map((student) => (
        <tr key={student.studentId}>
          <td>{student.studentId}</td>
          <td>{student.fullname}</td>
          <td>{student.email}</td>
          <td>{student.picture}</td>
          <td>{student.year}</td>
          <td>{student.isVerified}</td>
          <td>{student.depId}</td>
          <td>{student.Department}</td>
        </tr>
      ));
      break;
    case 'Staff':
      // Render the staff table
      tableData = data.staff.map((staff) => (
        <tr key={staff.staffId}>
          <td>{staff.staffId}</td>
          <td>{staff.fullname}</td>
          <td>{staff.email}</td>
          <td>{staff.picture}</td>
          <td>{staff.isVerified}</td>
        </tr>
      ));
      break;
    case 'Departments':
      // Render the departments table
      tableData = data.departments.map((department) => (
        <tr key={department.depId}>
          <td>{department.depId}</td>
          <td>{department.name}</td>
          <td>{department.ShortedName}</td>
          <td>{department.School}</td>
        </tr>
      ));
      break;
    case 'Posts':
      // Render the posts table
      tableData = data.posts.map((post) => (
        <tr key={post.postId}>
          <td>{post.postId}</td>
          <td>{post.staffName}</td>
          <td>{post.eventLocation}</td>
          <td>{post.categoryId}</td>
          <td>{post.content}</td>
        </tr>
      ));
      break;
    case 'Categories':
      // Render the categories table
      tableData = data.categories.map((category) => (
        <tr key={category.categoryId}>
          <td>{category.categoryId}</td>
          <td>{category.name}</td>
          <td>{category.description}</td>
        </tr>
      ));
      break;
    case 'Schools':
      // Render the schools table
      tableData = data.schools.map((school) => (
        <tr key={school.schoolId}>
          <td>{school.schoolId}</td>
          <td>{school.name}</td>
        </tr>
      ));
      break;
    default:
      tableData = null;
  }

  return (
    <div className="adminContent">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          {label === 'Students' && <th>Email</th>}
          {label === 'Students' && <th>Picture</th>}
          {label === 'Students' && <th>Year</th>}
          {label === 'Students' && <th>isVerified</th>}
          {label === 'Students' && <th>Department ID</th>}
          {label === 'Students' && <th>Department</th>}
          {label === 'Staff' && <th>Email</th>}
          {label === 'Staff' && <th>Picture</th>}
          {label === 'Staff' && <th>isVerified</th>}
          {label === 'Departments' && <th>ShortedName</th>}
          {label === 'Departments' && <th>School</th>}
          {label === 'Posts' && <th>eventLocation</th>}
          {label === 'Posts' && <th>Category</th>}
          {label === 'Posts' && <th>Content</th>}
          {label === 'Categories' && <th>Description</th>}
        </tr>
      </thead>
      <tbody>{tableData}</tbody>
    </table>
    </div>
  );
}

export default Dashboard;
