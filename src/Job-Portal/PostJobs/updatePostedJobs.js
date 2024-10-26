import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useNavigate , useLocation,} from "react-router-dom";
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"; 
import CreatableSelect  from "react-select/creatable"
import Arrowimage from '../img/icons8-arrow-left-48.png';
import Footer from '../Footer/Footer';

import Style from "./postJobs.module.css"

function UpdatePostedJobs() {

    let jobTags = [
        { value: 'ReactJs', label: 'ReactJs' },
         { value: 'Mern Stack', label: 'Mern Stack' }, { value: 'C++, C', label: 'C++, C' },
         { value: 'Javascript', label: "Javascript" }, { value: 'Node js', label: 'Node js' },
         { value: 'Angular js', label: 'Angular js' }, { value: 'Vue js', label: 'Vue js' }, { value: 'NextJs', label: 'NextJs' },
         { value: 'Backend', label: 'Backend' }, { value: 'Frontend', label: 'Frontend' },
         { value: 'HTML-CSS', label: 'HTML-CSS' },{ value: 'MongoDB', label: 'MongoDB' },
         { value: 'MySql', label: 'MySql' },  { value: 'Flutter', label: 'Flutter' },{ value: 'Game Developer', label: 'Game Developer' },
         { value: 'Mobile App Developer', label: 'Mobile App Developer' },  { value: 'Artificial Intelligence', label: 'Artificial Intelligence' },
         { value: 'React Native', label: 'React Native' }, { value: 'DevOps Engineer', label: 'DevOps Engineer' },
         { value: 'Security developer', label: 'Security developer' }, { value: 'Data science', label: 'Data science' },
         { value: 'Data Analyst', label: 'Data Analyst' },   { value: 'java ', label: 'java ' },
         { value: 'Python', label: 'Python' },
         { value: 'Graphic Developers', label: 'Graphic Developers' }, { value: 'AI Engineer', label: 'AI Engineer' },
         { value: 'Security Developer', label: 'Security Developer' }, { value: 'Cloud Developers', label: 'Cloud Developers' },
         ]

  const location = useLocation()
  let Jobid = location.state.getId
  let navigate= useNavigate()

    let empId = localStorage.getItem("EmpIdG")
 
    const [jobtitle, setJobTitle] = useState("")
    const [Source, setSource] = useState("")
    const [SourceLink, setSourceLink] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [jobDescription, setJobDescription] = useState("")
    const [jobtype, setJobtype] = useState("")
    const [salaryRange, setSalaryRange] = useState("")
    const [joblocation, setJobLocation] = useState("")
    const [qualification, setQualification] = useState("")
    const [experiance, setExperiance] = useState("")
    const [skills, setSkills] = useState("")
    const[errorMessage, setErrorMessage] = useState("")
    const[successMessage, setSuccessMessage] = useState("")

    const [others, setOthers] = useState(false)
    const [otherJobLocation, setotherJobLocation] = useState(false)

    const [profileData, setProfileData] = useState([])
    const [Tags, setTag] = useState([])
    // const Tags=tag.map((tag,i)=>{
    //     return(
    //         tag.value
    //     )
    // })

    function handleChange(tag){
        setTag(tag)
    }

    async function getPostedJobs(){
        let userid = JSON.parse(localStorage.getItem("EmpIdG"))
        const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("EmpLog"))) };
       await axios.get(`/jobpost/getJobForUpdate/${Jobid}`, {headers})
       .then((res)=>{
        let result=res.data
        console.log(result)
        if(result){
        setJobTitle(result.jobTitle)
            setJobDescription(result.jobDescription)
            setSalaryRange(result.salaryRange)
            setJobLocation(result.jobLocation[0].toUpperCase()+result.jobLocation.slice(1))
            setQualification(result.qualification)
            setExperiance(result.experiance)
            setSkills(result.skills)
            setJobtype(result.jobtype)
            setCompanyName(result.companyName)
            setTag(result.Tags)
        }
       }).catch((err)=>{
        alert("server issue occured")
       })
    }

    useEffect(()=>{
        getPostedJobs()
    },[])

    async function updateJob(){
        let userid = JSON.parse(localStorage.getItem("EmpIdG"))
        const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("EmpLog"))) };
        console.log("updated")
        let jobTitle = jobtitle.toLowerCase()
        let jobLocation = joblocation.toLowerCase()
    await axios.put(`/jobpost/updatPostedJob/${Jobid}`,{ jobTitle, SourceLink, Source, companyName,
         jobDescription, jobtype, salaryRange, jobLocation, qualification, experiance, skills, Tags},{headers})
    .then((res)=>{
        let result = (res.data)
        if(result=="success"){
            // setJobTitle("")
            // setJobDescription("")
            // setSalaryRange("")
            // setJobLocation("")
            // setQualification("")
            // setExperiance("")
            // setSkills("")
            setSuccessMessage("Success!  successfully updated")
        }
        
    }).catch((err)=>{
        alert("server issue occured", err)
    })
    window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
}


window.addEventListener('keypress', function(event){
    
    // Get the key code
    let keycode = event.which || event.keyCode;
    
    // Check if key pressed is a special character
    if(keycode < 32 || 
     (keycode > 32 && keycode < 44) || 
     (keycode > 44 && keycode < 48) || 
     (keycode > 57 && keycode < 65) || 
     (keycode > 90 && keycode < 97) ||
     keycode > 122
    ){
        // Restrict the special characters
        event.preventDefault();  
        // alert("special characters are not allowed")
        return false;
    }
  }); 

    return (
        <>
            <div className={Style.postJobPageWrapper}>
          <img style={{ height:"25px", color:"grey", marginTop:"20px", marginLeft:"8%", cursor:"pointer",
             width:"28px"}} onClick={()=>{navigate(-1)}}  src={Arrowimage} />

                <div className={Style.postJobWrapper}>
                <p className={Style.successmessage}>{successMessage} </p>
                <p className={Style.errormessage}>{errorMessage} </p>

     <h4 className={Style.jobHeadline}>Job title</h4>
    <input maxLength="30" className={Style.inputbox} type="text" value={jobtitle} onChange={(e) => { setJobTitle(e.target.value) }} />


                    <h4 className={Style.jobHeadline}>Company Name**</h4>
                    <input maxLength="30" className={Style.inputbox} type="text" value={companyName} onChange={(e) => { setCompanyName(e.target.value) }} />

                    <h4 className={Style.jobHeadline}>Job Description</h4>
                    {/* <input className={Style.inputbox} type="text" value={jobDescription} onChange={(e) => { setJobDescription(e.target.value) }} /> */}
                    <Editor
         toolbarClassName="toolbarClassName"
         wrapperClassName="wrapperClassName"
         editorClassName="editorClassName"
         wrapperStyle={{ width: "100%", marginLeft:"0px", border: "1px solid black", borderRadius:"4px" }}
         className={Style.inputbox}
         onChange={(e)=>{ setJobDescription(e.blocks) }}
      />

<h4 className={Style.jobHeadline}>Job Type</h4>
                                 
                                 <label><input name="Job-Type" type="radio" checked={jobtype==="Full Time"} value="Full Time" onChange={(e) => { setJobtype(e.target.value) }} />Full Time  </label>
                                 <label><input name="Job-Type" type="radio" checked={jobtype==="Part Time"} value="Part Time" onChange={(e) => { setJobtype(e.target.value) }} />Part Time  </label>
                                 <label><input name="Job-Type" type="radio" checked={jobtype==="Internship"} value="Internship" onChange={(e) => { setJobtype(e.target.value) }} />Internship </label>
                                 <label><input name="Job-Type" type="radio" checked={jobtype==="Contract"} value="Contract" onChange={(e) => { setJobtype(e.target.value) }} />Contract   </label>


                                 <h4 className={Style.jobHeadline}>Salary Per Annum in Lakhs** &nbsp;<span className={Style.hint}>(e.g 5 or 10)</span></h4>
                                 <input maxLength="3" className={Style.inputbox} type="number" value={salaryRange} onChange={(e) => { setSalaryRange(e.target.value) }} />

                                 <h4 className={Style.jobHeadline}>Job Location**</h4>
                                 <div style={{marginTop:"-10px"}}>
                                 <label><input name="Location" type="radio" checked={joblocation==="Bangalore"} value="Bangalore" onChange={(e) => { setJobLocation(e.target.value) }} />Bangalore </label>
                                 <label><input name="Location" type="radio" checked={joblocation==="Hyderabad"} value="Hyderabad" onChange={(e) => { setJobLocation(e.target.value) }} />Hyderabad </label>
                                 <label><input name="Location" type="radio" checked={joblocation==="Chennai"} value="Chennai" onChange={(e) => { setJobLocation(e.target.value) }} />Chennai </label>
                                 <label><input name="Location" type="radio" checked={joblocation==="Mumbai"} value="Mumbai" onChange={(e) => { setJobLocation(e.target.value) }} />Mumbai </label>
                                 <label><input name="Location" type="radio" checked={joblocation==="Delhi"} value="Delhi" onChange={(e) => { setJobLocation(e.target.value) }} />Delhi </label>
                                 <label><input name="Location" type="radio" value="others" onClick={(e) => { setotherJobLocation((prev)=>!prev) }} />others </label>
                                 </div>
                                 {
                                     otherJobLocation?
                                 <input maxLength="10" className={Style.Otherinputbox} type="text" value={joblocation} onChange={(e) => { setJobLocation(e.target.value) }} />
                                 :
                                 ""
                                 }

                                 <h4 className={Style.jobHeadline}>Qualification Needed**</h4>

                                 <div style={{marginTop:"-10px"}}>
                                 <label><input name="Qualification" type="radio" checked={qualification==="B.E/CSE"} value="B.E/CSE" onChange={(e) => { setQualification(e.target.value) }} />B.E/CSE </label>
                                 <label><input name="Qualification" type="radio" checked={qualification==="B.E/Civil"} value="B.E/Civil" onChange={(e) => { setQualification(e.target.value) }} />B.E/Civil </label>
                                 <label><input name="Qualification" type="radio" checked={qualification==="B.E/Mech"} value="B.E/Mech" onChange={(e) => { setQualification(e.target.value) }} />B.E/Mech </label>
                                 <label><input name="Qualification" type="radio" checked={qualification==="B.E/ECE"} value="B.E/ECE" onChange={(e) => { setQualification(e.target.value) }} />B.E/ECE </label>
                                 <label><input name="Qualification" type="radio" checked={qualification==="B.E/IT"} value="B.E/IT" onChange={(e) => { setQualification(e.target.value) }} />B.E/IT </label>
                                 <label><input name="Qualification" type="radio"  value="others" onClick={(e) => { setOthers((prev)=>!prev) }} />others </label>
                                 </div>
                                 {
                                     others ?
                                         <input className={Style.Otherinputbox} type="text" value={qualification} onChange={(e) => { setQualification(e.target.value) }} />

                                         : ""

                                 }


                                 <h4 className={Style.jobHeadline}>Experience Needed** &nbsp;<span className={Style.hint}>(e.g 5 or 10)</span></h4>
                                 <input maxLength="3" className={Style.inputbox} type="number" value={experiance} onChange={(e) => { setExperiance(e.target.value) }} />

                                 <h4 className={Style.jobHeadline}>Skills Needed**</h4>
                               
                                 <input maxLength="100" className={Style.inputbox} type="text" value={skills} onChange={(e) => { setSkills(e.target.value) }} />
                                
                                 <h4 className={Style.jobHeadline}>Tags</h4>
                  <div>
                    <CreatableSelect  
                   isMulti={true}
                   options={jobTags}
                   value={Tags}
                   onChange={handleChange}     
                 />
                  </div>
                    <button className={Style.button} onClick={updateJob}>Update</button>

                </div >
            </div >
            <div style={{marginTop:"10px"}}>
          <Footer/>
        </div>
        </>

    )
}

export default UpdatePostedJobs