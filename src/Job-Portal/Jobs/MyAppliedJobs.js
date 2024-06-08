import React from 'react'
import { useEffect, useState } from 'react'
import styles from "./MyAppliedJobs.module.css"
import Swal from "sweetalert2";
import { Puff } from 'react-loader-spinner'
import useScreenSize from '../SizeHook';
import location from "../img/icons8-location-20.png" 
import graduation from "../img/icons8-graduation-cap-40.png"




import axios from "axios";
import { Link, useNavigate, BrowserRouter, Routes, Route, useLocation } from "react-router-dom";


function AppledJobs() {
  let navigate = useNavigate()

  const [MyAppliedjob, setMyAppliedjob] = useState([])
  const [PageLoader, setPageLoader] = useState(false)
  const [NoJobFound, setNoJobFound] = useState("")
const screenSize = useScreenSize();



  let jobSeekerId = JSON.parse(localStorage.getItem("StudId"))


  //   async function getAppliedJob(){   
  //     await axios.get(`http://localhost:8080/jobpost/getAppliedjobs/${ jobSeekerId }`)
  //     .then((res)=>{
  //       console.log("got user",res.data)
  //       // setAppliedUser(res.data)

  //     })
  // }

  // useEffect(()=>{
  //   getAppliedJob()
  // },[])


  async function getjobs() {
    setPageLoader(true)
    setTimeout(async () => {

      await axios.get(`/jobpost/getMyAppliedjobs/${jobSeekerId}`)
        .then((res) => {
          let result = (res.data)
          let sortedate = result.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setMyAppliedjob(sortedate)
          setPageLoader(false)
          if (res.data.length == 0) {
            setNoJobFound("You have not applied any jobs yet")
          }

        }).catch((err) => {
          alert("backend arror occured")
        })
    }, 1000)
  }

  useEffect(() => {
    getjobs()
  }, [])

  async function UndoApply(id) {
    Swal.fire({
      title: 'Are you sure?',
      // icon: 'warning',
      
    width:"260",

      // position:"top",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
            width:"245",
      // position:"top",
      customClass:{
        popup:"alertIcon"
      }
    }).then((result) => {
      if (result.isConfirmed) {

        axios.put(`/jobpost/updatforUndoJobApplied/${id}`, { jobSeekerId })
          .then((res) => {
            getjobs()
          }).catch((err) => {

            alert("server error occured")
          })
      }
    })
  }

  return (
    <>
      <h3 className={styles.h3}>My applied Jobs</h3>
      <h3 className={styles.h3}>you have total {MyAppliedjob.length} applied jobs</h3>
      {screenSize.width>850?
      <div className={styles.Uiwarpper}>
        <ul className={styles.ul}>
          <li className={styles.li}><b>Company Name</b></li>
          <li className={`${styles.li} ${styles.Jtitle}`}><b>Job Title</b></li>
          <li className={`${styles.li} ${styles.JobType}`}><b>JobType</b></li>

          <li className={`${styles.li} ${styles.liDescription}`}><b>Job description</b></li>
          <li className={`${styles.li} ${styles.Pdate}`}><b>Posted Date</b></li>

          <li className={`${styles.li} ${styles.Location}`}><b>Location</b></li>
          <li className={`${styles.li} ${styles.Package}`}><b>Salary /Year </b></li>
          <li className={`${styles.li} ${styles.experiance}`}><b>Exp </b></li>
          <li className={`${styles.li} ${styles.Qualif}`}><b>Qualif </b></li>

          <li className={`${styles.li} ${styles.Skills}`}><b>Skills Required</b></li>
          <li className={`${styles.li} ${styles.DeleteAction}`}><b>Action</b></li>
          <li className={`${styles.li} ${styles.Status}`}><b>Status</b></li>
        </ul>
        {PageLoader ?
          <Puff height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{ marginLeft: "45%", marginTop: "100px" }} />
          : ""
        }
        {
          MyAppliedjob.length > 0 ?

            MyAppliedjob.map((items, i) => {
              return (

                <ul className={styles.ul} key={i}>
                  <li style={{cursor:"pointer", textDecoration:"underline"}} className={styles.li} onClick={() => { navigate(`/CheckEmpHalfProfile/${items.empId}`) }} >{items.Logo ?
                    < img style={{ width: "40%", height: "40px" }} src={items.Logo} />
                    : ""}<br></br>{items.companyName}</li>

                  <li className={`${styles.li} ${styles.Jtitle}`}>{items.jobTitle.toUpperCase()}</li>
                  <li className={`${styles.li} ${styles.JobType}`}>{items.jobtype}</li>

                  <li className={`${styles.li} ${styles.liDescription}`}> 
                  {/* {items.jobDescription.slice(0, 60)}
                   */}
                  {
                    items.jobDescription.map((descrip, di) => {
                      return (
                        <>
                          {
                            // descrip.type == "unordered-list-item" ?
            
                            //   <ul style={{ listStyleType: "disc" }}>
                            //     <li>
                            //       {descrip.text}
            
                            //     </li>
                            //   </ul>            
                            //   : descrip.type == "ordered-list-item" ?
            
                            //     <ol >
                            //       {/* <li> */}
                            //         {descrip.text}
            
                            //       {/* </li> */}
                            //     </ol>
                            //     :
                            //     <>
                            //       {descrip.text}
                            //       <br></br>
                            //     </>   
                            descrip.text.slice(0,50)         
                          }
                        </>
                      )
                    }).slice(0,1)
                    }
                   
                    <span style={{ color: "blue" }} onClick={() => { navigate(`/Jobdetails/${items._id}`) }} >...see more</span>

                  </li>
                  <li className={`${styles.li} ${styles.Pdate}`}>
                    {new Date(items.createdAt).toLocaleString(
                      "en-US",
                      {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      }
                    )}
                  </li>
                  <li className={`${styles.li} ${styles.Location}`}>{items.jobLocation.toUpperCase()}</li>
                  <li className={`${styles.li} ${styles.Package}`}>{items.salaryRange}</li>
                  <li className={`${styles.li} ${styles.experiance}`}>{items.experiance}</li>
                  <li className={`${styles.li} ${styles.Qualif}`}>{items.qualification} </li>

                  <li className={`${styles.li} ${styles.Skills}`}>{items.skills}</li>
                  <li className={`${styles.li} ${styles.DeleteAction}`}>
                    <button className={styles.DeleteButton} onClick={() => { UndoApply(items._id) }}>Delete</button></li>
                  <li className={`${styles.li} ${styles.Status}`}>

                    {items.onHoldJobseker.find((onholdProfile) => {
                      return (
                        onholdProfile == jobSeekerId
                      )
                    }) ? <p style={{ color: "blue" }}>Your Profile is on Hold</p> : 
                    
                      items.slectedJobseker.find((SelectedProfile) => {
                        return (
                          SelectedProfile == jobSeekerId
                        )
                      }) ? <p style={{ color: "rgb(7, 161, 7)" }}>Congrates! Your profile has been selected, HR will get in touch with You very shortly</p>
                    :
                      items.rejectedJobseker.find((rejectProfile) => {
                        return (
                          rejectProfile == jobSeekerId
                        )
                      }) ? <p style={{ color: "red" }}>Sorry! Your profile has not been Selected for this job</p> 
                      : "Your status will be updated here, Once the HR checks Your Profile"
                    }

                  </li>

                </ul>
              )
            })

            : <p style={{ marginLeft: "35%", color: "red" }}> {NoJobFound} </p>


        }


      </div>
      :
      <>
       {PageLoader ?
          <Puff height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{ marginLeft: "37%", marginTop: "100px" }} />
          : ""
        }
      <div id={styles.JobCardWrapper} >

{MyAppliedjob.length>0?
MyAppliedjob.map((job, i) => {
  return (
    <>

      <div className={styles.JobCard} key={i}>
                        
                        <div className={styles.JobTitleDateWrapper}>
        <p className={styles.jobTitle} onClick={() => {
  window.scrollTo({
    top:0
  })
  navigate(`/Jobdetails/${job._id}`)}} >{job.jobTitle.toUpperCase()} </p>                      
        <p className={styles.Date}>{new Date(job.createdAt).toLocaleString(
          "en-US",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        )
        } </p>       

        </div>
        
        {/* <br></br> */}
    
        <div className={styles.companyNameLocationWrapper}  onClick={()=>{navigate(`/CheckEmpHalfProfile/${job.empId}`)}} >
          <img className={styles.logo} src={job.Logo} />
          <span className={styles.companyName} >{job.companyName} </span><br></br>
          </div>
          
        <  img className={styles.jobLocationImage} src={location}  /> 
        <span className={styles.jobLocation}>{job.jobLocation[0].toUpperCase()+job.jobLocation.slice(1)} ,</span>
        <span className={styles.qualificationAndExperiance}>
        
        <  img className={styles.graduationImage} src={graduation}  /> 

          {job.qualification}, {job.experiance} Exp ,   {job.jobtype}
        {/* <span className={styles.jobtypeAndDate}> {job.jobtype}</span> */}
        </span><br></br>
        
        <span className={styles.jobtypeAndDate}>Source</span> :

{job.Source ?
  <> <a className={`${styles.skills}`} href={job.SourceLink} target="_blank">{job.Source}</a><br></br> </>
  :
  <> <span className={styles.skills}>ItWalkin</span><br></br></>
}
                                     
                        <div className={styles.skillWrapper}>
                          <span className={styles.skillsHeading}>Skills: </span><span className={styles.skills}>{job.skills}</span><br></br>
                        </div>

        <div className={styles.ApplyPackage}>
          <h3 style={{ marginLeft: "10px", marginTop:"23px" }}><span>&#8377;</span>{job.salaryRange}</h3>        
          <button className={styles.MobileDelete} onClick={()=>{UndoApply(job._id)}}>Delete</button>
        </div>
        <p className={styles.MobileResult}>Result:</p><span >
        {
                              job.onHoldJobseker.find((onholdProfile)=>{
                                return(
                                  onholdProfile ==jobSeekerId
                                )
                              })?<p style={{color:"blue"}} className={styles.MobileStatus}>HR has put Your Profile on Hold</p>
                              :
                            
                              job.slectedJobseker.find((SelectedProfile)=>{
                                return(
                                  SelectedProfile==jobSeekerId
                                )
                              })?<p style={{color:"rgb(7, 161, 7)"}} className={styles.MobileStatus}>Congrates! Your profile has been selected, HR will get in touch with You very shortly</p>
                              :
                              
                                job.rejectedJobseker.find((rejectProfile)=>{
                                  return(
                                  rejectProfile==jobSeekerId
                                  )
                                })?<p style={{color:"red"}} className={styles.MobileStatus}>Sorry! Your profile has not been Matched for this job</p>
                      : <p className={styles.MobileStatus}>Your Result will be updated here, Once the HR checks Your Profile</p>
                                
                              }
               
           </span>

           <p className={styles.jobDescriptionHeading}>Job Description:</p>
                        <p className={styles.jobDescription}>
                          {/* {job.jobDescription} */}
                        
                          {
                            job.jobDescription.map((descrip, di) => {
                              return (
                                <>                                      
                                         
                              {
                                    // descrip.type == "unordered-list-item" ?

                                      // <ul style={{ listStyleType: "disc" }}>
                                      //   <li style={{ marginTop: "-12px", marginLeft: "-20px" }}>
                                      //     {descrip.text.slice(0,50)}

                                      //   </li>
                                      // </ul>

                                      // : descrip.type == "ordered-list-item" ?

                                      //   <ul style={{ listStyleType: "disc" }} >
                                      //     <li style={{ marginTop: "-12px", marginLeft: "-20px" }}>

                                      //       {descrip.text}

                                      //     </li>
                                      //   </ul>
                                      //   :
                                      //   <>
                                          descrip.text.slice(0,50)
                                      //     <br></br>
                                      //   </>

                                  }
                                 
                                </>
                              )
                            }).slice(0,1)
                          }
<span onClick={() => {
  window.scrollTo({
    top:0
  })
  navigate(`/Jobdetails/${job._id}`)}} style={{ color: "blue" }}>
                          ...read more
                        </span>
                        </p>


                      </div>
                    </>
                  )
                })
: <p style={{marginLeft:"15%", color:"red"}}> You have not applied any jobs yet</p>

}

</div>
      </>
}
    </>
  )
}

export default AppledJobs