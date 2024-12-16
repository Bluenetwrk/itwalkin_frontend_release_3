import React, { useEffect } from "react";
import axios from "axios";
import "./App.css"
import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom"
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import Styles from "./Job-Portal/NaveBar/nav.module.css"

import Cancel from "./Job-Portal/img/icons8-cross-50.png"
import NavIcon from "./Job-Portal/img/icons8-menu-50.png"


// .......importing components......//
// import  from "./SidebarNav"

// import SidebarNav from "./Job-Portal/NaveBar/SidebarNav";
import StudentLogin from "./Job-Portal/Login/StudLogin";
import EmployeeLogin from "./Job-Portal/Login/EmpLogin"
import StudentSignUp from "./Job-Portal/SignUp/StudSignin";
import EmployeeSignUp from "./Job-Portal/SignUp/EmplSign";
import StudPrivate from "./Job-Portal/Private/OutletStud";
import PostedJobsbyEmp from "./Job-Portal/Jobs/mypostedjobs";
import PostedJobsByAdmin from "./Job-Portal/Jobs/AdminPostedJobs";
import PostedCareerJobs from "./Job-Portal/Jobs/myPostedCaereerjobs";
import EmpPrivate from "./Job-Portal/Private/OuletEmp";
import PostJobs from "./Job-Portal/PostJobs/postJobs";
import PostBlogs from "./Job-Portal/PostJobs/postBlogs";
import Jobs from "./Job-Portal/Jobs/AllJobs";
import Nav from "./Job-Portal/NaveBar/Nav";
import Jobdetails from "./Job-Portal/Jobs/AllJobdetails"
import Blogdetails from "./Job-Portal/Jobs/Blogdetails"
import Answerdetails from "./Job-Portal/Jobs/Answerdetails";
import CareerJobdetails from "./Job-Portal/Jobs/CareerJobdetails"
import Home from "./Job-Portal/Jobs/AllHomeJobs";
import StudentUpdateProfile from "./Job-Portal/Profile/StudentUpdateProfile";
import EmployeeUpdateProfile from "./Job-Portal/Profile/EmployeeUpdateProfile";
import StudentProfile from "./Job-Portal/Profile/StudentProfile";
import EmployeeProfile from "./Job-Portal/Profile/EmployeeProfile";
import UpdatePostedJobs from "./Job-Portal/PostJobs/updatePostedJobs";
import MyAppliedJobs from "./Job-Portal/Jobs/MyAppliedJobs"
import CareerAppliedJobs from "./Job-Portal/Jobs/MyCareerAppliedJobs"
import AppliedUserProfile from "./Job-Portal/AppliedUserProfile/AppliedUserProfile";
import AppliedUserForAdminJobs from "./Job-Portal/AppliedUserProfile/AdminJobsAppliedUser";
import AppliedUserForCareerJobs from "./Job-Portal/AppliedUserProfile/AdminCareerJobsAppliedUser ";
import CheckStudentProfiel from "./Job-Portal/Profile/CheckStudentProfiel";
import CheckEmpHalfProfile from "./Job-Portal/Profile/CheckEmpHalfProf";
// admin
import AdminLogin from "./Job-Portal/Login/AdminLogin"
import AdminAccess from "./Job-Portal/Admin/AdminAccess"
// import SearchParams from "./Job-Portal/Login/SearchParams";
import SearchParams from "./Job-Portal/Login/SearchParams ";
import SearchParamsEmp from "./Job-Portal/Login/SearchParamsEmp";
import SearchParamsDub from "./Job-Portal/Login/SearchParamsDupStuD";
import SearchParamsDubEmp from "./Job-Portal/Login/SearchParamsDupEmp";
import AdminProfile from "./Job-Portal/Admin/AdminProfile"
import AllJobsForAdmin from "./Job-Portal/Admin/AllJobsForAdmin"
import ArchiveJobs from "./Job-Portal/Admin/ArchiveJobs";
import DeletedJobs from "./Job-Portal/Admin/DeletedJobs";
import AllJobSeekers from "./Job-Portal/Admin/AllJobSeekers"
import AllEmployees from "./Job-Portal/Admin/AllEmployees"
import CheckEmpProfileForAdmin from "./Job-Portal/Profile/CheckEmplProfileForAdmin";
import CheckStudentProfileForAdmin from "./Job-Portal/Profile/CheckStuForAdmin";
import CheckArchivedJobSeeker from "./Job-Portal/Profile/CheckArchivedStud";
import SearchCandidate from "./Job-Portal/AppliedUserProfile/SearchCandidat";
import SearchCandHome from "./Job-Portal/AppliedUserProfile/SearchCandHome";
import AdminUpdate from "./Job-Portal/Admin/AdminUpdate"
import AdminPostJobs from "./Job-Portal/Admin/AdminJobPosts";
import AllIds from "./Job-Portal/Admin/Allid'sStudent";
import ArchivedUser from "./Job-Portal/Admin/ArchiveJobSeekers";
import AdminCareerPostJobs from "./Job-Portal/Admin/AdminCareerJobPosts";
import AllCareerJobs from "./Job-Portal/Jobs/AllCareerJobs";

import Blogs from "./Job-Portal/Jobs/AllBlogs";

import AboutUs from "./Job-Portal/AboutUs"
import Contact from "./Job-Portal/Contact"
import Services from "./Job-Portal/Services"
import TermsAndCondition from "./Job-Portal/TermsAndConditions"
import Footer from "./Job-Portal/Footer/Footer";
import Payment from "./Job-Portal/Payment"
import socketIO from 'socket.io-client';
import SidebarNav from "./Job-Portal/BigSideNav";
import useScreenSize from '../src/Job-Portal/SizeHook';
import AskQuestion from "./Job-Portal/PostJobs/postQuesion";
// axios.defaults.baseURL = "http://localhost:8080" 
// axios.defaults.baseURL = "https://i-twalkin-backend-testrelease-2-0-1-0824-zdnu.vercel.app" // new vercel

// axios.defaults.baseURL = "https://i-twalkin-backend-testrelease-2-0-1-0824.vercel.app"  // vercel Test

axios.defaults.baseURL = "https://itwalkin-backend-testrelease-2-0-1-0824-ns0g.onrender.com" // Render Test

// Vercel Main Live 
//  axios.defaults.baseURL = "https://itwalkin-backend-testrelease-2-0-1-0824.onrender.com";
// .. not available now and company & 


function App() {
 

  const screenSize = useScreenSize();
  let size = screenSize.width;

  const [ShowSideNave, setShowSideNave] = useState(false)

  // let jobSeekerId = JSON.parse(localStorage.getItem("StudId"))
  // let empId = JSON.parse(localStorage.getItem("EmpIdG"))
 

  return (
    <>

      <BrowserRouter>
        <Nav  chandinmargin={setShowSideNave}/>
        
        <div style={ShowSideNave && screenSize.width > 850 ? { marginLeft: "100px", transition: " ease-in-out 0.6s" } : { marginLeft: "-3px", transition: " ease-in-out 0.5s" }}>
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/Blogs" element={<Blogs />} />

            {/* ..........Employee Private component i,e can not search in URL......... */}
            <Route element={<EmpPrivate />}>
              <Route path="/PostJobs" element={<PostJobs url={axios.defaults.baseURL} />} />
              <Route path="/PostBlogs" element={<PostBlogs url={axios.defaults.baseURL} />} />
              <Route path="/postedjobs" element={<PostedJobsbyEmp url={axios.defaults.baseURL} />} />
              <Route path="/Updatepostedjobs" element={<UpdatePostedJobs url={axios.defaults.baseURL} />} />
              <Route path="/Applied-User-Profile/:jid" element={<AppliedUserProfile url={axios.defaults.baseURL} />} />
              <Route path="/Check-Profile/:CP" element={<CheckStudentProfiel url={axios.defaults.baseURL} />} />
              <Route path="/UpdateProfile" element={<EmployeeUpdateProfile url={axios.defaults.baseURL} />} />
              <Route path="/MyProfile" element={<EmployeeProfile url={axios.defaults.baseURL}/>} />
              <Route path="Search-Candidate" element={<SearchCandidate url={axios.defaults.baseURL} />} />

            </Route>
            {/* ..........Jobseeker Private component i,e can not search in URL......... */}
            <Route element={<StudPrivate />}>
              <Route path="/alljobs" element={<Jobs url={axios.defaults.baseURL} />} />
              <Route path="/AskQuestion" element={<AskQuestion  />} />
              <Route path="/Update-Profile" element={<StudentUpdateProfile url={axios.defaults.baseURL} />} />
              <Route path="/My-Profile" element={<StudentProfile />} />
              <Route path="/My-Applied-Jobs" element={<MyAppliedJobs url={axios.defaults.baseURL} />} />
              <Route path="/MyCareer-Applied-Jobs" element={<CareerAppliedJobs url={axios.defaults.baseURL} />} />
            </Route>
            <Route path="/AllCareerJobs" element={<AllCareerJobs />} />
            <Route path="/BIAdd@Applied-User-Profile/:jid" element={<AppliedUserForAdminJobs url={axios.defaults.baseURL} />} />
            <Route path="/BIAdd@Applied-CareerUser-Profile/:jid" element={<AppliedUserForCareerJobs url={axios.defaults.baseURL} />} />
            <Route path="/BIAdd@PostedCareerJobs" element={<PostedCareerJobs url={axios.defaults.baseURL} />} />
            <Route path="/BIAdd@AdminPostedJobs" element={<PostedJobsByAdmin url={axios.defaults.baseURL} />} />
            <Route path="/BIAdd@Logg" element={<AdminLogin />} />
            <Route path="/BIAddAdminAccess" element={<AdminAccess />} />
            <Route path="/BIAdd@Gmail" element={<SearchParams />} />
            <Route path="/BIAdd@GmailEmp" element={<SearchParamsEmp />} />
            <Route path="/BIAdd@Gmaill" element={<SearchParamsDub />} />
            <Route path="/BIAdd@Gmaile" element={<SearchParamsDubEmp />} />
            <Route path="/BIAddmin@Profile" element={<AdminProfile />} />
            <Route path="/BIAddmin@AllJobs" element={<AllJobsForAdmin />} />
            <Route path="/BIAddmin@ArchiveJobs" element={<ArchiveJobs />} />
            <Route path="/BIAddmin@DeletedJobs" element={<DeletedJobs />} />
            <Route path="/BIAddmin@AllJobSeekers" element={<AllJobSeekers />} />
            <Route path="/BIAddmin@AllEmployees" element={<AllEmployees />} />
            <Route path="/BIAddmin@CheckEmpProfile/:CP" element={<CheckEmpProfileForAdmin />} />
            <Route path="/BIAddmin@CheckStudentProfile/:CP" element={<CheckStudentProfileForAdmin />} />
            <Route path="/BIAddmin@CheckStudentArchived/:CP" element={<CheckArchivedJobSeeker />} />
            <Route path="/BIAddmin@AdminUpdate" element={<AdminUpdate />} />
            <Route path="/BIAddmin@PostJob" element={<AdminPostJobs />} />
            <Route path="/BIAddmin@AdminCareerPostJobs" element={<AdminCareerPostJobs />} />
            <Route path="/BIAddmin@AllIds" element={<AllIds />} />
            <Route path="/BIAddmin@ArchivedUser" element={<ArchivedUser />} />
            <Route path="/JobSeekerLogin" element={<StudentLogin />} />
            <Route path="/EmployeeLogin" element={<EmployeeLogin />} />
            <Route path="/JobSeekerSignUp" element={<StudentSignUp />} />
            <Route path="/EmployeeSignUp" element={<EmployeeSignUp />} />
            <Route path="/JobDetails/:id" element={<Jobdetails />} />
            <Route path="/Blogdetails/:id" element={<Blogdetails />} />
            <Route path="/Answerdetails/:id" element={<Answerdetails />} />
            <Route path="/CareerJobdetails/:id" element={<CareerJobdetails />} />
            <Route path="/CheckEmpHalfProfile/:empId" element={<CheckEmpHalfProfile />} />

            <Route path="/Search-Candidate-Home" element={<SearchCandHome url={axios.defaults.baseURL} />} />

            <Route path="/payment" element={<Payment />} />

            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/TermsAndCondition" element={<TermsAndCondition />} />

            <Route path="*" element={<h2 style={{ marginLeft: "43%", marginTop: "10%", color: " rgb(40, 4, 99)" }}>Page Not Found</h2>} />

          </Routes>


        </div>
      
      </BrowserRouter>
    </>
  );
}

export default App

