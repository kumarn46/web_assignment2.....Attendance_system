import React from 'react';
import {Link} from 'react-router-dom';

function Home() {
  return (
      <div className="container mt-4">
          {/*courses*/}
          <h3 className="pb-1 mb-4">Courses <a href="#" className= "float-end">See All</a></h3>
          <div className="row">
              <div className="col-md-3">
                  <div className="card">
                      <Link to="/detail/1"><img src="Courses.png" className="card-img-top" alt="..."/></Link>
                      <div className="card-body">
                          <h5 className="card-title"><Link to="/detail/1">Course title</Link></h5>
                      </div>
                  </div>
              </div>
              <div className="col-md-3">
                  <div className="card">
                      <a href="#"><img src="Courses.png" className="card-img-top" alt="..."/></a>
                      <div className="card-body">
                          <h5 className="card-title"><a href="#">Course title</a></h5>
                      </div>
                  </div>
              </div>
              <div className="col-md-3">
                  <div className="card">
                      <a href="#"><img src="Courses.png" className="card-img-top" alt="..."/></a>
                      <div className="card-body">
                          <h5 className="card-title"><a href="#">Course title</a></h5>
                      </div>
                  </div>
              </div>
              <div className="col-md-3">
                  <div className="card">
                      <a href="#"><img src="Courses.png" className="card-img-top" alt="..."/></a>
                      <div className="card-body">
                          <h5 className="card-title"><a href="#">Course title</a></h5>
                      </div>
                  </div>
              </div>
          </div>
          {/*end courses*/}
          {/*Lecturers*/}
          <h3 className="pb-1 mb-4 mt-5">Lecturers <a href="#" className="float-end">See All</a></h3>
          <div className="row">
              <div className="col-md-3">
                  <div className="card">
                      <a href="#"><img src="Lecturer.png" className="card-img-top" alt="..."/></a>
                      <div className="card-body">
                          <h5 className="card-title"><a href="#">Lecturer Name</a></h5>
                      </div>
                  </div>
              </div>
              <div className="col-md-3">
                  <div className="card">
                      <a href="#"><img src="Lecturer.png" className="card-img-top" alt="..."/></a>
                      <div className="card-body">
                          <h5 className="card-title"><a href="#">Lecturer Name</a></h5>
                      </div>
                  </div>
              </div>
              <div className="col-md-3">
                  <div className="card">
                      <a href="#"><img src="Lecturer.png" className="card-img-top" alt="..."/></a>
                      <div className="card-body">
                          <h5 className="card-title"><a href="#">Lecturer Name</a></h5>
                      </div>
                  </div>
              </div>
              <div className="col-md-3">
                  <div className="card">
                      <a href="#"><img src="Lecturer.png" className="card-img-top" alt="..."/></a>
                      <div className="card-body">
                          <h5 className="card-title"><a href="#">Lecturer Name</a></h5>
                      </div>
                  </div>
              </div>
          </div>
          {/*end Lecturers*/}
          <h3 className="pb-1 mb-4 mt-5">Student Testimonial</h3>
          <div id="carouselExampleIndicators" className="carousel slide bg-dark text-white py-5">
              <div className="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                          className="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                          aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                          aria-label="Slide 3"></button>
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
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                      data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                      data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
              </button>
          </div>
      </div>


  );
}

export default Home;