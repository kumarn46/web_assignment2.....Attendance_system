import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const Students = () => {
  const [students, setStudents] = useState([]);
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
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/students/');
      setStudents(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching students:', err);
      setError('Error fetching student data');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update existing student
        await axios.put(`http://127.0.0.1:8000/api/students/${editId}/`, formData);
        setIsEditing(false);
        setEditId(null);
      } else {
        // Add new student
        await axios.post('http://127.0.0.1:8000/api/students/', formData);
      }
      fetchStudents();
      setFormData({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        email: '',
      });
    } catch (err) {
      console.error(isEditing ? 'Error updating student:' : 'Error adding student:', err);
      setError(isEditing ? 'Error updating student' : 'Error adding student');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/students/${id}/`);
      fetchStudents();
    } catch (err) {
      console.error('Error deleting student:', err);
      setError('Error deleting student');
    }
  };

  const handleEdit = (studentData) => {
    setIsEditing(true);
    setEditId(studentData.id);
    setFormData({
      first_name: studentData.first_name,
      last_name: studentData.last_name,
      date_of_birth: studentData.date_of_birth,
      email: studentData.email,
    });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>

      <Link to="/Dashboard" className="list-group-item list-group-item-action"
            style={{ color: 'blue', fontWeight: 'bold', fontSize: '22px' }}>Back</Link>

      <h2>Students</h2>
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
          {isEditing ? 'Update Student' : 'Add Student'}
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
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id} style={{ borderBottom: '1px solid #ccc' }}>
                <td style={tableCellStyle}>{student.first_name}</td>
                <td style={tableCellStyle}>{student.last_name}</td>
                <td style={tableCellStyle}>{student.date_of_birth}</td>
                <td style={tableCellStyle}>{student.email}</td>
                <td style={tableCellStyle}>
                  <button onClick={() => handleEdit(student)} style={editButtonStyle}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(student.id)} style={deleteButtonStyle}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No student data available</td>
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

export default Students;
