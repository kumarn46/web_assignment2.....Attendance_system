import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const Semesters = () => {
  const [semesters, setSemesters] = useState([]);
  const [formData, setFormData] = useState({ semester_name: '', start_date: '', end_date: '' });
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false); // New state to handle edit mode
  const [editId, setEditId] = useState(null); // New state to store the ID of the semester being edited


  useEffect(() => {
    fetchSemesters();
  }, []);

  const fetchSemesters = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/semesters/');
      setSemesters(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching semesters:', err);
      setError('Error fetching semesters data');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update existing semester
        await axios.put(`http://127.0.0.1:8000/api/semesters/${editId}/`, formData);
        setIsEditing(false);
        setEditId(null);
      } else {
        // Add new semester
        await axios.post('http://127.0.0.1:8000/api/semesters/', formData);
      }
      fetchSemesters();
      setFormData({ semester_name: '', start_date: '', end_date: '' });
    } catch (err) {
      console.error(isEditing ? 'Error updating semester:' : 'Error adding semester:', err);
      setError(isEditing ? 'Error updating semester' : 'Error adding semester');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/semesters/${id}/`);
      fetchSemesters();
    } catch (err) {
      console.error('Error deleting semester:', err);
      setError('Error deleting semester');
    }
  };

  const handleEdit = (semester) => {
    setIsEditing(true);
    setEditId(semester.id);
    setFormData({
      semester_name: semester.semester_name,
      start_date: semester.start_date,
      end_date: semester.end_date,
    });
  };


  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>

      <Link to="/Dashboard" className="list-group-item list-group-item-action"
            style={{ color: 'blue', fontWeight: 'bold', fontSize: '22px' }}>Back</Link>
      <h2>Semesters</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          name="semester_name"
          placeholder="Semester Name"
          value={formData.semester_name}
          onChange={handleChange}
          required
          style={{ marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="date"
          name="start_date"
          placeholder="Start Date"
          value={formData.start_date}
          onChange={handleChange}
          required
          style={{ marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="date"
          name="end_date"
          placeholder="End Date"
          value={formData.end_date}
          onChange={handleChange}
          required
          style={{ marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px' }}>
          {isEditing ? 'Update Semester' : 'Add Semester'}
        </button>
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Start Date</th>
            <th style={tableHeaderStyle}>End Date</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {semesters.length > 0 ? (
            semesters.map((semester) => (
              <tr key={semester.id} style={{ borderBottom: '1px solid #ccc' }}>
                <td style={tableCellStyle}>{semester.semester_name}</td>
                <td style={tableCellStyle}>{semester.start_date}</td>
                <td style={tableCellStyle}>{semester.end_date}</td>
                <td style={tableCellStyle}>
                  <button onClick={() => handleEdit(semester)} style={editButtonStyle}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(semester.id)} style={deleteButtonStyle}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>No semester data available</td>
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
  borderBottom: '2px solid #ddd'
};

const tableCellStyle = {
  padding: '10px',
  textAlign: 'left'
};

const editButtonStyle = {
  padding: '5px 10px',
  marginRight: '5px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};


const deleteButtonStyle = {
  padding: '5px 10px',
  backgroundColor: '#dc3545',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default Semesters;
