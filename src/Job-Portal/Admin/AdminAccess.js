import React from 'react'
import styles from "../Login/login.module.css"
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'


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
    const [Error, setError] = useState("")
    const [AllAdmin, setAllAdmin] = useState([])

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
            <div style={{ display: "flex" }}>
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
                <div style={{marginLeft:"20%"}}>
                    {
                        AllAdmin.map((user, i)=>{
                            return(
                                <p  style={{  color:user.isSuperAdmin?"rgb(23, 209, 23)":"blue"}} key={i}>{user.email} {user.isSuperAdmin?<span> (Super Admin)</span>:""}</p>
                            )
                        })
                    }                
                </div>
            </div>
        </>
    )
}

export default AdminAccess