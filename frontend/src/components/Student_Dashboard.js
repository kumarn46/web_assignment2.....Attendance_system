import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

const StudentDashboard = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const studentId = getStudentId();
                const response = await fetch(`http://127.0.0.1:8000/api/attendance/student/${studentId}/`);

                if (!response.ok) {
                    throw new Error('Failed to fetch attendance data');
                }

                const data = await response.json();
                setAttendanceData(data);
                setError('');
            } catch (err) {
                console.error('Error fetching attendance:', err);
                setError('Failed to load attendance data. Please try again later.');
            }
        };

        fetchAttendanceData();
    }, []);

    const getStudentId = () => {
        return localStorage.getItem('studentId') || '';
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>

            <Link to="/" className="list-group-item list-group-item-action"
            style={{ color: 'blue', fontWeight: 'bold', fontSize: '22px' }}>Back</Link>

            <h2>Student Attendance Dashboard</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <table style={{ width: '100%', borderCollapse: 'collapse' }} id="attendance-table">
                <thead>
                    <tr>
                        <th style={tableHeaderStyle}>Date</th>
                        <th style={tableHeaderStyle}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceData.length > 0 ? (
                        attendanceData.map((record, index) => (
                            <tr key={index}>
                                <td style={tableCellStyle}>{record.date}</td>
                                <td style={tableCellStyle}>
                                    {record.is_present ? 'Present' : 'Absent'}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" style={{ textAlign: 'center', padding: '20px' }}>
                                No attendance records found.
                            </td>
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

export default StudentDashboard;
