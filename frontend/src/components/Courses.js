import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({ course_name: '', course_code: '', semester_id: '' });
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/courses/');
      setCourses(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Error fetching courses data');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update existing course
        await axios.put(`http://127.0.0.1:8000/api/courses/${editId}/`, formData);
        setIsEditing(false);
        setEditId(null);
      } else {
        // Add new course
        await axios.post('http://127.0.0.1:8000/api/courses/', formData);
      }
      fetchCourses();
      setFormData({ course_name: '', course_code: '', semester: '' });
    } catch (err) {
      console.error(isEditing ? 'Error updating course:' : 'Error adding course:', err);
      setError(isEditing ? 'Error updating course' : 'Error adding course');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/courses/${id}/`);
      fetchCourses();
    } catch (err) {
      console.error('Error deleting course:', err);
      setError('Error deleting course');
    }
  };

  const handleEdit = (course) => {
    setIsEditing(true);
    setEditId(course.id);
    setFormData({
      course_name: course.course_name,
      course_code: course.course_code,
      semester: course.semester,
    });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>

      <Link to="/Dashboard" className="list-group-item list-group-item-action"
            style={{ color: 'blue', fontWeight: 'bold', fontSize: '22px' }}>Back</Link>

      <h2>Courses</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          name="course_name"
          placeholder="Course Name"
          value={formData.course_name}
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
          name="semester"
          placeholder="semester"
          value={formData.semester}
          onChange={handleChange}
          required
          style={{ marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px' }}>
          {isEditing ? 'Update Course' : 'Add Course'}
        </button>
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Course Name</th>
            <th style={tableHeaderStyle}>Course Code</th>
            <th style={tableHeaderStyle}>Semester</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <tr key={course.id} style={{ borderBottom: '1px solid #ccc' }}>
                <td style={tableCellStyle}>{course.course_name}</td>
                <td style={tableCellStyle}>{course.course_code}</td>
                <td style={tableCellStyle}>{course.semester_id}</td>
                <td style={tableCellStyle}>
                  <button onClick={() => handleEdit(course)} style={editButtonStyle}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(course.id)} style={deleteButtonStyle}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>No course data available</td>
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

export default Courses;
