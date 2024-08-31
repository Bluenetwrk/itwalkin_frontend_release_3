import React from 'react'
import { useEffect, useState } from 'react'
import styles from "./AllJobSeekers.module.css"
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate, BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import useScreenSize from '../SizeHook';

// const [PageLoader, setPageLoader] = useState(false)
// import { Puff } from 'react-loader-spinner'


function AllJobSeekersAdmin() {
  let navigate = useNavigate()

  useEffect(()=>{
    let adminLogin= localStorage.getItem("AdMLog")
        if(!adminLogin){
            navigate("/")
        }
    },[])    

  const [jobSeekers , setjobSeekers] = useState([])
  const [Result , setResult] = useState(false)
const screenSize = useScreenSize();

const [message, setmessage] = useState("")

const [currentBox, setcurrentBox] = useState("")


  function handleChange(e, id){
   setmessage(e.target.value)
   setcurrentBox(id)
  }
    
async function sendMessage(id){
  await axios.put(`/StudentProfile/sendMessage/${id}`, {message})
  .then((res)=>{
    if(res.data){
    alert("Message Sent Successfully")
    }
  }).catch((err)=>{
    alert("some thing went wrong")
  })
}


      
  async function getAllJobSeekers() {
    let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
    const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
    await axios.get("/StudentProfile/getAllJobseekers", {headers})
      .then((res) => {
        let result = (res.data)
    
        let sortedate = result.sort(function (a, b) {
          return new Date(a.updatedAt) - new Date(b.updatedAt);
        });
        setjobSeekers(sortedate)  
      })
  }

  
  useEffect(() => {
    getAllJobSeekers()
  }, [])

  
  function  Hold(Empid , status){
    let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
    const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
    const isOnhold=status
    Swal.fire({
      title: "Are You sure?",
    // position:"top",
    width:"260",

    customClass:{
      popup:"alertIcon"
    },
      icon:"question",
      showCancelButton:true
    }).then( async (res)=>{
      if(res.isConfirmed){
        await axios.put(`/StudentProfile/isOnhold/${Empid}`,{isOnhold}, {headers})
        .then((res)=>{
    getAllJobSeekers()



        }).catch((err)=>{
          alert("backend error occured")
        })
      }
    })
  }    

  function  unHold(Empid , status){
    const isOnhold=status
    let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
    const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
    Swal.fire({
      title: "Are You sure?",
      // icon:"question",
    // position:"top",
    width:"260",
    customClass:{
      popup:"alertIcon"
    },
      showCancelButton:true
    }).then( async (res)=>{
      if(res.isConfirmed){
        await axios.put(`/StudentProfile/isOnhold/${Empid}`,{isOnhold}, {headers})
        .then((res)=>{
          getAllJobSeekers()

        }).catch((err)=>{
          alert("backend error occured")
        })
      }
    })
  }
  
  function Reject(Empid , status){
    let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
    const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
    const isReject=status
    Swal.fire({
      title: "Are You sure?",
    // position:"top",
    width:"260",

    customClass:{
      popup:"alertIcon"
    },
      icon:"question",
      showCancelButton:true
    }).then( async (res)=>{
      if(res.isConfirmed){
        await axios.put(`/StudentProfile/isReject/${Empid}`,{isReject}, {headers})
        .then((res)=>{

    getAllJobSeekers()

        }).catch((err)=>{
          alert("backend error occured")
        })
      }
    })
  }    

  function unReject(Empid , status){
    const isReject=status
    let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
    const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };

    Swal.fire({
      title: "Are You sure?",
      // icon:"question",
    // position:"top",
    width:"260",

    customClass:{
      popup:"alertIcon"
    },
      showCancelButton:true
    }).then( async (res)=>{
      if(res.isConfirmed){
        await axios.put(`/StudentProfile/isReject/${Empid}`,{isReject}, {headers})
        .then((res)=>{
          getAllJobSeekers()

        }).catch((err)=>{
          alert("backend error occured")
        })
      }
    })
  }
  function Approve(Empid , status){
    let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
    const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
    const isApproved = status
    Swal.fire({
      title: "Are You sure?",
      // icon:"question"
    width:"260",

      customClass:{
        popup:"alertIcon"
      },
      showCancelButton:true
    }).then( async (res)=>{
      if(res.isConfirmed){
        await axios.put(`/StudentProfile/setApproval/${Empid}`,{isApproved}, {headers})
        .then((res)=>{
    getAllJobSeekers()   

        }).catch((err)=>{
          alert("backend error occured")
        })
      }
    })

  }

  function DisApprove(Empid , status){
    let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
    const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
    const isApproved = status
    Swal.fire({
      title: "Are You sure?",
      // icon:"question",

    width:"260",

      // position:"top",
      customClass:{
        popup:"alertIcon"
      },
      showCancelButton:true
    }).then( async (res)=>{
      if(res.isConfirmed){
        await axios.put(`/StudentProfile/setApproval/${Empid}`,{isApproved}, {headers})
        .then((res)=>{
    getAllJobSeekers()

        }).catch((err)=>{
          alert("backend error occured")
        })
      }
    })
  }

    async function DeleteJob(id){
      console.log(id)
      Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {      
       axios.delete(`/StudentProfile/deleteProfile/${id}`)
      .then((res)=>{
        
        getAllJobSeekers()
      }).catch((err)=>{

        alert("server error occured")
      })
    }
  })
    }

    
  
async function AllJoseekerApANdDis() {
  let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
  const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
  await axios.get("/StudentProfile/getAllJobseekers", {headers})

    .then((res) => {
      let result = (res.data)
      console.log(result)
      let sortedate = result.sort(function (a, b) {
        return new Date(a.updatedAt) - new Date(b.updatedAt);
      });
      setjobSeekers(sortedate)
    })
}

async function Approvedjobseekers() {
  let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
  const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
  await axios.get("/StudentProfile/getApprovedStu", {headers})
    .then((res) => {
      let result = (res.data)

      setjobSeekers(result)
    })
    .catch((err) => {
      alert("server issue occured")
    })
}


async function NotApprovedjobseekers() {
  let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
  const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
  await axios.get("/StudentProfile/getNotApprovedStu", {headers})
    .then((res) => {
      let result = (res.data)
      // console.log(result)        
      setjobSeekers(result)
    })
    .catch((err) => {
      alert("server issue occured")
    })
}
    
async function search(e) {
  let key = e.target.value
  if (key) {
    setResult(true)
    let dubmyjobs = [...jobSeekers] 
    const filteredItems = dubmyjobs.filter((user) =>
      JSON.stringify(user).toLowerCase().includes(key.toLowerCase())
    )
    setjobSeekers(filteredItems)
  } else {
    getAllJobSeekers()
    setResult(false)

  }
}

function TopToBottonOnline(){
  const newAllEmployees=[...jobSeekers]
  let sortresult = newAllEmployees.sort((a,b)=>{
    return new Date(b.LogedInTime) - new Date(a.LogedInTime);
  
  })
  setjobSeekers(sortresult)
    }
    function BottonToTopOnline(){
      const newAllEmployees=[...jobSeekers]
      let sortresult = newAllEmployees.sort((a,b)=>{
        return new Date(a.LogedInTime) - new Date(b.LogedInTime);      
      })
      setjobSeekers(sortresult)
        }

  return (
    <>

    <h3 style={{marginLeft:"20px", marginTop:"10px"}}>All JobSeekers for admin</h3>

<div className={styles.searchBoth}>
              <p className={styles.p}>Search </p>
              <input className={styles.inputboxsearch} type="text" placeholder='Search for a Job / Skills / Location/Experiance' onChange={(e) => { search(e) }} />
            </div>
            {Result?
            <h4 style={{marginLeft:"14%", marginTop:"10px"}}> {jobSeekers.length} matching Result Found  </h4>
            :""
}
            <div style={{marginLeft:"10px"}}>
      <label><input id="checkApproved" name="checkApproved" type="radio" onChange={(e)=>{AllJoseekerApANdDis(e)}} /><span>All Joseeker</span></label><br></br>
      <label><input id="checkApproved" name="checkApproved" type="radio" onChange={(e)=>{Approvedjobseekers(e)}} /><span>Approved Joseeker</span></label><br></br>
      <label><input id="checkApproved" name="checkApproved" type="radio" onChange={(e)=>{NotApprovedjobseekers(e)}} /><span>Joseeker who are yet to be approved</span></label><br></br>
      <label><input id="checkApproved" name="checkApproved" type="radio" onChange={BottonToTopOnline} /><span>Recent Login</span></label><br></br>
      </div>

    {screenSize.width>850?

    <div style={{marginLeft:"7px"}} className={styles.Uiwarpper}>
              <ul className={styles.ul}>
                <li className={`${styles.li} ${styles.name}`}><b>Name</b></li>
                <li className={`${styles.li} ${styles.phoneNumber}`}><b>Phone Number</b></li>
                <li className={`${styles.li} ${styles.age}`}><b>Age</b></li>

                <li className={`${styles.li} ${styles.Aadhar}`}><b>Aadhar</b></li>
                <li className={`${styles.li} ${styles.Pdate}`}><b>Reg. Date</b></li>
                <li className={`${styles.li} ${styles.Pdate}`}><b>Last Log</b>
                <span style={{display:"block"}}><span onClick={TopToBottonOnline} style={{ fontSize:"20px", cursor:"pointer", marginRight:"20px"}}>&darr;</span>
                                                            <span style={{ fontSize:"20px", cursor:"pointer"}} onClick={BottonToTopOnline}>&uarr;</span></span></li>
                <li className={`${styles.li} ${styles.Qualification}`}><b>Qualif.</b></li>
                <li className={`${styles.li} ${styles.Skills}`}><b>Skills </b></li>
                <li className={`${styles.li} ${styles.Approval}`}><b>Approval </b></li>
                <li className={`${styles.li} ${styles.Message}`}>Message</li>


              </ul>
              {
     jobSeekers.length > 0 ?

     jobSeekers.map((items, i) => {
                  return (

                    <ul className={styles.ul}>

                      <li className={`${styles.li} ${styles.name}`} onClick={()=>{navigate(`/BIAddmin@CheckStudentProfile/${items._id}`)}}><Link style={{color:"blue"}}>{items.name}</Link></li>
                <li className={`${styles.li} ${styles.phoneNumber}`}>{items.phoneNumber}</li>
                <li className={`${styles.li} ${styles.age}`}>{items.age}</li>

                      <li className={`${styles.li} ${styles.Aadhar}`}> {items.Aadhar}</li>
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

                      <li className={`${styles.li} ${styles.Pdate}`}>
      {      items.LogedInTime?    new Date(items.LogedInTime).toLocaleString('en-US', {
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

                      <li className={`${styles.li} ${styles.Qualification}`}>{items.Qualification}</li>
                      <li className={`${styles.li} ${styles.Skills}`}>{items.Skills}</li>
                      <li className={`${styles.li} ${styles.Approval}`}>
                        {
                        items.isApproved?
                  <button className={styles.Approved} onClick={()=>{DisApprove(items._id, false)}}>Approved</button>
                    :
                  
                 items.isReject?
                  <button className={styles.Rejected} onClick={()=>{unReject(items._id, false)}}>Rejected&#10004;</button>
                  :
          items.isOnhold ?
                  <button className={styles.OnHold} onClick={()=>{unHold(items._id, false)}}>OnHold&#10004;</button>
                  :
                  <>
                  <button className={styles.Approve} onClick={()=>{Reject(items._id, true)}}>Reject</button>
                  <button className={styles.Approve} onClick={()=>{Approve(items._id, true)}}>Approve</button>

                  <button className={styles.Approve} onClick={()=>{Hold(items._id, true)}}>Hold</button>
                  </>
                        }
                  </li>
                  
                  <li className={`${styles.li} ${styles.Message}`} >{items.message}
                  {/* <textarea style={{height:"50px", width:"80%", marginLeft:"-11px"}} value ={currentBox == items._id ?message:""} onChange={(e)=>{
                     handleChange(e, items._id )}}> </textarea><br></br>
                     <button onClick={()=>{sendMessage(items._id)}}>Send</button> */}

                  </li>

                     
                          </ul>
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
  <button style={{  marginLeft:"20px" }} className={styles.MoApproved} onClick={()=>{DisApprove(job._id, false)}}>Approved</button>
  :<button  style={{  marginLeft:"20px" }} className={styles.MoApprove} onClick={()=>{Approve(job._id, true)}}>Approve</button>}</span><br></br>
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


export default AllJobSeekersAdmin