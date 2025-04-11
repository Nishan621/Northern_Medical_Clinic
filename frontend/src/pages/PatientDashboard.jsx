// filepath: d:/Apic/Capstone B/Northern_Medical_Clinic/NMC/frontend/src/pages/PatientDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/PatientDashboard.css';

const PatientDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: token }
        });
        setProfile(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchMedicalRecords = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/medical-records', {
          headers: { Authorization: token }
        });
        setMedicalRecords(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchProfile();
    fetchMedicalRecords();
  }, [navigate]);

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/appointments', {
        doctorId,
        appointmentDate
      }, {
        headers: { Authorization: token }
      });
      alert(response.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="patient-dashboard">
      <h1>Patient Dashboard</h1>
      <div className="profile">
        <h2>Profile</h2>
        {profile ? (
          <>
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>
            <p>Phone: {profile.phone}</p>
            <p>Address: {profile.address}</p>
            <p>Date of Birth: {profile.dob}</p>
            <p>Gender: {profile.gender}</p>
          </>
        ) : (
          <p>No profile data available.</p>
        )}
      </div>
      <div className="medical-records">
        <h2>Medical Records</h2>
        {medicalRecords.length > 0 ? (
          medicalRecords.map(record => (
            <div key={record._id} className="record">
              <p>Date: {record.recordDate}</p>
              <p>Description: {record.description}</p>
              <p>Prescription: {record.prescription}</p>
            </div>
          ))
        ) : (
          <p>No medical records available.</p>
        )}
      </div>
      <div className="appointments">
        <h2>Book Appointment</h2>
        <form onSubmit={handleBookAppointment}>
          <div>
            <label>Doctor ID:</label>
            <input type="text" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required />
          </div>
          <div>
            <label>Appointment Date:</label>
            <input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
          </div>
          <button type="submit">Book Appointment</button>
        </form>
      </div>
    </div>
  );
};

export default PatientDashboard;