import React from 'react'
import styles from "../Login/login.module.css"
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

import Swal from "sweetalert2";


function AdminAccess() {

    let navigate = useNavigate()

    useEffect(() => {
        let adminLogin = localStorage.getItem("SupAdMLog")
        if (!adminLogin) {
            navigate("/")
        }
    }, [])

    useEffect(() => {
        let studentAuth = localStorage.getItem("StudLog")
        if (studentAuth) {
            navigate("/alljobs")
        }
    })
    useEffect(() => {
        // let studentAuth = localStorage.getItem("StudLog")
        let EmployeeAuth = localStorage.getItem("EmpLog")
        if (EmployeeAuth) {
            navigate("/postedjobs")
        }
    }, [])


    //   Login

    //   async function Adminlogin(){
    //     await axios.post("/admin/adminLogin",{email, password})
    //     .then((res)=>{
    //       let result = res.data
    //       if(result.auth===true){
    //         localStorage.setItem("SupAdMLog", JSON.stringify(btoa(result.token)))
    //         localStorage.setItem("AdMLog", JSON.stringify(btoa(result.token)))
    //         localStorage.setItem("IdLog", JSON.stringify(btoa(result.id)))
    //         navigate("/BIAddmin@Profile")
    //       }else if(result.auth===false){
    //           localStorage.setItem("AdMLog", JSON.stringify(btoa(result.token)))
    //           localStorage.setItem("IdLog", JSON.stringify(btoa(result.id)))
    //           navigate("/BIAddmin@Profile")
    //       }else if(result=="no user found"){
    //         setError("No user found")
    //       }else if(result=="incorrect password"){
    //         setError("incorrect password")
    //       }

    //     }).catch((err)=>{
    //         alert("some thing went wrong")
    //     })
    //   }

    const [email, setEmail] = useState("")  //Impulse@Admin321
    const [password, setPassword] = useState("") //Impulse@Admin123
    const [showPassword, setshowPassword] = useState(false)
    // const [isSuperAdmin, setIsSuperAdmin] = useState(false)
    const [Error, setError] = useState("")
    const [AllAdmin, setAllAdmin] = useState([])

    
    async function deletejob(deleteid) {
        let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
        const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
        Swal.fire({
          title: 'Are you sure?',
          // icon: 'warning',
          width:"260",
          // position:"top",
          customClass:{
            popup:"alertIcon"
          },
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'delete!'
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`/admin/deleteAdmin/${deleteid}`, {headers})
              .then((res) => {
                // getjobs()
                getAllAdmin()
              })
              .catch((err) => { alert("server error occured") })
          }
        })
      }
    async function giveAccess(id, isSuperAdmin){
        // console.log(isSuperAdmin)
        let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
        const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
        Swal.fire({
          title: 'Are you sure?',
          // icon: 'warning',
          width:"260",
          // position:"top",
          customClass:{
            popup:"alertIcon"
          },
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'to give SuperAdmin Access!'
        }).then((result) => {
          if (result.isConfirmed) {
            axios.put(`/admin/giveAccess/${id}`,{isSuperAdmin},{headers})
              .then((res) => {
                // getjobs()
                getAllAdmin()
              })
              .catch((err) => { alert("server error occured") })
          }
        })
      }
    async function AdminRegister() {
        await axios.post("/admin/adminRegister", { email, password })
            .then((res) => {
                if (res.data === "success") {
                    setEmail("")
                    setPassword("")
                    alert("User registered successfully")
                    getAllAdmin()
                }
            })
            .catch((err) => {
                alert("some thing went wrong")
            })
    }
    // get all admin
    async function getAllAdmin() {
        await axios.get("/admin/getAllAdmin")
            .then((res) => {
                setAllAdmin(res.data )
                setEmail("")
                setPassword("")

            })
            .catch((err) => {
                alert("some thing went wrong")
            })
    }
    useEffect(()=>{
        getAllAdmin()
    },[])

    return (
        <>
            {/* <div style={{ display: "flex" }}> */}
                <div style={{ marginTop: "10px", marginLeft: "3%" }}>
                    <h3 id={styles.Loginpage}>Admin Super Admin Access</h3>
                    <p style={{ color: "red", fontStyle: "italic" }}>{Error}</p>

                    <input className={styles.inputs} type="mail" placeholder='enter email id'
                        value={email} autoComplete="on" onChange={(e) => { setEmail(e.target.value) }} />

                    <input className={styles.inputs} type={showPassword ? "tex" : "password"} placeholder='enter password'
                        value={password} onChange={(e) => { setPassword(e.target.value) }} />


                    <label> <input type="checkbox" value={showPassword} onClick={() => { setshowPassword((prev) => !prev) }} /><span>show password</span></label>

                    {/* <button className={`${styles.button} ${styles.inputs}`} onClick={Adminlogin}>Login</button> */}
                    <button className={`${styles.button} ${styles.inputs}`} onClick={()=>{AdminRegister()}}>Register</button>
                </div>
                {/* Right Side */}
                <div style={{}}>
                    
                                {/* <p  style={{  color:user.isSuperAdmin?"rgb(23, 209, 23)":"blue"}} key={i}>{user.email} {user.isSuperAdmin?<span> (Super Admin)</span>:""}</p> */}
                           
         <table >
           <tr>
    <th style={{ backgroundColor: " rgb(40, 4, 99)" , color:"white",textAlign:"center"}}>Email</th>
    <th style={{ backgroundColor: " rgb(40, 4, 99)" , color:"white",textAlign:"center"}}>Admin Type</th>
    <th style={{ backgroundColor: " rgb(40, 4, 99)" , color:"white",textAlign:"center"}}>Give super admin Access</th>
    <th style={{ backgroundColor: " rgb(40, 4, 99)" , color:"white",textAlign:"center"}}>Delete</th>
         </tr>
                                    {
                        AllAdmin.map((user, i)=>{
                            return(
                                <>
                                    {/* <tr style={user.isSuperAdmin?{backgroundColor:"green"}:""}> */}
                                <tr style={user.isSuperAdmin ? { backgroundColor: "#3ef222" } :{}}>

                                       <td style={{textAlign:"center"}} >{user.email}</td>
                                       <td style={{textAlign:"center"}}>{user.isSuperAdmin===true?"Super Admin":"Admin"}</td>
                                       <td style={{textAlign:"center"}}>
                                        <button onClick={()=>{giveAccess(user._id, !user.isSuperAdmin)}}>Give Access</button>
                                       </td>
                                       <td style={{textAlign:"center"}}>
                                        <button onClick={()=>{deletejob(user._id)}}>Delete</button>
                                       </td>
                                    </tr>
                                </>
                            )
                        })
                    }                
                    </table>
                </div>
            {/* </div> */}
        </>
    )
}

export default AdminAccess