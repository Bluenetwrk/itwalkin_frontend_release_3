import React from 'react'
import styles from "./Allobs.module.css"
import { useEffect, useState } from 'react'
import axios from "axios";
import Footer from '../Footer/Footer';
import { Link, useNavigate, useParams } from "react-router-dom";
import { TailSpin, Puff } from "react-loader-spinner"
import location from "../img/icons8-location-20.png" 
import Swal from "sweetalert2";
import Styles from "./myPostedjobs.module.css"
import graduation from "../img/icons8-graduation-cap-40.png"
import useScreenSize from '../SizeHook';
import Arrowimage from '../img/icons8-arrow-left-48.png'
import profileDp from "../img/user_3177440.png"
import "./Allobs.module.css"
import HTMLReactParser from 'html-react-parser'
import Down from '../img/icons8-down-button-24.png'
import Up from '../img/icons8-arrow-button-24.png'
import CompanyLogo from '../img/company-logo.png'

function Jobdetails() {
  const [jobs, setJobs] = useState([])
  // console.log("jobs are in ", jobs)
  const [jobdescription, setjobdescription] = useState([])
  const [jobseekerid, setjobSeekerId] = useState([])
  const [isReadMore, setIsReadMore] = useState(true)
const screenSize = useScreenSize();
const [Loader, setLoader] = useState(false)
const[JobSeekerLogin,setJobSeekerLogin]=useState(false);

  const [clickedJobId, setclickedJobId] = useState() //for single job loader
  let jobSeekerId = JSON.parse(localStorage.getItem("StudId"))
  let empId = JSON.parse(localStorage.getItem("EmpIdG"))



  const navigate = useNavigate()

  let params = useParams();

  async function getjobs() {
    window.scrollTo({
      top:0,
      // behavior:"smooth"
    })
    const headers = { authorization: 'BlueItImpulseWalkinIn'};
    await axios.get(`/jobpost/getjobs/${atob(params.id)}`, {headers})
      .then((res) => {
        let result = (res.data)
        console.log(result)
        setJobs(result)
        setjobdescription(result.jobDescription)
        setjobSeekerId(result.jobSeekerId)
      })
  }

  useEffect(() => {
    getjobs()
  }, [])
  function showless() {
    navigate(-1)
  }

   useEffect(() => {
      let studentAuth = localStorage.getItem("StudLog")
      if (studentAuth) {
        setJobSeekerLogin(true)
      }
    }, [])

  async function applyforJobasjobseeker(id,link) {
    if(JobSeekerLogin)
      window.open(`${link}`)
    else
     navigate("/JobSeekerLogin", { state: { Jid: id } })
   
  }

  async function applyforOtherJob(Link) {
    // navigate("/JobSeekerLogin", { state: { Jid: id } })
    window.open(`${Link}`)
  }

  // .................delete function............
  async function deletejob(deleteid) {
    Swal.fire({
      title: 'Are you sure?',
      // icon: 'warning',
      width:"260",
      // position:"top",
      customClass:{
        popup:"alertIcon"
      },
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'delete!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/jobpost/deleteProduct/${deleteid}`)
          .then((res) => {
            navigate("/postedjobs")
            // getjobs()
          })
          .catch((err) => { alert("server error occured") })
      }
    })
  }
  
  function update(id) {
    navigate("/Updatepostedjobs", { state: { getId: id } })
  }


  async function applyforJob(jobId) {

    setclickedJobId(jobId)
    setLoader(true)
    setTimeout(async () => {

      await axios.put(`/jobpost/updatforJobApply/${jobId}`, { jobSeekerId })
        .then((res) => {
          setLoader(false)
          getjobs()

        }).catch((err) => {
          alert("server issue occured", err)
        })
    }, 1000)
  }

  function goUp(){
    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
  }
  function goDown(){
    window.scrollTo(50,5000000)

    }
  return (
    <>
     

    {/* <div class={styles.jobdetailBtnContainer} style={{display:"flex"}}> */}
      {/* <button class={styles.jobdetailBackBtn} onClick={()=>{navigate(-1)}}>Back</button> */}
      
                            {/* <img style={{ height:"25px", color:"grey", marginTop:"20px", marginLeft:"8%", cursor:"pointer",
             width:"28px"}} onClick={()=>{navigate(-1)}}  src={Arrowimage} /> */}
    {/* <p style={{marginLeft:"30%"}}><b>Full Job Description</b></p> */}
    {/* </div> */}

      {screenSize.width>850 ?

        <>
        <img style={{marginLeft:"50%", height: "30px"}}  onClick={()=>{goDown()}} src={Down}/>
        <div class={styles.jobDetailContainer}>

        <div class={styles.jobdetailBtnContainer} style={{display:"flex"}}>
           <button class={styles.jobdetailBackBtn} onClick={()=>{navigate(-1)}}>Back</button>
           <button class={styles.jobdetailApplyBtn} onClick={()=>applyforJobasjobseeker(jobs._id,jobs.SourceLink)}>Apply</button>
        </div>
        <div class={styles.jobDetailsHeading}>
             <div class={styles.jobDetailsImage}>
            {/* <img className={styles.imageV} src={jobs.Logo?jobs.Logo : profileDp}/> */}
            {/* {console.log("jobs",jobs)} */}
              <img className={styles.jobDetailImage} src={CompanyLogo} />
            </div>
          
          
<div class={styles.jobDetailsPosterDesc}>
<h1 style={{textAlign:"center", fontSize:"xx-large"}}>{jobs?.jobTitle?jobs.jobTitle.charAt(0).toUpperCase()+jobs.jobTitle.substring(1):"Loading...."}</h1>
<div style={{marginLeft:"30px"}}>
  <span>Posted by : {jobs.companyName}</span> &nbsp;|  
  &nbsp; <span> Posted on : {new Date(jobs.createdAt).toLocaleString(
                  "en-US",
                  {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  }
                )}</span> &nbsp; |
  &nbsp; <span>Experience : {jobs.experiance}</span> &nbsp;|  
  &nbsp; <span>Location : {jobs.jobLocation}</span>&nbsp; |  
  &nbsp; <span>Job Type : {jobs.jobtype}</span>&nbsp; |  
  &nbsp; <span>Qualification : {jobs.qualification}</span>&nbsp; |  
  &nbsp; <span>Salary : {jobs.salaryRange}</span> 
  
  
<p>Skills : {jobs.skills} </p>
</div>
</div>
</div>


  <table className={styles.tableDesWrapper} style={{marginLeft:"6px", marginTop:"-40px", flexWrap:"wrap", width:"98.8%", borderCollapse: "collapse",border:"none"}}>         
  
  <tr style={{border:"none"}}>
    <td colSpan={2} style={{border:"none"}}>
    {
      jobdescription? HTMLReactParser(jobdescription.toString()) :""
     } 
    </td>

  </tr>
  </table>
  </div>
  <img style={{height:"30px",marginLeft:"50%",marginBottom:"50px"}}  onClick={()=>{goUp()}} src={Up}/> 
  
          </>
          :
          <>
    <div id={styles.JobCardWrapper} >


              <>
              <div style={{display:"flex",marginTop:"25px"}}>
              <button class={styles.jobdetailBackBtn} onClick={()=>{navigate(-1)}}>Back</button>
              <img style={{marginLeft:"25%", marginTop:"0px", height:"24px"}}  onClick={()=>{goDown()}} src={Down}/>
              </div>
                <div className={styles.JobCard} >
                <p className={styles.readPageDate}>{new Date(jobs.createdAt).toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        )} </p>
                <div className={styles.JobTitleDateWrapper} style={{marginTop: "-20px"}}>
        <p style={{ width:"100%" ,whiteSpace:"normal", marginRight: "5px" }}className={styles.jobTitle} >{jobs?.jobTitle?jobs.jobTitle.charAt(0).toUpperCase()+jobs.jobTitle.substring(1):"Loading..."}</p>
        {/* <p className={styles.Date}>{new Date(jobs.createdAt).toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        )} </p> */}
        </div>

        <div className={styles.JobPagecompanyNameLocationWrapper}   >
          {/* <img className={styles.logo} src={jobs.Logo} /> */}
          <img className={styles.jobDetailImageMobile} src={CompanyLogo} />
          <div class={styles.jobDetailTitleCompanyName} style={{marginLeft: "5px"}}>
          {!jobs.Source ?

          <span className={styles.companyName} >{jobs.companyName}  </span> 
          :
  <> <a style={{ fontSize:"18px"}}className={`${styles.skills}`} href={jobs.SourceLink} target="_blank">{jobs.Source}</a><br></br> </>


}  
</div>

        </div>
        <  img className={styles.jobLocationImage} src={location}  /> 
        <span className={styles.jobLocation}>{jobs.jobLocation}</span>                        
        <span className={styles.qualificationAndExperiance}>
        <  img className={styles.graduationImage} src={graduation}  /> 

          {jobs.qualification},   {jobs.experiance}Y Exp, {jobs.jobtype}
        {/* <span className={styles.jobtypeAndDate}> {job.jobtype}</span> */}
        </span><br></br> 
        <span className={styles.jobtypeAndDate}>Source</span> :

{jobs.Source ?
  <> <a className={`${styles.skills}`} href={jobs.SourceLink} target="_blank">{jobs.Source}</a><br></br> </>
  :
  <> <span className={styles.skills}>ItWalkin</span><br></br></>
}

<div className={styles.skillWrapper}>
          <span className={styles.skillsHeading}>Skills: </span><span className={styles.skills}>{jobs.skills}</span><br></br>
        </div>

            
            <div className={styles.ApplyPackage}>
            <p className={styles.salaryRange}><span>&#8377;</span>{jobs.salaryRange}L</p>        


            {
    jobSeekerId?
(
            jobseekerid.find((jobseeker) => {
  return (
    jobseeker == jobSeekerId
  )
}) ?
  <button className={styles.MobileAppliedButton}  > Applied <span style={{ fontSize: '13.8px', marginBottom:"3px", marginLeft:"2px" }}>&#10004;</span></button>
  
  // job .isApproved?

    :
  // <button className={styles.ApplyMobile} onClick={() => { applyforJob(jobs._id) }}>Apply
  <button className={styles.ApplyMobile} onClick={()=>applyforJobasjobseeker(jobs._id,jobs.SourceLink)}>Apply
    <span className={styles.Loader} >{Loader && jobs._id == clickedJobId ?
      <TailSpin color="white" height={20} />
      : ""}</span></button>
)
      :
      empId?

  // <div className={styles.ApplyPackage}>
  //      <span className={styles.salaryRange} style={{ marginLeft: "10px" }}><span>&#8377;</span>{job.salaryRange}</span>
          <div className={Styles.MobileAcbuttons}>
          <button style={{marginTop:"-10px"}} onClick={() => { update(jobs._id) }} className={` ${Styles.MobileUpdate}`}>update</button>
          <button style={{marginTop:"-10px"}} onClick={() => { deletejob(jobs._id) }} className={` ${Styles.MobileDelete}`}>delete</button>
               </div>
        // </div>
        :  jobs.SourceLink?
        <button  className={styles.ApplyMobile} onClick={() =>
          applyforJobasjobseeker(jobs._id,jobs.SourceLink)}>Apply</button>
          :
      <button className={styles.ApplyMobile} onClick={() => { navigate("/JobSeekerLogin") }}><b>Apply</b></button>
      


}
                  </div>
            <p className={styles.jobDescriptionHeading}>Job Description:</p>
            <p className={styles.jobDescription}> 
            { 
    jobdescription? HTMLReactParser(jobdescription.toString()) :""
            }
            
               </p>
                </div>
              </>

            </div>
            <img style={{height:"24px",marginLeft:"45%",marginBottom:"40px"}}  onClick={()=>{goUp()}} src={Up}/>
          </>


              }
                          
        </>

  )
}

      export default Jobdetails