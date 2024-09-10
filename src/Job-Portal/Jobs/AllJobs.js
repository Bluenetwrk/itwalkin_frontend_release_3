import React, { useState, useEffect, useRef } from 'react';

import styles from "./Allobs.module.css"
import axios from "axios";
import { Link, useNavigate, BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { TailSpin, Puff } from "react-loader-spinner"
import location from "../img/icons8-location-20.png"
import graduation from "../img/icons8-graduation-cap-40.png"
import SwipeableViews from "react-swipeable-views";

import useScreenSize from '../SizeHook';
import socketIO from 'socket.io-client';

// import { Bars } from  'react-loader-spinner'
function AllJobs(props) {
  useEffect(() => {
    const socket = socketIO.connect(props.url, {
      auth: {
        token: JSON.parse(localStorage.getItem("StudId"))
      }
    });
  }, [])

  let jobTags = [
    {value:'java', label: 'java'},{value:'Mern Stack', label:'Mern Stack' },{value:'ReactJs', label: 'ReactJs'},
    {value:'Python', label: 'Python'},{value:'C', label: 'C' }, {value:'C++',label:'C++' },
    {value: 'Javascript', label: "Javascript" }, {value:'Node js',label: 'Node js' }, 
    {value:'Angular js',label: 'Angular js' },{value:'Vue js', label: 'Vue js'}, {value:'NextJs', label: 'NextJs'},
    {value: 'Backend', label: 'Backend'},{value:'Frontend', label:'Frontend'},
    {value: 'HTML-CSS', label: 'HTML-CSS'},
    {value: 'MongoDB', label: 'MongoDB'}, 
    {value: 'MySql', label: 'MySql'},
    {value: 'React Native', label: 'React Native'},
    {value: 'Flutter', label: 'Flutter'},
    ]

    let JobLocationTags=["Bangalore", "Hyderabad", "Chennai", "Mumbai"]

  const [jobs, setJobs] = useState([])
  const [Filterjobs, setFilterjobs] = useState([])

  const [nopageFilter, setNoPageFilter]=useState(false)
const [Filtereredjobs, setFiltereredjobs] = useState([])

  const [isReadMore, setIsReadMore] = useState(true)
  const [jobapplied, setjobapplied] = useState(false)
  const [userProfile, setuserProfile] = useState([])
  const [showJobs, setshowJobs] = useState(false)
  const [showExperiance, setshowExperiance] = useState(false)
  const [showPackage, setshowPackage] = useState(false)
  const [PageLoader, setPageLoader] = useState(false)
  const [Result, setResult] = useState(false)
  const [nojob, setnojob] = useState("")
  const screenSize = useScreenSize();

  const [Loader, setLoader] = useState(false)

  const [clickedJobId, setclickedJobId] = useState() //for single job loader
  let jobSeekerId = JSON.parse(localStorage.getItem("StudId"))


  // let menuRef = useRef();
  // let imgRef = useRef();

  // window.addEventListener("click", (e) => {
  //   if (e.target !== menuRef.current) {
  //     setshowPosteddateJobs(false)
  //     console.log(menuRef.current)
  //   }
  // })



  const navigate = useNavigate()
  const Location = useLocation()

  async function getjobs() {
    setPageLoader(true)
    setNoPageFilter(false)

    let userid = JSON.parse(localStorage.getItem("StudId"))
    const headers = { authorization: userid + " " + atob(JSON.parse(localStorage.getItem("StudLog"))) };
    await axios.get("/jobpost/getjobs", { headers })
      .then((res) => {
        let result = (res.data)
        let sortedate = result.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
        setFilterjobs(sortedate)
        setPageLoader(false)
      }).catch((err) => {
        alert("server issue occured")
      })
  }

  useEffect(() => {
    getjobs()
  }, [])

  async function applyforOtherJob(Link) {
    // navigate("/JobSeekerLogin", { state: { Jid: id } })
    window.open(`${Link}`)
  }

  async function applyforJob(jobId) {
    let userid = JSON.parse(localStorage.getItem("StudId"))
    const headers = { authorization: userid + " " + atob(JSON.parse(localStorage.getItem("StudLog"))) };
    setclickedJobId(jobId)
    setLoader(true)
    setTimeout(async () => {

      await axios.put(`/jobpost/updatforJobApply/${jobId}`, { jobSeekerId }, { headers })
        .then((res) => {
          setLoader(false)
          getjobs()

        }).catch((err) => {
          alert("server issue occured", err)
        })
    }, 700)
  }

  // async function search(e) {
  //   let key = e.target.value

  //   await axios.get(`/jobpost/searchJob/${key}`)
  //     .then((res) => {
  //       if (key) {
  //         setJobs(res.data)
  //       } else {
  //         getjobs()

  //       }
  //     })
  // }

  const [searchKey, setsearchKey] = useState()
  // const [jobs, setJobs] = useState([])  
  async function searchIcon(key) {
    setNoPageFilter(true)
    setFiltereredjobs(key)
    setsearchKey(key)
    if (key) {
      setResult(true)
      let dubmyjobs = [...Filterjobs]
      const filteredItems = dubmyjobs.filter((user) => {
        if (JSON.stringify(user).includes(key.toLowerCase())) {
          return user
        }
      })
      setJobs(filteredItems)
    } else {
      getjobs()
      setResult(false)
    }
  }

  async function search(e) {
    setNoPageFilter(true)  
    let key = e.target.value
    setsearchKey(key)

    setFiltereredjobs(key)
    if (key) {
      setResult(true)
      let dubmyjobs = [...Filterjobs]
      const filteredItems = dubmyjobs.filter((user) =>
        JSON.stringify(user).toLowerCase().includes(key.toLowerCase())
      )
      setJobs(filteredItems)
    } else {
      getjobs()
      setResult(false)
    }
  }

  function sortbyOldjobs() {
    let newjob = [...jobs]
    let oldjobSort = newjob.sort(function (a, b) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    })
    setJobs(oldjobSort)

  }
  function sortbyNewjobs() {
    let newjob = [...jobs]
    let newjobSort = newjob.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
    setJobs(newjobSort)

  }

  function SdescendingOrder() {
    let newJobs = [...jobs]
    // const desendSort = newJobs.sort(function (a, b) {
    //   return (
    //     b.salaryRange - a.salaryRange
    //   )
    // })
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newJobs.sort((a, b) => {
      return collator.compare(b.salaryRange, a.salaryRange)
    })
    setJobs(sorted)
  }

  function SascendingOrder() {
    let newJObs = [...jobs]
    // const AscendSort = newJObs.sort(function (a, b) {
    //   return (
    //     a.salaryRange - b.salaryRange
    //   )
    // })
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newJObs.sort((a, b) => {
      return collator.compare(a.salaryRange, b.salaryRange)
    })
    setJobs(sorted)
  }

  function EdescendingOrder() {
    let newjob = [...jobs]
    // const descend = newjob.sort(function (a, b) {
    //   return (
    //     b.experiance - a.experiance
    //   )
    // })
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newjob.sort((a, b) => {
      return collator.compare(b.experiance, a.experiance)
    })
    setJobs(sorted)

  }

  function EascendingOrder() {
    let newjob = [...jobs]
    // const Ascend = newjob.sort(function (a, b) {
    //   return (
    //     a.experiance - b.experiance
    //   )
    // })
    // setJobs(Ascend)
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newjob.sort((a, b) => {
      return collator.compare(a.experiance, b.experiance)
    })
    setJobs(sorted)
  }

  // const [jobTitle, setjobTitle] = useState("")
  const [jobLocation, setjobLocation] = useState("AllL")
  const [jobTitle, setjobTitle] = useState("")
  // const [getJobTitle, setgetJobTitle] = useState(true)

  async function getjobTitleAll(all) {
    await axios.get("/jobpost/getjobs")
      .then((res) => {
        let result = (res.data)
        let sortedate = result.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)

      })
  }
  async function getjobsAllLoc(all) {
    await axios.get("/jobpost/getjobs")
      .then((res) => {
        let result = (res.data)
        let sortedate = result.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)

      })
  }

  async function JobtitleFilter(jobTitle) {
    await axios.get(`/jobpost/getjobTitle/${jobTitle}`)
      .then((res) => {
        let result = (res.data)
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
        // setPageLoader(false)
      }).catch((err) => {
        alert("some thing went wrong")
      })
  }

  
  async function getBothFiltered(jobTitle) {

    await axios.post(`/jobpost/getBothjobFilter/${jobLocation}`, { jobTitle })
      .then((res) => {
        let result = (res.data)
        console.log(result)
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
        // setPageLoader(false)
      }).catch((err) => {
        alert("some thing went wrong")
      })
  }


  // function checkEmpHalf(empId) {
  //   navigate(`CheckEmpHalfProfile/${empId}`)
  // }
    
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setrecordsPerPage] = useState(10)
  const lastIndex = currentPage * recordsPerPage //10
  const firstIndex = lastIndex - recordsPerPage //5
  const records = jobs.slice(firstIndex, lastIndex)//0,5
  const npage = Math.ceil(jobs.length / recordsPerPage) // last page
  const number = [...Array(npage + 1).keys()].slice(1)

  function firstPage(id){
    setCurrentPage(1)
  }

function previous(){
  if(currentPage !==1){
    setCurrentPage(currentPage-1)
  }  
}
function changeCurrent(id){
  setCurrentPage(id)
}
function next(){
  if(currentPage !==npage){
    setCurrentPage(currentPage+1)
  }
}
function last(){
    setCurrentPage(npage)
}
function handleRecordchange(e){  
  setrecordsPerPage(e.target.value)  
  setCurrentPage(1)
}

async function getLocation(jobLocation) {
  setFiltereredjobs(jobLocation)
  setNoPageFilter(true)
  await axios.get(`/jobpost/getjobLocation/${jobLocation}`)
    .then((res) => {
      let result = (res.data)
      let sortedate = result.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setJobs(sortedate)
      // setPageLoader(false)
    }).catch((err) => {
      alert("some thing went wrong")
    })
}



async function filterByJobTitle(key){
  setNoPageFilter(true)
  setFiltereredjobs(key)
  await axios.get(`/jobpost/getTagsJobs/${key}`)
  .then((res) => {
    let result = (res.data)
    let sortedate = result.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setJobs(sortedate)
  })
}

  return (
    <>
    {screenSize.width > 850 ?
        <>
          <div className={styles.searchBothForNavWrapper}>
            <input className={styles.inputboxsearchNav} type="text" placeholder='Search for a Job / Skills / Location / Experiance' onChange={(e) => { search(e) }} />

            <i style={{ color: "rgb(40, 4, 99)", fontSize: "18px", paddingLeft: "8px", cursor: "pointer" }} onClick={() => { searchIcon(searchKey) }}
              class="fa fa-search" ></i>
          </div>
          {Result ?
            <h4 style={{ marginLeft: "40%", marginTop: "20px" }}> {jobs.length} matching Result Found  </h4>
            : ""
          }
        </>
        : ""
      }     

      {screenSize.width > 850 ?
        <>
        <div style={{marginTop:"30px"}}></div>
        
                    <div className={styles.LocationFilterWrapper}>
          <label> <input className={styles.JobtitleFilter} type="radio" name="filter"  onClick={() => { getjobs() }} />All</label>
          {
            JobLocationTags.map((location, i)=>{
              return(
            // <label> <input className={styles.JobtitleFilter} type="radio" name="filter"  onClick={() => { getLocation(location.toLowerCase())}} />{location}</label>
            <label> <input className={styles.JobtitleFilter} type="radio" disabled={location=="Chennai" || location== "Hyderabad" || location=="Mumbai" || location=="Delhi"} name="filter" onClick={() => { getLocation(location.toLowerCase()) }} />{location}</label>

              )
            })
          }
          </div>
          <br></br>

          <div className={styles.FilterWrapper}>
            <label><input className={styles.JobtitleFilter} type="radio" name="filter"  onClick={() => { getjobs() }} />All</label>
                      {
                         jobTags.map((tags, i)=>{
              return(
                <label><input className={styles.JobtitleFilter} type="radio" name = "filter"
                 onClick={() => {filterByJobTitle(tags.value)}}/>{tags.value}</label>
              )
            }).slice(0,12)
            }
          </div>
          <br></br>

            <div className={styles.FilterWrapper}>
           {jobTags.map((tags, i)=>{
              return(
                <label><input className={styles.JobtitleFilter} type="radio" name = "filter"
                 onClick={() => {filterByJobTitle(tags.value)}}/>{tags.value}</label>
              )
            }).slice(12,30)
          }
          </div>

          {/* <div className={styles.AllHeadingSortWrapper}>

                <p className={`${styles.FilterHeading} ${styles.JobSorting}`} onClick={() => { setshowJobs((prev) => !prev) }}  ><b>Job Posted Date <i className={`${styles.arrow} ${styles.down}`}></i></b></p>

                {showJobs ?
                  <>
                    <div className={`${styles.JobradioWrapper} ${styles.RadioWrapper}`}  >

                      <label ><input className={styles.radio} type="radio" name="Job" onClick={sortbyOldjobs} />Show old</label><br></br>
                      <label ><input className={styles.radio} type="radio" name="Job" onClick={sortbyNewjobs} />Show latest</label>

                    </div>
                  </>
                  : ""
                }
                <p className={`${styles.FilterHeading} ${styles.ExpSorting}`} onClick={() => { setshowExperiance((prev) => !prev) }}><b>Experience Level <i className={`${styles.arrow} ${styles.down}`}></i></b></p>

                {showExperiance ?
                  <>
                    
                    <div className={`${styles.PackageradioWrapper} ${styles.RadioWrapper}`}>

                      <label><input className={styles.radio} type="radio" name="Package" onClick={EdescendingOrder} />High-Low</label><br></br>
                      <label><input className={styles.radio} type="radio" name="Package" onClick={EascendingOrder} />Low-High</label>
                    </div>
                  </>
                  : ""
                }
                <p className={`${styles.FilterHeading} ${styles.PackageSorting}`} onClick={() => { setshowPackage((prev) => !prev) }}><b>Package Level <i className={`${styles.arrow} ${styles.down}`}></i></b></p>

                {showPackage ?
                  <>
                    <div className={`${styles.ExperianceradioWrapper} ${styles.RadioWrapper}`}>
                      <label><input className={styles.radio} type="radio" name="Experiance" onClick={SdescendingOrder} />High-Low</label><br></br>
                      <label><input className={styles.radio} type="radio" name="Experiance" onClick={SascendingOrder} />Low-High</label>
                    </div>
                  </>
                  : ""
                }
            </div> */}
            <div style={{display:"flex", justifyContent:"space-between"}}>
            {        nopageFilter?
    <p style={{fontWeight:400, marginLeft:"10px"}}>Displaying <span style={{color:"blue"}}>{Filtereredjobs}</span> from All Jobs</p>
    :
    <p style={{fontWeight:400, marginLeft:"10px"}}>showing {firstIndex+1} to {lastIndex} latest jobs</p>
    }
<div className={styles.navigationWrapper}>
  <button disabled={currentPage === 1} style={{display:"inline", margin:"5px"}} className={styles.navigation} onClick={firstPage}>
  <i class='fas fa-step-backward'></i>
  </button>
  <button disabled={currentPage === 1} style={{display:"inline", margin:"5px"}} className={styles.navigation} onClick={previous}>
  <i class='fas fa-caret-square-left'></i>
  </button>
  <span>{currentPage}</span>
  <button disabled={currentPage === npage} style={{display:"inline", margin:"5px"}} className={styles.navigation} onClick={next}>
  <i class='fas fa-caret-square-right'></i>
  </button>
  <button disabled={currentPage === npage} style={{display:"inline", margin:"5px"}} className={styles.navigation} onClick={last}>
  <i class='fas fa-step-forward'></i>
  </button>
     </div>
     </div>

          <div className={styles.Uiwarpper}>
            <ul className={styles.ul} style={{color:'white',fontWeight:"bold" }}>

              <li style={{backgroundColor:" rgb(40, 4, 99)"}} className={`${styles.li} ${styles.CompanyName}`}>Company Name</li>
              <li style={{backgroundColor:" rgb(40, 4, 99)"}} className={`${styles.li} ${styles.Source}`}>Source</li>
              <li style={{backgroundColor:" rgb(40, 4, 99)"}} className={`${styles.li} ${styles.Jtitle}`}>Job Title</li>
              <li style={{backgroundColor:" rgb(40, 4, 99)"}} className={`${styles.li} ${styles.JobType}`}>JobType</li>
              {/* <li className={`${styles.li} ${styles.HliDescription}`}><b>Job description</b></li> */}
              <li style={{backgroundColor:" rgb(40, 4, 99)"}} className={`${styles.li} ${styles.date}`}>Posted Date
                <p style={{display:"inline", marginLeft:"6px"}} > <i onClick={sortbyNewjobs} className={`${styles.arrow} ${styles.up}`}> </i>
                  <i onClick={sortbyOldjobs} className={`${styles.arrow} ${styles.down}`}></i></p >
              </li>

              <li style={{backgroundColor:" rgb(40, 4, 99)"}} className={`${styles.li} ${styles.Location}`}>Location</li>
              <li style={{backgroundColor:" rgb(40, 4, 99)"}} className={`${styles.li} ${styles.Package}`}>CTC
              <p style={{display:"inline", marginLeft:"10px"}}>
                <i onClick={SdescendingOrder} className={`${styles.arrow} ${styles.up}`}> </i>
                <i onClick={SascendingOrder} className={`${styles.arrow} ${styles.down}`}></i>
                </p>
              </li>

              <li style={{backgroundColor:" rgb(40, 4, 99)"}} className={`${styles.li} ${styles.experiance}`}>Exp
              <p style={{display:"inline", marginLeft:"10px"}}>
                <i onClick={EdescendingOrder} className={`${styles.arrow} ${styles.up}`}> </i>
                <i onClick={EascendingOrder} className={`${styles.arrow} ${styles.down}`}></i>
                </p>
              </li>
              <li style={{backgroundColor:" rgb(40, 4, 99)"}} className={`${styles.li} ${styles.qualification}`}>Qualif</li>
              <li style={{backgroundColor:" rgb(40, 4, 99)"}} className={`${styles.li} ${styles.Skills}`}>Skills Required</li>
              <li style={{backgroundColor:" rgb(40, 4, 99)"}} className={`${styles.li} ${styles.Status}`}>Status</li>

            </ul>
            {PageLoader ?
              <Puff height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{ marginLeft: "49%", marginTop: "50px" }} />
              : ""
            }

            {    
            !nopageFilter?          
              records.length > 0 ?
              records.map((items, i) => {
                  return (

                    <ul className={styles.ul} key={i}>

                      {
                        !items.Source ?

                          <li style={{ cursor: "pointer", textDecoration: "underline" }} className={`${styles.li} ${styles.CompanyName}`}
                            onClick={() => { navigate(`/CheckEmpHalfProfile/${items.empId}`) }}  >
                            {/* {items.Logo ?
                              < img style={{ width: "38px", height: "38px" }} src={items.Logo} />
                              : ""}
                              <br></br> 
                              */}
                            {items.companyName}</li>
                          :
                          <a style={{ cursor: "pointer", textDecoration: "underline" }} className={`${styles.li} ${styles.CompanyName}`} href={items.SourceLink} target="_blank" >
                            {/* {items.Logo ?
                              < img style={{ width: "38px", height: "38px" }} src={items.Logo} />
                              : ""}<br></br> */}
                            {items.Source}

                          </a>

                      }

                      {/* {items.Source ?
                        <a className={`${styles.li} ${styles.Source}`} href={items.SourceLink} target="_blank">{items.Source}</a>
                        : */}
                        <li className={`${styles.li} ${styles.Source}`} >Itwalkin</li>

                      {/* } */}

                      <li className={`${styles.li} ${styles.Jtitle}`} onClick={() => navigate(`/Jobdetails/${items._id}`)} style={{ cursor: "pointer", textDecoration: "underline", color: "blue" }}>{items.jobTitle.toUpperCase()}</li>
                      <li className={`${styles.li} ${styles.JobType}`}>{items.jobtype}</li>

                      {/* <li className={`${styles.li} ${styles.liDescription}`}>
                   
                   {
                    items.jobDescription.map((descrip, di) => {
                      return (
                        <>
                          {
  
                                  descrip.text.slice(0,50)            
                          }
                        </>
                      )
                    }).slice(0,1)
                    }
                   
                  <span onClick={() => navigate(`/Jobdetails/${items._id}`)} className={styles.seeMore}>
                    ...read more
                  </span>
                </li> */}
                      <li className={`${styles.li} ${styles.date}`}>
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
                      <li className={`${styles.li} ${styles.qualification}`}>{items.qualification}</li>
                      <li className={`${styles.li} ${styles.Skills}`}>{items.skills}</li>

                      <li className={`${styles.li} ${styles.Status}`}>

                        {items.jobSeekerId.find((jobseeker) => {
                          return (
                            jobseeker == jobSeekerId
                          )
                        }) ?
                          <button className={styles.Appliedbutton} title='Successfully Applied, HR will get in with you, Once they check Your Profile' > Applied <span style={{ fontSize: '15px' }}>&#10004;</span></button>

                          :
                          // items .isApproved?
                          items.SourceLink ?
                            <button title='this will take to Source page' className={styles.Applybutton} onClick={() => {
                              applyforOtherJob(items.SourceLink)
                            }}>Apply</button>
                            :

                            <button className={styles.Applybutton} onClick={() => { applyforJob(items._id) }}>Apply
                              <span className={styles.Loader} >{Loader && items._id == clickedJobId ?
                                <TailSpin color="white" height={20} />
                                : ""}</span></button>
                          //  : <button className={styles.Applybutton} onClick={()=>{alert("You can not Apply for the job, Your account is under Approval Process")}} > Apply </button>
                        }
                      </li>
                    </ul>
                  )
                })
                : <p style={{ marginLeft: "47%", color: "red" }}>No Record Found</p>
                :
                jobs.length > 0 ?
              jobs.map((items, i) => {
                  return (

                    <ul className={styles.ul} key={i}>

                      {
                        !items.Source ?

                          <li style={{ cursor: "pointer", textDecoration: "underline" }} className={`${styles.li} ${styles.CompanyName}`}
                            onClick={() => { navigate(`/CheckEmpHalfProfile/${items.empId}`) }}  >
                            {/* {items.Logo ?
                              < img style={{ width: "38px", height: "38px" }} src={items.Logo} />
                              : ""}
                              <br></br> 
                              */}
                            {items.companyName}</li>
                          :
                          <a style={{ cursor: "pointer", textDecoration: "underline" }} className={`${styles.li} ${styles.CompanyName}`} href={items.SourceLink} target="_blank" >
                            {/* {items.Logo ?
                              < img style={{ width: "38px", height: "38px" }} src={items.Logo} />
                              : ""}<br></br> */}
                            {items.Source}

                          </a>

                      }

                      {/* {items.Source ?
                        <a className={`${styles.li} ${styles.Source}`} href={items.SourceLink} target="_blank">{items.Source}</a>
                        : */}
                        <li className={`${styles.li} ${styles.Source}`} >Itwalkin</li>

                      {/* } */}

                      <li className={`${styles.li} ${styles.Jtitle}`} onClick={() => navigate(`/Jobdetails/${items._id}`)} style={{ cursor: "pointer", textDecoration: "underline", color: "blue" }}>{items.jobTitle.toUpperCase()}</li>
                      <li className={`${styles.li} ${styles.JobType}`}>{items.jobtype}</li>

                      {/* <li className={`${styles.li} ${styles.liDescription}`}>
                   
                   {
                    items.jobDescription.map((descrip, di) => {
                      return (
                        <>
                          {
  
                                  descrip.text.slice(0,50)            
                          }
                        </>
                      )
                    }).slice(0,1)
                    }
                   
                  <span onClick={() => navigate(`/Jobdetails/${items._id}`)} className={styles.seeMore}>
                    ...read more
                  </span>
                </li> */}
                      <li className={`${styles.li} ${styles.date}`}>
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
                      <li className={`${styles.li} ${styles.qualification}`}>{items.qualification}</li>
                      <li className={`${styles.li} ${styles.Skills}`}>{items.skills}</li>

                      <li className={`${styles.li} ${styles.Status}`}>

                        {items.jobSeekerId.find((jobseeker) => {
                          return (
                            jobseeker == jobSeekerId
                          )
                        }) ?
                          <button className={styles.Appliedbutton} title='Successfully Applied, HR will get in with you, Once they check Your Profile' > Applied <span style={{ fontSize: '15px' }}>&#10004;</span></button>

                          :
                          // items .isApproved?
                          items.SourceLink ?
                            <button title='this will take to Source page' className={styles.Applybutton} onClick={() => {
                              applyforOtherJob(items.SourceLink)
                            }}>Apply</button>
                            :

                            <button className={styles.Applybutton} onClick={() => { applyforJob(items._id) }}>Apply
                              <span className={styles.Loader} >{Loader && items._id == clickedJobId ?
                                <TailSpin color="white" height={20} />
                                : ""}</span></button>
                          //  : <button className={styles.Applybutton} onClick={()=>{alert("You can not Apply for the job, Your account is under Approval Process")}} > Apply </button>
                        }
                      </li>
                    </ul>
                  )
                })
                : <p style={{ marginLeft: "47%", color: "red" }}>No Record Found</p>
            }
          </div>

          <div>
            Show  <select onChange={(e)=>{handleRecordchange(e)}}>
              <option value={10}>10</option>              
              <option value={25}>25</option>              
              <option value={50}>50</option>              
              <option value={100}>100</option>              
            </select>  jobs per page
          </div>

        </>
        :
        // Mobile View
        <>
        <div className={styles.searchBoth}>
        <p className={styles.p}>Search </p>
        <input className={styles.inputboxsearch} type="text" placeholder='Search for a Job / Skills / Location / Experiance' onChange={(e) => { search(e) }} />
      </div>
      {Result ?
        <h4 style={{ marginLeft: "18%", marginTop: "10px" }}> {jobs.length} matching Result Found  </h4>
        : ""
      }

  {/* ...................... All Filter for Mobile */}

  <div style={{ display: "flex", marginLeft: "18px" }}>
          <SwipeableViews style={{width:"100%"}}>    
    
<div style={{display:"flex"}}>
            <div className={styles.MobLocationFilterWrapper}>
              <label> <input className={styles.MobJobtitleFilter} type="radio" name="filter" onClick={() => { getjobs() }} />All</label>
              {
                JobLocationTags.map((location, i) => {
                  return (
                    <label> <input className={styles.MobJobtitleFilter} type="radio" disabled={location == "Chennai" || location == "Hyderabad" || location == "Mumbai" || location == "Delhi"} name="filter" onClick={() => { getLocation(location.toLowerCase()) }} />{location}</label>

                  )
                })
              }
            </div>

            <div className={styles.MobFilterJobTitleWrapper}>
              <label><input className={styles.MobJobtitleFilter} type="radio" name="filter" onClick={() => { getjobs() }} />All</label>
              {
                jobTags.map((tags, i) => {
                  return (
                    <label><input className={styles.MobJobtitleFilter} type="radio" name="filter"
                      onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                  )
                }).slice(0, 4)
              }
            </div>

            <div className={styles.MobFilterJobTitleWrapper}>
              {jobTags.map((tags, i) => {
                return (
                  <label><input className={styles.MobJobtitleFilter} type="radio" name="filter"
                    onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                )
              }).slice(4, 9)
              }
            </div>
            </div>
              
<div style={{display:"flex"}}>

             <div className={styles.MobFilterJobTitleWrapper}>
              {jobTags.map((tags, i) => {
                return (
                  <label><input className={styles.MobJobtitleFilter} type="radio" name="filter"
                  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                  )
                  }).slice(9, 14)
                  }
            </div>
            <div className={styles.MobFilterJobTitleWrapper}>
              {jobTags.map((tags, i) => {
                return (
                  <label><input className={styles.MobJobtitleFilter} type="radio" name="filter"
                    onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                )
              }).slice(14, 19)
              }
            </div>
            <div className={styles.MobFilterJobTitleWrapper}>
              {jobTags.map((tags, i) => {
                return (
                  <label><input className={styles.MobJobtitleFilter} type="radio" name="filter"
                    onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                )
              }).slice(19, 24)
              }
            </div>
            <div className={styles.MobFilterJobTitleWrapper}>
              {jobTags.map((tags, i) => {
                return (
                  <label><input className={styles.MobJobtitleFilter} type="radio" name="filter"
                    onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                )
              }).slice(24, 29)
              }
            </div>
            </div>

            
    </SwipeableViews>

          </div>


          {PageLoader ?
            <Puff height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{ marginLeft: "40%", marginTop: "50px" }} />
            : ""
          }
          <div id={styles.JobCardWrapper} >

            {
              jobs.length > 0 ?
                jobs.map((job, i) => {
                  return (
                    <>
                      <div className={styles.JobCard} key={i}>
                        <div className={styles.JobTitleDateWrapper}>
                          <p className={styles.jobTitle} onClick={() => {
                            window.scrollTo({
                              top: 0
                            })
                            navigate(`/Jobdetails/${job._id}`)
                          }} >{job.jobTitle.toUpperCase()}</p>
                          <p className={styles.Date}>{new Date(job.createdAt).toLocaleString(
                            "en-US",
                            {
                              month: "short",
                              day: "2-digit",
                              year: "numeric",
                            }
                          )} </p></div>
                        {/* <br></br> */}
                        <div className={styles.companyNameLocationWrapper}  >
                          <img className={styles.logo} src={job.Logo} />

                          {!job.Source ?

                            <> <span className={styles.companyName} onClick={() => { navigate(`/CheckEmpHalfProfile/${job.empId}`) }} >{job.companyName} </span><br></br></>
                            :
                            //  <> <span className={styles.companyName} onClick={()=>{checkEmpHalf(job.empId)}} >{job.companyName} </span><br></br></>
                            <> <a className={`${styles.companyName}`} href={job.SourceLink} target="_blank">{job.Source}</a><br></br> </>
                          }

                        </div>

                        <  img className={styles.jobLocationImage} src={location} />
                        <span className={styles.jobLocation}>{job.jobLocation[0].toUpperCase() + job.jobLocation.slice(1)}</span>
                        <span className={styles.qualificationAndExperiance}>
                          <  img className={styles.graduationImage} src={graduation} />

                          {job.qualification},   {job.experiance} Exp, {job.jobtype}
                          {/* <span className={styles.jobtypeAndDate}> {job.jobtype}</span> */}
                        </span><br></br>
                        <span className={styles.jobtypeAndDate}>Source</span> :

                        {/* {job.Source ?
                          <> <a className={`${styles.skills}`} href={job.SourceLink} target="_blank">{job.Source}</a><br></br> </>
                          : */}
                          <> <span className={styles.skills}>ItWalkin</span><br></br></>
                         {/* } */}

                        {/* </div> */}
                        {/* <div> */}
                        {/* <span className={styles.skillsHeading}>Skills: </span><span className={styles.skills}> {job.skills}</span><br></br> */}

                        <div className={styles.skillWrapper}>
                          <span className={styles.skillsHeading}>Skills: </span><span className={styles.skills}>{job.skills}</span><br></br>
                        </div>


                        <div className={styles.ApplyPackage}>
                          <p className={styles.salaryRange}><span>&#8377;</span>{job.salaryRange}</p>


                          {job.jobSeekerId.find((jobseeker) => {
                            return (
                              jobseeker == jobSeekerId
                            )
                          }) ?
                            <button className={styles.MobileAppliedButton} > Applied <span style={{ fontSize: '13.8px', marginBottom: "3px", marginLeft: "2px" }}>&#10004;</span></button>
                            :
                            // job .isApproved?
                            job.SourceLink ?
                              <button className={styles.ApplyMobile} onClick={() => {
                                applyforOtherJob(job.SourceLink)
                              }}>Apply</button>
                              :
                              <button className={styles.ApplyMobile} onClick={() => { applyforJob(job._id) }}>Apply
                                <span className={styles.Loader} >{Loader && job._id == clickedJobId ?
                                  <TailSpin color="white" height={20} />
                                  : ""}</span></button>
                            // :      <button className={styles.ApplyMobile} onClick={()=>{alert("You can not Apply for the job, Your account is under Approval Process")}} > Apply </button>

                          }
                        </div>
                        <p className={styles.jobDescriptionHeading}>Job Description:</p>
                        <p className={styles.jobDescription}>
                          {
                            job.jobDescription.map((descrip, di) => {
                              return (
                                <>
                                  {

                                    descrip.text.slice(0, 50)

                                  }
                                </>
                              )
                            }).slice(0, 1)
                          }
                          <span onClick={() => {
                            window.scrollTo({
                              top: 0
                            })
                            navigate(`/Jobdetails/${job._id}`)
                          }} className={styles.seeMore}>
                            ...read more
                          </span>
                        </p>
                      </div>
                    </>
                  )
                })
                : <p style={{ marginLeft: "35%", color: "red" }}>No Record Found</p>

            }

          </div>
        </>

      }
    </>

  )
}

export default AllJobs
