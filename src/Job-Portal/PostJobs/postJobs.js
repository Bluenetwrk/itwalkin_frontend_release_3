import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios"
import Companylogo from "../img/logo.png"
import { useNavigate } from 'react-router-dom'

import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"; 

import Style from "./postJobs.module.css"

function PostJobs() {
    let empId = JSON.parse(localStorage.getItem("EmpIdG"))
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
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [others, setOthers] = useState(false)
    const [Logo, setLogo] = useState()
    const [other, setother] = useState(false)
    const [otherJobLocation, setotherJobLocation] = useState(false)

    const [profileData, setProfileData] = useState([])

    let navigate= useNavigate()

    async function getProfile() {
        const headers = { authorization: 'BlueItImpulseWalkinIn'};

        await axios.get(`/EmpProfile/getProfile/${empId}` , {headers})
            .then((res) => {
                let result = res.data.result
                let companyName = res.data.result.CompanyName
    console.log(companyName)

                setProfileData([result])
                setCompanyName(companyName)
            }).catch((err) => {
                alert("some thing went wrong")
            })
    }

    useEffect(() => {
        getProfile()
    }, [])

    async function getLogo() {
        let userid = JSON.parse(localStorage.getItem("EmpIdG"))
        const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("EmpLog"))) };
        await axios.get(`/EmpProfile/getLogo/${empId}`,{headers})
            .then((res) => {
                let result = res.data
                setLogo(result)
            }).catch((err) => {
                alert("some thing went wrong")
            })
    }

    useEffect(() => {
        getLogo()
    }, [])


    async function postJob() {
        let userid = JSON.parse(localStorage.getItem("EmpIdG"))
        const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("EmpLog"))) };

       let jobTitle = jobtitle.toLowerCase()
       let jobLocation = joblocation.toLowerCase()
        await axios.post("/jobpost/jobpost/", { Logo, SourceLink, Source, empId, jobTitle, companyName, 
            jobDescription, jobtype, salaryRange, jobLocation, qualification, experiance, skills },{headers})
            .then((res) => {
                let result = (res.data)
                console.log(result)
                if (result == "success") {
                    setJobTitle("")
                    setJobDescription("")
                    // setCompanyName("")
                    setSalaryRange("")
                    setJobLocation("")
                    setExperiance("")
                    setExperiance("")
                    setSkills("")
                    setSuccessMessage("Success! job successfully posted")
                }
                else if (result == "field are missing") {
    setSuccessMessage("Alert!... JobTitle, CompanyName JobDescription, Experiance, JobLocation and Skills must be filled")
                }
            }).catch((err) => {
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
 
<button className={Style.GoBackButton} onClick={() => {
    navigate(-1)
}}>Go Back</button>

            {
                profileData.map((items,i) => {
                    return (
                        items.isApproved ?
                        
                            <div key={i}>
                                              <button className={Style.searchButton} onClick={()=>{
                    navigate("/Search-Candidate")}}>Search Candidate</button>
                                {Logo ? <img className={Style.logo} src={Logo} /> :
                                    <p style={{ color: "red", marginLeft: "5%", fontStyle: "italic" }}> Alert! You have not updated the Company logo, please update the Company Logo</p>}
                                {/* <h3 style={{ color: "blue", marginLeft: "15%" }}>Welcome to Post job Page, Post a Job and get Connected with Job Seekers</h3> */}

                                <div className={Style.postJobPageWrapper} >


                                    <div className={Style.postJobWrapper}>
                                        <p className={successMessage==="Alert!... JobTitle, CompanyName JobDescription, Experiance, JobLocation and Skills must be filled"?
                                        Style.errormessage: Style.successmessage}>{successMessage} </p>
                                        {/* <p className={Style.errormessage}>{errorMessage} </p> */}



                                        <h4 className={Style.jobHeadline}  >Job title**</h4>
                                        <input maxLength="30" className={Style.inputbox} type="text" value={jobtitle} onChange={(e) => { setJobTitle(e.target.value) }} />
{/* <div className={Style.jobHeadline}>
                                        <label><input name="Job-Type" type="radio" value={other}  onClick={(e) => { setother((prev)=>!prev)} } />Select, if Job Source is from other Job Portal Site </label>
</div>
    
                               { other?
                               <>
                                       <h4 className={Style.jobHeadline}  >Source &nbsp;<span className={Style.hint}>(e.g Linkedin, Noukri, indeed etc.)</span></h4>
                                        <input maxLength="20" className={Style.inputbox} type="text" value={Source} onChange={(e) => { setSource(e.target.value) }} />

                                        <h4 className={Style.jobHeadline}  >Source Link</h4>
                                        <input className={Style.inputbox} type="text" value={SourceLink} onChange={(e) => { setSourceLink(e.target.value) }} />
                               </>
                                :""
                                    } */}
                                        <h4 className={Style.jobHeadline}>Company Name** &nbsp;<span  className={Style.hint}>(Update Company Name from your Profile)</span></h4>
                                        <input maxLength="30" className={Style.inputbox} type="text" value={companyName} disabled />


                                        <h4 className={Style.jobHeadline}>Job Description**</h4>
                                        {/* <input maxLength="100" className={Style.inputbox} type="text" value={jobDescription} onChange={(e) => { setJobDescription(e.target.value) }} /> */}
                                        <Editor
         toolbarClassName="toolbarClassName"
         wrapperClassName="wrapperClassName"
         editorClassName="editorClassName"
         wrapperStyle={{ width: "100%", marginLeft:"0px", border: "1px solid black", borderRadius:"4px" }}
         className={Style.inputbox}
         onChange={(e)=>{ setJobDescription(e.blocks) }}
      />
                                        <h4 className={Style.jobHeadline}>Job Type</h4>
                                        {/* <select className={Style.inputbox} onChange={(e) => { setJobtype(e.target.value) }}>
                        <option value="" >Select Job Type</option>
                        <option value="Full Time" >Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                    </select> */}
                                        <label><input name="Job-Type" type="radio" value="Full Time " onChange={(e) => { setJobtype(e.target.value) }} />Full Time  </label>
                                        <label><input name="Job-Type" type="radio" value="Part Time" onChange={(e) => { setJobtype(e.target.value) }} />Part Time  </label>
                                        <label><input name="Job-Type" type="radio" value="Internship" onChange={(e) => { setJobtype(e.target.value) }} />Internship </label>
                                        <label><input name="Job-Type" type="radio" value="Contract" onChange={(e) => { setJobtype(e.target.value) }} />Contract   </label>


                                        <h4 className={Style.jobHeadline}>Salary Per Annum in Lakhs** &nbsp;<span className={Style.hint}>(e.g 5L or 10L)</span></h4>
                                        <input maxLength="3" className={Style.inputbox} type="text" value={salaryRange} onChange={(e) => { setSalaryRange(e.target.value) }} />

                                        <h4 className={Style.jobHeadline}>Job Location**</h4>
                                        <div style={{marginTop:"-10px"}}>
                                        <label><input name="Location" type="radio" value="Banglore" onChange={(e) => { setJobLocation(e.target.value) }} />Banglore </label>
                                        <label><input name="Location" type="radio" value="Hyderabad" onChange={(e) => { setJobLocation(e.target.value) }} />Hyderabad </label>
                                        <label><input name="Location" type="radio" value="Chennai" onChange={(e) => { setJobLocation(e.target.value) }} />Chennai </label>
                                        <label><input name="Location" type="radio" value="Mumbai" onChange={(e) => { setJobLocation(e.target.value) }} />Mumbai </label>
                                        <label><input name="Location" type="radio" value="Delhi" onChange={(e) => { setJobLocation(e.target.value) }} />Delhi </label>
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
                                        <label><input name="Qualification" type="radio" value="B.E/CSE" onChange={(e) => { setQualification(e.target.value) }} />B.E/CSE </label>
                                        <label><input name="Qualification" type="radio" value="B.E/Civil" onChange={(e) => { setQualification(e.target.value) }} />B.E/Civil </label>
                                        <label><input name="Qualification" type="radio" value="B.E/Mech" onChange={(e) => { setQualification(e.target.value) }} />B.E/Mech </label>
                                        <label><input name="Qualification" type="radio" value="B.E/ECE" onChange={(e) => { setQualification(e.target.value) }} />B.E/ECE </label>
                                        <label><input name="Qualification" type="radio" value="B.E/IT" onChange={(e) => { setQualification(e.target.value) }} />B.E/IT </label>
                                        <label><input name="Qualification" type="radio" value="others" onClick={(e) => { setOthers((prev)=>!prev) }} />others </label>
                                        </div>
                                        {
                                            others ?
                                                <input className={Style.Otherinputbox} type="text" value={qualification} onChange={(e) => { setQualification(e.target.value) }} />

                                                : ""

                                        }


                                        <h4 className={Style.jobHeadline}>Experience Needed** &nbsp;<span className={Style.hint}>(e.g 5Y or 10Y)</span></h4>
                                        <input maxLength="3" className={Style.inputbox} type="text" value={experiance} onChange={(e) => { setExperiance(e.target.value) }} />

                                        <h4 className={Style.jobHeadline}>Skills Needed**</h4>
                                        <input maxLength="100" className={Style.inputbox} type="text" value={skills} onChange={(e) => { setSkills(e.target.value) }} />
                                        {Logo ? <p ><span style={{ color: "blue" }}>Note** :</span> Logo will also be posted with the Job</p> : ""}

                                        <button className={Style.button} onClick={postJob}>Post Job</button>

                                    </div >
                                </div >
                            </div>
                            : <p style={{ color: "red", fontStyle: "italic", marginLeft: "20px" }}>Your account is in under verification process, Once your account gets verified, then you will be able to post a Job</p>

                    )
            
                })
            }
        </>

    )
}

export default PostJobs