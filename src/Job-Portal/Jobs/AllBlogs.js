import React, { useState, useEffect, useRef } from 'react';

import styles from "./Allobs.module.css"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Puff } from 'react-loader-spinner'
import location from "../img/icons8-location-20.png"
import graduation from "../img/icons8-graduation-cap-40.png"
import useScreenSize from '../SizeHook';
// import {SwipeableViews} from 'react-swipeable-views-v18';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Footer from '../Footer/Footer';
import {jobTags} from '../Tags'
import HTMLReactParser from 'html-react-parser'


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 14
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};


function Blogs() {

  const [jobs, setJobs] = useState([])

  const [nopageFilter, setNoPageFilter] = useState(false)
  const [Filtereredjobs, setFiltereredjobs] = useState([])

  const [Filterjobs, setFilterjobs] = useState([])

  const [isReadMore, setIsReadMore] = useState(true)
  const [showJobs, setshowJobs] = useState(false)
  const [showExperiance, setshowExperiance] = useState(false)
  const [showPackage, setshowPackage] = useState(false)
  const [PageLoader, setPageLoader] = useState(false)
  const [Result, setResult] = useState(false)
  const [NotFound, setNotFound] = useState("")
  const [Active, setActive] = useState([])
  const screenSize = useScreenSize();

  // let AgeTags = [
 
  // let jobTags = [

    
  //   ]

  let JobLocationTags = ["Bangalore"]

  let EmployeeAuth = localStorage.getItem("EmpLog")
  let StudentAuth = localStorage.getItem("StudLog")



  let navigate = useNavigate()

  // useEffect(() => {
  //   let EmployeeAuth = localStorage.getItem("EmpLog")
  //   if (EmployeeAuth) {
  //     navigate("/postedjobs")
  //   }
  // }, [])

  // useEffect(() => {
  //   let studentAuth = localStorage.getItem("StudLog")
  //   if (studentAuth) {
  //     navigate("/alljobs")
  //   }
  // }, [])
  // useEffect(() => {
  //   let adminLogin = localStorage.getItem("AdMLog")
  //   if (adminLogin) {
  //     navigate("/BIAddmin@Profile")
  //   }
  // }, [])

  let recordsperpage = JSON.parse(sessionStorage.getItem("recordsperpageHome"))

  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setrecordsPerPage] = useState(recordsperpage ? recordsperpage : 10)

  const lastIndex = currentPage * recordsPerPage //10
  const firstIndex = lastIndex - recordsPerPage //5
  const records = jobs.slice(firstIndex, lastIndex)//0,5
  const npage = Math.ceil(jobs.length / recordsPerPage) // last page
  const number = [...Array(npage + 1).keys()].slice(1)


  async function getjobs() {
    setCount(1)
    setActive([])
    setPageLoader(true)
    setNoPageFilter(false)
    const headers = { authorization: 'BlueItImpulseWalkinIn' };
    await axios.get("/BlogRoutes/getAllBlogs", { headers })
      .then((res) => {
        let result = res.data
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
        setFilterjobs(sortedate)
        setPageLoader(false)
      }).catch((err) => {
        alert("some thing went wrong")
      })
  }
  useEffect(() => {
    getjobs()
  }, [])

  async function applyforJob(id) {
    navigate("/JobSeekerLogin", { state: { Jid: id } })
    // window.open(`${Link}`)
  }
  async function applyforOtherJob(Link) {
    // navigate("/JobSeekerLogin", { state: { Jid: id } })
    window.open(`${Link}`)
  }

  // ...................search..........

  // async function search(e) {
  //   let key = e.target.value

  //   await axios.get(`https://itwalkin-backend.onrender.com/jobpost/searchJob/${key}`)
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
  function checkEmpHalf(empId, e) {

    navigate(`/CheckEmpHalfProfile/${empId}`)

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
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
        // setPageLoader(false)
      }).catch((err) => {
        alert("some thing went wrong")
      })
  }


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

  function handleRecordchange(e) {
    sessionStorage.setItem("recordsperpageHome", JSON.stringify(e.target.value));
    let recordsperpage = JSON.parse(sessionStorage.getItem("recordsperpageHome"))
    setrecordsPerPage(recordsperpage)
    setCurrentPage(1)
  }

  const [count, setCount]=useState(1)

  async function filterByJobTitle(key) {

    if(count==1){
      setJobs("")

    }
    setCount(prev=>prev+1)

    const isIndex=Active.findIndex((present)=>{
return(
  present===key
)
    })
    if(isIndex<0){
    setActive([...Active, key])
    }else{
      const IndexId=Active.findIndex((present)=>{
        return(
          present==key
        )
            })
            Active.splice(IndexId,1)
                if(Active.length===0){
      getjobs()
    }
    if(jobs.length>0){
         let removedItems = jobs.filter((tags)=>{
            return( 
              !tags.Tags.includes(key)
              // !tags.Tags.map((value)=>{
              //   return(
              //   value.value
              //   )
              // }).includes(key)    
        )
      }) 
      setJobs(removedItems)
      return false
    }
  }

    setNoPageFilter(true)
    setFiltereredjobs(key)
    await axios.get(`/BlogRoutes/getTagsJobs/${key}`)
      .then( (res) => {
        let result = (res.data)
        let sortedate = result.sort( (a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        let elements=  sortedate.flatMap(element => {
          setJobs(oldArray => [...oldArray,element] )
     });
      })
  }

  async function getLocation(jobLocation) {
    setCount(1)
    setActive(["Banglore"])
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

  return (
    <>

      {screenSize.width > 850 ?
        <>
        {
         ! EmployeeAuth?
        <div className={styles.BlogNavConetenetWrapper}>


          <div className={styles.LocationFilterWrapper}>
            {
              JobLocationTags.map((location, i) => {
                return (
                  <>
                  <label className={styles.JobLocationFilter}>
                  <input type="radio" checked disabled={location == "Chennai" ||
                  location == "Hyderabad" || location == "Mumbai" || location == "Delhi"} name="filter" onClick={() => 
                      { getjobs() }} />{location}</label><br></br>
                      </>
                )
              })
            }
          </div>          
          <div className={styles.searchBothForNavWrapper}>
            <input className={styles.inputboxsearchNav} type="text" placeholder='Search for a Job / Skills / Location / Experiance' onChange={(e) => { search(e) }} />

            <i style={{ color: "rgb(40, 4, 99)", fontSize: "18px", cursor: "pointer" , marginLeft:"2%"}} onClick={() => { searchIcon(searchKey) }}
              class="fa fa-search" ></i>
          </div>
          </div>
          :""
          }
          {Result ?
            <h4 style={{ marginLeft: "40%", marginTop: "20px" }}> {jobs.length} matching Result Found  </h4>
            : ""
          }
        </>
        : ""
      }


      {screenSize.width > 850 ?
        <>
        {/* <p style={{ color: " red", marginLeft: "4%" , zIndex: "100",}}>Note: this website is under development process</p> */}
        <p style={{marginLeft:"5%", fontWeight:"800", marginTop:"15px", marginBottom:"-15px"}}>Blogs</p>

          <div className={styles.JobtitleFilterWrapper}>
            <buton className={ Active.length===0? styles.active:styles.JobtitleFilter} onClick={() => { getjobs() }}>All</buton>
            {
              jobTags.map((tags, i) => {
                return (
                                   
                  <button disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                    tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                    className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                    tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                    styles.TagHeading: 
                    //  Active === tags.value ? 
                    Active.findIndex(  (present)=>{
                      return(
                        present===tags.value
                      )
                          }) >=0?
                     styles.active : styles.JobtitleFilter} onClick={ () => {  filterByJobTitle(tags.value) }}>{tags.value} </button>
                
                  )
              })
            }
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {nopageFilter ?
              <p style={{ fontWeight: 400, marginLeft: "10px" }}>Displaying Jobs with following matching tags:
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
          <div style={{ marginBottom: "5px", marginTop: "0", marginLeft: "10px" }}>
            Show  <select onChange={(e) => { handleRecordchange(e) }}>
              {/* <option value={""}>{recordsPerPage}</option> */}
              <option selected={lastIndex === 10} value={10}>10</option>
              <option selected={lastIndex === 25} value={25}>25</option>
              <option selected={lastIndex === 50} value={50}>50</option>
              <option selected={lastIndex === 100} value={100}>100</option>
            </select>  jobs per page
          </div>
          {/* <button >Previous</button>
          { number.map((job,index)=>{
              return(
                <button onClick={()=>{changeCurrent(job)}}>{job}</button>
              )
            })      }
          <button >Next</button>  */}

          <div className={styles.Uiwarpper}>
            <ul className={styles.ul} style={{ color: 'white', fontWeight: "bold" }}>
              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.BlogJtitle}`}>Blog Title</li>
              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.BlogSource}`}>Source</li>
              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.BlogCompanyName}`}>Company Name</li>
              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.BlogCompanyName}`}>Posted by</li>
              {/* <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.BlogDescription}`}><b>Blog description</b></li> */}
              <li style={{ backgroundColor: " rgb(40, 4, 99)", }} className={`${styles.li} ${styles.Blogdate}`}>Posted Date
                <p className={styles.arrowWrapper} >
                  <i onClick={sortbyNewjobs} className={`${styles.arrow} ${styles.up}`} ></i>
                  <i onClick={sortbyOldjobs} className={`${styles.arrow} ${styles.down}`}></i>
                </p>
              </li>
              {/* <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.Location}`}>Location</li>

              <li style={{ backgroundColor: " rgb(40, 4, 99)", }} className={`${styles.li} ${styles.Package}`}>CTC
                <p className={styles.arrowWrapper}>

                  <i onClick={SdescendingOrder} className={`${styles.arrow} ${styles.up}`}> </i>
                  <i onClick={SascendingOrder} className={`${styles.arrow} ${styles.down}`}></i>
                </p>
              </li>

              <li style={{ backgroundColor: " rgb(40, 4, 99)", }} className={`${styles.li} ${styles.experiance}`}>Experience
                <p className={styles.arrowWrapper}>

                  <i onClick={EdescendingOrder} className={`${styles.arrow} ${styles.up}`}> </i>
                  <i onClick={EascendingOrder} className={`${styles.arrow} ${styles.down}`}></i>
                </p>
              </li>
              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.qualification}`}>Qualification</li>


              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.Skills}`}>Skills Required</li>
              */}
              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.BlogApply}`}>Check</li>

            </ul>
            {PageLoader ?
              <Puff height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{ marginLeft: "49%", marginTop: "50px" }} />
              : ""
            }
            {!nopageFilter ?
              records.length > 0 ?
                records.map((items, i) => {
                  return (

                    <ul className={styles.ul} key={i}>
                      {/* } */}

                      <li className={`${styles.li} ${styles.BlogJtitle}`} onClick={() => navigate(`/Blogdetails/${btoa(items._id)}`)} style={{ cursor: "pointer", textDecoration: "underline", color: "blue" }}>{items.jobTitle}</li>
                       <li className={`${styles.li} ${styles.BlogSource}`} >Itwalkin</li>
                     
                          <li style={{ cursor: "pointer", textDecoration: "underline" }} className={`${styles.li} ${styles.BlogCompanyName}`}
                            onClick={(e) => { checkEmpHalf(btoa(items.empId)) }}  >

                            {items.companyName}
                            </li>
                          <li style={{ cursor: "pointer", textDecoration: "underline" }} className={`${styles.li} ${styles.BlogCompanyName}`} >

                            {items.name}
                            </li>
                          

                      {/* <li className={`${styles.li} ${styles.BlogDescription}`}>
                          {
    items.jobDescription? HTMLReactParser(items.jobDescription.slice(0,150).toString()) :""
                          }  
                          <span onClick={() => navigate(`/Blogdetails/${btoa(items._id)}`)} className={styles.seeMore}>
                            ...read more
                          </span>
                        </li> */}
                      <li className={`${styles.li} ${styles.Blogdate}`}>
                        {new Date(items.createdAt).toLocaleString(
                          "en-US",
                          {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </li>
                      {/* <li className={`${styles.li} ${styles.Location}`}>{items.jobLocation[0].toUpperCase() + items.jobLocation.slice(1)}</li>
                      <li className={`${styles.li} ${styles.Package}`}>{items.salaryRange}L</li>
                      <li className={`${styles.li} ${styles.experiance}`}>{items.experiance}Y</li>
                      <li className={`${styles.li} ${styles.qualification}`}>{items.qualification}</li>
                      <li className={`${styles.li} ${styles.Skills}`}>{items.skills} </li> */}

                      <li className={`${styles.li} ${styles.BlogApply}`}>
                        
                          <button className={styles.BlogApplybutton} onClick={() => navigate(`/Blogdetails/${btoa(items._id)}`)}>Check</button>
                        
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

<li className={`${styles.li} ${styles.BlogJtitle}`} onClick={() => 
  navigate(`/Blogdetails/${btoa(items._id)}`)} style={{ cursor: "pointer", textDecoration: "underline", color: "blue" }}>{items.jobTitle}</li>
                                            <li className={`${styles.li} ${styles.BlogSource}`} >Itwalkin</li>

                                            <li style={{ cursor: "pointer", textDecoration: "underline" }} className={`${styles.li} ${styles.BlogCompanyName}`}
                            onClick={(e) => { checkEmpHalf(btoa(items.empId)) }}  >

                            {items.companyName}
                            </li>

                    
                          <li style={{ cursor: "pointer", textDecoration: "underline" }} className={`${styles.li} ${styles.BlogCompanyName}`} >
                          
                            {items.name}</li>
         
                      {/* <li className={`${styles.li} ${styles.BlogDescription}`}>
                          {
    items.jobDescription? HTMLReactParser(items.jobDescription.slice(0,150).toString()) :""
                          }
  
                          <span onClick={() => navigate(`/Blogdetails/${btoa(items._id)}`)} className={styles.seeMore}>
                            ...read more
                          </span>
                        </li> */}
                      <li className={`${styles.li} ${styles.Blogdate}`}>
                        {new Date(items.createdAt).toLocaleString(
                          "en-US",
                          {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </li>
                      {/* <li className={`${styles.li} ${styles.Location}`}>{items.jobLocation[0].toUpperCase() + items.jobLocation.slice(1)}</li>
                      <li className={`${styles.li} ${styles.Package}`}>{items.salaryRange}L</li>
                      <li className={`${styles.li} ${styles.experiance}`}>{items.experiance}Y</li>
                      <li className={`${styles.li} ${styles.qualification}`}>{items.qualification}</li>
                      <li className={`${styles.li} ${styles.Skills}`}>{items.skills}</li> */}

                      <li className={`${styles.li} ${styles.BlogApply}`}>
                        <button className={styles.BlogApplybutton} onClick={() => { applyforJob(items._id) }}>Check</button>
                    </li>
                  </ul>
                  )
                })
                : <p style={{ marginLeft: "47%", color: "red" }}>No Record Found</p>
            }
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ marginTop: "14px", marginLeft: "10px" }} >
              Show  <select onChange={(e) => { handleRecordchange(e) }}>
                <option selected={lastIndex === 10} value={10}>10</option>
                <option selected={lastIndex === 25} value={25}>25</option>
                <option selected={lastIndex === 50} value={50}>50</option>
                <option selected={lastIndex === 100} value={100}>100</option>
              </select>  jobs per page
            </div>

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
{/*           
          <div style={{marginTop:"200px", position:"sticky", bottom:0}}>
          <Footer/>
        </div> */}

        </>
        // Mobile View
        :
        <>
    <p style={{marginLeft:"5%", fontWeight:"800", marginTop:"15px", marginBottom:"-15px"}}>Blogs</p>

          <div className={styles.searchBoth}>
            <p className={styles.p}>Search </p>
            <input className={styles.inputboxsearch} type="text" placeholder='Search for a Job / Skills / Location / Experiance' onChange={(e) => { search(e) }} />
          </div>
          {Result ?
            <h4 style={{ marginLeft: "18.5%", marginTop: "10px" }}> {jobs.length} matching Result Found  </h4>
            : ""
          }
          {/* ...................... All Filter for Mobile */}
          {
          (!EmployeeAuth)?
            <div className={styles.MobLocationFilterWrapper}>
                {
                  JobLocationTags.map((location, i) => {
                    return (
                  !StudentAuth? <label> <input className={styles.MobJobtitleFilter} checked type="radio" disabled={location == "Chennai" || location == "Hyderabad" || location == "Mumbai" || location == "Delhi"} name="filter" onClick={() => { getLocation(location.toLowerCase()) }} />{location}</label>
                  :""
                    )
                  })
                }
              </div>             
                           
              :""
              }

          <Carousel
            swipeable={true}
            draggable={false}
            responsive={responsive}
            autoPlay={false}
            autoPlaySpeed={4000}
            keyBoardControl={true}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            containerClass="carousel-container"
            infinite={true}
            removeArrowOnDeviceType={["tablet", "mobile"]}
          >

            <div style={{ display: "flex" }}>
              

              <div className={styles.MobFilterJobTitleWrapper}>
                <label><input className={styles.MobJobtitleFilter} type="radio" name="filter" onClick={() => { getjobs() }} />All</label>
                {
                  jobTags.map((tags, i) => {
                    return (
                      <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                        tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                        className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                        tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                        styles.TagHeading: styles.MobJobtitleFilter} 
                        type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                   
                      )
                  }).slice(0, 4)
                }
              </div>

              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                      className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                      styles.TagHeading: styles.MobJobtitleFilter} 
                      type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                 
                  )
                }).slice(4, 9)
                }
              </div>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                      className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                      styles.TagHeading: styles.MobJobtitleFilter} 
                      type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                 
                  )
                }).slice(9, 14)
                }
              </div>
            </div>

            {/* ....up to here is 1st div i.e button in 1st display and now from down here is 2nd div..i.e 2nd display..................................... */}
            <div style={{ display: "flex" }}>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                      className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                      styles.TagHeading: styles.MobJobtitleFilter} 
                      type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                 
                  )
                }).slice(14, 19)
                }
              </div>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                      className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                      styles.TagHeading: styles.MobJobtitleFilter} 
                      type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                 
                  )
                }).slice(19, 24)
                }
              </div>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                      className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                      styles.TagHeading: styles.MobJobtitleFilter} 
                      type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                 
                  )
                }).slice(24, 29)
                }
              </div>
            </div>
            {/* ....from down here is 3rd div..i.e 3rd display..................................... */}
            <div style={{ display: "flex" }}>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                      className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                      styles.TagHeading: styles.MobJobtitleFilter} 
                      type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                 
                  )
                }).slice(29, 34)
                }
              </div>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                      className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                      styles.TagHeading: styles.MobJobtitleFilter} 
                      type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                 
                  )
                }).slice(34, 39)
                }
              </div>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                      className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                      styles.TagHeading: styles.MobJobtitleFilter} 
                      type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                 
                  )
                }).slice(39, 44)
                }
              </div>
            </div>
            {/* .................from down here is 4th div..i.e 4th display....................... */}
            <div style={{ display: "flex" }}>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                      className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                      styles.TagHeading: styles.MobJobtitleFilter} 
                      type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                 
                  )
                }).slice(44, 49)
                }
              </div>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                      className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                      styles.TagHeading: styles.MobJobtitleFilter} 
                      type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                 
                  )
                }).slice(49,54)
                }
              </div>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                      className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                      styles.TagHeading: styles.MobJobtitleFilter} 
                      type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                 
                  )
                }).slice(54, 59)
                }
              </div>
            </div>
            {/* .................from down here is 5th div..i.e 5th display....................... */}

            <div style={{ display: "flex" }}>              

              <div className={styles.MobFilterJobTitleWrapper}>
                {
                  jobTags.map((tags, i) => {
                    return (
                      <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                        tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                        className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                        tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                        styles.TagHeading: styles.MobJobtitleFilter} 
                        type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                   
                      )
                  }).slice(59, 64)
                }
              </div>

              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                      className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                      styles.TagHeading: styles.MobJobtitleFilter} 
                      type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                 
                  )
                }).slice(64, 69)
                }
              </div>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                      className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                      styles.TagHeading: styles.MobJobtitleFilter} 
                      type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                 
                  )
                }).slice(69, 74)
                }
              </div>
            </div>

            {/* ....ufrom down here is 6th div..i.e 6th display..................................... */}
            <div style={{ display: "flex" }}>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                      className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                      styles.TagHeading: styles.MobJobtitleFilter} 
                      type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                 
                  )
                }).slice(74, 79)
                }
              </div>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                      className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                      styles.TagHeading: styles.MobJobtitleFilter} 
                      type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                 
                  )
                }).slice(79, 84)
                }
              </div>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                      className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                      styles.TagHeading: styles.MobJobtitleFilter} 
                      type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                 
                  )
                }).slice(84, 89)
                }
              </div>
            </div>
            {/* ....from down here is 7th div..i.e 7th display..................................... */}
            <div style={{ display: "flex" }}>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                      className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                      styles.TagHeading: styles.MobJobtitleFilter} 
                      type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                 
                  )
                }).slice(89, 94)
                }
              </div>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                      className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                      styles.TagHeading: styles.MobJobtitleFilter} 
                      type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                 
                  )
                }).slice(94, 99)
                }
              </div>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                      className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                      styles.TagHeading: styles.MobJobtitleFilter} 
                      type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                 
                  )
                }).slice(99, 104)
                }
              </div>
            </div>
            {/* .................from down here is 8th div..i.e 8th display....................... */}
            <div style={{ display: "flex" }}>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                      className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                      styles.TagHeading: styles.MobJobtitleFilter} 
                      type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                 
                  )
                }).slice(104, 109)
                }
              </div>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                      className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                      styles.TagHeading: styles.MobJobtitleFilter} 
                      type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                 
                  )
                }).slice(109,114)
                }
              </div>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                      className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                      styles.TagHeading: styles.MobJobtitleFilter} 
                      type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                 
                  )
                }).slice(114, 119)
                }
              </div>
            </div>
            {/* .................from down here is 9th div..i.e 9th display....................... */}

            <div style={{ display: "flex" }}>
              
              <div className={styles.MobFilterJobTitleWrapper}>
                {
                  jobTags.map((tags, i) => {
                    return (
                      <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                        tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                        className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                        tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                        styles.TagHeading: styles.MobJobtitleFilter} 
                        type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                                         )
                  }).slice(119, 124)
                }
              </div>

              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                      className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                      styles.TagHeading: styles.MobJobtitleFilter} 
                      type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                 
                  )
                }).slice(124, 129)
                }
              </div>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                      className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                      styles.TagHeading: styles.MobJobtitleFilter} 
                      type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                 
                  )
                }).slice(129, 134)
                }
              </div>
            </div>

            {/* ....from down here is 10th div..i.e 10th display..................................... */}
            <div style={{ display: "flex" }}>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                      className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                      styles.TagHeading: styles.MobJobtitleFilter} 
                      type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                 
                  )
                }).slice(134, 139)
                }
              </div>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                      className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                      styles.TagHeading: styles.MobJobtitleFilter} 
                      type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                 
                  )
                }).slice(139, 144)
                }
              </div>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                      className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                      styles.TagHeading: styles.MobJobtitleFilter} 
                      type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                 
                  )
                }).slice(144, 149)
                }
              </div>
            </div>
            {/* ....from down here is 11th div..i.e 11th display..................................... */}
            <div style={{ display: "flex" }}>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                      className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                      styles.TagHeading: styles.MobJobtitleFilter} 
                      type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                 
                  )
                }).slice(149, 154)
                }
              </div>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                      className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                      styles.TagHeading: styles.MobJobtitleFilter} 
                      type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                 
                  )
                }).slice(154, 159)
                }
              </div>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                      className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                      tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                      styles.TagHeading: styles.MobJobtitleFilter} 
                      type= "radio" name="filter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                 
                  )
                }).slice(159, 164)
                }
              </div>
            </div>

            
          </Carousel>
          {/* <div style={{ display: "flex", marginLeft: "18px" }}>
          
            <div >
              <label> <input type="radio" name="location" checked={jobLocation === 'AllL'} onClick={() => { getjobsAllLoc(); setjobLocation("AllL") }} />All</label><br></br>
              <label> <input type="radio" name="location" checked={jobLocation === 'banglore'} onClick={() => { getLocation("banglore"); setjobLocation('banglore') }} />Banglore</label><br></br>
              <label> <input type="radio" name="location" disabled checked={jobLocation === 'chennai'} onClick={() => { getLocation("chennai"); setjobLocation('chennai') }} />Chennai</label><br></br>
              <label> <input type="radio" name="location" disabled checked={jobLocation === 'hyderabad'} onClick={() => { getLocation("hyderabad"); setjobLocation('hyderabad') }} />Hyderabad</label><br></br>
              <label> <input type="radio" name="location" disabled checked={jobLocation === 'mumbai'} onClick={() => { getLocation("mumbai"); setjobLocation('mumbai') }} />Mumbai</label><br></br>
              <label> <input type="radio" name="location" disabled checked={jobLocation === 'delhi'} onClick={() => { getLocation("delhi"); setjobLocation('delhi') }} />Delhi</label>
            </div>
            <br></br>

            <div >
              <label><input type="radio" name="jobtitle" onClick={() => { getjobTitleAll('all'); setjobTitle("all") }} />All</label>            <br></br>
              <label><input type="radio" name="jobtitle" onClick={() => { { jobLocation !== "AllL" ? getBothFiltered('java') : JobtitleFilter('java') } }} />Java developer</label> <br></br>
              <label><input type="radio" name="jobtitle" onClick={() => { { jobLocation !== "AllL" ? getBothFiltered('full') : JobtitleFilter('full') } }} />Full Stack Developer</label> <br></br>
              <label><input type="radio" name="jobtitle" onClick={() => { { jobLocation !== "AllL" ? getBothFiltered('front') : JobtitleFilter('front') } }} />Frontend Developer</label><br></br>
              <label><input type="radio" name="jobtitle" onClick={() => { { jobLocation !== "AllL" ? getBothFiltered('back') : JobtitleFilter('back') } }} />Backend developer</label> <br></br>
              <label><input type="radio" name="jobtitle" onClick={() => { { jobLocation !== "AllL" ? getBothFiltered('python') : JobtitleFilter('python') } }} />Python Developer</label>
            </div>
          </div> */}


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
                            navigate(`/Blogdetails/${btoa(job._id)}`)
                            
                          }} >{job.jobTitle.toUpperCase()} </p>
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
                        <div className={styles.companyNameLocationWrapper}   >
                          <img className={styles.logo} src={job.Logo} />

                             <span className={styles.companyName} onClick={() => { navigate(`/Blogdetails/${btoa(job._id)}`) }} >{job.companyName} </span>

                             <span className={styles.jobtypeAndDate}>Posted by</span> :
                             <> <span className={styles.skills}>{job.name}</span><br></br></>                          

                        </div>
                             <span className={styles.jobtypeAndDate}>Source</span> :
<> <span className={styles.skills}>ItWalkin</span><br></br></>                          

                        <p className={styles.jobDescriptionHeading}>Job Description:</p>
                        <p className={styles.jobDescription} style={{marginTop:"-6px"}}>

                          {
    job.jobDescription? HTMLReactParser(job.jobDescription.slice(0,300).toString()) :""

                          }
                          <span onClick={() => {
                            window.scrollTo({
                              top: 0
                            })
                            navigate(`/Blogdetails/${btoa(job._id)}`)
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
          <div style={{marginTop:"20px",}}>
            <Footer/>
            </div>
        </>
      }

    </>

  )
}

export default Blogs

// .......cards.......

{/* <div className={styles.carwrapper}>
              {jobs.map((items, i) => {
                return (
                  <div className={styles.card}>
                    <div className={styles.AlltexWrapper}>
                      <p className={styles.text}>Job Title :{items.jobTitle}</p>
                      <p className={styles.text}>Job Location:</p><a>{items.jobLocation.toUpperCase()}</a>
                      <p className={styles.text}> Package : {items.salaryRange}</p>
                      <p className={styles.text}> Experiance Required :{items.experiance}</p>
                      <p className={styles.text}> Skills Required :{items.skills}</p>
                      <div className={styles.descriptionAndApply}>
                        <p className={styles.description}>
                          ......... {items.jobDescription} ........
                          {items.jobDescription.slice(0, 60)}
                          <span onClick={() => navigate(`/Jobdetails/${items._id}`)} className={styles.seeMore}>
                            ...read more
                          </span>
                        </p>
                        <button className={styles.button} onClick={applyforJob}>Apply </button>
                      </div>
                    </div>
                  </div>
                )
              })
              }
            </div> */}
