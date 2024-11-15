import {useParams} from "react-router-dom";
import React from "react";

function CourseDetail() {
    let {course_id}=useParams();
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-4">
                    <img src="/Courses.png" className="img-thumbnail" alt="..."/>
                </div>
                <div className="col-8">
                    <h3>Course Title:</h3>
                    <h4>Course Code:</h4>
                    <p>Computer science is the study of computer hardware and software. Those who study computer
                        science, consequently, can specialize in a wide range of interrelated subfields,
                        from artificial intelligence and cryptography to computer engineering and software
                        development.</p>
                    <p className="fw-bold"> Lecturer :</p>
                    <p className="fw-bold">Total Enrolled: 456 Students </p>
                </div>
            </div>

            <h3 className="pb-1 mb-4 mt-5">Other Courses </h3>
               <div className="row">
                  <div className="col-md-3">
                      <div className="card">
                          <a href="#"><img src="/Courses.png" className="card-img-top" alt="..."/></a>
                          <div className="card-body">
                              <h5 className="card-title"><a href="#">Course Title</a></h5>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-3">
                      <div className="card">
                         <a href="#"><img src="/Courses.png" className="card-img-top" alt="..."/></a>
                         <div className="card-body">
                             <h5 className="card-title"><a href="#">Course Title</a></h5>
                         </div>
                      </div>
                  </div>
               </div>
        </div>

    );
}

export default CourseDetail;