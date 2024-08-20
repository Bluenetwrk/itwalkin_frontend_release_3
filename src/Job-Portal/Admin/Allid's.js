import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios"

function Allid() {
  const [ids , setids] = useState([])

    async function JobSeekerNoticePeriod() {
        let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
        const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
        await axios.get("/StudentProfile/getAllemail", {headers})
          .then((res) => {
            let result = (res.data)
            setids(result)  
          })
          .catch((err)=>{
            alert("server issue occured")
          })
      }
    
      useEffect(() => {
        JobSeekerNoticePeriod()
      }, [])
  return (
    <>

<p> Total Id's are {ids.length}</p>
    {

        ids.map((ids, i)=>{
            return(
                <>
                <p>{ids.length}</p>
                <p>{ids.email}</p>
                </>
            )
        })
    }
    </>
  )
}

export default Allid