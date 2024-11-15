import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [formData, setFormData] = useState({
    student_name: '',
    course_name: '',
    classes: '',
    enrollment_date: '',
  });
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/enrollments/'); // Assuming API endpoint for enrollments
      setEnrollments(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching enrollments:', err);
      setError('Error fetching enrollment data');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update existing enrollment
        await axios.put(`http://127.0.0.1:8000/api/enrollments/${editId}/`, formData);
        setIsEditing(false);
        setEditId(null);
      } else {
        // Add new enrollment
        await axios.post('http://127.0.0.1:8000/api/enrollments/', formData);
      }
      fetchEnrollments();
      setFormData({
        student_name: '',
        course_name: '',
        class_number: '',
        class_time: '',
        enrollment_date: '',
      });
    } catch (err) {
      console.error(isEditing ? 'Error updating enrollment:' : 'Error adding enrollment:', err);
      setError(isEditing ? 'Error updating enrollment' : 'Error adding enrollment');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/enrollments/${id}/`);
      fetchEnrollments();
    } catch (err) {
      console.error('Error deleting enrollment:', err);
      setError('Error deleting enrollment');
    }
  };

  const handleEdit = (enrollmentData) => {
    setIsEditing(true);
    setEditId(enrollmentData.id);
    setFormData({
      student_name: enrollmentData.student_name,
      course_name: enrollmentData.course_name,
      class_number: enrollmentData.class_number,
      class_time: enrollmentData.class_time,
      enrollment_date: enrollmentData.enrollment_date,
    });
  };

  return (
      <div style={{maxWidth: '800px', margin: '0 auto', padding: '20px'}}>

        <Link to="/Dashboard" className="list-group-item list-group-item-action"
            style={{ color: 'blue', fontWeight: 'bold', fontSize: '22px' }}>Back</Link>

        <h2>Enrollments</h2>
        {error && <p style={{color: 'red'}}>{error}</p>}

        <form onSubmit={handleSubmit} style={{marginBottom: '20px'}}>
          <input
              name="student_name"
              placeholder="Student Name"
              value={formData.student_name}
              onChange={handleChange}
              required
              style={{marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}
          />
          <input
              name="course_name"
              placeholder="Course Name"
              value={formData.course_name}
              onChange={handleChange}
              required
              style={{marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}
          />
          <input
              name="class_number"
              placeholder="Class Number"
              value={formData.class_number}
              onChange={handleChange}
              required
              style={{marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}
          />
          <input
              name="class_time"
              placeholder="Class Time"
              value={formData.class_time}
              onChange={handleChange}
              required
              style={{marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}
          />
          <input
              name="enrollment_date"
              type="date"
              placeholder="Enrollment Date"
              value={formData.enrollment_date}
              onChange={handleChange}
              required
              style={{marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}
          />
          <button type="submit" style={{
            padding: '8px 16px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '4px'
          }}>
            {isEditing ? 'Update Enrollment' : 'Add Enrollment'}
          </button>
        </form>

        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <thead>
          <tr>
            <th style={tableHeaderStyle}>Student Name</th>
            <th style={tableHeaderStyle}>Course Name</th>
            <th style={tableHeaderStyle}>Class Number</th>
            <th style={tableHeaderStyle}>Class Time</th>
            <th style={tableHeaderStyle}>Enrollment Date</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
          </thead>
          <tbody>
          {enrollments.length > 0 ? (
              enrollments.map((enrollment) => (
                  <tr key={enrollment.id} style={{borderBottom: '1px solid #ccc'}}>
                    <td style={tableCellStyle}>{enrollment.student_name}</td>
                    <td style={tableCellStyle}>{enrollment.course_name}</td>
                    <td style={tableCellStyle}>{enrollment.class_number}</td>
                    <td style={tableCellStyle}>{enrollment.class_time}</td>
                    <td style={tableCellStyle}>{enrollment.enrollment_date}</td>
                    <td style={tableCellStyle}>
                      <button onClick={() => handleEdit(enrollment)} style={editButtonStyle}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(enrollment.id)} style={deleteButtonStyle}>
                        Delete
                      </button>
                    </td>
                  </tr>
              ))
          ) : (
              <tr>
                <td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>No enrollment data available</td>
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

export default Enrollments;
