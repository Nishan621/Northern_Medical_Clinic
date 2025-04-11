import React from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";
import carouselImage1 from "../assets/carousel-image1.png";
import carouselImage2 from "../assets/carousel-image2.png";
import carouselImage3 from "../assets/carousel-image3.png";
import doctor1 from "../assets/doctor1.png";
import doctor2 from "../assets/doctor2.png";
import doctor3 from "../assets/doctor3.png";

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Carousel Section */}
      <div id="homepageCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={carouselImage1} className="d-block w-100" alt="Medical Clinic" />
          </div>
          <div className="carousel-item">
            <img src={carouselImage2} className="d-block w-100" alt="Doctors" />
          </div>
          <div className="carousel-item">
            <img src={carouselImage3} className="d-block w-100" alt="Patients" />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#homepageCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#homepageCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Summary Section */}
      <div className="summary text-center mt-5">
        <h1>Welcome to Northern Medical Clinic</h1>
        <p>
          Your health is our priority. We provide top-notch medical services with a team of
          experienced doctors and staff.
        </p>
        <div className="mt-4">
          <Link to="/signup" className="btn btn-primary me-3">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-secondary">
            Login
          </Link>
        </div>
      </div>

      {/* Team Section */}
      <div className="clinic-photos text-center mt-5">
        <h2>Our Team</h2>
        <div className="row mt-4">
          <div className="col-md-4">
            <img src={doctor1} className="img-fluid rounded-circle" alt="Doctor 1" />
            <p>Dr. John Doe</p>
          </div>
          <div className="col-md-4">
            <img src={doctor2} className="img-fluid rounded-circle" alt="Doctor 2" />
            <p>Dr. Jane Smith</p>
          </div>
          <div className="col-md-4">
            <img src={doctor3} className="img-fluid rounded-circle" alt="Doctor 3" />
            <p>Dr. Emily Johnson</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;