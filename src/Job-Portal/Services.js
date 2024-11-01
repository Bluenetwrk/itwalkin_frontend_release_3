import React  from 'react'
import axios from "axios"
import { useState, useEffect } from 'react'
import Footer from './Footer/Footer'
import useScreenSize from './SizeHook';


function Services() {
  const screenSize = useScreenSize();
    const [Services, setServices]= useState([])

   async function getServices(){
    await axios.get("/admin/getWebsiteDetails")
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
        The ITwalkin Platform (including any mobile based applications, website and web applications) is provided by ITwalkin is either directly or through its affiliates including but not limited to Bluenetworks. Through the ITwalkin Platform any person with a verified account can post jobs ("Job Poster") to the ITwalkin Platform, access and participate in the services provided by ITwalkin. By using ITwalkin Platform, your consent to the terms of the Terms of Service in addition to our Privacy Policy.

Any Employer accessing the ITwalkin Platform shall be bound by these Terms of Service, and all other rules, regulations and terms of use referred to herein or provided by ITwalkin in relation to any services provided via the ITwalkin Platform.
     
        </p>
        
        </div>
        {screenSize.width > 750 ?
  <div style={{marginTop:"430px", position:"sticky", bottom:0}}>
          <Footer/>
        </div>
        :
  <div style={{marginTop:"100px",}}>

        <Footer/>   
        </div>
}
        {/* <div style={{marginTop:"330px", position:"sticky", bottom:0,}}>
          <Footer/>
        </div> */}
    </>


    // <div style={{marginLeft:"2%", marginTop:"10px"}}> {Services} </div>
  )
}

export default Services

