
import React from 'react'
import styles from "./AppliedUserProfile.module.css"
import { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import useScreenSize from '../SizeHook';
import profileDp from "../img/user_3177440.png"
import Arrowimage from '../img/icons8-arrow-left-48.png'



// import { useSnapCarousel } from 'react-snap-carousel';
// import AutoplaySlider from 'react-awesome-slider'
// import Slider from "react-slick";

function SearchCandidate() {
    let params = useParams()
    let navigate = useNavigate()

    const [Candidate, setCandidate] = useState([])
    const [FilCandidate, setFilCandidate] = useState([])

    const [jobSeekers, setjobSeekers] = useState([])
    const [NotFound, setNotFound] = useState("")
    const [Result, setResult] = useState(false)
const screenSize = useScreenSize();

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

    // let jobSeekerId = JSON.parse(localStorage.getItem("StudId"))

    async function getAllJobSeekers() {
        // let userid = JSON.parse(localStorage.getItem("EmpIdG"))
        // const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("EmpLog"))) };
    const headers = { authorization: 'BlueItImpulseWalkinIn' };

        await axios.get("StudentProfile/getAllJobseekers", {headers})                        
            .then((res) => {
                let result = (res.data)
                let sortedate = result.sort(function (a, b) {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
                setCandidate(sortedate)
                setFilCandidate(sortedate)
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
          let dubmyjobs = [...FilCandidate]
    
          const filteredItems = dubmyjobs.filter((user) =>
            JSON.stringify(user).toLowerCase().includes(key.toLowerCase())
          )
          setCandidate(filteredItems)
        } else {
            getAllJobSeekers()
            setResult(false)

        }
      }


    async function filterByJobTitle(key){
        await axios.get(`/StudentProfile/getSkillTags/${key}`)
        .then((res) => {
          let result = (res.data)
          console.log(result)
          let sortedate = result.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setCandidate(sortedate)
        })
      }


    function CheckProfile(StudID) {
        // navigate(`/Check-Profile/${StudID}`)
        window.open(`/Check-Profile/${StudID}`, '_blank')
    }
    return (
        <>        
            {/* <button className={styles.GoBackButton} onClick={() => {
                navigate(-1)
            }}>Go Back</button> */}
                            <img style={{ height:"25px", color:"grey", marginTop:"20px", marginLeft:"8%", cursor:"pointer",
             width:"28px"}} onClick={()=>{navigate("/postedjobs")}}  src={Arrowimage} />
            <>
<p style={{marginLeft:"6%", opacity:0.6, width:"220px"}}>Looking for candidates?</p>
<p style={{marginLeft:"6%", opacity:0.6, width:"85%" }} >Search candidate's Skills, Notice period, Education, Experience, Expected CTC and get in touch with the Candidate directly</p>
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
            <>
             <div style={{display:"flex", justifyContent:"space-between"}}>
            <label><input type="radio" name="jobtitle" className={styles.JobtitleFilter_} onClick={() => { getAllJobSeekers() }} />All</label>
          {
            jobTags.map((tags, i)=>{
              return(
                <label><input type="radio" name = "jobtitle" onClick={() => {filterByJobTitle(tags.value)}}/>{tags.value}</label>
              )
            })
          }
          </div>
            <div className={styles.AllUiWrapper}>
                <ul className={styles.ul} >
                    <li style={{backgroundColor:" rgb(40, 4, 99)"}} className={`${styles.li} ${styles.nameHome}`}><b>Name</b>  </li>
                    <li style={{backgroundColor:" rgb(40, 4, 99)"}} className={`${styles.li} ${styles.NoticePeriod}`}><b>Notice Period</b>  </li>
                    <li style={{backgroundColor:" rgb(40, 4, 99)"}} className={`${styles.li} ${styles.age}`}> <b>Age</b> </li>
                    <li style={{backgroundColor:" rgb(40, 4, 99)"}} className={`${styles.li} ${styles.Qualification}`}>  <b>Qualif</b> </li>
                    <li style={{backgroundColor:" rgb(40, 4, 99)"}} className={`${styles.li} ${styles.Experiance}`}><b>Experience</b>  </li>
                    <li style={{backgroundColor:" rgb(40, 4, 99)"}} className={`${styles.li} ${styles.Skills}`}> <b>Skills</b> </li>
                    <li style={{backgroundColor:" rgb(40, 4, 99)"}} className={`${styles.li} ${styles.currentCTC}`}> <b>Cur. CTC</b> </li>
                    <li style={{backgroundColor:" rgb(40, 4, 99)"}} className={`${styles.li} ${styles.ExpectedSalary}`}><b>Exp. CTC</b> </li>
                    <li style={{backgroundColor:" rgb(40, 4, 99)"}} className={`${styles.li} ${styles.LastActive}`}><b>Last Active</b> </li>

                </ul>

                {
                    Candidate.length > 0 ?
                        Candidate.map((Applieduser, i) => {
                            return (
                                <>

                                    <ul className={styles.ul} key={i}>
                                        <li className={`${styles.li} ${styles.nameHome}`}>######</li>
                                               
                                        <li className={`${styles.li} ${styles.NoticePeriod}`}> {Applieduser.NoticePeriod ?
                                            Applieduser.NoticePeriod : <li className={styles.Nli}>N/A</li>} </li>
                                        <li className={`${styles.li} ${styles.age}`}> {Applieduser.age ?
                                            Applieduser.age : <li className={styles.Nli}>N/A</li>} </li>
                                        <li className={`${styles.li} ${styles.Qualification}`}> {Applieduser.Qualification ?
                                            Applieduser.Qualification : <li className={styles.Nli}>N/A</li>} </li>
                                        <li className={`${styles.li} ${styles.Experiance}`}> {Applieduser.Experiance ?
                                            Applieduser.Experiance : <li className={styles.Nli}>N/A</li>} </li>
                                        <li className={`${styles.li} ${styles.Skills}`}> {Applieduser.Skills ?
                                            Applieduser.Skills : <li className={styles.Nli}>N/A</li>} </li>
                                        <li className={`${styles.li} ${styles.currentCTC}`}> {Applieduser.currentCTC ?
                                            Applieduser.currentCTC : <li className={styles.Nli}>N/A</li>} </li>
                                        <li className={`${styles.li} ${styles.ExpectedSalary}`}> {Applieduser.ExpectedSalary ?
                                            Applieduser.ExpectedSalary : <li className={styles.Nli}>N/A</li>} </li>
                                        <li className={`${styles.li} ${styles.LastActive}`}>
                                        {new Date(Applieduser.updatedAt).toLocaleString(
                                                "en-US",
                                                {
                                                  month: "short",
                                                  day: "2-digit",
                                                  year: "numeric",
                                                }
                                              )} 
                                            </li>

                                    </ul>
                                </>

                            )
                        })
                        :
                        <p style={{ marginLeft: "45%", color:"red" }}>No Record found</p>
                }
            </div >
            </>
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
                <span className={styles.span}><u>Last Active :  </u></span> <br></br>

                <span className={styles.span}>Age :</span><br></br>
                <span className={styles.span}> Notice Period :</span><br></br>
                <span className={styles.span}>Qualification :</span><br></br>
                <span className={styles.span}>Experience : </span><br></br>
                <span className={styles.span}> Current CTC :</span><br></br>
                <span className={styles.span}>Expected CTC : </span><br></br>
            </div>
    
            <div className={styles.RightTable}>
            <span className={styles.span}>######</span><br></br>      
            <span className={styles.span}> <u>{new Date(job.updatedAt).toLocaleString(
                                                "en-US",
                                                {
                                                  month: "short",
                                                  day: "2-digit",
                                                  year: "numeric",
                                                }
                                              )}</u></span><br></br> 
            <span className={styles.span}>{job.age? <span style={{ color: "blue" }}>{job.age} </span>:<span style={{color:"red"}}>Not updated</span> }</span><br></br>
            <span className={styles.span}> {job.NoticePeriod?<span style={{ color: "blue" }}>{job.NoticePeriod} </span>: <span style={{color:"red"}}>Not updated</span>}</span><br></br>
            <span className={styles.span}> {job.Qualification?<span style={{ color: "blue" }}>{job.Qualification} </span>:<span style={{color:"red"}}>Not updated</span>}</span><br></br>
            <span className={styles.span}> {job.Experiance?<span style={{ color: "blue" }}>{job.Experiance} </span>:<span style={{color:"red"}}>Not updated</span>}   </span><br></br>
            <span className={styles.span}>{job.currentCTC?<span style={{ color: "blue" }}>{job.currentCTC} </span>:<span style={{color:"red"}}>Not updated</span>} </span><br></br>
            <span className={styles.span}> {job.ExpectedSalary?<span style={{ color: "blue" }}>{job.ExpectedSalary} </span>:<span style={{color:"red"}}>Not updated</span>}</span><br></br>          
            </div>
                  
            {/* <img className={styles.MobileimageView} src={job.image?job.image : profileDp}/><br></br> */}
                
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