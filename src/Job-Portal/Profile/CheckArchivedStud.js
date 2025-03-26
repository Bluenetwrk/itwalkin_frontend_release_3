import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from "./StudentProfile.module.css"
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import profileDp from "../img/user_3177440.png";
import Swal from "sweetalert2";
import { Puff } from  'react-loader-spinner'
import useScreenSize from '../SizeHook';
import Arrowimage from '../img/icons8-arrow-left-48.png'


function CheckStudentProfileForAdmin() {
  let navigate = useNavigate()

    useEffect(()=>{
        let adminLogin= localStorage.getItem("AdMLog")
            if(!adminLogin){
                navigate("/")
            }
        },[])

    const [profileData, setProfileData] = useState([])
const [PageLoader, setPageLoader] = useState(false)
const screenSize = useScreenSize();

const [message, setmessage] = useState("")

    let studId = JSON.parse(localStorage.getItem("StudId"))
    let params =useParams()
    
    async function getProfile() {
      setPageLoader(true)
      let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
      const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
        await axios.get(`/StudentProfile/getArchivedProfile/${params.CP}`,{headers})
            .then((res) => {
                let result = res.data
                // console.log(result)
                  setProfileData([result.Archived[0]])           
        setPageLoader(false)

            }).catch((err) => {
               
                alert("some thing went wrong")
            })
    }

    useEffect(() => {
        getProfile()
    }, [])

    


    return (
        <>
                        <img style={{ height:"25px", color:"grey", marginTop:"20px", marginLeft:"8%", cursor:"pointer",
             width:"28px"}} onClick={()=>{navigate(-1)}}  src={Arrowimage} />
{

profileData.map((item, i) => {
    return (
        <div key={i}>
        <img className={styles.imageV} src={item.image?item.image : profileDp}/>
        
        </div>
    )

})
    }
                                            {PageLoader?
 <Puff  height="90"  width="90"  color="#4fa94d"  ariaLabel="bars-loading"  wrapperStyle={{marginLeft:"45%", marginTop:"60px"}}/> 
     :""
  }
           
<div className={styles.uiwrapper}>
            <ul className={styles.ul}>
                <li className={styles.li}><b>Name </b></li>
                <li className={styles.li}><b>Email  Address</b></li>
                <li className={styles.li}><b>Phone  Number</b></li>
                <li className={styles.li}><b>Aadhar</b></li>
                <li className={styles.li}><b>Pan  Card</b></li>
                <li className={styles.li}><b>Age</b></li>
                <li className={styles.li}><b>Notice  Period</b></li>
                <li className={styles.li}><b>Expected  Salary</b></li>
                <li className={styles.li}><b>Current  CTC</b></li>
                <li className={styles.li}><b>Qualification</b></li>
                <li className={styles.li}><b>Skills</b></li>
                <li className={styles.li}><b>Experience</b></li>
                <li className={styles.li}><b>Ip Address</b></li>
                {/* <li className={`${styles.li} ${styles.Approval}`}  ><b>Status</b></li> */}
                {/* <li className={`${styles.li} ${styles.Approval}`}  ><b>Reject</b></li> */}
                {/* <li className={`${styles.li} ${styles.Approval}`}  ><b>Delete</b></li> */}
                {/* <li className={`${styles.li}`} style={{height:"30px"}}><b>Message</b></li> */}


            </ul>
   

            {

                profileData.map((item, i) => {
                    return (
                        <ul className={styles.ulR} key={i}>
                            <li className={`${styles.Hli}`}>{item.name?item.name:<li className={styles.Nli}>Not Updated</li>}</li>
                            <li className={`${styles.Hli}`}>{item.email?item.email:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.phoneNumber?item.phoneNumber:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.Aadhar?item.Aadhar:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.panCard?item.panCard:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.age?item.age:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.NoticePeriod?item.NoticePeriod:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.ExpectedSalary?item.ExpectedSalary:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.currentCTC?item.currentCTC:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.Qualification?item.Qualification:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.Skills?item.Skills:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.Experiance?item.Experiance:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.ipAddress?item.ipAddress:<li className={styles.Nli}>could not fetch the Ip Address</li>}</li>
                      
                       {/* <li className={` ${styles.Hli} ${styles.Approval}`}>
                        {
                        item.isApproved?
                  <button className={styles.Approved} onClick={()=>{DisApprove(item._id, false)}}>Approved&#10004;</button>
                  :
                  item.isReject?
                  <button className={styles.Rejected} onClick={()=>{unReject(item._id, false)}}>Rejected&#10004;</button>
                 : <>
                  <button className={styles.Approve} onClick={()=>{Approve(item._id, true)}}>Approve</button>&nbsp;
                  <button className={styles.Approve} onClick={()=>{Reject(item._id, true)}}>Reject</button>
                  </>

                  }
                  </li> */}

                    {/* <li style={{height:"30px"}} className={` ${styles.Hli}`}> <input style={{height:"24px", width:"80%", marginLeft:"11%"}}  value ={message} onChange={(e)=>{setmessage(e.target.value)}} />
                     <button onClick={()=>{sendMessage(item._id)}}>Send</button> </li> */}

                        </ul>
                    )
                })

            }
            </div>
                    

        </>
    )
}

export default CheckStudentProfileForAdmin