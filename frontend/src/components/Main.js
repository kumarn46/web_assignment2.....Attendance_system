import Home from './Home';
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";

import {Routes,Route} from "react-router-dom";
import About from "./About";
import CourseDetail from "./CourseDetail";
import Semesters from "./Semesters";
import Courses from "./Courses";
import Classes from "./Classes";
import Lecturers from "./Lecturers";
import Enrollment from "./Enrollment";
import Students from "./Students";
import LecturerDashboard from "./Lecturer_Dashboard";



function Main() {
  return (
    <div className="App">
        <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/detail/:course_id" element={<CourseDetail/>}/>
                <Route path="/user-login" element={<Login/>}/>
                <Route path="/user-register" element={<Register/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/lecturer_dashboard" element={<LecturerDashboard/>}/>

                <Route path="/semesters" element={<Semesters/>}/>
                <Route path="/courses" element={<Courses/>}/>
                <Route path="/classes" element={<Classes/>}/>
                <Route path="/lecturers" element={<Lecturers/>}/>
                <Route path="/students" element={<Students/>}/>
                <Route path="/enrollment" element={<Enrollment/>}/>
                <Route path="/logout" element={<Home/>}/>
            </Routes>
        <Footer/>
    </div>
  );
}

export default Main;