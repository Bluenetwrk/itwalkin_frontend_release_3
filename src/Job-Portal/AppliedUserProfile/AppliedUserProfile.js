import React from 'react'
import styles from "./AppliedUserProfile.module.css"
import { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { Puff } from 'react-loader-spinner'
import useScreenSize from '../SizeHook';
import profileDp from "../img/user_3177440.png"


function AppliedUserProfile() {
    let params = useParams()
    let JobId = params.jid

    let navigate = useNavigate()

    const [AppliedUser, setAppliedUser] = useState([])
    const [OperationalAppliedUser, setOperationalAppliedUser] = useState([])
    const [select, setselect] = useState("select")
    const [reject, setreject] = useState("reject")
    const [Onhold, setOnhold] = useState("Onhold")
  const [PageLoader, setPageLoader] = useState(false)
const screenSize = useScreenSize();

    // const [status, setstatus] = useState({select})

    async function getAppliedUserIds(OId) {
        setPageLoader(true)

        await axios.get(`https://itwalkin-backend.onrender.com/jobpost/getAppliedUserIds/${OId}`)
            .then(async (res) => {
                let appliedUserIds = res.data.jobSeekerId

                setOperationalAppliedUser([res.data])
                await axios.get(`https://itwalkin-backend.onrender.com/StudentProfile/getAppliedProfileByIds/${appliedUserIds}`)
                    .then((res) => {
                        setAppliedUser(res.data)
                        setPageLoader(false)
                    }).catch((err) => {
                        alert("server error occured")
                    })
            }).catch((err) => {
                alert("server error occured")
            })
    }

    useEffect(() => {
        getAppliedUserIds(JobId)
    }, [])

    function CheckProfile(StudID) {
        // navigate(`/Check-Profile/${StudID}`)
        window.open(`/Check-Profile/${StudID}`, '_blank')
    }

    async function Select(id, status) {
        let slectedJobseker = id
        await axios.put(`https://itwalkin-backend.onrender.com/jobpost/status/${JobId}`, { slectedJobseker })
            .then((res) => {
                getAppliedUserIds(JobId)

            }).catch((err) => {
                alert("server error occured")
            })
    }
    async function Reject(id, status) {
        let rejectedJobseker = id
        await axios.put(`https://itwalkin-backend.onrender.com/jobpost/status/${JobId}`, { rejectedJobseker })
            .then((res) => {
                getAppliedUserIds(JobId)

            }).catch((err) => {
                alert("server error occured")
            })
    }
    async function onHold(id, status) {
        let onHoldJobseker = id
        await axios.put(`https://itwalkin-backend.onrender.com/jobpost/status/${JobId}`, { onHoldJobseker })
            .then((res) => {
                getAppliedUserIds(JobId)

            }).catch((err) => {
                alert("server error occured")
            })
    }

    async function UndoSelect(id) {
        let slectedJobseker = id

        await axios.put(`https://itwalkin-backend.onrender.com/jobpost/updatforUndoJobApplied/${JobId}`, { slectedJobseker })
            .then((res) => {
                getAppliedUserIds(JobId)
            }).catch((err) => {

                alert("server error occured")
            })

    }

    async function UndoReject(id) {
        let rejectedJobseker = id

        await axios.put(`https://itwalkin-backend.onrender.com/jobpost/updatforUndoJobApplied/${JobId}`, { rejectedJobseker })
            .then((res) => {
                getAppliedUserIds(JobId)
            }).catch((err) => {

                alert("server error occured")
            })

    }

    async function UndoOnHold(id) {
        let onHoldJobseker = id

        await axios.put(`https://itwalkin-backend.onrender.com/jobpost/updatforUndoJobApplied/${JobId}`, { onHoldJobseker })
            .then((res) => {
                getAppliedUserIds(JobId)
            }).catch((err) => {

                alert("server error occured")
            })

    }

    return (
        <>
        <h4 style={{marginTop:"10px", marginLeft:"6%"}}>Total {AppliedUser.length} Profiles</h4>
        {screenSize.width>850?
            <div className={styles.AllUiWrapper}>
                <ul className={styles.ul} >
                    <li className={`${styles.li} ${styles.name}`}><b>Name</b>  </li>
                    <li className={`${styles.li} ${styles.NoticePeriod}`}><b>Notice Period</b>  </li>
                    <li className={`${styles.li} ${styles.age}`}> <b>Age</b> </li>
                    <li className={`${styles.li} ${styles.Qualification}`}>  <b>Qualif</b> </li>
                    <li className={`${styles.li} ${styles.Experiance}`}><b>Experience</b>  </li>
                    <li className={`${styles.li} ${styles.Skills}`}> <b>Skills</b> </li>
                    <li className={`${styles.li} ${styles.currentCTC}`}> <b>Current CTC</b> </li>
                    <li className={`${styles.li} ${styles.ExpectedSalary}`}><b>Expected CTC</b> </li>
                    {/* <li className={`${styles.li} ${styles.checkProfile}`}><b>View Profile</b> </li> */}
                    <li className={`${styles.li} ${styles.Status}`}><b>Status</b> </li>

                </ul>
                {PageLoader ?
            <Puff height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{ marginLeft: "49%", marginTop: "50px" }} />
            : ""
          }

                {
                    AppliedUser.map((Applieduser, i) => {
                        return (
                            <ul className={styles.ul} key={i}>

                                <li className={`${styles.li} ${styles.name} ${styles.onclick}`} onClick={() => { CheckProfile(Applieduser._id) }} >
                                    {Applieduser.name ? <a className={styles.namelink} title="Click to check the Contact Details">
                                        {Applieduser.name}</a> : <li className={styles.Nli}>not updated</li>} </li>
                                <li className={`${styles.li} ${styles.NoticePeriod}`}> {Applieduser.NoticePeriod ?
                                    Applieduser.NoticePeriod : <li className={styles.Nli}>not updated</li>} </li>
                                <li className={`${styles.li} ${styles.age}`}> {Applieduser.age ?
                                    Applieduser.age : <li className={styles.Nli}>not updated</li>} </li>
                                <li className={`${styles.li} ${styles.Qualification}`}> {Applieduser.Qualification ?
                                    Applieduser.Qualification : <li className={styles.Nli}>not updated</li>} </li>
                                <li className={`${styles.li} ${styles.Experiance}`}> {Applieduser.Experiance ?
                                    Applieduser.Experiance : <li className={styles.Nli}>not updated</li>} </li>
                                <li className={`${styles.li} ${styles.Skills}`}> {Applieduser.Skills ?
                                    Applieduser.Skills : <li className={styles.Nli}>not updated</li>} </li>
                                <li className={`${styles.li} ${styles.currentCTC}`}> {Applieduser.currentCTC ?
                                    Applieduser.currentCTC : <li className={styles.Nli}>not updated</li>} </li>
                                <li className={`${styles.li} ${styles.ExpectedSalary}`}> {Applieduser.ExpectedSalary ?
                                    Applieduser.ExpectedSalary : <li className={styles.Nli}>not updated</li>} </li>
                                {/* <li  className={`${styles.li} ${styles.checkProfile}`}><button onClick={()=>{CheckProfile(Applieduser._id)}} className={`${styles.ViewProfile}`}>{Applieduser.name}</button> </li> */}
                                <li className={`${styles.li} ${styles.Status}`}>
                                    <div style={{ marginLeft: "-3%" }}>
                                        {
                                            OperationalAppliedUser.map((operationl, it) => {
                                                return (
                                                    <div key={it}>
                                                        {
                                                            operationl.slectedJobseker.find((jobseekerid) => {
                                                                return (
                                                                    jobseekerid == Applieduser._id
                                                                )
                                                            }) ?
                                                                <>
                                                                    <button onClick={() => { UndoSelect(Applieduser._id, "selected") }} style={{
                                                                        marginLeft: "2%", background: "rgb(24, 175, 24)", color: "white",
                                                                        border: "solid", width: "80%", height: "30px", fontWeight: "bold"
                                                                    }} title="Click to Undo Select">Selected<span style={{ fontSize: '16px' }} >&#10004;</span></button><br></br></>
                                                                :


                                                                (operationl.rejectedJobseker.find((jobseekerid) => {
                                                                    return (
                                                                        jobseekerid == Applieduser._id
                                                                    )
                                                                })) ?
                                                                    <>
                                                                        <button onClick={() => { UndoReject(Applieduser._id, "selected") }} style={{
                                                                            marginLeft: "2%", background: "red", color: "white",
                                                                            border: "solid", width: "80%", height: "30px", fontWeight: "bold"
                                                                        }} title="Click to Undo Reject">Rejected<span style={{ fontSize: '16px' }} >&#10004;</span></button><br></br></>
                                                                    :


                                                                    (operationl.onHoldJobseker.find((jobseekerid) => {
                                                                        return (
                                                                            jobseekerid == Applieduser._id
                                                                        )
                                                                    })) ?
                                                                        <>
                                                                            <button onClick={() => { UndoOnHold(Applieduser._id, "selected") }} style={{
                                                                                marginLeft: "2%", background: "blue", color: "white",
                                                                                border: "solid", width: "80%", height: "30px", fontWeight: "bold"
                                                                            }} title="Click to Undo On Hold">OnHold<span style={{ fontSize: '16px' }} >&#10004;</span></button><br></br></>
                                                                        :
                                                                        <>
                                                                            <button style={{
                                                                                marginLeft: "2%", background: "rgb(40, 4, 99)", color: "white", border: "solid",
                                                                                width: "70%", height: "30px", fontWeight: "bold"
                                                                            }} onClick={() => { Select(Applieduser._id, "selected") }}>Select</button><br></br>
                                                                            <button style={{
                                                                                marginLeft: "2%", background: "rgb(40, 4, 99)", color: "white", border: "solid",
                                                                                width: "70%", height: "30px", fontWeight: "bold"
                                                                            }} onClick={() => { Reject(Applieduser._id, "Rejected") }}>Reject</button><br></br>
                                                                            <button style={{
                                                                                marginLeft: "2%", background: "rgb(40, 4, 99)", color: "white", border: "solid",
                                                                                width: "70%", height: "30px", fontWeight: "bold"
                                                                            }} onClick={() => { onHold(Applieduser._id, "OhHold") }}>OnHold</button><br></br>

                                                                        </>

                                                        }
                                                    </div>
                                                )
                                            })
                                        }

                                        {/* {Applieduser.status==="selected"?
                            <>
                        <button style={{marginLeft:"2%", background:"rgb(24, 175, 24)", color:"white",
                         border:"solid",width:"75%", height:"30px", fontWeight:"bold"}}>Selected<span style={{ fontSize: '16px' }}>&#10004;</span></button><br></br></>
                       :
                       <> <button style={{marginLeft:"2%", background:"rgb(40, 4, 99)", color:"white",border:"solid",width:"75%", height:"30px", fontWeight:"bold"}} onClick={()=>{Select(Applieduser._id, "selected")}}>Select</button><br></br></>
                    }
                      {Applieduser.status==="Rejected"?
                            <>
                        <button style={{marginLeft:"2%", background:"red", color:"white",
                         border:"solid",width:"75%", height:"30px", fontWeight:"bold"}}>Rejected<span style={{ fontSize: '16px' }}>&#10004;</span></button><br></br></>
                       :                       
                        <><button style={{marginLeft:"2%", background:"rgb(40, 4, 99)", color:"white",border:"solid",width:"75%", height:"30px", fontWeight:"bold"}} onClick={()=>{Reject(Applieduser._id, "Rejected")}}>Reject</button><br></br></>
                }
                {Applieduser.status==="OhHold"?
                            <>
                        <button style={{marginLeft:"2%", background:"blue", color:"white",
                         border:"solid",width:"75%", height:"30px", fontWeight:"bold"}}>OnHold<span style={{ fontSize: '16px' }}>&#10004;</span></button><br></br></>
                       : 
                        <> <button style={{marginLeft:"2%", background:"rgb(40, 4, 99)", color:"white",border:"solid",width:"75%", height:"30px", fontWeight:"bold"}} onClick={()=>{onHold(Applieduser._id, "OhHold")}}>OnHold</button><br></br></>
            } */}
                                    </div>
                                </li>
                            </ul>

                        )
                    })
                }
            </div>
            :
            <>
                 {PageLoader ?
            <Puff height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{ marginLeft: "40%", marginTop: "50px" }} />
            : ""
          }
            <div id={styles.JobCardWrapper} >

{AppliedUser.map((job, i) => {
  return (
    <>
      <div className={styles.JobCard} key={i}>

      <div style={{display:"flex"}}>

<div className={styles.LeftTable}>
                <span className={styles.span}>Name :  </span> <br></br>
                <span className={styles.span}>Age :</span><br></br>
                <span className={styles.span}> Notice Period :</span><br></br>
                <span className={styles.span}>Qualification :</span><br></br>
                <span className={styles.span}>Experience : </span><br></br>
                <span className={styles.span}> Current CTC :</span><br></br>
                <span className={styles.span}>Expected CTC : </span><br></br>
            </div>
    
            <div className={styles.RightTable}>
            <span className={styles.span}><span style={{color:"blue", textDecoration:"underline"}} onClick={() => { CheckProfile(job._id) }}  >{job.name} </span></span><br></br>      
            <span className={styles.span}>{job.age? <span style={{ color: "blue" }}>{job.age} </span>:<span style={{color:"red"}}>Not updated</span> }</span><br></br>
            <span className={styles.span}> {job.NoticePeriod?<span style={{ color: "blue" }}>{job.NoticePeriod} </span>: <span style={{color:"red"}}>Not updated</span>}</span><br></br>
            <span className={styles.span}> {job.Qualification?<span style={{ color: "blue" }}>{job.Qualification} </span>:<span style={{color:"red"}}>Not updated</span>}</span><br></br>
            <span className={styles.span}> {job.Experiance?<span style={{ color: "blue" }}>{job.Experiance} </span>:<span style={{color:"red"}}>Not updated</span>}   </span><br></br>
            <span className={styles.span}>{job.currentCTC?<span style={{ color: "blue" }}>{job.currentCTC} </span>:<span style={{color:"red"}}>Not updated</span>} </span><br></br>
            <span className={styles.span}> {job.ExpectedSalary?<span style={{ color: "blue" }}>{job.ExpectedSalary} </span>:<span style={{color:"red"}}>Not updated</span>}</span><br></br>          
            </div>
            <img className={styles.MobileimageView} src={job.image?job.image : profileDp}/>
    
          </div>

          <div className={styles.Down}>
          <span className={styles.span}> Skills : {job.Skills?<span style={{ color: "blue" }}>{job.Skills} </span>:<span style={{color:"red"}}>Not updated</span>}</span><br></br>
         </div>

        {
                                            OperationalAppliedUser.map((operationl) => {
                                                return (
                                                    <>
                                                        {
                                                            operationl.slectedJobseker.find((jobseekerid) => {
                                                                return (
                                                                    jobseekerid == job._id
                                                                )
                                                            }) ?
                                                                <>
                                                                    <button onClick={() => { UndoSelect(job._id, "selected") }} style={{
                                                                        marginLeft: "27%", background: "rgb(24, 175, 24)", color: "white",
                                                                        border: "solid", width: "31%", height: "30px", fontWeight: "bold"
                                                                    }} title="Click to Undo Select">Selected<span style={{ fontSize: '16px' }} >&#10004;</span></button><br></br></>
                                                                :


                                                                (operationl.rejectedJobseker.find((jobseekerid) => {
                                                                    return (
                                                                        jobseekerid == job._id
                                                                    )
                                                                })) ?
                                                                    <>
                                                                        <button onClick={() => { UndoReject(job._id, "selected") }} style={{
                                                                            marginLeft: "27%", background: "red", color: "white",
                                                                            border: "solid", width: "31%", height: "30px", fontWeight: "bold"
                                                                        }} title="Click to Undo Reject">Rejected<span style={{ fontSize: '16px' }} >&#10004;</span></button><br></br></>
                                                                    :


                                                                    (operationl.onHoldJobseker.find((jobseekerid) => {
                                                                        return (
                                                                            jobseekerid == job._id
                                                                        )
                                                                    })) ?
                                                                        <>
                                                                            <button onClick={() => { UndoOnHold(job._id, "selected") }} style={{
                                                                                marginLeft: "27%", background: "blue", color: "white",
                                                                                border: "solid", width: "31%", height: "30px", fontWeight: "bold"
                                                                            }} title="Click to Undo On Hold">OnHold<span style={{ fontSize: '16px' }} >&#10004;</span></button><br></br></>
                                                                        :
                                                                        <>
                                                                        <div style={{display:"flex", marginLeft:"5%"}}>
                                                                            <button style={{
                                                                                marginLeft: "2%", background: "rgb(40, 4, 99)", color: "white", border: "solid",
                                                                                width: "23%", height: "30px", fontWeight: "bold"
                                                                            }} onClick={() => { Select(job._id, "selected") }}>Select</button><br></br>
                                                                            <button style={{
                                                                                marginLeft: "2%", background: "rgb(40, 4, 99)", color: "white", border: "solid",
                                                                                width: "23%", height: "30px", fontWeight: "bold"
                                                                            }} onClick={() => { Reject(job._id, "Rejected") }}>Reject</button><br></br>
                                                                            <button style={{
                                                                                marginLeft: "2%", background: "rgb(40, 4, 99)", color: "white", border: "solid",
                                                                                width: "25%", height: "30px", fontWeight: "bold"
                                                                            }} onClick={() => { onHold(job._id, "OhHold") }}>OnHold</button><br></br>
                                                                            </div>
                                                                        </>

                                                        }
                                                    </>
                                                )
                                            })
                                        }


      </div>
    </>
  )
})}

</div>
            </>
}
        </>
    )
}

export default AppliedUserProfile