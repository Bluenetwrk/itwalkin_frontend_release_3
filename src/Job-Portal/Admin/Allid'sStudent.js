import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios"
import AllEmpIda from "./Allid'sEmployee"

function Allid() {
  const [ids, setids] = useState([])

  const allIds = ids.map((ids, i) => {
    return ids.email
  })


  async function JobSeekerNoticePeriod() {
    let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
    const headers = { authorization: userid + " " + atob(JSON.parse(localStorage.getItem("AdMLog"))) };
    await axios.get("/StudentProfile/getAllemail", { headers })
      .then((res) => {
        let result = (res.data)
        setids(result)
      })
      .catch((err) => {
        alert("server issue occured")
      })
  }
  useEffect(() => {
    JobSeekerNoticePeriod()
  }, [])
  return (
    <>
      <div style={{ display: "flex", justifyContent:"center" }}>
        <div style={{width:"50%", margin:"5px", padding:"10px", border: "solid 1px", borderRadius:"10px"}}>
          <button
            onClick={ () => {
               navigator.clipboard.writeText(allIds)
               alert("text coppied")
            }}>
            Copy
          </button>
          <p> Total Id's of Job Seekers are {ids.length}</p>
          <div style={{ display: "flex", flexWrap: "wrap" }} >
            {
              ids.map((ids, i) => {
                return (
                  <>
                    <span>{ids.email}</span>
                  </>
                )
              })
            }
          </div>

        </div>
        <div style={{width:"50%", margin:"5px", padding:"10px", border: "solid 1px", borderRadius:"10px"}} >
          <AllEmpIda />
        </div>
      </div>

    </>
  )
}

export default Allid