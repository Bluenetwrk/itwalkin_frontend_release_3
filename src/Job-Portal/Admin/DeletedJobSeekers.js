

import React from 'react'
import { useEffect, useState } from 'react'
import styles from "./AllJobSeekers.module.css"
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate, BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import useScreenSize from '../SizeHook';

// const [PageLoader, setPageLoader] = useState(false)
// import { Puff } from 'react-loader-spinner'


function ArchivedUser() {
  let navigate = useNavigate()

  useEffect(()=>{
    let adminLogin= localStorage.getItem("SupAdMLog")
        if(!adminLogin){
            navigate("/")
        }
    },[])

  const [jobSeekers , setjobSeekers] = useState([])
  const [Result , setResult] = useState(false)
const screenSize = useScreenSize();

const [message, setmessage] = useState("")

const [currentBox, setcurrentBox] = useState("")

      
  async function getAllJobSeekers() {
    // let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
    // const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
    const headers = { authorization: 'BlueItImpulseWalkinIn' };
    await axios.get("/StudentProfile/getAllArchivedJobseekers", {headers})
      .then((res) => {
        let result = (res.data)
    // console.log(result)
        let sortedate = result.sort(function (a, b) {
          return new Date(a.updatedAt) - new Date(b.updatedAt);
        });
        setjobSeekers(sortedate)  
      })
  }

  useEffect(()=>{
    getAllJobSeekers()
  },[])

  return (
    <>

    {screenSize.width>850?

    <div style={{marginLeft:"7px"}} className={styles.Uiwarpper}>
              <ul className={styles.ul}>
                <li className={`${styles.li} ${styles.name}`}><b>Name</b></li>
                <li className={`${styles.li} ${styles.phoneNumber}`}><b>Phone Number</b></li>
                <li className={`${styles.li} ${styles.age}`}><b>Age</b></li>

                <li className={`${styles.li} ${styles.Aadhar}`}><b>Aadhar</b></li>
                <li className={`${styles.li} ${styles.Pdate}`}><b>Reg. Date</b></li>
                <li className={`${styles.li} ${styles.Pdate}`}><b>Last Log</b></li>
                <li className={`${styles.li} ${styles.Pdate}`}><b>Delete Date</b></li>
                {/* <span style={{display:"block"}}><span onClick={TopToBottonOnline} style={{ fontSize:"20px", cursor:"pointer", marginRight:"20px"}}>&darr;</span>
                                                            <span style={{ fontSize:"20px", cursor:"pointer"}} onClick={BottonToTopOnline}>&uarr;</span></span> */}
                                                            
                <li className={`${styles.li} ${styles.Qualification}`}><b>Qualif.</b></li>
                <li className={`${styles.li} ${styles.Skills}`}><b>Skills </b></li>
                <li className={`${styles.li} ${styles.Approval}`}><b>Approval </b></li>
                <li className={`${styles.li} ${styles.Message}`}>Message</li>


              </ul>
              {
     jobSeekers.length > 0 ?

     jobSeekers.map((items, i) => {

                  return (
<>
                    <ul className={styles.ul}>

                      <li className={`${styles.li} ${styles.name}`} 
    onClick={()=>{navigate(`/BIAddmin@CheckStudentArchived/${items.Archived._id}`)}}><Link style={{color:"blue"}}>
     {items.Archived.name}
      </Link></li>
                <li className={`${styles.li} ${styles.phoneNumber}`}>{items.Archived.phoneNumber?items.Archived.phoneNumber:"not available"}</li>
                <li className={`${styles.li} ${styles.age}`}>{items.Archived.age?items.Archived.age:"not availabel"}</li>

                      <li className={`${styles.li} ${styles.Aadhar}`}> {items.Archived.Aadhar?items.Archived.Aadhar:"No aadhar available"}</li>
                      <li className={`${styles.li} ${styles.Pdate}`}>
                        {new Date(items.Archived.createdAt).toLocaleString(
                          "en-US",
                          {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </li>

                      <li className={`${styles.li} ${styles.Pdate}`}>
      {      items.Archived.LogedInTime?    new Date(items.Archived.LogedInTime).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
    })
    :"Only Reg. Yet"
  }
                  </li>
                      <li className={`${styles.li} ${styles.Pdate}`}>
      {         new Date(items.createdAt).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
    })
    
  }
                  </li>

                      <li className={`${styles.li} ${styles.Qualification}`}>{items.Archived.Qualification?items.Archived.Qualification:"no quali. available"}</li>
                      <li className={`${styles.li} ${styles.Skills}`}>{items.Archived.Skills?items.Archived.Skills:"no kills available"}</li>
                      <li className={`${styles.li} ${styles.Approval}`}>
                        {
                        items.Archived.isApproved?
                  <button className={styles.Approved}>Approved</button>
                    :
                  
                 items.Archived.isReject?
                  <button className={styles.Rejected}>Rejected&#10004;</button>
                  :
          items.Archived.isOnhold ?
                  <button className={styles.OnHold} >OnHold&#10004;</button>
                  :
                  <>
                  <button className={styles.Approve}>Reject</button>
                  <button className={styles.Approve} >Approve</button>

                  <button className={styles.Approve}>Hold</button>
                  </>
                        }
                  </li>
                  
                  <li className={`${styles.li} ${styles.Message}`} >{items.Archived.message?items.Archived.message:"no message was sent"}
                  {/* <textarea style={{height:"50px", width:"80%", marginLeft:"-11px"}} value ={currentBox == items._id ?message:""} onChange={(e)=>{
                     handleChange(e, items._id )}}> </textarea><br></br>
                     <button onClick={()=>{sendMessage(items._id)}}>Send</button> */}

                  </li>

                     
                          </ul>
                          </>
                  )
                })
            : <p style={{ color: "red", marginLeft: "42%" }}>No Record Found</p>


              }


            </div>
            :
            
            <div id={styles.JobCardWrapper} >

            {
     jobSeekers.length > 0 ?

            jobSeekers.map((job, i) => {
              return (
                <>
                  <div className={styles.JobCard} key={i}>
                  <div style={{display:"flex"}}>
        <div className={styles.LeftTable}>
                        <span className={styles.span}>Name :  </span> <br></br>
                        <span className={styles.span}>Age :</span><br></br>
                        <span className={styles.span}> Email Id :</span><br></br>
                        <span className={styles.span}> Phone number :</span><br></br>
                        <span className={styles.span}> Notice Period :</span><br></br>
                        <span className={styles.span}>Qualification :</span><br></br>
                        <span className={styles.span}>Experience : </span><br></br>
                        <span className={styles.span}> Current CTC :</span><br></br>
                        <span className={styles.span}>Expected CTC : </span><br></br>
                        <span className={styles.span}>Registered On : </span><br></br>
                    </div>
            
                    <div className={styles.RightTable}>
                    <span className={styles.span} onClick={()=>{navigate(`/BIAddmin@CheckStudentProfile/${job._id}`)}}><span style={{color:"blue", textDecoration:"underline"}}  >{job.name}</span></span><br></br>      
                    <span className={styles.span}>{job.age? <span style={{ color: "blue" }}>{job.age} </span>:<span style={{color:"red"}}>Not updated</span> }</span><br></br>
                    <span className={styles.span}> {job.email?<span style={{ color: "blue" }}>{job.email} </span>: <span style={{color:"red"}}>Not updated</span>}</span><br></br>
                    <span className={styles.span}> {job.phoneNumber?<span style={{ color: "blue" }}>{job.phoneNumber} </span>: <span style={{color:"red"}}>Not updated</span>}</span><br></br>
                    <span className={styles.span}> {job.NoticePeriod?<span style={{ color: "blue" }}>{job.NoticePeriod} </span>: <span style={{color:"red"}}>Not updated</span>}</span><br></br>
                    <span className={styles.span}> {job.Qualification?<span style={{ color: "blue" }}>{job.Qualification} </span>:<span style={{color:"red"}}>Not updated</span>}</span><br></br>
                    <span className={styles.span}> {job.Experiance?<span style={{ color: "blue" }}>{job.Experiance} </span>:<span style={{color:"red"}}>Not updated</span>}   </span><br></br>
                    <span className={styles.span}>{job.currentCTC?<span style={{ color: "blue" }}>{job.currentCTC} </span>:<span style={{color:"red"}}>Not updated</span>} </span><br></br>
                    <span className={styles.span}> {job.ExpectedSalary?<span style={{ color: "blue" }}>{job.ExpectedSalary} </span>:<span style={{color:"red"}}>Not updated</span>}</span><br></br>          
                    <span className={styles.span} style={{ color: "blue" }}>{new Date(job.createdAt).toLocaleString(
                      "en-US",
                      {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      }
                    )} </span>
                    </div>
            
                  </div>

                  <div className={styles.Down}>
                  <span className={styles.span}> Skills : {job.Skills?<span style={{ color: "blue" }}>{job.Skills} </span>:<span style={{color:"red"}}>Not updated</span>}</span><br></br>
                  <span className={styles.span}> Account Status:  {job.isApproved?
  <button style={{  marginLeft:"20px" }} className={styles.MoApproved} >Approved</button>
  :<button  style={{  marginLeft:"20px" }} className={styles.MoApprove}>Approve</button>}</span><br></br>
  <span className={`${styles.span} ${styles.LastDown}`}> Message:  {job.message ? <span className={styles.span} style={{ color: "blue", marginLeft:"5px" }}  >{job.message} </span> : <span style={{ color: "red", marginLeft:"5px" }} >No message Sent yet</span>}</span><br></br>
                    
                  </div>

      
                  </div>
                </>
              )
            })
            : <p style={{ color: "red", marginLeft: "32%" }}>No Record Found</p>

          }
            
            </div>
            
}
    </>
  )
}


export default ArchivedUser