import {Link} from 'react-router-dom';
import Header from "./Header";
import React from "react";

function Dashboard() {
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <div className="card">
                        <h5 className="card-header">Dashboard</h5>
                        <div className="list-group list-group-flush">
                            <Link to="/Semesters" className="list-group-item list-group-item-action">Semesters</Link>
                            <Link to="/Courses" className="list-group-item list-group-item-action">Courses</Link>
                            <Link to="/Classes" className="list-group-item list-group-item-action">Classes</Link>
                            <Link to="/Lecturers" className="list-group-item list-group-item-action">Lecturers</Link>
                            <Link to="/Students" className="list-group-item list-group-item-action">Students</Link>
                            <Link to="/Enrollment" className="list-group-item list-group-item-action">Enrollment</Link>
                            <Link to="/" className="list-group-item list-group-item-action text-danger">LogOut</Link>
                        </div>
                    </div>
                </aside>
                <section className="col-md-9">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title"><a href="#">Total Enrolled Student</a></h5>
                                    <p> 25000 Students </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title"><a href="#">New Enrolled Student</a></h5>
                                    <p> 456 Students </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title"><a href="#">Total Drop out</a></h5>
                                    <p> 123 Students </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-3">
                            <div className="card">
                                <a href="#"><img src="/Event_services.png" className="card-img-top" alt="..."/></a>
                                <div className="card-body">
                                    <h5 className="card-title"><a href="#">Event Services</a></h5>
                                    <p>Event Services is set up to enable the delivery of events and conferences for
                                        staff, students and the wider University community. </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card">
                                <a href="#"><img src="/Virtual_Events.png" className="card-img-top" alt="..."/></a>
                                <div className="card-body">
                                    <h5 className="card-title"><a href="#">Virtual Events</a></h5>
                                    <p> Event Services can now deliver your event in a virtual or hybrid format,
                                        with their simple and intuitive platform456 Students </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card">
                                <a href="#"><img src="/Conference.png" className="card-img-top" alt="..."/></a>
                                <div className="card-body">
                                    <h5 className="card-title"><a href="#">Conferences</a></h5>
                                    <p> The Event Services team provides conference management services for the
                                        University, both on and off site, to enhance reputation and disseminate
                                        research. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


            </div>
        </div>
    )
}

export default Dashboard;