import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const LecturerDashboard = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [formData, setFormData] = useState({ student: '', class_instance: '', is_present: false });
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false); // New state to handle edit mode
  const [editId, setEditId] = useState(null); // New state to store the ID of the attendance being edited

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/attendance/');
      console.log('Fetched Attendance Data:', response.data);
      setAttendanceData(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching attendance data:', err);
      setError('Error fetching attendance data');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update existing attendance
        await axios.put(`http://127.0.0.1:8000/api/attendance/${editId}/`, formData);
        setIsEditing(false);
        setEditId(null);
      } else {
        // Add new attendance
        await axios.post('http://127.0.0.1:8000/api/attendance/', formData);
      }
      fetchAttendanceData();
      setFormData({ student: '', class_instance: '', is_present: false });
    } catch (err) {
      console.error(isEditing ? 'Error updating attendance:' : 'Error adding attendance:', err);
      setError(isEditing ? 'Error updating attendance' : 'Error adding attendance');
    }
  };

  const handleDelete = async (id) => {
     if (!id) {
       console.error('Invalid ID:', id);
       setError('Invalid ID');
       return;
     }
    try {
      await axios.delete(`http://127.0.0.1:8000/api/attendance/${id}/`);
      fetchAttendanceData();
    } catch (err) {
      console.error('Error deleting attendance:', err);
      setError('Error deleting attendance');
    }
  };

  const handleEdit = (record) => {
    setIsEditing(true);
    setEditId(record.id);
    setFormData({
      student: record.student,
      class_instance: record.class_instance,
      is_present: record.is_present,
    });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Link to="/" className="list-group-item list-group-item-action"
            style={{ color: 'blue', fontWeight: 'bold', fontSize: '22px' }}>Back</Link>
      <h2>Lecturer Dashboard - Attendance Data</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          name="student"
          placeholder="Student ID"
          value={formData.student}
          onChange={handleChange}
          required
          style={{ marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          name="class_instance"
          placeholder="Class Instance ID"
          value={formData.class_instance}
          onChange={handleChange}
          required
          style={{ marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <label style={{ marginRight: '10px' }}>
          Present:
          <input
            type="checkbox"
            name="is_present"
            checked={formData.is_present}
            onChange={handleChange}
            style={{ marginLeft: '5px' }}
          />
        </label>
        <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px' }}>
          {isEditing ? 'Update Attendance' : 'Add Attendance'}
        </button>
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Student ID</th>
            <th style={tableHeaderStyle}>Class Instance ID</th>
            <th style={tableHeaderStyle}>Is Present</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.length > 0 ? (
            attendanceData.map((record) => (
              <tr key={record.id} style={{ borderBottom: '1px solid #ccc' }}>
                <td style={tableCellStyle}>{record.student}</td>
                <td style={tableCellStyle}>{record.class_instance}</td>
                <td style={tableCellStyle}>{record.is_present ? 'Yes' : 'No'}</td>
                <td style={tableCellStyle}>
                  <button onClick={() => handleEdit(record)} style={editButtonStyle}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(record.id)} style={deleteButtonStyle}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>No attendance data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const tableHeaderStyle = {
  backgroundColor: '#f4f4f4',
  color: '#333',
  padding: '10px',
  textAlign: 'left',
  fontWeight: 'bold',
  borderBottom: '2px solid #ddd',
};

const tableCellStyle = {
  padding: '10px',
  textAlign: 'left',
};

const editButtonStyle = {
  padding: '5px 10px',
  marginRight: '5px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const deleteButtonStyle = {
  padding: '5px 10px',
  backgroundColor: '#dc3545',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default LecturerDashboard;
