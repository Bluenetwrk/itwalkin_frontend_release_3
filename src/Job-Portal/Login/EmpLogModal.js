// Modal.js
import { useState, useEffect, createContext } from "react"
import React from 'react'
import styles from "./login.module.css"
import axios from "axios"
import GoogleImage from "../img/icons8-google-48.png"
import MicosoftImage from "../img/icons8-windows-10-48.png"
import linkedIn from "../img/icons8-linked-in-48.png"
import github from "../img/icons8-github-50.png"

import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import image from "../img/user_3177440.png"
import { TailSpin } from "react-loader-spinner"
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../Config";

const Modal = ({ isOpen, onClose, children }) => {
	const { instance } = useMsal();
	
	const [gmailuser, setGmailuser] = useState("")
	const [topErrorMessage, setTopErrorMessage] = useState("")
	const [PhoneNumber, setPhoneNumber] = useState("")
	const [otp, setotp] = useState("")
  
	const [showotp, setshowotp] = useState(false)
	const [Loader, setLoader] = useState(false)
	const [ipAddress, setIPAddress] = useState('')

	const url = 'https://login.microsoftonline.com/ae4ae520-4db7-4149-ad51-778e540d8bec/oauth2/v2.0/token';

//   const params = new URLSearchParams();
//   params.append('client_id', '097b08ff-185e-4153-aedc-0e5814e0570c');
//   params.append('client_secret', 'D1k8Q~yOxTISdb_LB1tW118c4827PN~c7PK6...');
//   params.append('scope', 'https://graph.microsoft.com/.default');
// async function getToken(){
	const getToken = async () => {
		const url = "https://login.microsoftonline.com/ae4ae520-4db7-4149-ad51-778e540d8bec/oauth2/v2.0/token";
		const data = {
		  grant_type: "client_credentials",
		  client_id: "097b08ff-185e-4153-aedc-0e5814e0570c",
		  client_secret: "D1k8Q~yOxTlSdb_Lb1tW118c4827PN~c7PK6...",
		  scope: "https://graph.microsoft.com/.default"
		};
	  
		try {
		  const response = await axios.post(url, new URLSearchParams(data), {
			headers: {
			  "Content-Type": "application/x-www-form-urlencoded"
			}
		  });
		  console.log("Access Token Response:", response.data);
		  return response.data;
		} catch (error) {
		  console.error("Error fetching access token:", error);
		}
	  };

const register = async () => {
	const url = "https://graph.microsoft.com/v1.0/invitations";
	const token = "eyJ0eXAiOiJKV1QiLCJub25jZSI6Im4tYUFGNjRlSVJhdERVR3BYcWRzQ1I5QnlvQ2QzajVaeUtRMzk2RE1CZVEiLCJhbGciOiJSUzI1NiIsIng1dCI6InoxcnNZSEhKOS04bWdndDRIc1p1OEJLa0JQdyIsImtpZCI6InoxcnNZSEhKOS04bWdndDRIc1p1OEJLa0JQdyJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9hZTRhZTUyMC00ZGI3LTQxNDktYWQ1MS03NzhlNTQwZDhiZWMvIiwiaWF0IjoxNzM1MzE4NjE1LCJuYmYiOjE3MzUzMTg2MTUsImV4cCI6MTczNTMyMjUxNSwiYWlvIjoiazJCZ1lCQllubU9ST3ZuWWZYNFhiZFV0cXB2dUF3QT0iLCJhcHBfZGlzcGxheW5hbWUiOiJJVFdhbGtpbiIsImFwcGlkIjoiMDk3YjA4ZmYtMTg1ZS00MTUzLWFlZGMtMGU1ODE0ZTA1NzBjIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYWU0YWU1MjAtNGRiNy00MTQ5LWFkNTEtNzc4ZTU0MGQ4YmVjLyIsImlkdHlwIjoiYXBwIiwib2lkIjoiZWU2NDE0OTctNmRhYS00ZDQyLWJiZjAtN2RjZTYyNDUxNTIxIiwicmgiOiIxLkFjWUFJT1ZLcnJkTlNVR3RVWGVPVkEyTDdBTUFBQUFBQUFBQXdBQUFBQUFBQUFER0FBREdBQS4iLCJyb2xlcyI6WyJVc2VyLlJlYWRXcml0ZS5BbGwiLCJEaXJlY3RvcnkuUmVhZFdyaXRlLkFsbCIsIlVzZXIuSW52aXRlLkFsbCIsIk1haWwuU2VuZCJdLCJzdWIiOiJlZTY0MTQ5Ny02ZGFhLTRkNDItYmJmMC03ZGNlNjI0NTE1MjEiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiQVMiLCJ0aWQiOiJhZTRhZTUyMC00ZGI3LTQxNDktYWQ1MS03NzhlNTQwZDhiZWMiLCJ1dGkiOiJPUEpNMEVOU0lVR2laWGdjdWdYUkF3IiwidmVyIjoiMS4wIiwid2lkcyI6WyIwOTk3YTFkMC0wZDFkLTRhY2ItYjQwOC1kNWNhNzMxMjFlOTAiXSwieG1zX2lkcmVsIjoiNyAyIiwieG1zX3RjZHQiOjE3Mjc1NDEzMjh9.Etf-xtd2z4cX_g_RztE-rcnZGp2l-LVY6Xqs-NBJJATDvmnNLS1VrHc8d1-8Egzgab5E5McIMDZHyjtb7QEKIAbKRJYFNl8I9OXR1O1f6WtemwxrFo4M_8m1QNE8n4Nc-imaRw1s5VmXiUdlR75cHTglOWEVg6r2pntvYkxcP6fk3NbA9kLTcvpgzv_JGzKQYqn8eeKIExkteaNvviwweKn5_Dz1bEPQ2vVa76vInnwibtogwhuSzw1TEmVjBsU3_VWRErf8WhbO7U_dmFPp-HcHcyt2xxUIhcgDryINUc1GbNu7rqnOciI7pueu5T2hV2Q75yw3r0H_zuUfIuUYNg"
	const response = await fetch(url, {
	  method: "POST",
	  headers: {
		"Authorization": `Bearer ${token}`, // Send the Bearer Token
		"Content-Type": "application/json",
	  },
	  body: JSON.stringify({
		// Add your request body here
		invitedUserEmailAddress: "blueimpulse9@outlook.com",
		inviteRedirectUrl: "http://localhost",
		sendInvitationMessage: true,
	  }),
	});
  
	if (response.ok) {
	  const data = await response.json();
	  console.log("Response data:", data);
	} else {
	  console.error("Error:", response.status, response.statusText);
	}
  };
  
  
  // ......Modal....
	const [open, setOpen] = React.useState(false);
   
	  const handleClose = () => {
		  setOpen(false);
	  };
   
	  const handleOpen = () => {
		  setOpen(true);
	  };
  
  
  
	useEffect(() => {
	  fetch('https://api.ipify.org?format=json')
		.then(response => response.json())
		.then(data => setIPAddress(data.ip))
		.catch(error => console.log(error))
	}, []);
  
  
  
	const login = useGoogleLogin({
	  onSuccess: async (response) => {
		try {
  
		  const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",
			{
			  headers: {
				Authorization: `Bearer ${response.access_token}`,
			  },
			}
		  );
		  setGmailuser(res.data)
		  let gtoken = response.access_token
		  let userId = res.data.sub
		  let email = res.data.email
		  let name = res.data.name
		  let isApproved = false
		  // let image= res.data.picture
  
		  // console.log("decoded name :", gemail)
		  // console.log(" decoded id :", gname)
  
		  await axios.post("/EmpProfile/Glogin", { ipAddress, userId, email, name, gtoken, isApproved })
			.then((response) => {
			  let result = response.data
			  let token = result.token
			  let GuserId = result.id
			  if (result.status == "success") {
				localStorage.setItem("EmpLog", JSON.stringify(btoa(token)))
				localStorage.setItem("EmpIdG", JSON.stringify(GuserId))
				navigate("/Search-Candidate", { state: { gserid: GuserId } })
				onClose()
			  }
			}).catch((err) => {
			  alert("server issue occured")
			})
  
		} catch (err) {
		  alert("some thing went wrong with google gmail", err)
		}
	  }
	})
  
  
  
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState(false)
	const [a, setA] = useState("")
	const [topuperror, setTopuperror] = useState("")
	// const [empidinstate, setEmpidinstate] = useState("inital")
  
  
  
	let navigate = useNavigate()
  
	useEffect(() => {
	  // let studentAuth = localStorage.getItem("StudLog")
	  let EmployeeAuth = localStorage.getItem("EmpLog")
	  if (EmployeeAuth) {
		navigate("/Search-Candidate")
	  }
	}, [])
  
	useEffect(() => {
	  let studentAuth = localStorage.getItem("StudLog")
	  if (studentAuth) {
		navigate("/alljobs")
	  }
	}, [])
  
	useEffect(() => {
	  let adminLogin = localStorage.getItem("AdMLog")
	  if (adminLogin) {
		navigate("/BIAddmin@Profile")
	  }
	}, [])
  
	// .................login from Registration.............
	// async function Emplogin() {
	//   console.log("before sending to backend", email, password)
	//   await axios.post("http://localhost:8080/EmpProfile/login/", { email, password })
	//     .then((response) => {
	//       console.log(response.data)
	//       let result = response.data
	//       if (result.token) {
	//         navigate("/postedjobs")
	//         localStorage.setItem("EmpLog", JSON.stringify(result.token))
	//         let empId = result.id
	//         localStorage.setItem("emId", JSON.stringify(empId))
  
  
	//       } else if (result == "incorrect password") {
	//         setTopuperror("! incorrect passord")
	//       } else if (result == "no user found") {
	//         setTopuperror("! no user exist with this mail id")
  
	//       }
	//     }).catch((err) => {
	//       alert("server issue occured")
	//       console.log("server issue occured")
	//     })
  
	// }
  
	// function login() {
	//   window.open(
	//     `http://localhost:8080/auth/google/callback`,
	//     "_self"
  
	//   );
	// }
	async function sendOtp() {
	  await axios.post("/EmpProfile/otpSignUp", { PhoneNumber })
		.then((res) => {
		  if (res.data == "otp sent") {
			setshowotp(true)
		  }
		})
	}
  
	async function confirmOtp() {
	  let isApproved = false
	  setLoader(true)
	  setTimeout(async () => {
  
		await axios.post("/EmpProfile/verifyOtp", { ipAddress, otp, isApproved })
		  .then((res) => {
			let result = res.data
			if (result == "incorrect Otp") {
			  alert("incorrect OTP")
			}
			if (result.token) {
			  navigate("/Search-Candidate")
			  localStorage.setItem("EmpLog", JSON.stringify(result.token))
			  let empId = result.id
			  localStorage.setItem("EmpIdG", JSON.stringify(empId))
			  // localStorage.setItem("EmpIdG", JSON.stringify(GuserId))
  
			}
			setLoader(false)
  
		  }).catch((err) => {
			alert("some thing went wrong")
		  })
	  }, 1000);
	  setLoader(false)
	}

	if (!isOpen) return null;

	function microsoftLogin() {
		instance.loginPopup(loginRequest)
			.then(async response => {
				// console.log(response)
				let name = response.account.name
				let email = response.account.username
				let isApproved = false
				await axios.post("/EmpProfile/Glogin", { ipAddress, email, name, isApproved })
				.then((response) => {
				  let result = response.data
				  let token = result.token
				  let GuserId = result.id
				  if (result.status == "success") {
					localStorage.setItem("EmpLog", JSON.stringify(btoa(token)))
					localStorage.setItem("EmpIdG", JSON.stringify(GuserId))
					navigate("/Search-Candidate", { state: { gserid: GuserId } })
					onClose()
				  }

					}).catch((err) => {
						alert("server issue occured")
					})
			})
			.catch(error => {
				// console.log("Login error", error);
				// alert("some thing went wrong")
			});
	}


	return (
		<>
		{/* <div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				background: "rgba(0, 0, 0, 0.5)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				zIndex:100
			}}
		> */}
				 <div className={styles.ModelWrapper}>
			
<p onClick={onClose} style={
					{position:"absolute", marginLeft:"85%", marginTop:"0px", cursor:"pointer", display:"inline"}}>
					
                    <i className="fas fa-times" style={{fontSize:"large"}}></i>
				</p>

				{/* {children} */}
                <>

      <div className={styles.BothsignUpWrapperModel}>
        <p className={styles.Loginpage}>Employer Login </p>


        {/* <input maxLength="10" className={styles.inputs} type="number" placeholder='enter phone Number'
          value={PhoneNumber} autoComplete="on" onChange={(e) => { setPhoneNumber(e.target.value) }} />

        {showotp ?
          <>
            <input className={styles.inputs} placeholder='enter OTP'
              value={otp} onChange={(e) => { setotp(e.target.value) }} />
            <button className={`${styles.button} ${styles.inputs}`} onClick={confirmOtp}>Confirm OTP</button>

            <p style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }} onClick={() => { setshowotp(false); setPhoneNumber(""); setotp("") }}>Want to change the number?</p>


          </>
          :
          PhoneNumber.length == 10 ?
            <button className={`${styles.button} ${styles.inputs}`} onClick={sendOtp} disabled>Send OTP</button>
            :
            <button className={`${styles.button} ${styles.inputs}`} onClick={() => { alert("invalid phone number") }}>Send OTP</button>

        }
        {Loader ?
          <div style={{ marginLeft: "10%" }}>
            <TailSpin color=" rgb(40, 4, 99)" height={40} />
          </div>
          : ""}
        
        <h4 className={styles.OR}>OR</h4> */}


        <div className={styles.signUpWrapper} onClick={login} >
          <div className={styles.both}>
            <img className={styles.google} src={GoogleImage} />
            <p className={styles.signUpwrap} >Continue with Google</p>
          </div>
        </div>
        

        {/* <div className={styles.signUpWrapper} onClick={getToken} >
          <div className={styles.both}>
            <img className={styles.google} src={MicosoftImage} />
            <p className={styles.signUpwrap} >Get Microsoft Token</p>
          </div>
        </div> */}

        <div className={styles.signUpWrapper} onClick={microsoftLogin} >
          <div className={styles.both}>
            <img className={styles.google} src={MicosoftImage} />
            <p className={styles.signUpwrap} >Continue with Microsoft</p>
          </div>
        </div>
        <div className={styles.signUpWrapper}  >
          <div className={styles.both}>
            <img className={styles.google} src={linkedIn} />
            <p className={styles.signUpwrap} >Continue with Linkedin</p>
          </div>
        </div>
        <div className={styles.signUpWrapper} onClick={register} >
          <div className={styles.both}>
            <img className={styles.google} src={linkedIn} />
            <p className={styles.signUpwrap} >register microsoft</p>
          </div>
        </div>
		
		
        {/* <div className={styles.signUpWrapper}  >
          <div className={styles.both}>
            <img className={styles.google} src={github} />
            <p className={styles.signUpwrap} >Continue with Github</p>
          </div>
        </div> */}
		
      </div>

				</>
                
			</div>
		{/* </div> */}
		</>
	);
};

export default Modal;
