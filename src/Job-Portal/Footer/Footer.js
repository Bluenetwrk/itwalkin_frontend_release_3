import React from 'react'
// import './footer.css'
import Styles from "./footer.module.css"
import { Link, useNavigate, BrowserRouter, Routes, Route, useLocation } from "react-router-dom";



function Footer() {
  const navigate = useNavigate()

  function Linkedin(){
    window.open("https://www.linkedin.com/company/104886917/admin/dashboard/", '_blank');
                
                
  }

  return (
    <>
      <div className={Styles.footerWraper}>
        <div className={Styles.footer}>

          <div className={Styles.top}>
            <div style={{ width: "50%" }} >
              <p className={Styles.footCart}>ITwalkin.com</p>
              <p  className={Styles.AddYour}>only for IT jobs</p>
            </div>
            <div className={Styles.brands}>
              <a> <i className='fa-brands fa-facebook-square'></i> </a>
              <a> <i className='fa-brands fa-instagram-square'></i> </a>
              <a> <i className='fa-brands fa-twitter-square'></i> </a>
              <i class="fa-brands fa-linkedin-square" onClick={Linkedin} ></i>
            </div>
          </div>

          <div className={Styles.Bottom}>
            <div>
              <h4>   
                 <a onClick={()=>{
      window.scrollTo({
        top:0,
        behavior:"smooth"
      })
      navigate ("/Services")}}>Our Services</a></h4>
              
            </div>
            <div>
              <h4>
                <a onClick={()=>{
      window.scrollTo({
        top:0,
        behavior:"smooth"
      })
      navigate ("/AboutUs")}}>About us</a></h4>
              
            </div>
            <div>
              <h4> <a
              onClick={()=>{
                window.scrollTo({
                  top:0,
                  behavior:"smooth"
                })
                navigate ("/Contact")}}>Contact Us</a></h4>
              
            </div>
            <div>
              <h4> 
              <a
              onClick={()=>{
                window.scrollTo({
                  top:0,
                  // behavior:"smooth"
                })
                navigate ("/TermsAndCondition")}}>Terms and Conditions</a></h4>
              
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Footer