import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const Lecturers = () => {
  const [lecturers, setLecturers] = useState([]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    email: '',
  });
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchLecturers();
  }, []);

  const fetchLecturers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/lecturers/');
      setLecturers(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching lecturers:', err);
      setError('Error fetching lecturer data');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update existing lecturer
        await axios.put(`http://127.0.0.1:8000/api/lecturers/${editId}/`, formData);
        setIsEditing(false);
        setEditId(null);
      } else {
        // Add new lecturer
        await axios.post('http://127.0.0.1:8000/api/lecturers/', formData);
      }
      fetchLecturers();
      setFormData({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        email: '',
      });
    } catch (err) {
      console.error(isEditing ? 'Error updating lecturer:' : 'Error adding lecturer:', err);
      setError(isEditing ? 'Error updating lecturer' : 'Error adding lecturer');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/lecturers/${id}/`);
      fetchLecturers();
    } catch (err) {
      console.error('Error deleting lecturer:', err);
      setError('Error deleting lecturer');
    }
  };

  const handleEdit = (lecturerData) => {
    setIsEditing(true);
    setEditId(lecturerData.id);
    setFormData({
      first_name: lecturerData.first_name,
      last_name: lecturerData.last_name,
      date_of_birth: lecturerData.date_of_birth,
      email: lecturerData.email,
    });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>

      <Link to="/Dashboard" className="list-group-item list-group-item-action"
            style={{ color: 'blue', fontWeight: 'bold', fontSize: '22px' }}>Back</Link>

      <h2>Lecturers</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          required
          style={{ marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          required
          style={{ marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          name="date_of_birth"
          type="date"
          placeholder="Date of Birth"
          value={formData.date_of_birth}
          onChange={handleChange}
          required
          style={{ marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px' }}>
          {isEditing ? 'Update Lecturer' : 'Add Lecturer'}
        </button>
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>First Name</th>
            <th style={tableHeaderStyle}>Last Name</th>
            <th style={tableHeaderStyle}>Date of Birth</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lecturers.length > 0 ? (
            lecturers.map((lecturer) => (
              <tr key={lecturer.id} style={{ borderBottom: '1px solid #ccc' }}>
                <td style={tableCellStyle}>{lecturer.first_name}</td>
                <td style={tableCellStyle}>{lecturer.last_name}</td>
                <td style={tableCellStyle}>{lecturer.date_of_birth}</td>
                <td style={tableCellStyle}>{lecturer.email}</td>
                <td style={tableCellStyle}>
                  <button onClick={() => handleEdit(lecturer)} style={editButtonStyle}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(lecturer.id)} style={deleteButtonStyle}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No lecturer data available</td>
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

export default Lecturers;
