import React from 'react'
import { useEffect, useState } from 'react'
import styles from "./AllJobsForAdmin.module.css"
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate, BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import useScreenSize from '../SizeHook';
import location from "../img/icons8-location-20.png" 



function AllJobsForAdmin() {
  let navigate = useNavigate()

  const [user, setUser] = useState([
    { id: 1, name: "Peter", surname: "Robinson", checked: false },
    { id: 2, name: "Ann", surname: "Walker", checked: false },
    { id: 3, name: "James", surname: "Allen", checked: false }
  ]);

  const toggleCheck = (id) => {
    const checkedIdx = user.findIndex((u) => u.id === id);
    if (checkedIdx === -1) return;
    const updatedUser = [...user];
    updatedUser[checkedIdx].checked = !updatedUser[checkedIdx].checked;
    setUser(updatedUser);
  };

  const remove = () => {
    setUser([...user].filter((u) => !u.checked));
  };

  useEffect(()=>{
    let adminLogin= localStorage.getItem("SupAdMLog")
        if(!adminLogin){
            navigate("/")
        }
    },[])

    const [AllJobs, setAllJobs] = useState([])
    const [Result, setResult] = useState(false)
  let jobSeekerId = JSON.parse(localStorage.getItem("StudId"))
const screenSize = useScreenSize();

      
    async function getjobs() {
      let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
      const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
      await axios.get("/jobpost/getjobs", {headers})
      .then((res) => {
        let result = (res.data)
       
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setAllJobs(sortedate)  
      })
    }
  
    useEffect(() => {
      getjobs()
    }, [])

    async function DeleteJob(id){
      
      Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
      
       axios.delete(`/jobpost/deleteJob/${id}`)
      .then((res)=>{
        
      getjobs()
      }).catch((err)=>{
          alert("server error occured")
      })
    }
  })
    }

    async function search(e) {
      let key = e.target.value
      if (key) {
        setResult(true)
        let dubmyjobs = [...AllJobs]
  
        const filteredItems = dubmyjobs.filter((user) =>
          JSON.stringify(user).toLowerCase().includes(key.toLowerCase())
        )
        setAllJobs(filteredItems)
      } else {
        getjobs()
        setResult(false)

      }
    }
const [checkBoxValue, setCheckBoxValue]=useState([])
    function checkBox(e){
      console.log(e)
    }

  return (
    <>
    <div className={styles.searchBoth}>
            <p className={styles.p}>Search </p>
            <input className={styles.inputboxsearch} type="text" placeholder='Search for a Job / Skills / Location / Experiance' onChange={(e) => { search(e) }} />
          </div>
          {Result?
            <h4 style={{marginLeft:"18%", marginTop:"10px"}}> {AllJobs.length} matching Result Found  </h4>
            :""
}
          
    {screenSize.width>850?

    <div style={{marginLeft:"7px"}} className={styles.Uiwarpper}>
              <ul className={styles.ul}>
                <li className={`${styles.li} ${styles.CompanyName}`}><b>Company Name</b></li>
                <li  className={`${styles.li} ${styles.Jtitle}`}><b>Job Title</b></li>
                <li className={`${styles.li} ${styles.JobType}`}><b>JobType</b></li>

                <li className={`${styles.li} ${styles.liDescription}`}><b>Job description</b></li>
                <li className={`${styles.li} ${styles.Pdate}`}><b>Posted Date</b></li>

                <li className={`${styles.li} ${styles.Location}`}><b>Location</b></li>
                <li className={`${styles.li} ${styles.Package}`}><b>Salary /Year </b></li>
                <li className={`${styles.li} ${styles.experiance}`}><b>Exp </b></li>
                <li className={`${styles.li} ${styles.Qualif}`}><b>Qualif </b></li>

                <li className={`${styles.li} ${styles.Skills}`}><b>Skills Required</b></li>
                <li className={`${styles.li} ${styles.DeleteAction}`} ><b>Action</b></li>


              </ul>
              {
     AllJobs.length > 0 ?

     AllJobs.map((items, i) => {
                  return (

                    <ul className={styles.ul}>

 <li className={`${styles.li} ${styles.CompanyName}`}>{items.Logo ?
                        < img style={{ width: "38px", height: "38px" }} src={items.Logo} />
                        : ""}<br></br>{items.companyName}</li>
                      <li className={`${styles.li} ${styles.Jtitle}`}>{items.jobTitle}</li>
                <li className={`${styles.li} ${styles.JobType}`}>{items.jobtype}</li>

                      <li className={`${styles.li} ${styles.liDescription}`}>
                         {/* {items.jobDescription.slice(0,60)} 
<span style={{color:"blue"}} onClick={()=>{navigate(`/Jobdetails/${items._id}`)}}>...see more</span> */}
{
                    items.jobDescription.map((descrip, di) => {
                      return (
                        <>
                          {

                                descrip.text.slice(0,60)            
                          }
                        </>
                      )
                    }).slice(0,1)
                    }
                      
                        <span onClick={() => navigate(`/Jobdetails/${items._id}`)} style={{color:"blue"}} className={styles.seeMore}>
                          ...read more
                        </span>
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
                      <li className={`${styles.li} ${styles.Location}`}>{items.jobLocation}</li>
                      <li className={`${styles.li} ${styles.Package}`}>{items.salaryRange}</li>
                      <li className={`${styles.li} ${styles.experiance}`}>{items.experiance}</li>
                <li className={`${styles.li} ${styles.Qualif}`}>{items.qualification} </li>

                      <li className={`${styles.li} ${styles.Skills}`}>{items.skills}</li>
                     <li  className={`${styles.li} ${styles.DeleteAction}`} >
                      <button className={styles.DeleteButton} onClick={()=>{DeleteJob(items._id)}} >Delete</button></li>
                      {/* <input type="checkbox" style={{marginTop:"-25px",}} onChange={() => toggleCheck(items._id)} */}
                          </ul>
                  )
                })
: 
<>
<p style={{ color: "red", marginLeft: "42%" }}>No Record Found</p>
</>
              }


            </div>
            :
            <>
  
     <div id={styles.JobCardWrapper} >

{
     AllJobs.length > 0 ?

AllJobs.map((job, i) => {
  return (
    <>
           <div className={styles.JobCard} key={i}>
            <div style={{ display: "flex", marginTop: "5px" }}>
              <img className={styles.logo} src={job.Logo} />
              <span className={styles.companyName}>{job.companyName}</span>
            </div>
            <  img className={styles.jobLocationImage} src={location}  /> <span className={styles.jobLocation}>{job.jobLocation}</span><br></br>
            <span className={styles.jobTitle}>{job.jobTitle}</span><br></br>
            <span className={styles.jobtypeAndDate}> {job.jobtype}, {new Date(job.createdAt).toLocaleString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            )} </span><br></br>
            <span className={styles.qualificationAndExperiance}>{job.qualification}, {job.experiance} Experience </span><br></br>
            <div className={styles.skillWrapper}>
            <span className={styles.skillsHeading}>Skills: </span><span className={styles.skills}> {job.skills}</span><br></br>
            </div>
            <p className={styles.salaryRange}>Package : <span>&#8377;</span>{job.salaryRange}</p>
                 <p className={styles.jobDescriptionHeading}>Job Description:</p>
            <p className={styles.jobDescription}> 
            {/* {job.jobDescription} */}
            {
                    job.jobDescription.map((descrip, di) => {
                      return (
                        <>
                          {
                            descrip.type == "unordered-list-item" ?
            
                              <ul style={{ listStyleType: "disc" }}>
                                <li>
                                  {descrip.text}
            
                                </li>
                              </ul>
            
                              : descrip.type == "ordered-list-item" ?
            
                                <ol >
                                  {/* <li> */}
                                    {descrip.text}
            
                                  {/* </li> */}
                                </ol>
                                :
                                <>
                                  {descrip.text}
                                  <br></br>
                                </>
            
                          }
                        </>
                      )
                    }).slice(0,3)
                    }
                      
                        <span onClick={() => navigate(`/Jobdetails/${job._id}`)} style={{color:"blue"}} className={styles.seeMore}>
                          ...read more
                        </span>

            
               </p>         
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

export default AllJobsForAdmin