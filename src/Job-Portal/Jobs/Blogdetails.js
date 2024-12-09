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

function Jobdetails() {
  const [jobs, setJobs] = useState([])
  // console.log("jobs are in ", jobs)
  const [jobdescription, setjobdescription] = useState([])
  const [jobseekerid, setjobSeekerId] = useState([])
  const [isReadMore, setIsReadMore] = useState(true)
const screenSize = useScreenSize();
const [Loader, setLoader] = useState(false)

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
    await axios.get(`/BlogRoutes/getjobs/${atob(params.id)}`, {headers})
      .then((res) => {
        let result = (res.data)
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

  return (
    <>
    <tr>
    <td colSpan={2} style={{backgroundColor:" rgb(40, 4, 99)"}}>
    <div style={{textAlign:"center", color:"white", fontWeight:"550"}}>Blog Description</div>
    </td>
  </tr>
    <div style={{display:"flex"}}>
                            <img style={{ height:"25px", color:"grey", marginTop:"20px", marginLeft:"8%", cursor:"pointer",
             width:"28px"}} onClick={()=>{navigate(-1)}}  src={Arrowimage} />
    {/* <p style={{marginLeft:"30%"}}><b>Full Job Description</b></p> */}
    </div>

      {screenSize.width>850 ?

        <>
    <div style={{display:"flex"}}>

        <div style={{marginTop:"20px", marginLeft:"30px"}}>
        <img className={styles.imageV} src={jobs.Logo?jobs.Logo : profileDp}/>
        
        </div>
        <div>
          
          <table>
          <tr>
    <td colSpan={2} style={{backgroundColor:" rgb(40, 4, 99)"}}>
    <div style={{textAlign:"center", color:"white", fontWeight:"550"}}>{jobs.jobTitle ? jobs.jobTitle[0].toUpperCase()+jobs.jobTitle.slice(1)
    : <li style={{ display: "inline-block" }}>Blog Title</li>}</div>
    </td>
  </tr>
       
  <tr>
    <th>Company Name</th>
    <td>{jobs.companyName ? jobs.companyName : <li style={{ display: "inline-block" }}>Company name</li>}</td>
  </tr>
  <tr>
    <th>Posted by</th>
    <td>{jobs.name ? jobs.name : <li style={{ display: "inline-block" }}>Name</li>}</td>
  </tr>
  <tr>
    <th>Tags</th>
    <td>{jobs.skills ? jobs.skills : <li style={{ display: "inline-block" }} >Tags</li>}</td>
  </tr>
  <tr>
    <th>Posted Date</th>
    <td>
    {jobs.updatedAt ? new Date(jobs.updatedAt).toLocaleString(
                  "en-US",
                  {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  }
                ) : <li style={{ display: "inline-block" }}>Date</li>
                }
    </td>
  </tr>
  </table>
  </div>
  </div>

  <table style={{marginLeft:"6px", marginTop:"0px", width:"98.8%"}}>
          
  
  <tr >
    <td colSpan={2} >
    {
      jobdescription? HTMLReactParser(jobdescription.toString()) :""
     } 
    </td>

  </tr>
  </table>




          </>
          :
          <>
    <div id={styles.JobCardWrapper} >


              <>
                <div className={styles.JobCard} >
                <div className={styles.JobTitleDateWrapper}>
        <p className={styles.jobTitle} >{jobs.jobTitle}</p>
        <p className={styles.Date}>{new Date(jobs.createdAt).toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        )} </p></div>

        <div className={styles.companyNameLocationWrapper}   >
          <img className={styles.logo} src={jobs.Logo} />
          {!jobs.Source ?

          <span className={styles.companyName} >{jobs.companyName}  </span> 
          :
  <> <a className={`${styles.skills}`} href={jobs.SourceLink} target="_blank">{jobs.Source}</a><br></br> </>


}  

        </div>

        <span className={styles.jobtypeAndDate}>Posted By</span> : {jobs.name ? jobs.name :
         <span >Name</span>}



            
            <p className={styles.jobDescriptionHeading}>Blog Description:</p>
            <p className={styles.jobDescription}> 
            { 
    jobdescription? HTMLReactParser(jobdescription.toString()) :""
            }


            <span onClick={() =>{
              window.scrollTo({
                top:0
              })
               navigate(-1)}} className={styles.showLess}>
                      ...show less
                    </span>
            
               </p>
                </div>
              </>

            </div>

          </>


              }
                          
        </>

  )
}

      export default Jobdetails