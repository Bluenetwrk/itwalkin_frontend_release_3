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


function EmployeeUpdateProfile() {
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

  let navigate = useNavigate()

  let empId = JSON.parse(localStorage.getItem("EmpIdG"))


  const [topMessage, settopMessage] = useState("")

  async function getUser() {
    const headers = { authorization: 'BlueItImpulseWalkinIn'};

    await axios.get(`/EmpProfile/getProfile/${empId}`, {headers})
      .then((res) => {
        let result = res.data.result
        if (result) {
          setname(result.name)
          setemail(result.email)
          // result.image? setimage(result.image):setimage(Companylogo)
          setimage(result.image)
          setimmage(result.image)
          setphoneNumber(result.phoneNumber)
          setAadhar(result.Aadhar)
          setpanCard(result.panCard)
          setCompanyName(result.CompanyName)
          setCompanyContact(result.CompanyContact)
          setCompanyGSTIN(result.CompanyGSTIN)
          setCompanyWebsite(result.CompanyWebsite)
          setCompanyAddress(result.CompanyAddress)
          setTypeofOrganisation(result.TypeofOrganisation)
          setCompanyEmail(result.CompanyEmail)
        }
      }).catch((err) => {
        alert("server issue occured", err)
      })
  }
  useEffect(() => {
    getUser()
  }, [])

  async function saveUpdate(e) {
    let userid = JSON.parse(localStorage.getItem("EmpIdG"))
    const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("EmpLog"))) };
    // e.preventDefault()
    // console.log("before saving", empId,
    //   name, email, phoneNumber, Aadhar, panCard,CompanyName,CompanyContact, CompanyGSTIN, CompanyWebsite, CompanyAddress,
    //   CompanyEmail, TypeofOrganisation 
    // )
    await axios.put(`/EmpProfile/updatProfile/${empId}`, {
      name, email, phoneNumber, Aadhar, panCard, CompanyName, CompanyContact, CompanyGSTIN, CompanyWebsite,
      CompanyAddress, CompanyEmail, TypeofOrganisation}, {headers})
      .then(async (res) => {
        let result = res.data
        if (result == "success") {
          settopMessage("Success! Profile updated successfully")
        } else if (result == "feilds are missing") {
          settopMessage("Alert!..name, emailAddress, NoticePeriod, phoneNumber, Qualification, Skills and Experiance should not be empty")
        }

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });


      }).catch((err) => {
      })
  }

  // ...............upload Image.....................
  async function uploadImage() {
    const formdata = new FormData()
    formdata.append('image', image)

    // console.log(formdata)
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


  const AadharhandleChange = (event) => {
    const value = event.target.value;
    const sanitizedValue = value.replace(/[^\w\s]/gi, ''); // Regex to remove special characters
    setAadhar(sanitizedValue);
   };
   
  const PanCardhandleChange = (event) => {
    const value = event.target.value;
    const sanitizedValue = value.replace(/[^\w\s]/gi, ''); // Regex to remove special characters
    setpanCard(sanitizedValue);
   };

   
window.addEventListener('keypress', function(event){
    
  // Get the key code
  let keycode = event.which || event.keyCode;
  
  // Check if key pressed is a special character
  if(keycode < 32 || 
   (keycode > 32 && keycode < 44) || 
   (keycode > 44 && keycode < 46) || 
   (keycode > 46 && keycode < 48) || 
   (keycode > 57 && keycode < 64) || 
   (keycode > 90 && keycode < 97) ||
   keycode > 122
  ){
      // Restrict the special characters
      event.preventDefault();  
      // alert("special characters are not allowed")
      return false;
  }
}); 


  return (
    <>

      <div className={styles.EntireFullWrapper}>
        <div className={styles.EntireWrapper}>
        <h3 style={{color:"rgb(40, 4, 99)", marginLeft:"2%"}}>Update your Profile</h3>


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
          <div className={styles.inputWrapper}>


            <label className={styles.inputName}>
              <h4>Name:</h4>
              <input maxLength="20" className={styles.input}  value={name} onChange={(e) => { setname(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Email Id:</h4>
              <input maxLength="25" className={styles.input} value={email} onChange={(e) => { setemail(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Phone number:</h4>
              <input maxLength="15" className={styles.input} value={phoneNumber} onChange={(e) => { setphoneNumber(e.target.value) }} type="text" />
            </label>
            
            <label className={styles.inputName}>
              <h4>Aadhaar number:</h4>
              <input maxLength="12" className={styles.input} value={Aadhar} onChange={(e) => {AadharhandleChange(e)} } type="number" />
            </label>

            <label className={styles.inputName}>
              <h4>Pan Card Number:</h4>
              <input maxLength="12" className={styles.input} value={panCard} onChange={(e) => {PanCardhandleChange(e)} } type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Company Name: </h4>
              <input maxLength="20" className={styles.input} value={CompanyName} onChange={(e) => { setCompanyName(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Company Email id:</h4>
              <input maxLength="25" className={styles.input} value={CompanyEmail} onChange={(e) => { setCompanyEmail(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Company Contact No:</h4>
              <input maxLength="15" className={styles.input} value={CompanyContact} onChange={(e) => { setCompanyContact(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Company GSTIN: </h4>
              <input maxLength="20" className={styles.input} value={CompanyGSTIN} onChange={(e) => { setCompanyGSTIN(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Company Website:</h4>
              <input maxLength="25" className={styles.input} value={CompanyWebsite} onChange={(e) => { setCompanyWebsite(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Company Address:</h4>
              <input maxLength="90" className={styles.input} value={CompanyAddress} onChange={(e) => { setCompanyAddress(e.target.value) }} type="text" />
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
            </select>                                 
            </div>           

            <button className={styles.Save} onClick={(e) => { saveUpdate(e) }}>Save</button>
            <button className={styles.cancel} onClick={() => { navigate(-1) }} >cancel</button>

          </div>
          :
          <>
           
<label className={styles.MobileinputName}>
              <h4  className={styles.MobileName}>Name:</h4>
              <input maxLength="22" className={styles.Mobileinput} value={name} onChange={(e) => { setname(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4  className={styles.MobileName}>Email Id:</h4>
              <input maxLength="25" className={styles.Mobileinput} value={email} onChange={(e) => { setemail(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Phone number:</h4>
              <input maxLength="15" className={styles.Mobileinput} value={phoneNumber} onChange={(e) => { setphoneNumber(e.target.value) }} type="text" />
            </label>
            
            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Aadhaar number:</h4>
              <input maxLength="16" className={styles.Mobileinput} value={Aadhar} onChange={(e) => { AadharhandleChange(e) }} type="number" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Pan Card Number:</h4>
              <input maxLength="16" className={styles.Mobileinput} value={panCard} onChange={(e) => { PanCardhandleChange(e) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Company Name: </h4>
              <input maxLength="25" className={styles.Mobileinput} value={CompanyName} onChange={(e) => { setCompanyName(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Company Email id:</h4>
              <input maxLength="25" className={styles.Mobileinput} value={CompanyEmail} onChange={(e) => { setCompanyEmail(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Company Contact No:</h4>
              <input maxLength="15" className={styles.Mobileinput} value={CompanyContact} onChange={(e) => { setCompanyContact(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Company GSTIN: </h4>
              <input maxLength="15" className={styles.Mobileinput} value={CompanyGSTIN} onChange={(e) => { setCompanyGSTIN(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Company Website:</h4>
              <input maxLength="25" className={styles.Mobileinput} value={CompanyWebsite} onChange={(e) => { setCompanyWebsite(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Company Address:</h4>
              <input maxLength="90" className={styles.Mobileinput} value={CompanyAddress} onChange={(e) => { setCompanyAddress(e.target.value) }} type="text" />
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
            </select>  
            
            <button className={styles.MobileSave} onClick={(e) => { saveUpdate(e) }}>Save</button>
            <button className={styles.Mobilecancel} onClick={() => { navigate(-1) }} >cancel</button>                               
            </div>
    
          </>
}
        </div>

      </div>

    </>
  )
}
export default EmployeeUpdateProfile