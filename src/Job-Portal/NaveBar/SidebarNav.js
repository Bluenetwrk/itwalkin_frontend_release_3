import React from 'react'
import Styles from "./nav.module.css"
import { Link, useNavigate, NavLink } from "react-router-dom";


function SidebarNav(props) {
  let navigate = useNavigate()
  return (
  <>
  
      <div  ref ={props.refrence} >
      {/* <p style={{marginLeft:"80%"}} onClick={()=>{props.setShowSideNaveProps((prev)=>!prev)}}> &#10005;</p> */}
      <div style={{ marginTop:"-15px", zIndex:1000}}>
        <p onClick={()=>{navigate("/")}} className={`${Styles.textinMobileSodeBar} `}>Home </p>
        <p onClick={()=>{navigate("/AboutUs")}} className={`${Styles.textinMobileSodeBar} `}>About Us</p>
        <p onClick={()=>{navigate("/Services")}} className={`${Styles.textinMobileSodeBar} `}>Our Services</p>
        <p onClick={()=>{navigate("/Contact")}} className={`${Styles.textinMobileSodeBar} `}>Contact Us</p>
        <p onClick={()=>{navigate("/AllCareerJobs")}} className={`${Styles.textinMobileSodeBar} `}>ITwalkin Career</p>
        <p onClick={()=>{navigate("/Blogs")}} className={`${Styles.textinMobileSodeBar} `}>Blogs </p>
        <p onClick={()=>{navigate("/TermsAndCondition")}} className={`${Styles.textinMobileSodeBar} `}>Terms & Conditions</p>
        </div>
      </div>
      </>
  )
}

export default SidebarNav