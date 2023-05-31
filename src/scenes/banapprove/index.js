import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/banapprove.css';

function BanApprove() {
  // State variables
  const [staffAccounts, setStaffAccounts] = useState([]);
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch staff accounts on component mount
  useEffect(() => {
    fetchStaffAccounts();
  }, []);

  // Fetch staff accounts from the server
  const fetchStaffAccounts = () => {
    axios
      .get('http://localhost:4000/api/admin/getStaff')
      .then((response) => {
        if (response.data.success) {
          setStaffAccounts(response.data.data);
        } else {
          setErrorMsg('Failed to fetch staff accounts. Please try again later.');
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg('Failed to fetch staff accounts. Please try again later.');
      });
  };

  // Handle staff action selection
  const handleAction = (staffId, action) => {
    setSelectedStaffId(staffId);
    setSelectedAction(action);
  };

  // Confirm the selected action (Ban/Approve)
  const confirmAction = () => {
    if (selectedAction === 'ban') {
      banStaffAccount(selectedStaffId);
    } else if (selectedAction === 'approve') {
      approveStaffAccount(selectedStaffId);
    }
    setSelectedStaffId('');
    setSelectedAction('');
  };

  // Ban a staff account
  const banStaffAccount = (staffId) => {
    axios
      .put('http://localhost:4000/api/admin/banAcc', { staffId })
      .then((response) => {
        if (response.data.success) {
          setSuccessMsg('Staff account banned successfully.');
          updateAccountStatus(staffId, 'Banned');
        } else {
          setErrorMsg(response.data.message || 'Failed to ban staff account.');
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg(
          error.response?.data?.message || 'Failed to ban staff account. Please try again later.'
        );
      });
  };

  // Approve a staff account
  const approveStaffAccount = (staffId) => {
    axios
      .put('http://localhost:4000/api/admin/approveAcc', { staffId })
      .then((response) => {
        if (response.data.success) {
          setSuccessMsg('Staff account approved successfully.');
          updateAccountStatus(staffId, 'Approved');
        } else {
          setErrorMsg(response.data.message || 'Failed to approve staff account.');
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg(
          error.response?.data?.message || 'Failed to approve staff account. Please try again later.'
        );
      });
  };

  // Update the status of a staff account
  const updateAccountStatus = (staffId, status) => {
    setStaffAccounts((prevAccounts) =>
      prevAccounts.map((staff) => (staff.staffId === staffId ? { ...staff, status } : staff))
    );
  };

  // Render component
  return (
    <div className="ban-approve-container">
      <h2>Ban/Approve Staff Account</h2>
      <table>
        <thead>
          <tr>
            <th>Staff ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Action</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {staffAccounts.map((staff) => (
            <tr key={staff.staffId}>
              <td>{staff.staffId}</td>
              <td>{staff.fullname}</td>
              <td>{staff.email}</td>
              <td>
                <button
                  className="approve-btn"
                  onClick={() => handleAction(staff.staffId, 'approve')}
                >
                  Approve
                </button>
                <button className="ban-btn" onClick={() => handleAction(staff.staffId, 'ban')}>
                  Ban
                </button>
              </td>
              <td>{staff.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {errorMsg && <p className="error">{errorMsg}</p>}
      {successMsg && <p className="success">{successMsg}</p>}

      {selectedStaffId && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <h3>Confirm {selectedAction === 'ban' ? 'Ban' : 'Approve'}</h3>
            <p>
              Are you sure you want to {selectedAction === 'ban' ? 'ban' : 'approve'} this staff
              account?
            </p>
            <div>
              <button className="confirm-btn" onClick={confirmAction}>
                Confirm
              </button>
              <button className="cancel-btn" onClick={() => setSelectedStaffId('')}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BanApprove;
