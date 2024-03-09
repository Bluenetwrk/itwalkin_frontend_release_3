import React  from 'react'
import axios from "axios"
import { useState, useEffect } from 'react'


function Services() {
    const [Services, setServices]= useState([])

   async function getServices(){
    await axios.get("https://itwalkin-backend.onrender.com/admin/getWebsiteDetails")
    .then((res)=>{
        // console.log(res.data)
        let result = res.data.result
        // console.log(result[0].AboutUs)
        setServices(result[0].Services)
    })
    }

    useEffect(()=>{
getServices()
    },[])

  return ( 
        <>
     
{/* {
        Services.map((descrip, di) => {
          return (
            <>
              {
                descrip.type == "unordered-list-item" ?

                  <ul style={{ listStyleType: "disc" }}>
                    <li>
                      {descrip.text}

                    </li>
                  </ul>

                  : descrip.type == "ordered-list-item" ?

                    <ol >
                    
                        {descrip.text}

                    </ol>
                    :
                    <>
                      {descrip.text}
                      <br></br>
                    </>

              }
            </>
          )
        })} */}
        <div style={{marginLeft:"20px"}}>
          <h2 >Our Services</h2>
        <p>
        The ItWalin Platform (including any mobile based applications, website and web applications) is provided by ItWalin Inc. ("ItWalin Time") either directly or through its affiliates including but not limited to ItWalintime Tech Private Limited ("ItWalin India"). Through the ItWalin Platform any person with a verified account can post jobs ("Job Poster") to the ItWalin Platform, access and participate in the services provided by ItWalin. By using ItWalin Platform, you consent to the terms of the Terms of Service in addition to our Privacy Policy.

A Job Poster accessing the ItWalin Platform shall be bound by these Terms of Service, and all other rules, regulations and terms of use referred to herein or provided by ItWalin in relation to any services provided via the ItWalin Platform ("ItWalin Services")
        </p>
        </div>
    </>


    // <div style={{marginLeft:"2%", marginTop:"10px"}}> {Services} </div>
  )
}

export default Services

