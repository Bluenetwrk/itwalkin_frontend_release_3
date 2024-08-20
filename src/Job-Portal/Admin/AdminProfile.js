import React from 'react'
import { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import styles from "./AdminProfile.module.css"
import useScreenSize from '../SizeHook';

function AdminProfile() {
  const screenSize = useScreenSize();

  const [jobs , setJobs] = useState([])
  const [employees , setemployees] = useState([])
  const [Approvedemployees , setApprovedemployees] = useState([])
  const [NotApprovedemployees , setNotApprovedemployees] = useState([])
  const [jobSeekers , setjobSeekers] = useState([])
  const [ApprovedjobSeekers , setApprovedjobSeekers] = useState([])
  const [NotApprovedjobSeekers , setNotApprovedjobSeekers] = useState([])
  const [TodayRegEmp , setTodayRegEmp] = useState([])
  const [TodayRegJobSeeker , setTodayRegJobSeeker] = useState([])
  const [TodayPostedJobs , setTodayPostedJobs] = useState([])
  const [LessNoticePeriod , setLessNoticePeriod] = useState([])
  const [FirmOrganisation , setFirmOrganisation] = useState([])
  const [PvtLtdOrganisation , setPvtLtdOrganisation] = useState([])
  const [ConsultancyOrganisation , setConsultancyOrganisation] = useState([])

    let navigate = useNavigate()

    useEffect(()=>{
    let adminLogin= localStorage.getItem("AdMLog")
        if(!adminLogin){
            navigate("/")
        }
    },[])

    async function getAlljobs() {
      let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
      const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
      await axios.get("/jobpost/getjobs",{headers})
        .then((res) => {
          let result = (res.data)
          let sortedate = result.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setJobs(sortedate)  
        })
        .catch((err)=>{
          alert("server issue occured")
        })
    }
  
    useEffect(() => {
      getAlljobs()
    }, [])

    async function toDayPostedJobs() {
      let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
      const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
      await axios.get(`/jobpost/getTodayPostedJobs`, {headers})
        .then((res) => {
          let result = (res.data)
          // console.log("todays date ",result)
          setTodayPostedJobs(result)          
        })
        .catch((err)=>{
          alert("server issue occured")
        })
    }
  
    useEffect(() => {
      toDayPostedJobs()
    }, [])

    async function getAllEmployees() {
      let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
      const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
      await axios.get("/EmpProfile/getAllEmployees",{headers})
        .then((res) => {
          let result = (res.data)
          let sortedate = result.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setemployees(sortedate)  
        })
        .catch((err)=>{
          alert("server issue occured")
        })
    }
  
    useEffect(() => {
      getAllEmployees()
    }, [])


    async function ApprovedEmployees() {
      let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
      const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
      
      await axios.get("/EmpProfile/getApprovedEmp", {headers})
        .then((res) => {
          let result = (res.data)        
          setApprovedemployees(result)  
        })
        .catch((err)=>{
          alert("server issue occured")
        })
    }
  
    useEffect(() => {
      ApprovedEmployees()
    }, [])

    
    async function NotApprovedEmployees() {
      let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
      const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
      await axios.get("/EmpProfile/getNotApprovedEmp", {headers})
        .then((res) => {
          let result = (res.data)
        
          setNotApprovedemployees(result)  
        })
        .catch((err)=>{
          alert("server issue occured")
        })
    }
  
    useEffect(() => {
      NotApprovedEmployees()
    }, [])

    async function toDayRegEmployees() {
      let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
      const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
      await axios.get(`/EmpProfile/getTodaysEmpProfile`, {headers})
        .then((res) => {
          let result = (res.data)
          // console.log("todays date ",result)
          setTodayRegEmp(result)          
        })
        .catch((err)=>{
          alert("server issue occured")
        })
    }
  
    useEffect(() => {
      toDayRegEmployees()
    }, [])

    async function getFirmOrganisation() {
      let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
      const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
      
      await axios.get(`/EmpProfile/getFirmOrganisation`, {headers})
        .then((res) => {
          let result = (res.data)
          // console.log("todays date ",result)
          setFirmOrganisation(result)          
        })
        .catch((err)=>{
          alert("server issue occured")
        })
    }
  
    useEffect(() => {
      getFirmOrganisation()
    }, [])

    async function getPvtLtdOrganisation() {
      let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
      const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
      await axios.get(`/EmpProfile/getPvt.Ltd.Organisation`, {headers})
        .then((res) => {
          let result = (res.data)
          // console.log("todays date ",result)
          setPvtLtdOrganisation(result)          
        })
        .catch((err)=>{
          alert("server issue occured")
        })
    }
  
    useEffect(() => {
      getPvtLtdOrganisation()
    }, [])

    async function getConsultancyOrganisation() {
      let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
      const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
      await axios.get(`/EmpProfile/getConsultancyOrganisation`,{headers})
        .then((res) => {
          let result = (res.data)
          // console.log("todays date ",result)
          setConsultancyOrganisation(result)          
        })
        .catch((err)=>{
          alert("server issue occured")
        })
    }
  
    useEffect(() => {
      getConsultancyOrganisation()
    }, [])

// Job Seekers.....Job Seekers.....Job Seekers.....

    async function getAllJobSeekers() {
      let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
      const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
      await axios.get("/StudentProfile/getAllJobseekers", {headers})
        .then((res) => {
          let result = (res.data)
          let sortedate = result.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setjobSeekers(sortedate)  
        })
        .catch((err)=>{
          alert("server issue occured")
        })
    }
  
    useEffect(() => {
      getAllJobSeekers()
    }, [])

    async function Approvedjobseekers() {
      await axios.get("/StudentProfile/getApprovedStu")
        .then((res) => {
          let result = (res.data)
        
          setApprovedjobSeekers(result)  
        })
        .catch((err)=>{
          alert("server issue occured")
        })
    }
  
    useEffect(() => {
      Approvedjobseekers()
    }, [])

    
    async function NotApprovedjobseekers() {
      let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
      const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
      await axios.get("/StudentProfile/getNotApprovedStu", [headers])
        .then((res) => {
          let result = (res.data)
          // console.log(result)        
          setNotApprovedjobSeekers(result)  
        })
        .catch((err)=>{
          alert("server issue occured")
        })
    }
  
    useEffect(() => {
      NotApprovedjobseekers()
    }, [])

    async function todayRegisteredJobSeeker() {
      let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
      const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
      await axios.get("/StudentProfile/getTodayStuProfile", {headers})
        .then((res) => {
          let result = (res.data)
          // console.log(result)        
          setTodayRegJobSeeker(result)  
        })
        .catch((err)=>{
          alert("server issue occured")
        })
    }
  
    useEffect(() => {
      todayRegisteredJobSeeker()
    }, [])
    
    async function JobSeekerNoticePeriod() {
      let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
      const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
      await axios.get("/StudentProfile/getNoticePeriod", {headers})
        .then((res) => {
          let result = (res.data)
          // console.log(result)        
          setLessNoticePeriod(result)  
        })
        .catch((err)=>{
          alert("server issue occured")
        })
    }
  
    useEffect(() => {
      JobSeekerNoticePeriod()
    }, [])
    
  return (
    <>

    <h2>Admin Profile</h2>
    {screenSize.width>850?

    <div style={{display:"flex"}} >
      <ul className={styles.RUi}>
        <li className={styles.Rli}>Total jobs  </li>
        <li className={styles.Rli}>Total Jobs Which have been posted today</li>
        <li className={styles.Rli}>Total Employers</li>
        <li className={styles.Rli}>Total Job Seekers</li>
        <li className={styles.Rli}>Total Approved Employers</li>
        <li className={styles.Rli}>Total Approved Job Seekers</li>
        <li className={styles.Rli}>Total Employers which are not Approved</li>
        <li className={styles.Rli}>Total Job Seekers which are not Approved</li>
        <li className={styles.Rli}>Total Employers who have Registered today</li>
        <li className={styles.Rli}>Total Job Seekers who have Registered today</li>
        <li className={styles.Rli}>Total Job Seekers Who have less than 20 days Notice Period</li>
        <li className={styles.Rli}>Total Firm Organisation</li>
        <li className={styles.Rli}>Total Pvt.Ltd. Organisation</li>
        <li className={styles.Rli}>Total Consultancy Organisation</li>

      </ul>
      {/* ............................................................................. */}
      <ul className={styles.Lui}>
      <li className={styles.Lli}>{jobs.length}</li>
      <li className={styles.Lli}>{TodayPostedJobs.length}</li>
      <li className={styles.Lli}>{employees.length}</li>
      <li className={styles.Lli}>{jobSeekers.length}</li>
      <li className={styles.Lli}>{Approvedemployees.length}</li>
      <li className={styles.Lli}>{ApprovedjobSeekers.length}</li>
      <li className={styles.Lli}>{NotApprovedemployees.length}</li>
      <li className={styles.Lli}>{NotApprovedjobSeekers.length}</li>
      <li className={styles.Lli}>{TodayRegEmp.length}</li>
      <li className={styles.Lli}>{TodayRegJobSeeker.length}</li>
      <li className={styles.Lli}>{LessNoticePeriod.length}</li>
      <li className={styles.Lli}>{FirmOrganisation.length}</li>
      <li className={styles.Lli}>{PvtLtdOrganisation.length}</li>
      <li className={styles.Lli}>{ConsultancyOrganisation.length}</li>
      </ul>
    </div>
    :
    <>
    <div style={{marginLeft:"15px"}}>
          <p>Total jobs <span style={{ color: "blue" }}>{jobs.length} </span></p>
          <p>Total Jobs Which have been posted today <span style={{ color: "blue" }}>{TodayPostedJobs.length} </span></p>
          <p>Total Employers <span style={{ color: "blue" }}>{employees.length} </span></p>
          <p> Total Job Seekers <span style={{ color: "blue" }}>{jobSeekers.length} </span></p>
          <p>  Total Approved Employers <span style={{ color: "blue" }}>{Approvedemployees.length} </span></p>
          <p>  Total Approved Job Seekers <span style={{ color: "blue" }}>{ApprovedjobSeekers.length} </span></p>
          <p>Total Employers which are not Approved <span style={{ color: "blue" }}>{NotApprovedemployees.length} </span></p>
          <p>Total Job Seekers which are not Approved <span style={{ color: "blue" }}>{NotApprovedjobSeekers.length} </span></p>
          <p>Total Employers who have Registered today <span style={{ color: "blue" }}>{TodayRegEmp.length} </span></p>
          <p>Total Job Seekers who have Registered today <span style={{ color: "blue" }}>{TodayRegJobSeeker.length} </span></p>
          <p>Total Job Seekers Who have less than 20days Notice Period <span style={{ color: "blue" }}>{LessNoticePeriod.length} </span></p>
          <p>Total Firm Organisation <span style={{ color: "blue" }}>{FirmOrganisation.length} </span></p>
          <p>Total Pvt.Ltd. Organisation <span style={{ color: "blue" }}>{PvtLtdOrganisation.length} </span></p>
          <p>Total Consultancy Organisation <span style={{ color: "blue" }}>{ConsultancyOrganisation.length} </span></p>
          </div>
    </>
   
    }
    </>
  )
}

export default AdminProfile