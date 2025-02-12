import React, { useState } from 'react'
import Styles from "./nav.module.css"
import { Link, useNavigate, NavLink } from "react-router-dom";


function SidebarNav(props) {
  const[show,setShow]=useState(false)
  let navigate = useNavigate()
  return (
  <>
  
      <div  >
      {/* <p style={{marginLeft:"80%"}} onClick={()=>{props.setShowSideNaveProps((prev)=>!prev)}}> &#10005;</p> */}
      <div style={{ marginTop:"-15px", zIndex:1000}}>
        <p onClick={()=>{navigate("/"); props.setShowSideNaveProps(false)}} className={`${Styles.textinMobileSodeBar} `}>Home </p>
        <p onClick={()=>{navigate("/AboutUs"); props.setShowSideNaveProps(false)}} className={`${Styles.textinMobileSodeBar} `}>About Us</p>
        <p onClick={()=>{navigate("/Services"); props.setShowSideNaveProps(false)}} className={`${Styles.textinMobileSodeBar} `}>Our Services</p>
        <p onClick={()=>{navigate("/Contact"); props.setShowSideNaveProps(false)}} className={`${Styles.textinMobileSodeBar} `}>Contact Us</p>
        <p onClick={()=>{navigate("/AllCareerJobs"); props.setShowSideNaveProps(false)}} className={`${Styles.textinMobileSodeBar} `}>ITwalkin Career</p>
        <p onClick={()=>{navigate("/Blogs"); props.setShowSideNaveProps(false)}} className={`${Styles.textinMobileSodeBar} `}>Blogs </p>
        <p onClick={()=>{navigate("/TermsAndCondition"); props.setShowSideNaveProps(false)}} className={`${Styles.textinMobileSodeBar} `}>Terms & Conditions</p>
        <p onClick={()=>{setShow(prev=>!prev)}} className={`${Styles.textinMobileSodeBar} `}>New Registration
       {
        show?
        <i  className={`${Styles.arrow} ${Styles.down}`} ></i>
        :
        <i  className={`${Styles.arrow} ${Styles.up}`} ></i>     
       }
        </p>
       {
        show?
        <div style={{marginLeft:"10px"}}>
<p onClick={() => { navigate("/New-Registration");props.setShowSideNaveProps(false);setShow(false); window.scrollTo({top:0}) }} className={`${Styles.textinMobileSodeBar} `}>Employer Login </p>
<p onClick={() => { navigate("/Jobseeker-New-Registration");props.setShowSideNaveProps(false);setShow(false); window.scrollTo({top:0}) }}className={`${Styles.textinMobileSodeBar} `} >Job Seeker Login</p>
        </div>
        :""
       }
       
       
        </div>
      </div>
      </>
  )
}

export default SidebarNav