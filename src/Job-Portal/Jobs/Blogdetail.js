import React from 'react'
import styles from "./Allobs.module.css"
import { useEffect, useState } from 'react'
import axios from "axios";
import Footer from '../Footer/Footer';
import { Link, useNavigate, useParams } from "react-router-dom";
import { TailSpin, Puff } from "react-loader-spinner"
import location from "../img/icons8-location-20.png" 
import Swal from "sweetalert2";
import Styles from "./myPostedjobs.module.css"
import graduation from "../img/icons8-graduation-cap-40.png"
import useScreenSize from '../SizeHook';
import Arrowimage from '../img/icons8-arrow-left-48.png'
import profileDp from "../img/user_3177440.png"
import "./Allobs.module.css"
import HTMLReactParser from 'html-react-parser'
import StProfile from "../Profile/StudentProfile"
import EMpProfile from "../Profile/EmployeeProfile"
import Down from '../img/icons8-down-button-24.png'
import Up from '../img/icons8-arrow-button-24.png'

function Answerdetails(props) {
  
  let userid = JSON.parse(localStorage.getItem("StudId")) || JSON.parse(localStorage.getItem("EmpIdG"))

  const [CommentName, setCommentName] = useState("")
  const [CommentID, setCommentID] = useState()
  // let CommentName = atob(JSON.parse(localStorage.getItem("Snm")))

  async function getProfile() {
    let userId = JSON.parse(localStorage.getItem("StudId"))
    const headers = { authorization: userId +" "+ atob(JSON.parse(localStorage.getItem("StudLog"))) };
    await axios.get(`/StudentProfile/getProfile/${userId}`, {headers})
        .then((res) => {
            let result = res.data.result
           
            setCommentName(result.name)
        }).catch((err) => {
            // alert("some thing went wrong")
        })
}
let empId = JSON.parse(localStorage.getItem("EmpIdG"))
async function getEmpProfile() {
  const headers = { authorization: 'BlueItImpulseWalkinIn'};
  await axios.get(`/EmpProfile/getProfile/${empId}`, {headers})
      .then((res) => {
          let result = res.data.result
          // console.log(result.name)
          setCommentName(result.name)
          // localStorage.setItem("Snm", JSON.stringify(btoa(result.name)))

      }).catch((err) => {
          // alert("some thing went wrong")
      })
}

useEffect(() => {
  if(empId){
    getEmpProfile()
  }else{
    getProfile()
  }
}, [])
  // let empId = JSON.parse(localStorage.getItem("EmpIdG"))
  const [jobdescription, setjobdescription] = useState([])
  const [jobseekerid, setjobSeekerId] = useState([])
  const [isReadMore, setIsReadMore] = useState(true)
const screenSize = useScreenSize();
const [Loader, setLoader] = useState(false)
  const [jobs, setJobs] = useState([])
  const [comments, setcomments] = useState({
    id:userid,
    name:"",
    comment:""
  })

  const [clickedJobId, setclickedJobId] = useState() //for single job loader

function changeComments(e){
  // setcomments(comments.comment=e.target.value)
    setcomments({ ...comments, comment: e.target.value, name:CommentName})
}


async function handleComment(){
  if(!userid){
    alert("you must login to comment on question")
    return false
  }
  if(!comments.comment){
    return false
  }
  const headers = { authorization: 'BlueItImpulseWalkinIn'};
  await axios.put(`/BlogRoutes/Addcomment/${atob(params.id)}`,{comments}, {headers})
  .then((res)=>{
    let result=res.data
    if(result==="success"){
      // setcomments("")
    setcomments({ ...comments, comment: ""})
      getjobs()
    }
  })
}

async function deletComment(id){  
  const headers = { authorization: 'BlueItImpulseWalkinIn'};
  await axios.put(`/BlogRoutes/deletComment/${atob(params.id)}`,{id}, {headers})
  .then((res)=>{
    let result=res.data
    if(result==="success"){
      // setcomments("")
    // setcomments({ ...comments, comment: ""})
      getjobs()
    }
  })
}


  const navigate = useNavigate()

  let params = useParams();

  async function getjobs() {
    
    const headers = { authorization: 'BlueItImpulseWalkinIn'};
    await axios.get(`/BlogRoutes/getjobs/${atob(params.id)}`, {headers})
      .then((res) => {
        let result = (res.data)
        // console.log(result)
        setJobs(result)
        setjobdescription(result.jobDescription)
        setjobSeekerId(result.jobSeekerId)
      })
  }

  useEffect(() => {
    getjobs()
  }, [])

  function goUp(){
    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
  }
  function goDown(){
    window.scrollTo(50,5000000)

    }      
  
  return (
    <>
        
    {/* <div style={{display:"flex", marginTop:"20px"}}> */}
                            {/* <img style={{ height:"25px", color:"grey", marginTop:"20px", marginLeft:"8%", cursor:"pointer",
             width:"28px"}} onClick={()=>{navigate(-1)}}  src={Arrowimage} /> */}
             {/* <button style={{  color:"grey", marginTop:"10px", marginLeft:"8%", cursor:"pointer",}} 
             onClick={()=>{navigate(-1)}}>Back</button> */}
             {/* <button class={styles.jobdetailBackBtn} onClick={()=>{navigate(-1)}}>Back</button> */}
              
    {/* </div> */}

      {screenSize.width>850 ?

        <>
    <div class={ styles.blogArrow} style={{display:"flex", height:"50px", alignItems:"center"}}>
           <h2 style={{fontSize:"25px",marginLeft:"120px", fontWeight:"800", marginTop:"-15px", marginBottom:"-15px"}}> Blogs  </h2>
          <img style={{marginLeft:"35%", height: "30px"}}  onClick={()=>{goDown()}} src={Down}/>
        </div>
        
    <div class={styles.readPageContainer}>
       <div class={styles.ReadPageBtnTitleContainer} style={{display:"flex"}}>
           <button class={styles.readPageBackBtn} onClick={()=>{navigate(-1)}}>Back</button>
     
              <h1 style={{textAlign:"center", fontSize:"40px", whiteSpace:"no", marginTop:"10px",marginRight:"120px"}}>{jobs?.jobTitle?jobs.jobTitle.charAt(0).toUpperCase()+jobs.jobTitle.substring(1):"Loading..."}</h1>
           
           {/* <button class={styles.readPageBackBtn} onClick={()=>{navigate(-1)}} style={{display:"none"}}>Share</button> */}

      </div>    
              <div style={{marginLeft:"12px"}}>
                <span>Posted by {jobs.name}</span> |  
                <span> Posted on : {new Date(jobs.createdAt).toLocaleString(
                  "en-US",
                  {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  }
                )}</span> . 
              
     </div>


  <table style={{marginLeft:"6px", marginTop:"0px", width:"98.8%", borderCollapse: "collapse",border:"none"}}>         
  
  <tr style={{border:"none"}}>
    <td colSpan={2} style={{border:"none"}}>
    {
      jobdescription? HTMLReactParser(jobdescription.toString()) :""
     } 
    </td>

  </tr>
  </table>
  </div>
  <img style={{marginLeft:"50%",height:"30px",marginBottom:"20px" }}  onClick={()=>{goUp()}} src={Up}/>
          </>
          :
          <>
    <div id={styles.JobCardWrapper} >


              <>
              <div class={styles.mobileReadTopbtnsContainer}>
              <button class={styles.readPageBackBtn} onClick={()=>{navigate(-1)}}>Back</button>
              <img style={{marginLeft:"20%",height:"30px",marginTop:"10px" }}  onClick={()=>{goDown()}} src={Down}/>
              </div>
                <div className={styles.JobCard} >
                <p className={`${styles.Date} ${styles.readPageDate}`}>{new Date(jobs.createdAt).toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        )} </p>
                <div className={styles.JobTitleDateWrapper}>
        <p className={styles.QuestionjobTitle} style={{fontSize:"26px", width:"100%" , marginTop:"2px"}}>{jobs?.jobTitle?jobs.jobTitle.charAt(0).toUpperCase()+jobs.jobTitle.substring(1):"Loading..."}</p>
        {/* <p className={styles.Date}>{new Date(jobs.createdAt).toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        )} </p> */}
        </div>
     
     <table style={{marginLeft:"6px", marginTop:"0px", width:"95.5%"}}>         
  
  <tr >
    <td colSpan={2} >
    {
      jobdescription? HTMLReactParser(jobdescription.toString()) :""
     } 
    </td>


  </tr>
  </table>  

                </div>
                <img style={{marginLeft:"50%",height:"30px",marginTop:"10px" }}  onClick={()=>{goUp()}} src={Up}/>
             
              </>

            </div>

          </>


              }
                          
        </>

  )
}

      export default Answerdetails