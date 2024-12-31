import React, { useEffect, useState } from 'react';
import styles from "./SudentUpdateProfile.module.css"
import imageCompression from 'browser-image-compression';
import axios from 'axios';
import logo from "../img/Blue.jpg"
import { Navigate, useNavigate } from 'react-router-dom';
import profileDp from "../img/user_3177440.png"
import delet from "../img/icons8-delete-48.png"
import { TailSpin } from "react-loader-spinner"
import Companylogo from "../img/logo.png"
import useScreenSize from '../SizeHook';
import socketIO from 'socket.io-client';
import Arrowimage from '../img/icons8-arrow-left-48.png'
import validator from "validator";
import Footer from '../Footer/Footer';
import STyles from "../Login/login.module.css"
import GoogleImage from "../img/icons8-google-48.png"
import MicosoftImage from "../img/icons8-windows-10-48.png"

import { useGoogleLogin } from '@react-oauth/google';



function EmployeeUpdateProfile(props) {
  // useEffect( ()=>{    
  //   const socket = socketIO.connect(props.url,{
  //     auth:{
  //       token: JSON.parse(localStorage.getItem("EmpIdG"))
  //     }
  //   });
  // },[])
  const [file, setFile] = useState()
  const [uploaded, setUploaded] = useState()
const screenSize = useScreenSize();

const [image, setimage] = useState()
const [immage, setimmage] = useState()
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [phoneNumber, setphoneNumber] = useState("")
  const [Aadhar, setAadhar] = useState("")
  const [panCard, setpanCard] = useState("")
  const [CompanyName, setCompanyName] = useState("")
  const [CompanyContact, setCompanyContact] = useState("")
  const [CompanyGSTIN, setCompanyGSTIN] = useState("")
  const [CompanyWebsite, setCompanyWebsite] = useState("")
  const [CompanyAddress, setCompanyAddress] = useState("")
  const [CompanyEmail, setCompanyEmail] = useState("")
  const [TypeofOrganisation, setTypeofOrganisation] = useState("")
  const [loader, setLoader] = useState(false)
  const [emailError, setEmailError] = useState("");

  let navigate = useNavigate()

  let empId = JSON.parse(localStorage.getItem("EmpIdG"))


  const [topMessage, settopMessage] = useState("")

  const [ipAddress, setIPAddress] = useState('')
      const [gmailuser, setGmailuser] = useState("")
    
    
      useEffect(() => {
        fetch('https://api.ipify.org?format=json')
          .then(response => response.json())
          .then(data => setIPAddress(data.ip))
          .catch(error => console.log(error))
      }, []);
  
  
  const login= useGoogleLogin({
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
            }
          }).catch((err) => {
            alert("server issue occured")
          })

      } catch (err) {
        alert("some thing went wrong with google gmail", err)
      }
    }
  })
  const [Api, setApi] = useState("")

   const register = async () => {
    if(!name || !email ||  !phoneNumber || !CompanyName){
      alert("details are missing")
      return false
    }
    const url = "https://graph.microsoft.com/v1.0/invitations";
    const token = Api
    // setInemail(email)
    const response = await fetch(url, {
      method: "POST",
      headers: {
      "Authorization": `Bearer ${token}`, // Send the Bearer Token
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      // Add your request body here
      invitedUserEmailAddress: email,
      // invitedUserEmailAddress: "blueimpulse9@outlook.com",
      // inviteRedirectUrl: "http://localhost",
      inviteRedirectUrl: "https://www.itwalkin.com/",
      sendInvitationMessage: true,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Response data:", data);
    } else {
      console.error("Error:", response.status, response.statusText);
    }
  }
  
  // ...............upload Image.....................
  async function uploadImage() {
    const formdata = new FormData()
    formdata.append('image', image)

    console.log(formdata)
    await axios.put(`/EmpProfile/uploadImage/${empId}`, formdata)
      .then((res) => {
        window.location.reload()
      }).catch((err) => {
      })
  }

  async function prevewImage(e) {
    setLoader(true)
    setimmage("")
    setFile(URL.createObjectURL(e.target.files[0]))
    // setimage(e.target.files[0])
    const imageFile = e.target.files[0];
    const options = {
      maxSizeMB: 0.08,
      // maxWidthOrHeight: 2000,
      useWebWorker: true,
    }
    try {
      const compressedFile = await imageCompression(imageFile, options);
      setLoader(false)
      setimage(compressedFile)

    } catch (error) {
    }
  }
  async function deletePic() {
    await axios.put(`/EmpProfile/deleteImage/${empId}`, { image })
      .then((res) => {
        window.location.reload()
      }).catch((err) => {
        alert("server issue occured")
      })
  }

  function handlephoneNumber(e){

    const sanitizedValue = e.target.value.replace(/[A-Za-z]/g, '');
        // if(e.target.value.includes(/[1-9]/g))
            if (sanitizedValue.length>10){
            return false
        }else{
          setphoneNumber(sanitizedValue)
        }
   }

  const AadharhandleChange = (event) => {
    if (event.target.value.length > 12){
      return false
  }else{
  // setphoneNumber(e.target.value)
  const value = event.target.value;
  const sanitizedValue = value.replace(/[^\w\s]/gi, ''); // Regex to remove special characters
  setAadhar(sanitizedValue);
  }

   };
   
  const PanCardhandleChange = (event) => {
    if (event.target.value.length> 10){
      return false
  }else{
    const value = event.target.value;
    const sanitizedValue = value.replace(/[^\w\s]/gi, ''); // Regex to remove special characters
    setpanCard(sanitizedValue);
  }
   };

   function  handleCompanyname(e){    
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^\w\s.]|_/g, ''); // Regex to remove special characters
    setCompanyName(sanitizedValue);

   }

   function handleCompanyEmail(event){
    const email = event.target.value;
    const sanitizedValue = email.replace(/[^\w\s.@]|_/g, ''); // Regex to remove special characters
    setCompanyEmail(sanitizedValue);

    if (validator.isEmail(email)) {
      setEmailError("");
  } else {
      setEmailError("Enter valid Email!");
  }

   }

   function handleCompanyPhoneNumber(e){

    if (e.target.value.length > 10){
      return false
  }else{
  setCompanyContact(e.target.value)
  }
   }

   function handleGstn(e){
    if (e.target.value.length > 15){
      return false
  }else{
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^\w\s]|_/g, ''); // Regex to remove special characters
    setCompanyGSTIN(sanitizedValue);
  }
   }
   function handleCompanyWebsite(event){
    const email = event.target.value;
    const sanitizedValue = email.replace(/[^\w\s.@/]|_/g, ''); // Regex to remove special characters
    setCompanyWebsite(sanitizedValue);
   }
   function handleCompanyAddress(event){
    const email = event.target.value;
    const sanitizedValue = email.replace(/[^\w\s,.]|_/g, ''); // Regex to remove special characters
    setCompanyAddress(sanitizedValue);
   }


  return (
    <>

      <div className={styles.EntireFullWrapper}>
        <div className={styles.EntireWrapper}>
        <img style={{ height:"25px", color:"grey", marginTop:"20px", marginLeft:"8%", cursor:"pointer",
             width:"28px"}} onClick={()=>{navigate(-1)}}  src={Arrowimage} />
        {/* <h3 style={{color:"rgb(40, 4, 99)", marginLeft:"2%"}}>Update your Profi</h3> */}


          <div className={styles.EmpimageViewWrapper}>
            {file?"":<img className={styles.EmpimageView} src={image ? image : Companylogo} />}
            {file?<img className={styles.EmpfileView} src={file} />:""}

            <div className={styles.EmpaddfileDiconwrapper}>
              <input className={`${styles.addfile} ${styles.EmpaddfileD}`} type="file" accept='.png, .jpg, .jpeg' onChange={prevewImage} />
              <div className={styles.Emploader}> {loader ? <TailSpin height={"40px"} /> : ""} </div>

              {/* <img style ={{color:"blue" , marginTop:"4px", width:"15%"}} src={delet} onClick={deletePic}/> */}
            </div>

          </div>
          <div className={styles.saveDelete}>
            {file && !loader ? <button className={styles.EmpsaveImage} onClick={uploadImage}>Save</button> : ""}
            {immage ? <button className={styles.EmpDeleteImage} onClick={deletePic}>Delete</button> : ""}
          </div>

          <p style={{ fontStyle: "italic", color: "green" }}>{topMessage}</p>
{screenSize.width>850?

<>
          <div className={styles.inputWrapper}>


            <label className={styles.inputName}>
              <h4>Primary User Name : <span style={{fontWeight:800, fontSize:"medium"}} title='(primary user will have the admin right for your  <br></br>
                company, primary user can add or remove multiple secondary user)'>i</span></h4>
              <input maxLength="20" className={styles.input}  value={name}  onChange={(e) => { setname(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Primeary User Email Id:</h4>
              <input maxLength="25" className={styles.input} value={email}  onChange={(e) => { setemail(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Primery user Designation:</h4>
              <input maxLength="90" className={styles.input} value={CompanyAddress} onChange={(e) => {handleCompanyAddress(e) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Primary User Phone number:</h4>
            <input maxLength="15" className={styles.input}  value={phoneNumber} onChange={(e) => { handlephoneNumber(e) }} type="number" />
            </label>
            
            <label className={styles.inputName}>
              <h4>Aadhaar number <span style={{fontWeight:300, fontSize:"small"}}>(Applicable for individual job posters)</span>:</h4>
              <input maxLength="12" className={styles.input} value={Aadhar} onChange={(e) => {AadharhandleChange(e)} } type="number" />
            </label>

            <label className={styles.inputName}>
              <h4>Company Pan Card Number:</h4>
              <input maxLength="12" className={styles.input} value={panCard} onChange={(e) => {PanCardhandleChange(e)} } type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Company Name: </h4>
              <input maxLength="20" className={styles.input} value={CompanyName} onChange={(e) => {handleCompanyname(e) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Company Email id:</h4>
              <input maxLength="25" className={styles.input} value={CompanyEmail} onChange={(e) => { handleCompanyEmail(e) }} type="text" /><br></br>
              <span style={{color:"red", marginLeft:"5%"}}>{emailError}</span>
            </label>

            <label className={styles.inputName}>
              <h4>Company Contact No:</h4>
              <input maxLength="15"  className={styles.input} value={CompanyContact} onChange={(e) => { handleCompanyPhoneNumber(e) }} type="number" />
            </label>

            <label className={styles.inputName}>
              <h4>Company GSTIN: </h4>
              <input maxLength="15" className={styles.input} value={CompanyGSTIN} onChange={(e) => { handleGstn(e) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Company Website:</h4>
              <input maxLength="25" className={styles.input} value={CompanyWebsite} onChange={(e) => { handleCompanyWebsite(e) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Company Address:</h4>
              <input maxLength="90" className={styles.input} value={CompanyAddress} onChange={(e) => { handleCompanyAddress(e) }} type="text" />
            </label>

            {/* <label className={styles.inputName}>
              <h4>Primery user name <span style={{fontWeight:300, fontSize:"small"}}>(primary user will have the admin right for your  <br></br>
               company, primary user can add or remove multiple secondary user)</span>:</h4>
              <input maxLength="90" className={styles.input} value={CompanyAddress} onChange={(e) => {handleCompanyAddress(e) }} type="text" />
            </label> */}

            <label className={styles.inputName}>
              <h4>Primery user email id:</h4>
              <input maxLength="90" className={styles.input} value={CompanyAddress} onChange={(e) => {handleCompanyAddress(e) }} type="text" />
            </label>
            <label className={styles.inputName}>
              <h4>Primery user contact number:</h4>
              <input maxLength="90" className={styles.input} value={CompanyAddress} onChange={(e) => {handleCompanyAddress(e) }} type="text" />
            </label>
            <label className={styles.inputName}>
              <h4>Secondary user name <span style={{fontWeight:300, fontSize:"small"}}>(secondary user will be able to post a <br></br>job search candidates)</span> :</h4>
              <input maxLength="90" className={styles.input} value={CompanyAddress} onChange={(e) => {handleCompanyAddress(e) }} type="text" />
            </label>
            <label className={styles.inputName}>
              <h4>Secondary user Designation:</h4>
              <input maxLength="90" className={styles.input} value={CompanyAddress} onChange={(e) => {handleCompanyAddress(e) }} type="text" />
            </label>
            <label className={styles.inputName}>
              <h4>Secondary user email id:</h4>
              <input maxLength="90" className={styles.input} value={CompanyAddress} onChange={(e) => {handleCompanyAddress(e) }} type="text" />
            </label>
            <label className={styles.inputName}>
              <h4>Secondary user contact number:</h4>
              <input maxLength="90" className={styles.input} value={CompanyAddress} onChange={(e) => {handleCompanyAddress(e) }} type="text" />
            </label>
            {/* <label className={styles.inputName}>
              <h4>Type of Organisation:</h4>
              <input className={styles.input} value={TypeofOrganisation} onChange={(e) => { setTypeofOrganisation(e.target.value) }} type="text" />
            </label> */}
<div className={styles.inputName}>
              <h4>Type of Organisation :  <span style={{color:"blue"}}>{TypeofOrganisation}</span></h4>
              {/* <input className={styles.input} value={TypeofOrganisation} onChange={(e) => { setTypeofOrganisation(e.target.value) }} type="text" /> */}
           
            <select className={styles.input } style={{height:"35px"}}onChange={(e)=>{setTypeofOrganisation(e.target.value)}}>
            {TypeofOrganisation? <option style={{color:"blue"}} >{TypeofOrganisation}</option>
            :<option value="" >Select Company type</option>
            }
              <option value="Pvt.Ltd.">Pvt. Ltd.</option>
              <option value="Firm">Firm</option>
              <option value="Consultancy">Consultancy</option> 
              <option value="Individual">Individual</option> 
            </select>                                 
            </div>           

            {/* <button className={styles.Save} onClick={(e) => { saveUpdate(e) }}>Save</button>
            <button className={styles.cancel} onClick={() => { navigate(-1) }} >cancel</button> */}

<div className={STyles.signUpWrapper} style={{marginLeft:"10px"}} onClick={register} >
          <div className={STyles.both}>
            <img className={STyles.google} src={MicosoftImage} />
            <p className={STyles.signUpwrap} >Rigister with Microsoft</p>
          </div>
        </div>

            <div className={STyles.signUpWrapper} style={{marginLeft:"10px"}} onClick={login}>
          <div className={STyles.both}>
            <img className={STyles.google} src={GoogleImage} />
            <p className={STyles.signUpwrap} >Continue with Google</p>
          </div>
        </div>
          </div>
        {/* <button onClick={getToken}>Get Token</button> */}
              <input placeholder='get token from postman & enter' onChange={(e)=>{setApi(e.target.value)}} 
              style={{marginLeft:"10px", width:"20%"}}/>

</>
          :
          <>
           
<label className={styles.MobileinputName}>
              <h4  className={styles.MobileName}>Name:</h4>
              <input maxLength="22" className={styles.Mobileinput} value={name} disabled onChange={(e) => { setname(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4  className={styles.MobileName}>Email Id:</h4>
              <input maxLength="25" className={styles.Mobileinput} value={email} disabled onChange={(e) => { setemail(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Phone number:</h4>
              <input className={styles.Mobileinput} value={phoneNumber} onChange={(e) => { handlephoneNumber(e) }} type="number" />
            </label>
            
            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Aadhaar number:</h4>
              <input maxLength="16" className={styles.Mobileinput} value={Aadhar} onChange={(e) => { AadharhandleChange(e) }} type="number" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Pan Card Number:</h4>
              <input className={styles.Mobileinput} value={panCard} onChange={(e) => { PanCardhandleChange(e) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Company Name: </h4>
              <input maxLength="25" className={styles.Mobileinput} value={CompanyName} onChange={(e) => { handleCompanyname(e) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Company Email id:</h4>
              <input maxLength="25" className={styles.Mobileinput} value={CompanyEmail} onChange={(e) => { handleCompanyEmail(e) }} type="text" />
           <br></br>
           <span style={{color:"red", marginLeft:"5%"}}>{emailError}</span>

            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Company Contact No:</h4>
              <input maxLength="15" className={styles.Mobileinput} value={CompanyContact} onChange={(e) => { handleCompanyPhoneNumber(e) }} type="number" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Company GSTIN: </h4>
              <input maxLength="15" className={styles.Mobileinput} value={CompanyGSTIN} onChange={(e) => { handleGstn(e) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Company Website:</h4>
              <input maxLength="25" className={styles.Mobileinput} value={CompanyWebsite} onChange={(e) => { handleCompanyWebsite(e)}} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Company Address:</h4>
              <input maxLength="90" className={styles.Mobileinput} value={CompanyAddress} onChange={(e) => {handleCompanyAddress(e) }} type="text" />
            </label>
           
            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Primery user name (primary user will have the admin right for your company, primary user can add or remove multiple secondary user):</h4>
              <input maxLength="90" className={styles.Mobileinput} value={CompanyAddress} onChange={(e) => {handleCompanyAddress(e) }} type="text" />
            </label>
            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Primery user Designation:</h4>
              <input maxLength="90" className={styles.Mobileinput} value={CompanyAddress} onChange={(e) => {handleCompanyAddress(e) }} type="text" />
            </label>
            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Primery user email id:</h4>
              <input maxLength="90" className={styles.Mobileinput} value={CompanyAddress} onChange={(e) => {handleCompanyAddress(e) }} type="text" />
            </label>
            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Primery user contact number:</h4>
              <input maxLength="90" className={styles.Mobileinput} value={CompanyAddress} onChange={(e) => {handleCompanyAddress(e) }} type="text" />
            </label>
            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Secondary user name (secondary user will be able to post a job search candidates):</h4>
              <input maxLength="90" className={styles.Mobileinput} value={CompanyAddress} onChange={(e) => {handleCompanyAddress(e) }} type="text" />
            </label>
            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Secondary user Designation:</h4>
              <input maxLength="90" className={styles.Mobileinput} value={CompanyAddress} onChange={(e) => {handleCompanyAddress(e) }} type="text" />
            </label>
            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Secondary user email id:</h4>
              <input maxLength="90" className={styles.Mobileinput} value={CompanyAddress} onChange={(e) => {handleCompanyAddress(e) }} type="text" />
            </label>
            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Secondary user contact number:</h4>
              <input maxLength="90" className={styles.Mobileinput} value={CompanyAddress} onChange={(e) => {handleCompanyAddress(e) }} type="text" />
            </label>
           
            <div className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Type of Organisation :  <span style={{color:"blue"}}>{TypeofOrganisation}</span></h4>          
            <select className={styles.Mobileinput } style={{height:"35px"}}onChange={(e)=>{setTypeofOrganisation(e.target.value)}}>
            {TypeofOrganisation? <option style={{color:"blue"}} >{TypeofOrganisation}</option>
            :<option value="" >Select Company type</option>
            }
              <option value="Pvt.Ltd.">Pvt. Ltd.</option>
              <option value="Firm">Firm</option>
              <option value="Consultancy">Consultancy</option> 
              <option value="Individual">Individual</option> 

            </select>  
{/*             
            <button className={styles.MobileSave} onClick={(e) => { saveUpdate(e) }}>Save</button>
            <button className={styles.Mobilecancel} onClick={() => { navigate(-1) }} >cancel</button>                                */}
            </div>
            <div style={{marginTop:"60px"}}>
          <Footer/>
        </div>
          </>
}
        </div>

      </div>

    </>
  )
}
export default EmployeeUpdateProfile