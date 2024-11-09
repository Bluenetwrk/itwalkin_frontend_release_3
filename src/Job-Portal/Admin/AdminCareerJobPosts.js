import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios"
import Companylogo from "../img/logo.png"
import { useNavigate } from 'react-router-dom'

import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"; 
import CreatableSelect  from "react-select/creatable"


import Style from "../PostJobs/postJobs.module.css"

function AdminCareerPostJobs() {
    let adminLoginAuth= localStorage.getItem("AdMLog")


    useEffect(()=>{
            if(!adminLoginAuth){
                navigate("/")
            }
        },[])



    const [jobtitle, setJobTitle] = useState("")
    const [Source, setSource] = useState("")
    const [SourceLink, setSourceLink] = useState("")
    const [SourceCompanyLink, setSourceCompanyLink] = useState("")
    const [Adminpost, setAdminpost] = useState(true)


    const [companyName, setCompanyName] = useState("Itwalkin")
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
    const [Logo, setLogo] = useState(true)
    const [other, setother] = useState(false)
    const [otherJobLocation, setotherJobLocation] = useState(false)
    const [profileData, setProfileData] = useState([])
    let navigate= useNavigate()

    let jobTags = [
        { value: 'Java', label: 'Java ' }, { value: 'ReactJs', label: 'ReactJs' }, { value: 'Python', label: 'Python' },
        { value: 'Mern Stack', label: 'Mern Stack' }, { value: 'C++,C', label: 'C++,C' },
        { value: 'Javascript', label: "Javascript" }, { value: 'Node js', label: 'Node js' },
        { value: 'Angular js', label: 'Angular js' }, { value: 'Vue js', label: 'Vue js' }, 
        { value: 'NextJs', label: 'NextJs' },  { value: '.NET', label: '.NET' }, { value: 'Larvel', label: 'Larvel' },
        { value: 'Kotlin', label: 'Kotlin' }, { value: 'Android', label: 'Android' }, { value: 'iOS', label: 'iOS' },
        { value: 'Xamarin', label: 'Xamarin' },{ value: 'Ember JS', label: 'Ember JS' }, { value: 'Cordova', label: 'Cordova' },
        { value: 'Groovey,Grails', label: 'Groovey,Grails'}, { value: 'QT', label: 'QT'},
        { value: 'Oracle', label: 'Oracle'}, { value: 'Postgres SQL', label: 'Postgres SQL'},
        { value: 'CouchDB', label: 'CouchDB'}, { value: 'Redis', label: 'Redis'},{ value: 'Azure', label: 'Azure'},
        { value: 'AWS', label: 'AWS'}, { value: 'Rackspace', label: 'Rackspace'},{ value: 'Heroku', label: 'Heroku'},
        { value: 'GoogleCloud', label: 'GoogleCloud'}, { value: 'Weblogic', label: 'Weblogic'},
        { value: 'Apache', label: 'Apache'}, { value: 'Lotus', label: 'Lotus'}, { value: 'Domino', label: 'Domino'}, 
        { value: 'MS IIS', label: 'MS IIS'}, { value: 'ColdFusion', label: 'ColdFusion'},
        { value: 'nginx', label: 'nginx'}, { value: 'Resin', label: 'Resin'}, { value: 'Selenium', label: 'Selenium'},
        { value: 'HP LoadRunner', label: 'HP LoadRunner'}, { value: 'jUnit', label: 'jUnit'},
        { value: 'Jira', label: 'Jira'}, { value: 'Confluence', label: 'Confluence'},
        { value: 'Testrails', label: 'Testrails'}, { value: 'PLC,SCADA', label: 'PLC,SCADA'},
        { value: 'ModBUS', label: 'ModBUS'},{ value: 'CANBUS', label: 'CANBUS'}, { value: 'Machine Learing', label: 'Machine Learing'},
        { value: 'Cybersecurity', label: 'Cybersecurity'}, { value: 'AI', label: 'AI'},
        { value: 'Backend', label: 'Backend' }, { value: 'Frontend', label: 'Frontend' },
        { value: 'HTML-CSS', label: 'HTML-CSS' }, { value: 'MongoDB', label: 'MongoDB' },
        { value: 'MySql', label: 'MySql' }, { value: 'Flutter', label: 'Flutter' },
        { value: 'Mobile App Developer', label: 'Mobile App Developer' }, { value: 'Artificial Intelligence', label: 'Artificial Intelligence' },
        { value: 'React Native', label: 'React Native' }, { value: 'DevOps Engineer', label: 'DevOps Engineer' },
        { value: 'Security developer', label: 'Security developer' }, { value: 'Data science', label: 'Data science' },
        { value: 'Data Analyst', label: 'Data Analyst' }, { value: 'Game Developer', label: 'Game Developer' },
        { value: 'Graphic Developers', label: 'Graphic Developers' }, { value: 'AI Engineer', label: 'AI Engineer' },
        { value: 'Security Developer', label: 'Security Developer'},{ value: 'Cloud Developers', label: 'Cloud Developers'},
        ]

        // const [tag, setTag] = useState([])
    const [Tags, setTag] = useState([])

    
    async function handleTags(key) {
        setSkills((prev=>prev+" "+key))
        const isIndex=Tags.findIndex((present)=>{
            return(
              present===key
            )
                })
                if(isIndex<0){
                    setTag([...Tags, key])
                }else{
                  const IndexId=Tags.filter((present)=>{
                    return(
                      present!==key
                    )
                        })
                        setTag(IndexId)
                        // Active.splice(IndexId,1)
    }
}


    // const Tags=tag.map((tag,i)=>{
    //     return(
    //         tag.value
    //     )
    // })

    function handleChange(tag){
        setTag(tag)

        const Tagskills=tag.map((tag,i)=>{
            return(
                tag.value
            )
        })
        setSkills(Tagskills.toString())  
    }
    // async function getProfile() {
    //     await axios.get(`/EmpProfile/getProfile/${empId}`)
    //         .then((res) => {
    //             let result = res.data.result
    //             let companyName = res.data.result.CompanyName
    //             setProfileData([result])
    //             setCompanyName(companyName)
    //         }).catch((err) => {
    //             alert("some thing went wrong")
    //         })
    // }

    // useEffect(() => {
    //     getProfile()
    // }, [])

    // async function getLogo() {
    //     await axios.get(`/EmpProfile/getLogo/${empId}`)
    //         .then((res) => {
    //             let result = res.data
    //             setLogo(result)
    //         }).catch((err) => {
    //             alert("some thing went wrong")
    //         })
    // }

    // useEffect(() => {
    //     getLogo()
    // }, [])

    // useEffect(()=>{

    // },[successMessage])

    // useEffect(()=>{

    // },[errorMessage])

    
    function handleSalary(e){
        const sanitizedValue = e.target.value.replace(/[A-Za-z]/g, '');
        // if(e.target.value.includes(/[1-9]/g))
            if (sanitizedValue.length>2){
            return false
        }else{
            setSalaryRange(sanitizedValue)
        }
    }

    function handleExperiance(e){
        const sanitizedValue = e.target.value.replace(/[A-Za-z]/g, '');
        // if(e.target.value.includes(/[1-9]/g))
            if (sanitizedValue.length>2){
            return false
        }else{
        setExperiance(sanitizedValue)
        }
    }




    async function postJob() {
        let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
        const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
        let adminLogin = true
       let jobTitle = jobtitle.toLowerCase()
       let jobLocation = joblocation.toLowerCase()
        await axios.post("/Careerjobpost/Careerjobpost/", { Logo, SourceLink, Source, SourceCompanyLink, Adminpost, adminLogin, jobTitle,
    companyName, jobDescription, jobtype, salaryRange, jobLocation, qualification, experiance, skills, Tags }, {headers})
            .then((res) => {
                let result = (res.data)
                if (result == "success") {
                    setJobTitle("")
                    setJobDescription("")
                    // setCompanyName("")
                    setSourceLink("")
                    setSourceCompanyLink("")
                    setSalaryRange("")
                    setJobLocation("")
                    setExperiance("")
                    setExperiance("")
                    setJobtype("")
                    setJobLocation("")
                    setQualification("")
                    setSkills("")
                    setTag([])
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

            {/* {
                profileData.map((items,i) => {
                    return (
                        
                            <div key={i}> */}

                                {/* {Logo ? <img className={Style.logo} src={Logo} /> : */}
                                    {/* <p style={{ color: "red", marginLeft: "5%", fontStyle: "italic" }}> Alert! You have not updated the Company logo, please update the Company Logo</p>} */}
                                {/* <h3 style={{ color: "blue", marginLeft: "15%" }}>Welcome to Post job Page, Post a Job and get Connected with Job Seekers</h3> */}

                                <div className={Style.postJobPageWrapper} >


                                    <div className={Style.postJobWrapper}>
                                        {/* <p className={Style.successmessage}>{successMessage} </p> */}
                                        <p className={successMessage==="Alert!... JobTitle, CompanyName JobDescription, Experiance, JobLocation and Skills must be filled"?
                                        Style.errormessage: Style.successmessage}>{successMessage} </p>
                                        {/* <p className={Style.errormessage}>{errorMessage} </p> */}



                                        <h4 className={Style.jobHeadline}  >Job title**</h4>
                                        <input maxLength="30" className={Style.inputbox} type="text" value={jobtitle} onChange={(e) => { setJobTitle(e.target.value) }} />
<div className={Style.jobHeadline}>
                                        {/* <label><input name="Job-Type" type="radio" value={other}  onClick={(e) => { setother((prev)=>!prev)} } />Select, if Job Source is from other Job Portal Site </label> */}
</div>
    
                               {/* { other?
                               <> */}
                               {/* <hr style={{marginTop:"50px"}}></hr>
                                       <h4 className={Style.jobHeadline}  >Job Post Source &nbsp;<span className={Style.hint}>(e.g Linkedin, Noukri, indeed etc.)</span></h4>
                                        <input maxLength="20" className={Style.inputbox} type="text" value={Source} onChange={(e) => { setSource(e.target.value) }} />

                                        <h4 className={Style.jobHeadline}  > Job Post Source Link</h4>
                                        <input className={Style.inputbox} type="text" value={SourceLink} onChange={(e) => { setSourceLink(e.target.value) }} />
                                       
                                        <hr style={{marginBottom:"50px", marginTop:"30px"}}></hr> */}
                              
                               {/* </>


:""
} */}
                                        {/* <h4 className={Style.jobHeadline}>Company Name** &nbsp;<span className={Style.hint}>(Update Company Name from your Profile)</span></h4>
                                        <input maxLength="30" className={Style.inputbox} type="text" value={companyName} onChange={(e) => { setCompanyName(e.target.value) }} /> */}

                                        <h4 className={Style.jobHeadline}  >Source Company Name </h4>
                                        <input className={Style.inputbox} type="text" value={companyName} disabled/>

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
                                        <h4 className={Style.jobHeadline}>Job Tags (Select multiple Tags to reach the best Matching Jobs)</h4>

      <div className={Style.JobtitleFilterWrapper}>
            {/* <buton className={ Active.length===0? Style.active:Style.JobtitleFilter} onClick={() => { getjobs() }}>All</buton> */}
            {
              jobTags.map((tags, i) => {
                return (
                                   
                  <button disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                    tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                    className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                    tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                    Style.TagHeading: 
                    //  Active === tags.value ? 
                    Tags.findIndex(  (present)=>{
                      return(
                        present===tags.value
                      )
                          }) >=0?
                     Style.active : Style.JobtitleFilter} 
                     onClick={ () => {  handleTags(tags.value) }}
                     >{tags.value} </button>
                
                  )
              })
            }
          </div>
                                        <h4 className={Style.jobHeadline}>Job Type</h4>
                                        {/* <select className={Style.inputbox} onChange={(e) => { setJobtype(e.target.value) }}>
                        <option value="" >Select Job Type</option>
                        <option value="Full Time" >Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                    </select> */}
                                        <label><input name="Job-Type" checked={jobtype==="Full Time"} type="radio" value="Full Time" onChange={(e) => { setJobtype(e.target.value) }} />Full Time  </label>
                                        <label><input name="Job-Type" checked={jobtype==="Part Time"} type="radio" value="Part Time" onChange={(e) => { setJobtype(e.target.value) }} />Part Time  </label>
                                        <label><input name="Job-Type" checked={jobtype==="Internship"} type="radio" value="Internship" onChange={(e) => { setJobtype(e.target.value) }} />Internship </label>
                                        <label><input name="Job-Type" checked={jobtype==="Contract"} type="radio" value="Contract" onChange={(e) => { setJobtype(e.target.value) }} />Contract   </label>



                                        <h4 className={Style.jobHeadline}>Job Location**</h4> 
                                        
                                        <div style={{marginTop:"-10px"}}>
                                        <label><input name="Location" type="radio" checked={joblocation==="Bangalore"} value="Bangalore" onChange={(e) => { setJobLocation(e.target.value) }} />Bangalore </label>
                                        <label><input name="Location" type="radio" checked={joblocation==="Hyderabad"} value="Hyderabad" onChange={(e) => { setJobLocation(e.target.value) }} />Hyderabad </label>
                                        <label><input name="Location" type="radio" checked={joblocation==="Chennai"} value="Chennai" onChange={(e) => { setJobLocation(e.target.value) }} />Chennai </label>
                                        <label><input name="Location" type="radio" checked={joblocation==="Mumbai"} value="Mumbai" onChange={(e) => { setJobLocation(e.target.value) }} />Mumbai </label>
                                        <label><input name="Location" type="radio" checked={joblocation==="Delhi"} value="Delhi" onChange={(e) => { setJobLocation(e.target.value) }} />Delhi </label>
                                        <label><input name="Location" type="radio"  value="others" onClick={(e) => { setotherJobLocation((prev)=>!prev) }} />others </label>
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
                                        <label><input name="Qualification" type="radio" value="others" onClick={(e) => { setOthers((prev)=>!prev) }} />others </label>
                                        </div>
                                        {
                                            others ?
                                                <input className={Style.Otherinputbox} type="text" value={qualification} onChange={(e) => { setQualification(e.target.value) }} />

                                                : ""

                                        }
                                        <h4 className={Style.jobHeadline}>Salary Per Annum in Lakhs** &nbsp;<span className={Style.hint}>(e.g 5 or 10)</span></h4>
                                        <input maxLength="3" className={Style.inputbox} type="text" value={salaryRange} onChange={(e) => { handleSalary(e) }} />


                                        <h4 className={Style.jobHeadline}>Experience Needed** &nbsp;<span className={Style.hint}>(e.g 5 or 10)</span></h4>
                                        <input maxLength="3" className={Style.inputbox} type="text" value={experiance} onChange={(e) => { handleExperiance(e) }} />

                                        {/* <h4 className={Style.jobHeadline}>Tags</h4>
                         <div>
                           <CreatableSelect  
                          isMulti={true}
                          options={jobTags}
                          value={Tags}
                          onChange={handleChange}     
                        />
                         </div> */}
                         <h4 className={Style.jobHeadline}>Skills Needed**</h4>
                                        <input maxLength="100" className={Style.inputbox} type="text" disabled value={Tags} />
                                       

                                        {/* {Logo ? <p ><span style={{ color: "blue" }}>Note** :</span> Logo will also be posted with the Job</p> : ""} */}

                                        <button className={Style.button} onClick={postJob}>Post Job</button>

                                    </div >
                                </div >
                            {/* </div>

                    )
            
                })
            } */}
        </>

    )
}

export default AdminCareerPostJobs
