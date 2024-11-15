import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({
    class_number: '',
    course_code: '',
    lecturer: '',
    semester: '',
    class_time: '',
  });
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/classes/');
      setClasses(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching classes:', err);
      setError('Error fetching class data');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update existing class
        await axios.put(`http://127.0.0.1:8000/api/classes/${editId}/`, formData);
        setIsEditing(false);
        setEditId(null);
      } else {
        // Add new class
        await axios.post('http://127.0.0.1:8000/api/classes/', formData);
      }
      fetchClasses();
      setFormData({
        class_number: '',
        course_code: '',
        lecturer: '',
        semester: '',
        class_time: '',
      });
    } catch (err) {
      console.error(isEditing ? 'Error updating class:' : 'Error adding class:', err);
      setError(isEditing ? 'Error updating class' : 'Error adding class');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/classes/${id}/`);
      fetchClasses();
    } catch (err) {
      console.error('Error deleting class:', err);
      setError('Error deleting class');
    }
  };

  const handleEdit = (classData) => {
    setIsEditing(true);
    setEditId(classData.id);
    setFormData({
      class_number: classData.class_number,
      course_code: classData.course_code,
      lecturer: classData.lecturer,
      semester: classData.semester,
      class_time: classData.class_time,
    });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>

      <Link to="/Dashboard" className="list-group-item list-group-item-action"
            style={{ color: 'blue', fontWeight: 'bold', fontSize: '22px' }}>Back</Link>

      <h2>Classes</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          name="class_number"
          placeholder="Class Number"
          value={formData.class_number}
          onChange={handleChange}
          required
          style={{ marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          name="course_code"
          placeholder="Course Code"
          value={formData.course_code}
          onChange={handleChange}
          required
          style={{ marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          name="lecturer"
          placeholder="Lecturer"
          value={formData.lecturer}
          onChange={handleChange}
          required
          style={{ marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          name="semester"
          placeholder="Semester"
          value={formData.semester}
          onChange={handleChange}
          required
          style={{ marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          name="class_time"
          placeholder="Class Time"
          value={formData.class_time}
          onChange={handleChange}
          required
          style={{ marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px' }}>
          {isEditing ? 'Update Class' : 'Add Class'}
        </button>
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Class Number</th>
            <th style={tableHeaderStyle}>Course Code</th>
            <th style={tableHeaderStyle}>Lecturer</th>
            <th style={tableHeaderStyle}>Semester</th>
            <th style={tableHeaderStyle}>Class Time</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.length > 0 ? (
            classes.map((classData) => (
              <tr key={classData.id} style={{ borderBottom: '1px solid #ccc' }}>
                <td style={tableCellStyle}>{classData.class_number}</td>
                <td style={tableCellStyle}>{classData.course_code}</td>
                <td style={tableCellStyle}>{classData.lecturer}</td>
                <td style={tableCellStyle}>{classData.semester}</td>
                <td style={tableCellStyle}>{classData.class_time}</td>
                <td style={tableCellStyle}>
                  <button onClick={() => handleEdit(classData)} style={editButtonStyle}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(classData.id)} style={deleteButtonStyle}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No class data available</td>
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

export default Classes;
