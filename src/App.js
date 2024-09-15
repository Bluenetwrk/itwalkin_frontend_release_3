import React, { useEffect } from "react";
import axios from "axios";
import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";


// .......importing components......//
// import  from "./SidebarNav"

import SidebarNav from "./Job-Portal/NaveBar/SidebarNav";
import StudentLogin from "./Job-Portal/Login/StudLogin";
import EmployeeLogin from "./Job-Portal/Login/EmpLogin"
import StudentSignUp from "./Job-Portal/SignUp/StudSignin";
import EmployeeSignUp from "./Job-Portal/SignUp/EmplSign";
import StudPrivate from "./Job-Portal/Private/OutletStud";
import PostedJobsbyEmp from "./Job-Portal/Jobs/mypostedjobs";
import EmpPrivate from "./Job-Portal/Private/OuletEmp";
import PostJobs from "./Job-Portal/PostJobs/postJobs";
import Jobs from "./Job-Portal/Jobs/AllJobs";
import Nav from "./Job-Portal/NaveBar/Nav";
import Jobdetails from "./Job-Portal/Jobs/AllJobdetails"
import Home from "./Job-Portal/Jobs/AllHomeJobs";
import StudentUpdateProfile from "./Job-Portal/Profile/StudentUpdateProfile";
import EmployeeUpdateProfile from "./Job-Portal/Profile/EmployeeUpdateProfile";
import StudentProfile from "./Job-Portal/Profile/StudentProfile";
import EmployeeProfile from "./Job-Portal/Profile/EmployeeProfile";
import UpdatePostedJobs from "./Job-Portal/PostJobs/updatePostedJobs";
import MyAppliedJobs from "./Job-Portal/Jobs/MyAppliedJobs"
import AppliedUserProfile from "./Job-Portal/AppliedUserProfile/AppliedUserProfile";
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
import AllJobSeekers from "./Job-Portal/Admin/AllJobSeekers"
import AllEmployees from "./Job-Portal/Admin/AllEmployees"
import CheckEmpProfileForAdmin from "./Job-Portal/Profile/CheckEmplProfileForAdmin";
import CheckStudentProfileForAdmin from "./Job-Portal/Profile/CheckStuForAdmin";
import SearchCandidate from "./Job-Portal/AppliedUserProfile/SearchCandidat";
import SearchCandHome from "./Job-Portal/AppliedUserProfile/SearchCandHome";
import AdminUpdate from "./Job-Portal/Admin/AdminUpdate"
import AdminPostJobs from "./Job-Portal/Admin/AdminJobPosts";
import AllIds from "./Job-Portal/Admin/Allid'sStudent";

import AboutUs from "./Job-Portal/AboutUs"
import Contact from "./Job-Portal/Contact"
import Services from "./Job-Portal/Services"
import TermsAndCondition from "./Job-Portal/TermsAndConditions"
import Footer from "./Job-Portal/Footer/Footer";
import Payment from "./Job-Portal/Payment"
import socketIO from 'socket.io-client';

import useScreenSize from '../src/Job-Portal/SizeHook';


// axios.defaults.baseURL = "http://localhost:8080"
// vercel Test
axios.defaults.baseURL = " https://itwalkin-backend-testrelease-2-0-1-0824-ns0g.onrender.com"
// Vercel Main Live 
//  axios.defaults.baseURL = "https://itwalkin-backend-testrelease-2-0-1-0824.onrender.com";

const App = () => {
  // let jobSeekerId = JSON.parse(localStorage.getItem("StudId"))
  // let empId = JSON.parse(localStorage.getItem("EmpIdG"))
  const screenSize = useScreenSize();
  let size =screenSize.width

  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* ..........Employee Private component i,e can not search in URL......... */}
          <Route element={<EmpPrivate />} >
            <Route path="/PostJobs" element={<PostJobs url= {axios.defaults.baseURL} />} />
            <Route path="/postedjobs" element={<PostedJobsbyEmp url= {axios.defaults.baseURL} />} />
            <Route path="/Updatepostedjobs" element={<UpdatePostedJobs url= {axios.defaults.baseURL} />} />
            <Route path="/Applied-User-Profile/:jid" element={<AppliedUserProfile url= {axios.defaults.baseURL} />} />
            <Route path="/Check-Profile/:CP" element={<CheckStudentProfiel url= {axios.defaults.baseURL} />} />
            <Route path="/UpdateProfile" element={<EmployeeUpdateProfile url= {axios.defaults.baseURL} />} />
            <Route path="/MyProfile" element={<EmployeeProfile url= {axios.defaults.baseURL} />} />
            <Route path="Search-Candidate" element={<SearchCandidate url= {axios.defaults.baseURL} />} />

          </Route>
          {/* ..........Jobseeker Private component i,e can not search in URL......... */}
          <Route element={<StudPrivate />} >
            <Route path="/alljobs" element={<Jobs url={axios.defaults.baseURL} />} />
            <Route path="/Update-Profile" element={<StudentUpdateProfile url= {axios.defaults.baseURL} />} />
            <Route path="/My-Profile" element={<StudentProfile url= {axios.defaults.baseURL} />} />
            <Route path="/My-Applied-Jobs" element={<MyAppliedJobs url= {axios.defaults.baseURL} />} />
          </Route>

          <Route path="/BIAdd@Logg" element={<AdminLogin />} />
          <Route path="/BIAddAdminAccess" element={<AdminAccess />} />
          <Route path="/BIAdd@Gmail" element={<SearchParams/>} />
          <Route path="/BIAdd@GmailEmp" element={<SearchParamsEmp/>} />
          <Route path="/BIAdd@Gmaill" element={<SearchParamsDub/>} />
          <Route path="/BIAdd@Gmaile" element={<SearchParamsDubEmp/>} />
          <Route path="/BIAddmin@Profile" element={<AdminProfile />} />
          <Route path="/BIAddmin@AllJobs" element={<AllJobsForAdmin />} />
          <Route path="/BIAddmin@AllJobSeekers" element={<AllJobSeekers />} />
          <Route path="/BIAddmin@AllEmployees" element={<AllEmployees />} />
          <Route path="/BIAddmin@CheckEmpProfile/:CP" element={<CheckEmpProfileForAdmin />} />
          <Route path="/BIAddmin@CheckStudentProfile/:CP" element={<CheckStudentProfileForAdmin />} />
          <Route path="/BIAddmin@AdminUpdate" element ={<AdminUpdate/>} />
          <Route path="/BIAddmin@PostJob" element={<AdminPostJobs/>} />
          <Route path="/BIAddmin@AllIds" element={<AllIds/>} />
          <Route path="/JobSeekerLogin" element={<StudentLogin />} />
          <Route path="/EmployeeLogin" element={<EmployeeLogin />} />
          <Route path="/JobSeekerSignUp" element={<StudentSignUp />} />
          <Route path="/EmployeeSignUp" element={<EmployeeSignUp />} />
          <Route path="/JobDetails/:id" element={<Jobdetails />} />
          <Route path="/CheckEmpHalfProfile/:empId" element={<CheckEmpHalfProfile />} />

          <Route path="Search-Candidate-Home" element={<SearchCandHome url= {axios.defaults.baseURL} />} />

<Route path="/payment" element ={<Payment/>} />

<Route path ="/AboutUs" element = {<AboutUs/>} />
<Route path ="/Services" element = {<Services/>} />
<Route path ="/Contact" element = {<Contact/>} />
<Route path ="/TermsAndCondition" element = {<TermsAndCondition/>} />

<Route path ="*" element = { <h2 style={{marginLeft:"43%", marginTop:"10%", color:" rgb(40, 4, 99)"}}>Page Not Found</h2> }/>

        </Routes>

        <Footer />        

      </BrowserRouter>
    </>
  )
}

export default App

