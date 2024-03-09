import React  from 'react'
import axios from "axios"
import { useState, useEffect } from 'react'


function Contact() {
    const [Contact, setContact]= useState([])

   async function getContact(){
    await axios.get("https://itwalkin-backend.onrender.com/admin/getWebsiteDetails")
    .then((res)=>{
        let result = res.data.result
        // console.log(result[0].AboutUs)
        setContact(result[0].Contact)
    })
    }

    useEffect(()=>{
getContact()
    },[])

  return (
    
    <>
{/*      
{
        Contact.map((descrip, di) => {
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
        <div style={{marginLeft:"20px", marginTop:"20px"}}>
          <div style={{fontSize:"x-large", fontWeight:"bold"}}>Get in touch with Us by below contact details</div>
        <p>
          Phone No:<br></br>
           +912205577951
          
        </p>
        <p>
          mail address:<br></br>
           itwalkinsupport@gmal.com
        </p>
        <p>
        Contact us at Gandhi Nagar Bangalore
        </p>
        </div>
    </>

    // <div style={{marginLeft:"2%", marginTop:"10px"}}> {Contact} </div>
  )
}

export default Contact

