import React from 'react'
import Styles from "./nav.module.css"
import { Link, useNavigate, NavLink } from "react-router-dom";


function SidebarNav(props) {
  let navigate = useNavigate()
  return (
  <>
  
      <div className={`${Styles.MovileNavOptions} `} ref ={props.refrence}>
      <p style={{marginLeft:"80%"}} onClick={()=>{props.setShowSideNaveProps((prev)=>!prev)}}> &#10005;</p>
      <div style={{ marginTop:"-40px"}}>
        <p onClick={()=>{navigate("/")}} className={`${Styles.p} `}>Home </p>
        <p onClick={()=>{navigate("/AboutUs")}} className={`${Styles.p} `}>About Us</p>
        <p onClick={()=>{navigate("/Services")}} className={`${Styles.p} `}>Services</p>
        <p onClick={()=>{navigate("/Contact")}} className={`${Styles.p} `}>Contact</p>
        <p onClick={()=>{navigate("/TermsAndCondition")}} className={`${Styles.p} `}>Terms & Conditions</p>
        </div>
      </div>
      </>
  )
}

export default SidebarNav