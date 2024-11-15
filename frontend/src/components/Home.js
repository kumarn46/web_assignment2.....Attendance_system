import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [courses, setCourses] = useState([]);
  const [lecturers, setLecturers] = useState([]);

  useEffect(() => {

    fetch('http://127.0.0.1:8000/api/courses/')
      .then(response => response.json())
      .then(data => {
        setCourses(data);
      })
      .catch(error => console.error('Error fetching courses:', error));
  }, []);


  useEffect(() => {
    // Fetch lecturers data from API
    fetch('http://127.0.0.1:8000/api/lecturers')
      .then(response => response.json())
      .then(data => {
        setLecturers(data);
      })
      .catch(error => console.error('Error fetching lecturers:', error));
  }, []);

  return (
    <div className="container mt-4">

      <h3 className="pb-1 mb-4">Courses <a href="#" className="float-end">See All</a></h3>
      <div className="row">
        {courses.map(course => (
          <div className="col-md-3" key={course.id}>
            <div className="card">
              <Link to={`/${course.id}`}>
                <img src={course.imageUrl || "Courses.png"} className="card-img-top" alt="Course"/>
              </Link>
              <div className="card-body">
                <h5 className="course.course_name">
                  {course.course_name}
                </h5>
              </div>

            </div>
          </div>
        ))}
      </div>


      <h3 className="pb-1 mb-4 mt-5">Lecturers <a href="#" className="float-end">See All</a></h3>
      <div className="row">
      {lecturers.map(lecturer => (
          <div className="col-md-3" key={lecturer.id}>
            <div className="card">
              <Link to={`/${lecturer.id}`}>
                <img src={lecturer.imageUrl || "Lecturer.png"} className="card-img-top" alt="Lecturer" />
              </Link>
              <div className="card-body">
                <h5 className="lecturer.lecturer_name">
                  {lecturer.first_name} {lecturer.last_name}
                </h5>
              </div>
            </div>
          </div>
      ))}
      </div>

      <h3 className="pb-1 mb-4 mt-5">Student Testimonial</h3>
      <div id="carouselExampleIndicators" className="carousel slide bg-dark text-white py-5">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <figure className="text-center">
              <blockquote className="blockquote">
                <p>A well-known quote, contained in a blockquote element.</p>
              </blockquote>
              <figcaption className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </figcaption>
            </figure>
          </div>
          <div className="carousel-item">
            <figure className="text-center">
              <blockquote className="blockquote">
                <p>A well-known quote, contained in a blockquote element.</p>
              </blockquote>
              <figcaption className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </figcaption>
            </figure>
          </div>
          <div className="carousel-item">
            <figure className="text-center">
              <blockquote className="blockquote">
                <p>A well-known quote, contained in a blockquote element.</p>
              </blockquote>
              <figcaption className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </figcaption>
            </figure>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

    </div>
  );
}

export default Home;
