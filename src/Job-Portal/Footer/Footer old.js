import React from 'react'
import { Link, useNavigate, BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Styles from "./footer.module.css"


function Footer() {
  const navigate = useNavigate()

  return (
    <>
    <div className={Styles.FooterWrapper} >

        {/* <div> */}
    <p className={Styles.FooterItem} onClick={()=>{
      window.scrollTo({
        top:0,
        behavior:"smooth"
      })
      navigate ("/AboutUs")}}>About Us</p>
    <p className={Styles.FooterItem} onClick={()=>{
      window.scrollTo({
        top:0,
        behavior:"smooth"
      })
      navigate ("/Services")}}>Services</p>
    {/* </div> */}

    {/* <div style={{ marginLeft:"10%"}}> */}
    <p className={Styles.FooterItem} onClick={()=>{
      window.scrollTo({
        top:0,
        behavior:"smooth"
      })
      navigate ("/Contact")}}>Contact</p>
    <p className={Styles.FooterItem} onClick={()=>{
      window.scrollTo({
        top:0,
        // behavior:"smooth"
      })
      navigate ("/TermsAndCondition")}}>Terms & Conditions</p>
    {/* <p className={Styles.FooterItem}>Blogs</p> */}
    {/* </div> */}

    </div>
    </>
  )
}

export default Footer

