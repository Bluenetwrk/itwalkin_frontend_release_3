

import React from 'react'
import { useEffect, useState } from 'react'
import styles from "./AllJobSeekers.module.css"
import Styles from "../AppliedUserProfile/AppliedUserProfile.module.css"
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate, BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import useScreenSize from '../SizeHook';
import {jobTags} from '../Tags'


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
  // console.log(jobSeekers)
  const [Result , setResult] = useState(false)
const screenSize = useScreenSize();

const [message, setmessage] = useState("")

const [currentBox, setcurrentBox] = useState("")

const [Candidate, setCandidate] = useState([])
  const [nopageFilter, setNoPageFilter] = useState(false)
  const [Filtereredjobs, setFiltereredjobs] = useState([])

  const [NotFound, setNotFound] = useState("")
  const [Active, setActive] = useState([])
  
  const Location = ['Bangalore']
  const [totalCount, settotalCount] = useState()

  let recordsperpage = JSON.parse(sessionStorage.getItem("recordsperpageSerachCand"))

  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setrecordsPerPage] = useState(recordsperpage?recordsperpage:10)

  const lastIndex = currentPage * recordsPerPage //10
  const firstIndex = lastIndex - recordsPerPage //0
  // const records = jobSeekers.slice(firstIndex, lastIndex)//0,5
  const npage = Math.ceil(totalCount / recordsPerPage) // last page

  // const number = [...Array(npage + 1).keys()].slice(1)

  async function gettotalcount() {
    const headers = { authorization: 'BlueItImpulseWalkinIn' };
    await axios.get("/StudentProfile/getTotalCountArchiveJobseeker", { headers })
      .then((res) => {
        // console.log(res.data.result)
        settotalCount(res.data.result)
      }).catch((err) => {
        alert("something went wrong")
      })
  }

  async function getAllJobSeekers() {
    // setjobSeekers([])
    setNoPageFilter(false)
    setActive([])
    setJobTagsIds([])

    // let userid = JSON.parse(localStorage.getItem("EmpIdG"))
    // const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("EmpLog"))) };
    const headers = { authorization: 'BlueItImpulseWalkinIn' };

    await axios.get(`/StudentProfile/getLimitArchiveJobseeker/${recordsPerPage}`, { params: { currentPage }, headers })

      .then((res) => {
        let result = (res.data)
        // console.log("all jobs",result)
        gettotalcount()
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        let elements=  sortedate.flatMap( subArray =>  subArray.Archived).forEach(  element => {
           setjobSeekers(oldArray => [...oldArray,element] )
          //  setjobSeekers([element])
          //  setjobSeekers(oldArray => [...oldArray, ...sortedate.flatMap(subArray => subArray.Archived)]);

        })
        
      })
  }

      useEffect(() => {
        if (jobTagsIds.length < 1) {
      getAllJobSeekers()
  
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
          id.Archived._id
        )
      })
      // console.log(ids)

      const uniqueList = [...new Set(ids)];

      async function getTagId() {
        settotalCount(jobTagsIds.length)
        await axios.get(`/StudentProfile/ArchiveJobseekerTagsIds/${uniqueList}`, {
          params: { currentPage, recordsPerPage }
        })
          .then((res) => {
            let result = res.data
            let sortedate = result.sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            });
            // setjobSeekers(sortedate)
            let elements=  sortedate.flatMap( subArray =>  subArray.Archived).forEach(  element => {
              setjobSeekers(oldArray => [...oldArray,element] )
           })
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
    }
    setjobSeekers([])
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
                  getAllJobSeekers()
                  return false
    }
    changeTags()
  }}

  async function changeTags(key){
    setNoPageFilter(true)
    setFiltereredjobs(key)
    await axios.get(`/StudentProfile/getTagsArchiveJobseekers/${Active}`)
      .then((res) => {
        let result = (res.data)
        // console.log('hkjkjk',result)
        let sortedate = result.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobTagsIds(sortedate)
    //     let elements=  sortedate.flatMap(element => {
    //       setCandidate(oldArray => [...oldArray,element] )
    //  });
        // setCandidate(sortedate)
      })
  }

     // .......Last Active Sorting.......
     function LastActDescendingOrder (){
      let newjob = [...jobSeekers]
      const collator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: 'base'
      });
      const sorted = newjob.sort((a, b) => {
        return collator.compare(a.updatedAt, b.updatedAt)
      })
      setjobSeekers(sorted)
    }
  
    function LastActAscendingOrder (){
      let newjob = [...jobSeekers]
      const collator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: 'base'
      });
      const sorted = newjob.sort((a, b) => {
        return collator.compare(b.updatedAt, a.updatedAt)
      })
      setjobSeekers(sorted)
    }
        // ......Registration Sort......
    function RegDescendingOrder (){
      let newjob = [...jobSeekers]
      const collator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: 'base'
      });
      const sorted = newjob.sort((a, b) => {
        return collator.compare(a.createdAt, b.createdAt)
      })
      setjobSeekers(sorted)
    }
  
    function RegAscendingOrder (){
      let newjob = [...jobSeekers]
      const collator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: 'base'
      });
      const sorted = newjob.sort((a, b) => {
        return collator.compare(b.createdAt, a.createdAt)
      })
      setjobSeekers(sorted)
    }

      

  return (
    <>

    {screenSize.width>850?
<>
                <div className={Styles.JobtitleFilterWrapper}>
                       <buton className={Active.length===0?Styles.active:Styles.JobtitleFilter} onClick={() => 
                    { getAllJobSeekers() }}>All</buton>
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
                                  {jobTagsIds.length} </span>Jobs with following matching tags:
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
                                <option selected = {lastIndex === 10} value={1}>1</option>
                                <option selected = {lastIndex === 10} value={10}>10</option>
                                <option selected = {lastIndex === 25} value={25}>25</option>
                                <option selected = {lastIndex === 50} value={50}>50</option>
                                <option selected = {lastIndex === 100} value={100}>100</option>
                              </select>  jobs per page
                              </div>

    <div style={{marginLeft:"7px"}} className={styles.Uiwarpper}>
              <ul className={styles.ul}>
                <li style={{ backgroundColor: " rgb(40, 4, 99)", color:"white" }} className={`${styles.li} ${styles.name}`}><b>Name</b></li>
                <li style={{ backgroundColor: " rgb(40, 4, 99)", color:"white" }} className={`${styles.li} ${styles.phoneNumber}`}><b>Phone Number</b></li>
                <li style={{ backgroundColor: " rgb(40, 4, 99)", color:"white" }} className={`${styles.li} ${styles.age}`}><b>Age</b></li>

                <li style={{ backgroundColor: " rgb(40, 4, 99)", color:"white" }} className={`${styles.li} ${styles.Aadhar}`}><b>Aadhar</b></li>
                <li style={{ backgroundColor: " rgb(40, 4, 99)", color:"white" }} className={`${styles.li} ${styles.Pdate}`}><b>Reg. Date</b>
                <p style={{ marginTop:"-0px", marginLeft:"-35px"}}>
                              <i onClick={RegAscendingOrder} className={`${styles.arrow} ${styles.up}`}> </i>
                              <i onClick={RegDescendingOrder} className={`${styles.arrow} ${styles.down}`}></i>
                          </p> 
                </li>
                <li style={{ backgroundColor: " rgb(40, 4, 99)", color:"white" }} className={`${styles.li} ${styles.Pdate}`}><b>Last Log</b>
                 <p style={{ marginTop:"-0px", marginLeft:"-35px"}}>
                              <i onClick={LastActAscendingOrder} className={`${styles.arrow} ${styles.up}`}> </i>
                              <i onClick={LastActDescendingOrder} className={`${styles.arrow} ${styles.down}`}></i>
                          </p> 
                                                            </li>
                <li style={{ backgroundColor: " rgb(40, 4, 99)", color:"white" }} className={`${styles.li} ${styles.Qualification}`}><b>Qualif.</b></li>
                <li style={{ backgroundColor: " rgb(40, 4, 99)", color:"white" }} className={`${styles.li} ${styles.Skills}`}><b>Skills </b></li>
                <li style={{ backgroundColor: " rgb(40, 4, 99)", color:"white" }} className={`${styles.li} ${styles.Approval}`}><b>Approval </b></li>
                <li style={{ backgroundColor: " rgb(40, 4, 99)", color:"white" }} className={`${styles.li} ${styles.Message}`}>Message</li>


              </ul>
              {
     jobSeekers.length > 0 ?

     jobSeekers.map((items, i) => {
                  return (
<>
                    <ul className={styles.ul}>

                      <li className={`${styles.li} ${styles.name}`} 
    onClick={()=>{navigate(`/BIAddmin@CheckStudentArchived/${items._id}`)}}><Link style={{color:"blue"}}>
     {items.name?items.name:"nnn"}
      </Link></li>
                <li className={`${styles.li} ${styles.phoneNumber}`}>{items.phoneNumber?items.phoneNumber:"not available"}</li>
                <li className={`${styles.li} ${styles.age}`}>{items.age?items.age:"not availabel"}</li>

                      <li className={`${styles.li} ${styles.Aadhar}`}> {items.Aadhar?items.Aadhar:"No aadhar available"}</li>
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

                      <li className={`${styles.li} ${styles.Qualification}`}>{items.Qualification?items.Qualification:"no quali. available"}</li>
                      <li className={`${styles.li} ${styles.Skills}`}>{items.Skills?items.Skills:"no kills available"}</li>
                      <li className={`${styles.li} ${styles.Approval}`}>
                        {
                        items.isApproved?
                  <button className={styles.Approved}>Approved</button>
                    :
                  
                 items.isReject?
                  <button className={styles.Rejected}>Rejected&#10004;</button>
                  :
          items.isOnhold ?
                  <button className={styles.OnHold} >OnHold&#10004;</button>
                  :
                  <>
                  <button className={styles.Approve}>Reject</button>
                  <button className={styles.Approve} >Approve</button>

                  <button className={styles.Approve}>Hold</button>
                  </>
                        }
                  </li>
                  
                  <li className={`${styles.li} ${styles.Message}`} >{items.message?items.message:"no message was sent"}
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
              </>
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