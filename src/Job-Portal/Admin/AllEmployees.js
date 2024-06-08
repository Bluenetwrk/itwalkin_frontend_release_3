import React from 'react'
import { useEffect, useState } from 'react'
import styles from "./AllEmployees.module.css"
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate, BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import useScreenSize from '../SizeHook';

function AllEmployeesForadmin() {
  let navigate = useNavigate()
  
  useEffect(()=>{
    let adminLogin= localStorage.getItem("AdMLog")
        if(!adminLogin){
            navigate("/")
        }
    },[])
 

  const [AllEmployees, setAllEmployees] = useState([])
  const [Result, setResult] = useState(false)
const screenSize = useScreenSize();
const [currentBox, setcurrentBox] = useState("")


  function handleChange(e, id){
   setmessage(e.target.value)
   setcurrentBox(id)
  }


  
const [message, setmessage] = useState("")
    
async function sendMessage(id){
  await axios.put(`/EmpProfile/sendMessage/${id}`, {message})
  .then((res)=>{
    if(res.data){
    alert("Message Sent Successfully")
    }
  }).catch((err)=>{
    alert("some thing went wrong")
  })
}



  async function getEmployees() {
    await axios.get("/EmpProfile/getAllEmployees")
      .then((res) => {
        let result = (res.data)
        // console.log(result.message)
        setmessage(result.message)
        
        let sortedate = result.sort(function (a, b) {
          return new Date(a.updatedAt) - new Date(b.updatedAt);
        });
        setAllEmployees(sortedate)
      })
  }

  useEffect(() => {
    getEmployees()
  }, [])


  function  Hold(Empid , status){
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
        await axios.put(`/EmpProfile/isOnhold/${Empid}`,{isOnhold})
        .then((res)=>{
          getEmployees()


        }).catch((err)=>{
          alert("backend error occured")
        })
      }
    })
  }    

  function  unHold(Empid , status){
    const isOnhold=status

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
        await axios.put(`/EmpProfile/isOnhold/${Empid}`,{isOnhold})
        .then((res)=>{

    getEmployees()
        }).catch((err)=>{
          alert("backend error occured")
        })
      }
    })
  }


  
  function Reject(Empid , status){
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
        await axios.put(`/EmpProfile/isReject/${Empid}`,{isReject})
        .then((res)=>{
          getEmployees()


        }).catch((err)=>{
          alert("backend error occured")
        })
      }
    })
  }    

  function unReject(Empid , status){
    const isReject=status

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
        await axios.put(`/EmpProfile/isReject/${Empid}`,{isReject})
        .then((res)=>{

    getEmployees()
        }).catch((err)=>{
          alert("backend error occured")
        })
      }
    })
  }



   function Approve(Empid , status){
    const isApproved=status
    Swal.fire({
      title: "Are You sure ?",
      // position:"top",
      width:"260",

      customClass:{
        popup:"alertIcon"
      },
      // icon:"question",
      showCancelButton:true
    }).then( async (res)=>{
      if(res.isConfirmed){
        await axios.put(`/EmpProfile/setApproval/${Empid}`,{isApproved})
        .then((res)=>{
    getEmployees()

        }).catch((err)=>{
          alert("backend error occured")
        })
      }
    })
  }


  function DisApprove(Empid , status){
    const isApproved=status

    Swal.fire({
      title: "Are You sure?",
      // position:"top",
      width:"260",

      customClass:{
        popup:"alertIcon"
      },
      // icon:"question",
      showCancelButton:true
    }).then( async (res)=>{
      if(res.isConfirmed){
        await axios.put(`/EmpProfile/setApproval/${Empid}`,{isApproved})
        .then((res)=>{
    getEmployees()

        }).catch((err)=>{
          alert("backend error occured")
        })
      }
    })
  }


  async function DeleteJob(id) {
    Swal.fire({
      title: 'Are you sure?',
      width:"260",
      // position:"top",
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'delete!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/EmpProfile/deleteEmployee/${id}`)
          .then((res) => {           
            getEmployees()

          }).catch((err) => {
           alert("server error occured")
          })
      }
    })

  }

  async function AllEmployeesApANdDis() {
    await axios.get("/EmpProfile/getAllEmployees")
      .then((res) => {
        let result = (res.data)
        let sortedate = result.sort(function (a, b) {
          return new Date(a.updatedAt) - new Date(b.updatedAt);
        });
        setAllEmployees(sortedate)
      })
  }



  async function checkAllApproved(e){
    if(e.target.checked){
    await axios.get("/EmpProfile/getApprovedEmp")
    .then((res) => {
      let result = (res.data)
      setAllEmployees(result)  
    })
    .catch((err) => {
      alert("server issue occured")
    })
  }else{
      getEmployees()
    }  
  }
  async function checkAllNotApproved(e){
    if(e.target.checked){
    await axios.get("/EmpProfile/getNotApprovedEmp")

    .then((res) => {
      let result = (res.data)
      setAllEmployees(result)  
    })
    .catch((err) => {
      alert("server issue occured")
    })
  }else{
      getEmployees()
    }  
  }



async function search(e) {
    let key = e.target.value
    if (key) {
      setResult(true)
      let dubmyjobs = [...AllEmployees]

      const filteredItems = dubmyjobs.filter((user) =>
        JSON.stringify(user).toLowerCase().includes(key.toLowerCase())
      )
      setAllEmployees(filteredItems)
    } else {
      getEmployees()
      setResult(false)

    }
  }

  return (
    <>
      

      <h4 style={{marginLeft:"20px", marginTop:"10px"}}>All Employees for admin</h4>
      <div className={styles.searchBoth}>
              <p className={styles.p}>Search </p>
              <input className={styles.inputboxsearch} type="text" placeholder='Search for a Job / Skills / Location/Experiance' onChange={(e) => { search(e) }} />
            </div> 
            {Result?
            <h4 style={{marginLeft:"14%", marginTop:"10px"}}> {AllEmployees.length} matching Result Found  </h4>
            :""
}



<div style={{marginLeft:"10px"}}>
      <label><input id="checkApproved" name="checkApproved" type="radio" onChange={(e)=>{AllEmployeesApANdDis(e)}} /><span>All Employers</span></label><br></br>
      <label><input id="checkApproved" name="checkApproved" type="radio" onChange={(e)=>{checkAllApproved(e)}} /><span>Approved Employers</span></label><br></br>
      <label><input id="checkApproved" name="checkApproved" type="radio" onChange={(e)=>{checkAllNotApproved(e)}} /><span> Employers who are yet to be approved</span></label><br></br>
      </div>
      {screenSize.width>850?

      <div className={styles.Uiwarpper}>
        <ul className={styles.ul}>
          <li className={`${styles.li} ${styles.Name}`}><b>Emp. Name</b></li>
          <li className={`${styles.li} ${styles.phoneNumber}`}><b>Emp. Phone Number</b></li>

          <li className={`${styles.li} ${styles.CompanyName}`}><b>Company Name</b></li>
          <li className={`${styles.li} ${styles.CompanyAddress}`}><b>Company Address</b></li>
          <li className={`${styles.li} ${styles.Date}`}><b>Date</b></li>
          <li className={`${styles.li} ${styles.CompanyWebsite}`}><b>Company Website </b></li>
          <li className={`${styles.li} ${styles.Approval}`} ><b>Approval</b></li>
          <li className={`${styles.li} ${styles.Message}`} ><b>Message</b></li>
        </ul>
        {
          AllEmployees.length > 0 ?
            AllEmployees.map((items, i) => {
              return (
                <ul className={styles.ul}>
                  <li className={`${styles.li} ${styles.Name}`} title='Click to Check the Full Profile' onClick={() => navigate(`/BIAddmin@CheckEmpProfile/${items._id}`)}>
                    <Link style={{ color: "blue" }}>{items.name}</Link></li>
                  <li className={`${styles.li} ${styles.phoneNumber}`}>{items.phoneNumber}</li>

                  <li className={`${styles.li} ${styles.CompanyName}`}>{items.CompanyName}</li>
                  <li className={`${styles.li} ${styles.CompanyAddress}`}>{items.CompanyAddress}</li>
                  <li className={`${styles.li} ${styles.Date}`}>
                    {new Date(items.createdAt).toLocaleString(
                      "en-US",
                      {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      }
                    )}
                  </li>

                  <li className={`${styles.li} ${styles.CompanyWebsite}`}>{items.CompanyWebsite}</li>
                  <li className={`${styles.li} ${styles.Approval}`}>
                    {
                  items.isApproved?
                  <button className={styles.Approved} onClick={()=>{DisApprove(items._id, false)}}>Approved&#10004;</button>
                 :
                 items.isReject?
                  <button className={styles.Rejected} onClick={()=>{unReject(items._id, false)}}>Rejected&#10004;</button>
:
items.isOnhold ?
                  <button className={styles.OnHold} onClick={()=>{unHold(items._id, false)}}>OnHold&#10004;</button>
                  :
                  <>
                  <button className={styles.Approve} onClick={()=>{Approve(items._id, true)}}>Approve</button>
                  <button className={styles.Approve} onClick={()=>{Reject(items._id, true)}}>Reject</button>

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
      <>
       
<div id={styles.JobCardWrapper} >

{
          AllEmployees.length > 0 ?

AllEmployees.map((job, i) => {
  return (
    <>
      <div className={styles.JobCard} key={i}>

     
          {/* <h4 className={styles.Mobname}>Name : <span style={{color:"blue", textDecoration:"underline"}} onClick={() => navigate(`/BIAddmin@CheckEmpProfile/${job._id}`)} >{job.name}</span></h4>
         

<h4 > Contact Number : {job.phoneNumber?<span style={{ color: "blue" }}  >{job.phoneNumber} </span>:<span style={{color:"red"}}>Not updated</span> } </h4> 
<h4>Company Name : {job.CompanyName?<span style={{ color: "blue" }}  >{job.CompanyName} </span>: <span style={{color:"red"}}>Not updated</span>}</h4>
        <h4 >Company Address: {job.CompanyAddress?<span style={{ color: "blue" }}  >{job.CompanyAddress}</span>:<span style={{color:"red"}}>Not updated</span>}</h4>
        <h4> Company Website: {job.CompanyWebsite?<span style={{ color: "blue" }}  >{job.CompanyWebsite} </span>:<span style={{color:"red"}}>Not updated</span>}   </h4>
         <h4>  Registered On: <span style={{ color: "blue" }}>{new Date(job.createdAt).toLocaleString(
                      "en-US",
                      {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      }
                    )} </span> </h4>
                    {job.isApproved?
                  <button style={{marginLeft:"30%"}} className={styles.Approved} onClick={()=>{DisApprove(job._id, false)}}>Approved&#10004;</button>
                 :<button style={{marginLeft:"30%"}} className={styles.Approve} onClick={()=>{Approve(job._id, true)}}>Approve</button>}
        </div> */}

<div style={{ display: "flex" }}>

<div className={styles.LeftTable}>
                                <span className={styles.span} >Name  :   </span><br></br>
                                <span className={styles.span}>  Email Id :  </span><br></br>
                                <span className={styles.span}>  Phone number : </span><br></br>
                                <span className={styles.span}> Company Name: </span><br></br>
                                <span className={styles.span} > Company Contact:</span><br></br>
                                <span className={styles.span}> Company Email: </span><br></br>
                                <span className={styles.span}> Company Website: </span><br></br>
                                <span className={styles.span}> Organisation Type: </span><br></br>
                                <span className={styles.span}> Registered On: </span><br></br>
                            
                            </div>

                            <div className={styles.RightTable}>
                                <span className={styles.span} >  <span style={{ color: "blue", textDecoration:"underline" }} onClick={() => navigate(`/BIAddmin@CheckEmpProfile/${job._id}`)} >{job.name}</span> </span><br></br>
                                <span className={styles.span}> {job.email ? <span style={{ color: "blue" }}  >{job.email} </span> : <span style={{ color: "red" }}>Not updated</span>}</span><br></br>
                                <span className={styles.span}>   {job.phoneNumber ? <span style={{ color: "blue" }}  >{job.phoneNumber} </span> : <span style={{ color: "red" }}>Not updated</span>}</span><br></br>
                                <span className={styles.span}> {job.CompanyName ? <span style={{ color: "blue" }}  >{job.CompanyName} </span> : <span style={{ color: "red" }}>Not updated</span>} </span><br></br>
                                <span className={styles.span} >  {job.CompanyContact ? <span style={{ color: "blue" }}  >{job.CompanyContact} </span> : <span style={{ color: "red" }}>Not updated</span>}</span><br></br>
                                <span className={styles.span}>  {job.CompanyEmail ? <span style={{ color: "blue" }}  >{job.CompanyEmail}</span> : <span style={{ color: "red" }}>Not updated</span>}</span><br></br>
                                <span className={styles.span}> {job.CompanyWebsite ? <span style={{ color: "blue" }}  >{job.CompanyWebsite} </span> : <span style={{ color: "red" }}>Not updated</span>} </span><br></br>
                                <span className={styles.span}>  {job.TypeofOrganisation ? <span style={{ color: "blue" }}  >{job.TypeofOrganisation} </span> : <span style={{ color: "red" }}>Not updated</span>}</span><br></br>
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
                        <span className={`${styles.span} ${styles.LastDown}`}> Company Address:  {job.CompanyAddress ? <span className={styles.span} style={{ color: "blue", marginLeft:"5px" }}  >{job.CompanyAddress} </span> : <span style={{ color: "red", marginLeft:"5px" }} >Not updated</span>}</span><br></br>
                      
                        <span className={styles.span}> Account Status:  {job.isApproved?
  <button style={{  marginLeft:"20px" }} className={styles.Approved} onClick={()=>{DisApprove(job._id, false)}}>Approved</button>
  :<button  style={{  marginLeft:"20px" }} className={styles.Approve} onClick={()=>{Approve(job._id, true)}}>Approve</button>}</span><br></br>
  <span className={`${styles.span} ${styles.LastDown}`}> Message:  {job.message ? <span className={styles.span} style={{ color: "blue", marginLeft:"5px" }}  >{job.message} </span> : <span style={{ color: "red", marginLeft:"5px" }} >No message Sent yet</span>}</span><br></br>
                        </div> 


        </div>
    </>
  )
})
: <p style={{ color: "red", marginLeft: "32%" }}>No Record Found</p>

}

</div>
      </>
}
    </>
  )
}


export default AllEmployeesForadmin