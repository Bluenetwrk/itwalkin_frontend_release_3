import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios"

function AllidEmp() {
  const [ids , setids] = useState([])

  const allIds= ids.map((ids, i)=>{
    return ids.email
})

    async function JobSeekerNoticePeriod() {
        let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
        const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
        await axios.get("/EmpProfile/getAllemail", {headers})
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
    <button
        onClick={() => {
          navigator.clipboard.writeText(allIds);
          alert("text coppied")

        }}>        
        Copy
      </button>

<p> Total Id's of Employees are {ids.length}</p>
<div style={{ display:"flex", flexWrap:"wrap"}} >
    {
        ids.map((ids, i)=>{
            return(
                <>
                <span>{ids.email}</span>
                </>
            )
        })
    }
                </div>

    </>
  )
}

export default AllidEmp