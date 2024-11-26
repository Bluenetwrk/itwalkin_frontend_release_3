import React  from 'react'
import axios from "axios"
import { useState, useEffect } from 'react'
import Footer from './Footer/Footer'
import useScreenSize from './SizeHook';
import HTMLReactParser from 'html-react-parser'



function AboutUs() {
  const [AboutUs, setAboutUs]= useState([])
  const screenSize = useScreenSize();

   async function getAboutUs(){
    await axios.get("/admin/getWebsiteDetails")
    .then((res)=>{
        let result = res.data.result
        // console.log("ddddd",result[0].AboutUs)
        setAboutUs(result[0].AboutUs)
    })
    }

    useEffect(()=>{
getAboutUs()
    },[])

  return (
    <>
     

        <div style={{marginLeft:"20px"}}>
          <h2>ABOUT US</h2>
     
         <div style={{width:"93%"}}> {HTMLReactParser(AboutUs.toString())} </div>
        </div>

        {screenSize.width > 750 ?
""
        :

        <Footer/>   
}
    </>

  )
}

export default AboutUs

