import React  from 'react'
import axios from "axios"
import { useState, useEffect } from 'react'
import Footer from './Footer/Footer'
import useScreenSize from './SizeHook';



function AboutUs() {
  const [AboutUs, setAboutUs]= useState([])
  const screenSize = useScreenSize();

   async function getAboutUs(){
    await axios.get("/admin/getWebsiteDetails")
    .then((res)=>{
        // console.log(res.data)
        let result = res.data.result
        // console.log(result[0].AboutUs)
        setAboutUs(result[0].AboutUs)
    })
    }

    useEffect(()=>{
getAboutUs()
    },[])

  return (
    <>
     
{/* {
        AboutUs.map((descrip, di) => {
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
        <p>
          <h2>ABOUT US</h2>
        IT Walkin  is the most innovative ,fast and reliable online job portal in India. <br></br><br></br>

IT Walkin  connects jobseekers and recruiters by accurately matching candidate profiles to the relevant job openings through an advanced 2-way matching technology. While most job portals only focus on getting candidates the next job, ITWalkin focuses on the entire career growth of candidates. <br></br><br></br>

As the industry shifts towards mobile, ITWalkin  is leading the transition and is the fastest growing job portal on mobile devices, witnessing a 100% YOY growth in mobile traffic and also offers on-the-go jobs through  Search App.<br></br><br></br>

ITWalkin works closely to bridge the gap between talent & opportunities and offers end-to-end recruitment solutions. <br></br><br></br>

At the heart of our success and our future is innovation. We are building some of the best technology to customise our search results, keeping in mind that your job title doesn't define your potential. So much so that two of you from the same field will see completely different results for the same query. Decades of industry insights and new-age technology have come together to bring you the perfect career experience.<br></br><br></br>
        </p>
        </div>

        {screenSize.width > 750 ?
  <div style={{marginTop:"330px", position:"sticky", bottom:0}}>
          <Footer/>
        </div>
        :
  <div style={{marginTop:"100px",}}>

        <Footer/>   
        </div>
}
    </>

    // <div style={{marginLeft:"2%", marginTop:"10px"}}> {AboutUs} </div>
  )
}

export default AboutUs

