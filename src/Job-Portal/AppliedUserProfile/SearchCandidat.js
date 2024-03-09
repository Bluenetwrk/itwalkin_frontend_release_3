
import React from 'react'
import styles from "./AppliedUserProfile.module.css"
import { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import useScreenSize from '../SizeHook';
import profileDp from "../img/user_3177440.png"


// import { useSnapCarousel } from 'react-snap-carousel';
// import AutoplaySlider from 'react-awesome-slider'
// import Slider from "react-slick";

function SearchCandidate() {
    let params = useParams()
    let navigate = useNavigate()

    const [Candidate, setCandidate] = useState([])

    const [jobSeekers, setjobSeekers] = useState([])
    const [NotFound, setNotFound] = useState("")
    const [Result, setResult] = useState(false)
const screenSize = useScreenSize();




    // let jobSeekerId = JSON.parse(localStorage.getItem("StudId"))

    async function getAllJobSeekers() {
        await axios.get("http://ec2-15-206-28-178.ap-south-1.compute.amazonaws.com:8080/StudentProfile/getAllJobseekers")
                        
            .then((res) => {
                let result = (res.data)
                let sortedate = result.sort(function (a, b) {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
                setCandidate(sortedate)
            })
    }

    useEffect(() => {
        getAllJobSeekers()
    }, [])

    // const [status, setstatus] = useState({select})
    async function search(e) {
        let key = e.target.value
        if (key) {
            setResult(true)
          let dubmyjobs = [...Candidate]
    
          const filteredItems = dubmyjobs.filter((user) =>
            JSON.stringify(user).toLowerCase().includes(key.toLowerCase())
          )
          setCandidate(filteredItems)
        } else {
            getAllJobSeekers()
            setResult(false)

        }
      }

    // async function search(e) {
    //     let key = e.target.value
    //     await axios.get(`http://ec2-15-206-28-178.ap-south-1.compute.amazonaws.com:8080/StudentProfile/getJobSeeker/${key}`)
    //         .then((res) => {
    //             console.log(res.data)

    //              if (key) {
    //                 setCandidate(res.data)
    //             } else if (!key) {
    //                 setCandidate([])
    //             }
    //             if(res.data.length==0){
    //                 setNotFound("No Record found")
    //             }
    //             if(!key){
    //     getAllJobSeekers()
    //             }
    //         })
    //         .catch((err) => {
    //             alert("server issue occured", err)
    //         })
    // }

    function CheckProfile(StudID) {
        // navigate(`/Check-Profile/${StudID}`)
        window.open(`/Check-Profile/${StudID}`, '_blank')
    }
    return (
        <>        
            <button className={styles.GoBackButton} onClick={() => {
                navigate(-1)
            }}>Go Back</button>
            <>
<h3 style={{marginLeft:"6%", opacity:0.6, width:"220px"}}>Looking for candidates?</h3>
<h3 style={{marginLeft:"6%", opacity:0.6, width:"85%" }} >Search candidate's Skills, Notice period, Education, Experience, Expected CTC and get in touch with the Candidate directly</h3>
</>
            <div className={styles.searchBoth}>
                <p className={styles.p}>Search </p>
                <input className={styles.inputboxsearch} type="text" placeholder="candidate's/skills/experience/qualification/noticeperiod" onChange={(e) => { search(e) }} />
            </div>
            {Result?
            <h4 style={{marginLeft:"19%", marginTop:"10px"}}> {Candidate.length} matching Result Found  </h4>
            :""
}
            {screenSize.width>850?
            <div className={styles.AllUiWrapper}>
                <ul className={styles.ul} >
                    <li className={`${styles.li} ${styles.name}`}><b>Name</b>  </li>
                    <li className={`${styles.li} ${styles.NoticePeriod}`}><b>Notice Period</b>  </li>
                    <li className={`${styles.li} ${styles.age}`}> <b>Age</b> </li>
                    <li className={`${styles.li} ${styles.Qualification}`}>  <b>Qualif</b> </li>
                    <li className={`${styles.li} ${styles.Experiance}`}><b>Experience</b>  </li>
                    <li className={`${styles.li} ${styles.Skills}`}> <b>Skills</b> </li>
                    <li className={`${styles.li} ${styles.currentCTC}`}> <b>Current CTC</b> </li>
                    <li className={`${styles.li} ${styles.ExpectedSalary}`}><b>Expected CTC</b> </li>

                </ul>

                {
                    Candidate.length > 0 ?
                        Candidate.map((Applieduser, i) => {
                            return (
                                <>

                                    <ul className={styles.ul} key={i}>
{Applieduser.premier?
                                        <li className={`${styles.li} ${styles.name} ${styles.onclick}`} onClick={() => { CheckProfile(Applieduser._id) }} >
                                            {Applieduser.name ? <a className={styles.namelink} title="Click to check the Contact Details">
                                                {Applieduser.name}</a> : <li className={styles.Nli}>not updated</li>} </li>
                                               :
                                               <li className={`${styles.li} ${styles.name} ${styles.onclick}`}>you are not premier</li>
                                                }
                                        <li className={`${styles.li} ${styles.NoticePeriod}`}> {Applieduser.NoticePeriod ?
                                            Applieduser.NoticePeriod : <li className={styles.Nli}>not updated</li>} </li>
                                        <li className={`${styles.li} ${styles.age}`}> {Applieduser.age ?
                                            Applieduser.age : <li className={styles.Nli}>not updated</li>} </li>
                                        <li className={`${styles.li} ${styles.Qualification}`}> {Applieduser.Qualification ?
                                            Applieduser.Qualification : <li className={styles.Nli}>not updated</li>} </li>
                                        <li className={`${styles.li} ${styles.Experiance}`}> {Applieduser.Experiance ?
                                            Applieduser.Experiance : <li className={styles.Nli}>not updated</li>} </li>
                                        <li className={`${styles.li} ${styles.Skills}`}> {Applieduser.Skills ?
                                            Applieduser.Skills : <li className={styles.Nli}>not updated</li>} </li>
                                        <li className={`${styles.li} ${styles.currentCTC}`}> {Applieduser.currentCTC ?
                                            Applieduser.currentCTC : <li className={styles.Nli}>not updated</li>} </li>
                                        <li className={`${styles.li} ${styles.ExpectedSalary}`}> {Applieduser.ExpectedSalary ?
                                            Applieduser.ExpectedSalary : <li className={styles.Nli}>not updated</li>} </li>

                                    </ul>
                                </>

                            )
                        })
                        :
                        <p style={{ marginLeft: "45%", color:"red" }}>No Record found</p>
                }
            </div >
            :
            <>
            <div id={styles.JobCardWrapper} >

{Candidate.map((job, i) => {
  return (
    <>
      <div className={styles.JobCard} key={i}>

      <div style={{display:"flex"}}>

<div className={styles.LeftTable}>
                <span className={styles.span}>Name :  </span> <br></br>
                <span className={styles.span}>Age :</span><br></br>
                <span className={styles.span}> Notice Period :</span><br></br>
                <span className={styles.span}>Qualification :</span><br></br>
                <span className={styles.span}>Experience : </span><br></br>
                <span className={styles.span}> Current CTC :</span><br></br>
                <span className={styles.span}>Expected CTC : </span><br></br>
            </div>
    
            <div className={styles.RightTable}>
            <span className={styles.span}><span style={{color:"blue", textDecoration:"underline"}} onClick={() => { CheckProfile(job._id) }} >{job.name}</span></span><br></br>      
            <span className={styles.span}>{job.age? <span style={{ color: "blue" }}>{job.age} </span>:<span style={{color:"red"}}>Not updated</span> }</span><br></br>
            <span className={styles.span}> {job.NoticePeriod?<span style={{ color: "blue" }}>{job.NoticePeriod} </span>: <span style={{color:"red"}}>Not updated</span>}</span><br></br>
            <span className={styles.span}> {job.Qualification?<span style={{ color: "blue" }}>{job.Qualification} </span>:<span style={{color:"red"}}>Not updated</span>}</span><br></br>
            <span className={styles.span}> {job.Experiance?<span style={{ color: "blue" }}>{job.Experiance} </span>:<span style={{color:"red"}}>Not updated</span>}   </span><br></br>
            <span className={styles.span}>{job.currentCTC?<span style={{ color: "blue" }}>{job.currentCTC} </span>:<span style={{color:"red"}}>Not updated</span>} </span><br></br>
            <span className={styles.span}> {job.ExpectedSalary?<span style={{ color: "blue" }}>{job.ExpectedSalary} </span>:<span style={{color:"red"}}>Not updated</span>}</span><br></br>          
            </div>
            <img className={styles.MobileimageView} src={job.image?job.image : profileDp}/>
    
          </div>

          <div className={styles.Down}>
          <span className={styles.span}> Skills : {job.Skills?<span style={{ color: "blue" }}>{job.Skills} </span>:<span style={{color:"red"}}>Not updated</span>}</span><br></br>
         </div>
      </div>
    </>
  )
})}

</div>
            </>
}

        </>
    )
}

export default SearchCandidate