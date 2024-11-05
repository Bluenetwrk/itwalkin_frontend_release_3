import React from 'react'
import Styles from "../Job-Portal/NaveBar/nav.module.css"
import { Link, useNavigate, NavLink } from "react-router-dom";


function SidebarNav(props) {
  let navigate = useNavigate()

  function Linkedin(e){
    window.open("https://www.linkedin.com/company/104886917/admin/dashboard/", '_blank');
              
                
  }

  return (
  <>
  
      <div  ref ={props.refrence} >
      {/* <p style={{marginLeft:"80%"}} onClick={()=>{props.setShowSideNaveProps((prev)=>!prev)}}> &#10005;</p> */}
      <div style={{ marginTop:"-15px"}}>
        <p onClick={()=>{navigate("/")}} className={`${Styles.p} `}>Home </p>
        <p onClick={()=>{navigate("/AboutUs")}} className={`${Styles.p} `}>About Us</p>
        <p onClick={()=>{navigate("/Services")}} className={`${Styles.p} `}>Our Services</p>
        <p onClick={()=>{navigate("/Contact")}} className={`${Styles.p} `}>Contact Us</p>
        <p onClick={()=>{navigate("/AllCareerJobs")}} className={`${Styles.p} `}>Career</p>
        <p onClick={()=>{navigate("/TermsAndCondition")}} className={`${Styles.p} `}>Terms & Conditions</p>
        <div className={Styles.brands}>

        <a> <i className='fa-brands fa-facebook-square' style={{fontSize:"xx-Large" , marginBottom:"30px"}}></i> </a>
              <a> <i className='fa-brands fa-instagram-square' style={{fontSize:"xx-Large", marginBottom:"30px"}}></i> </a><br></br>
              <a> <i className='fa-brands fa-twitter-square' style={{fontSize:"xx-Large", marginBottom:"30px"}}></i> </a>
              <i class="fa-brands fa-linkedin-square" style={{fontSize:"xx-Large", marginBottom:"30px"}} onClick={Linkedin} ></i><br></br>
        </div>
        </div>
      </div>
      </>
  )
}

export default SidebarNav