import React from 'react'
import { useEffect, useState } from 'react'
import styles from "./AllEmployees.module.css"
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate, BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import useScreenSize from '../SizeHook';
import {jobTags} from '../Tags'
import Styles from "../AppliedUserProfile/AppliedUserProfile.module.css"



function AllEmployeesForadmin() {
  let navigate = useNavigate()
  
  useEffect(()=>{
    let adminLogin= localStorage.getItem("SupAdMLog")
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
  let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
  const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
  await axios.put(`/EmpProfile/sendMessage/${id}`, {message}, {headers})
  .then((res)=>{
    if(res.data){
    alert("Message Sent Successfully")
    }
  }).catch((err)=>{
    alert("some thing went wrong")
  })
}


const [totalCount, settotalCount] = useState()
const [nopageFilter, setNoPageFilter] = useState(false)
  const [Active, setActive] = useState([])
  
let recordsperpage = JSON.parse(sessionStorage.getItem("recordsperpageSerachCand"))

const [currentPage, setCurrentPage] = useState(1)
const [recordsPerPage, setrecordsPerPage] = useState(recordsperpage?recordsperpage:10)

const lastIndex = currentPage * recordsPerPage //10
const firstIndex = lastIndex - recordsPerPage //0
// const records = Candidate.slice(firstIndex, lastIndex)//0,5
const npage = Math.ceil(totalCount / recordsPerPage) // last page

// const number = [...Array(npage + 1).keys()].slice(1)



async function gettotalcount() {
  const headers = { authorization: 'BlueItImpulseWalkinIn' };
  await axios.get("/EmpProfile/getTotalCount", { headers })
    .then((res) => {
      console.log(res.data.result)
      settotalCount(res.data.result)
    }).catch((err) => {
      alert("something went wrong")
    })
  }
  
  async function getEmployees() {
  setNoPageFilter(false)
  setActive([])
  setJobTagsIds([])
  const headers = { authorization: 'BlueItImpulseWalkinIn' };
  await axios.get(`/EmpProfile/getLimitJobs/${recordsPerPage}`, { params: { currentPage }, headers })

    .then((res) => {
      let result = (res.data)
      gettotalcount()
      let sortedate = result.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setAllEmployees(sortedate)
    })
}

// useEffect(() => {
//   getEmployees()
// }, [])

    useEffect(() => {
      if (jobTagsIds.length < 1) {
        getEmployees()

      } else {
        getTagId();
      }
    }, [currentPage, recordsPerPage])

    function firstPage() {
      setCurrentPage(1)
    }
  
    function previous() {
      if (currentPage !== 1) {
        setCurrentPage(currentPage - 1)
      }
    }
    function changeCurrent(id) {
      setCurrentPage(id)
    }
    function next() {
      if (currentPage !== npage) {
        setCurrentPage(currentPage + 1)
      }
    }
    function last() {
      setCurrentPage(npage)
    }
  
    function handleRecordchange(e){  
      sessionStorage.setItem("recordsperpageSerachCand", JSON.stringify(e.target.value));
      let recordsperpage = JSON.parse(sessionStorage.getItem("recordsperpageSerachCand"))
      setrecordsPerPage(recordsperpage) 
      setCurrentPage(1)
    }
      const [count, setCount]=useState(1)
    
        const [jobTagsIds, setJobTagsIds] = useState([])
  
        useEffect(() => {
          if (jobTagsIds.length > 0) {
            getTagId();
          }
        }, [jobTagsIds])
  
        let ids = jobTagsIds.map((id) => {
          return (
            id._id
          )
        })
        const uniqueList = [...new Set(ids)];
        async function getTagId() {
          settotalCount(uniqueList.length)
          await axios.get(`/EmpProfile/jobTagsIds/${uniqueList}`, {
            params: { currentPage, recordsPerPage }
          })
            .then((res) => {
              // console.log("data from uique id's",res.data)
              let result = res.data
              let sortedate = result.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
              });
              setAllEmployees(sortedate)
              if (count == 2) {
                setCurrentPage(1)
              }
      
            })
        }
      
        useEffect(()=>{
          if(Active.length>0){
            changeTags()
          }
        },[Active])
      
    
  
    async function filterByJobTitle(key) {
      if(count==1){
        setAllEmployees([])
      }
      setCount(prev=>prev+1)
      const isIndex=Active.findIndex((present)=>{
  return(
    present===key
  )
      })
      if(isIndex<0){
      var updatedActive = [...Active, key]; // Add the new key to the array
      setActive(updatedActive);
      }else{
        const IndexId=Active.findIndex((present)=>{
          return(
            present==key
          )
              })
              Active.splice(IndexId,1)
                  if(Active.length===0){
                    getEmployees()
                    return false
      }
      changeTags()
    }}

  
    async function changeTags(key){
  
      setNoPageFilter(true)
      await axios.get(`/EmpProfile/getTagsJobs/${Active}`)
        .then((res) => {
          let result = (res.data)
          // console.log(result)
          let sortedate = result.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setJobTagsIds(sortedate)

        })
    }
  


  // async function getEmployees() {
  //   let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
  //   const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
  //   await axios.get("/EmpProfile/getAllEmployees",{headers})
  //     .then((res) => {
  //       let result = (res.data)
  //       // console.log(result.message)
  //       setmessage(result.message)
        
  //       let sortedate = result.sort(function (a, b) {
  //         return new Date(a.updatedAt) - new Date(b.updatedAt);
  //       });
  //       setAllEmployees(sortedate)
  //     })
  // }

  // useEffect(() => {
  //   getEmployees()
  // }, [])


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
        await axios.put(`/EmpProfile/isOnhold/${Empid}`,{isOnhold}, {headers})
        .then((res)=>{
          getEmployees()


        }).catch((err)=>{
          alert("backend error occured")
        })
      }
    })
  }    

  function  unHold(Empid , status){
    let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
    const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
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
        await axios.put(`/EmpProfile/isOnhold/${Empid}`,{isOnhold},{headers})
        .then((res)=>{

    getEmployees()
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
        await axios.put(`/EmpProfile/isReject/${Empid}`,{isReject}, {headers})
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
        await axios.put(`/EmpProfile/isReject/${Empid}`,{isReject}, {headers})
        .then((res)=>{

    getEmployees()
        }).catch((err)=>{
          alert("backend error occured")
        })
      }
    })
  }



   function Approve(Empid , status){
    let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
    const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
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
        await axios.put(`/EmpProfile/setApproval/${Empid}`,{isApproved}, {headers})
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
    let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
    const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
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
        await axios.put(`/EmpProfile/setApproval/${Empid}`,{isApproved}, {headers})
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
    let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
    const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
    await axios.get("/EmpProfile/getAllEmployees", {headers})
      .then((res) => {
        let result = (res.data)
        let sortedate = result.sort(function (a, b) {
          return new Date(a.updatedAt) - new Date(b.updatedAt);
        });
        setAllEmployees(sortedate)
      })
  }


  async function checkAllApproved(e){
    let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
    const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
    if(e.target.checked){
    await axios.get("/EmpProfile/getApprovedEmp", {headers})
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
    let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
    const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
    if(e.target.checked){
    await axios.get("/EmpProfile/getNotApprovedEmp", {headers})
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

  async function RecentLogin(e){
    let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
    const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
    if(e.target.checked){
    await axios.get("/EmpProfile/RecentLogin", {headers})
    .then((res) => {
      let result = (res.data)
      let sortresult = result.sort((a,b)=>{
        return new Date(b.LogedInTime) - new Date(a.LogedInTime);      
      })
      setAllEmployees(sortresult)  
    })
    .catch((err) => {
      alert("server issue occured")
    })
  }else{
      getEmployees()
    }  
      }

      async function checkOnline(e){
        let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
        const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
        if(e.target.checked){
        await axios.get("/EmpProfile/checkOnline", {headers})
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

      // .......Last Active Sorting.......
  function LastActDescendingOrder (){
    let newjob = [...AllEmployees]
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newjob.sort((a, b) => {
      return collator.compare(a.updatedAt, b.updatedAt)
    })
    setAllEmployees(sorted)
  }

  function LastActAscendingOrder (){
    let newjob = [...AllEmployees]
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newjob.sort((a, b) => {
      return collator.compare(b.updatedAt, a.updatedAt)
    })
    setAllEmployees(sorted)
  }
      // ......Registration Sort......
  function RegDescendingOrder (){
    let newjob = [...AllEmployees]
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newjob.sort((a, b) => {
      return collator.compare(a.createdAt, b.createdAt)
    })
    setAllEmployees(sorted)
  }

  function RegAscendingOrder (){
    let newjob = [...AllEmployees]
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newjob.sort((a, b) => {
      return collator.compare(b.createdAt, a.createdAt)
    })
    setAllEmployees(sorted)
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
      <label><input id="checkApproved" name="checkApproved" type="radio" onChange={(e)=>{RecentLogin(e)}} /><span> Recent Login</span></label><br></br>
      <label><input id="checkApproved" name="checkApproved" type="radio" onChange={(e)=>{checkOnline(e)}} /><span>check Online</span></label><br></br>
      </div>
       <div className={Styles.JobtitleFilterWrapper}>
                         <buton className={Active.length===0?Styles.active:Styles.JobtitleFilter} onClick={() => 
                      { getEmployees() }}>All</buton>
                    {
                      jobTags.map((tags, i) => {
                        return (
                          <button disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                            tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                            className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                            tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                            Styles.TagHeading: 
                            //  Active === tags.value ? 
                            Active.findIndex(  (present)=>{
                              return(
                                present===tags.value
                              )
                                  }) >=0?
                            Styles.active : Styles.JobtitleFilter} onClick={() => 
                              { filterByJobTitle(tags.value) }}>{tags.value} </button>
                        
                        )
                      })
                    }
                    </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  {/* {nopageFilter ?
                    <p style={{ fontWeight: 400, marginLeft: "10px" }}>Displaying Candidates with with following matching tags
                     <span style={{ color: "blue" }}>{Filtereredjobs}</span></p>
                    :
                    <p style={{ fontWeight: 400, marginLeft: "10px" }}>showing {firstIndex + 1} to {lastIndex} latest Candidates</p>
                  } */}
                    
      {nopageFilter ?
                    <p style={{ fontWeight: 400, marginLeft: "10px" }}>Displaying <span style={{ color: "blue" }}>
                      {uniqueList.length} </span>Jobs with following matching tags:
                      <span style={{ color: "blue" }}>{Active.toString()}</span></p>
                    :
                    <p style={{ fontWeight: 400, marginLeft: "10px" }}>showing {firstIndex + 1} to {lastIndex} latest jobs</p>
                  }
                  <div className={styles.navigationWrapper}>
                    <button disabled={currentPage === 1} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={firstPage}>
                      <i class='fas fa-step-backward' ></i>
                    </button>
                    <button disabled={currentPage === 1} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={previous}>
                      <i class='fas fa-caret-square-left'></i>
                    </button>
                    <span>{currentPage}</span>
                    <button disabled={currentPage === npage} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={next}>
                      <i class='fas fa-caret-square-right'></i>
                    </button>
                    <button disabled={currentPage === npage} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={last}>
                      <i class='fas fa-step-forward'></i>
                    </button>
                  </div>
                </div>
      
                <div style={{marginBottom:"5px", marginTop:"0", marginLeft:"10px"}}>
                  Show  <select onChange={(e) => { handleRecordchange(e) }}>
                    <option selected = {lastIndex === 10} value={10}>10</option>
                    <option selected = {lastIndex === 25} value={25}>25</option>
                    <option selected = {lastIndex === 50} value={50}>50</option>
                    <option selected = {lastIndex === 100} value={100}>100</option>
                  </select>  jobs per page
                  </div>
      
      {screenSize.width>850?

      

      <div className={styles.Uiwarpper}>
        <ul className={styles.ul}>
          <li style={{ backgroundColor: " rgb(40, 4, 99)" , color:"white"}} className={`${styles.li} ${styles.Name}`}><b>Emp. Name</b></li>
          <li style={{ backgroundColor: " rgb(40, 4, 99)" , color:"white"}} className={`${styles.li} ${styles.phoneNumber}`}><b>Emp. Phone Number</b></li>

          <li style={{ backgroundColor: " rgb(40, 4, 99)" , color:"white"}} className={`${styles.li} ${styles.CompanyName}`}><b>Company Name</b></li>
          <li style={{ backgroundColor: " rgb(40, 4, 99)" , color:"white"}} className={`${styles.li} ${styles.CompanyAddress}`}><b>Company Address</b></li>
          <li style={{ backgroundColor: " rgb(40, 4, 99)" , color:"white"}} className={`${styles.li} ${styles.Date}`}><b>RegDate</b>
          <p style={{ marginTop:"-0px", marginLeft:"-35px"}}>
              <i onClick={RegAscendingOrder} className={`${styles.arrow} ${styles.up}`}> </i>
              <i onClick={RegDescendingOrder} className={`${styles.arrow} ${styles.down}`}></i>
          </p> 
          </li>
          <li style={{ backgroundColor: " rgb(40, 4, 99)" , color:"white"}} className={`${styles.li} ${styles.Date}`} ><b >Last Log</b>
          <p style={{ marginTop:"-0px", marginLeft:"-35px"}}>
              <i onClick={LastActAscendingOrder} className={`${styles.arrow} ${styles.up}`}> </i>
              <i onClick={LastActDescendingOrder} className={`${styles.arrow} ${styles.down}`}></i>
          </p> 
            </li>
          <li style={{ backgroundColor: " rgb(40, 4, 99)", color:"white" }} className={`${styles.li} ${styles.CompanyWebsite}`}><b>Company Website </b></li>
          <li style={{ backgroundColor: " rgb(40, 4, 99)", color:"white" }} className={`${styles.li} ${styles.Approval}`} ><b>Approval</b></li>
          <li style={{ backgroundColor: " rgb(40, 4, 99)", color:"white" }} className={`${styles.li} ${styles.Message}`} ><b>Message</b></li>
        </ul>
        {
          AllEmployees.length > 0 ?
            AllEmployees.map((items, i) => {
              return (
                <ul className={styles.ul}>
                  <li className={`${styles.li} ${styles.Name}`} title='Click to Check the Full Profile' onClick={() => navigate(`/BIAddmin@CheckEmpProfile/${items._id}`)}>
                    <Link style={{ color: "blue" }}>
                    {items.online ? <span className={styles.dot}></span> :""} {items.name}</Link></li>
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
                        
        hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
                      }
                    )}
                  </li>
                  <li className={`${styles.li} ${styles.Date}`}>
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