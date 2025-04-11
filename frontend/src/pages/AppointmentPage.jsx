import React, { useState } from "react";
import axios from "axios";

const AppointmentPage = () => {
  const [formData, setFormData] = useState({
    doctorId: "",
    appointmentDate: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/appointments",
        formData,
        { headers: { Authorization: token } }
      );
      setMessage(response.data.message);
    } catch (err) {
      console.error(err);
      setMessage("Error: Unable to book appointment. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Book Appointment</h1>
      {message && <p className="text-center text-success">{message}</p>}
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Doctor ID</label>
          <input
            type="text"
            className="form-control"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Appointment Date</label>
          <input
            type="date"
            className="form-control"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100">
            Book Appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentPage;