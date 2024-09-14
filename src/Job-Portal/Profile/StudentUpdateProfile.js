import React, { useEffect, useState } from 'react';
import styles from "./SudentUpdateProfile.module.css"
import imageCompression from 'browser-image-compression';
import axios from 'axios';
import logo from "../img/Blue.jpg"
import { Navigate, useNavigate } from 'react-router-dom';
import profileDp from "../img/user_3177440.png"
import delet from "../img/icons8-delete-48.png"
import { TailSpin } from "react-loader-spinner"
import useScreenSize from '../SizeHook';
import socketIO from 'socket.io-client';
import CreatableSelect  from "react-select/creatable"
import Arrowimage from '../img/icons8-arrow-left-48.png'




function StudentUpdateProfile(props) {
  useEffect(() => {
    const socket = socketIO.connect(props.url, {
      auth: {
        token: JSON.parse(localStorage.getItem("StudId"))
      }
    });
  }, [])
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
  const [NoticePeriod, setNoticePeriod] = useState("")
  const [ExpectedSalary, setExpectedSalary] = useState("")
  const [currentCTC, setcurrentCTC] = useState("")
  const [age, setage] = useState("")
  const [Qualification, setQualification] = useState("")
  const [Skills, setSkills] = useState("")
  const [Experiance, setExperiance] = useState("")
  const [loader, setLoader] = useState(false)

  let jobTags = [
    { value: 'ReactJs', label: 'ReactJs' },
     { value: 'Mern Stack', label: 'Mern Stack' }, { value: 'C++, C', label: 'C++, C' },
     { value: 'Javascript', label: "Javascript" }, { value: 'Node js', label: 'Node js' },
     { value: 'Angular js', label: 'Angular js' }, { value: 'Vue js', label: 'Vue js' }, { value: 'NextJs', label: 'NextJs' },
     { value: 'Backend', label: 'Backend' }, { value: 'Frontend', label: 'Frontend' },
     { value: 'HTML-CSS', label: 'HTML-CSS' },{ value: 'MongoDB', label: 'MongoDB' },
     { value: 'MySql', label: 'MySql' },  { value: 'Flutter', label: 'Flutter' },{ value: 'Game Developer', label: 'Game Developer' },
     { value: 'Mobile App Developer', label: 'Mobile App Developer' },  { value: 'Artificial Intelligence', label: 'Artificial Intelligence' },
     { value: 'React Native', label: 'React Native' }, { value: 'DevOps Engineer', label: 'DevOps Engineer' },
     { value: 'Security developer', label: 'Security developer' }, { value: 'Data science', label: 'Data science' },
     { value: 'Data Analyst', label: 'Data Analyst' },   { value: 'java ', label: 'java ' },{ value: 'Python', label: 'Python' },
     { value: 'Graphic Developers', label: 'Graphic Developers' }, { value: 'AI Engineer', label: 'AI Engineer' },
     { value: 'Security Developer', label: 'Security Developer' }, { value: 'Cloud Developers', label: 'Cloud Developers' },
     ]
  const [Tags, setTag] = useState([])
  const [Resulttag, setResulttagTag] = useState()
    function handleChange(tag){
      setTag(tag)      
  }
  // const Tags=tag.map((tag,i)=>{
  //   return(
  //       tag.value            
  //     )
  //   })   
    // ......City....
    const [citytag, setcityTag] = useState()
    const [city, setcity] = useState()

    const CTags=[{value:'Bangalore', label: 'Bangalore'},{value:'Chennai', label:'Chennai' },
      {value:'Hyderabad', label: 'Hyderabad'}, {value:'Delhi', label: 'Delhi'},{value:'Mumbai', label: 'Mumbai' }]
    
      function handleChangeCityTag(tag){
      setcityTag(tag)      
      setcity(tag.value)      
  }    

  let navigate = useNavigate()

  let studId = JSON.parse(localStorage.getItem("StudId"))

  const [topMessage, settopMessage] = useState("")

  async function getUser() {
    let userid = JSON.parse(localStorage.getItem("StudId"))
    const headers = { authorization: userid + " " + atob(JSON.parse(localStorage.getItem("StudLog"))) };
    await axios.get(`/StudentProfile/getProfile/${studId}`, { headers })
      .then((res) => {
        let result = res.data.result
        if (result) {
          setResulttagTag(result.Tags)
          setname(result.name)
          setemail(result.email)
          setimage(result.image)
          setimmage(result.image)
          setphoneNumber(result.phoneNumber)
          setAadhar(result.Aadhar)
          setpanCard(result.panCard)
          setcityTag(result.city)
          setcity(result.city)          
          setNoticePeriod(result.NoticePeriod)
          setExpectedSalary(result.ExpectedSalary)
          setcurrentCTC(result.currentCTC)
          setQualification(result.Qualification)
          setSkills(result.Skills)
          setExperiance(result.Experiance)
          setage(result.age)
          setTag(result.Tags)
        }
      }).catch((err) => {
        alert("server issue occured", err)
      })
  }
  useEffect(() => {
    getUser()
  }, [])


  // ...............upload Image.....................
  async function uploadImage() {
    const formdata = new FormData()
    formdata.append('image', image)

    // console.log(formdata)
    await axios.put(`/StudentProfile/uploadImage/${studId}`, formdata)
      .then((res) => {
        window.location.reload()
      }).catch((err) => {
      })
  }
  async function saveUpdate(e) {
    let userid = JSON.parse(localStorage.getItem("StudId"))
    const headers = { authorization: userid + " " + atob(JSON.parse(localStorage.getItem("StudLog"))) };
    // e.preventDefault()
    await axios.put(`/StudentProfile/updatProfile/${studId}`, {
      name, email, phoneNumber, Aadhar, panCard, city, NoticePeriod, 
      ExpectedSalary, currentCTC, age, Qualification, Skills, Experiance, Tags
    }, { headers })
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
        alert("some thing went wrong")
      })
  }
  async function prevewImage(e) {
    setimmage("")
    setLoader(true)
    setFile(URL.createObjectURL(e.target.files[0]))
    // setimage(e.target.files[0])
    const imageFile = e.target.files[0];
    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    }
    try {
      const compressedFile = await imageCompression(imageFile, options);
      setimage(compressedFile)
      setLoader(false)

    } catch (error) {
    }
  }
  async function deletePic() {
    await axios.put(`/StudentProfile/deleteImage/${studId}`, { image })
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


  window.addEventListener('keypress', function (event) {

    // Get the key code
    let keycode = event.which || event.keyCode;

    // Check if key pressed is a special character
    if (keycode < 32 ||
      (keycode > 32 && keycode < 43) ||
      (keycode > 43 && keycode < 46) ||
      (keycode > 46 && keycode < 48) ||
      (keycode > 57 && keycode < 64) ||
      (keycode > 90 && keycode < 97) ||
      keycode > 122
    ) {
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
          {/* <h3 style={{ color: "rgb(40, 4, 99)", marginLeft: "2%" }}>Update your Profile</h3> */}
          <img style={{ height:"25px", color:"grey", marginTop:"20px", marginLeft:"8%", cursor:"pointer",
             width:"28px"}} onClick={()=>{navigate(-1)}}  src={Arrowimage} />
          <div className={styles.imageViewWrapper}>

            <img className={styles.imageView} src={image ? image : profileDp} />
            <img className={styles.fileView} src={file} />

            <div className={styles.addfileDiconwrapper}>
              <input className={`${styles.addfile} ${styles.addfileD}`} type="file" accept='.png, .jpg, .jpeg' onChange={prevewImage} />
              <div className={styles.loader}> {loader ? <TailSpin height={"40px"} /> : ""} </div>

              {/* <img style ={{color:"blue" , marginTop:"4px", width:"15%"}} src={delet} onClick={deletePic}/> */}
            </div>

          </div>
          <div className={styles.saveDelete}>
            {file && !loader ? <button className={styles.saveImage} onClick={uploadImage}>Save</button> : ""}
            {immage ? <button className={styles.DeleteImage} onClick={deletePic}>Delete</button> : ""}
          </div>

          <p style={{ fontStyle: "italic", color: "green" }}>{topMessage}</p>
          {screenSize.width > 850 ?

            <div className={styles.inputWrapper}>


              <label className={styles.inputName}>
                <h4>Name:</h4>
                <input maxLength="22" className={styles.input} value={name} onChange={(e) => { setname(e.target.value) }} type="text" />
              </label>

              <label className={styles.inputName}>
                <h4>Email Address:</h4>
                <input maxLength="25" className={styles.input} value={email} onChange={(e) => { setemail(e.target.value) }} type="text" />
              </label>
              <label className={styles.inputName}>
                <h4>City: <span style={{color:"blue"}}>{city}</span></h4>
                {/* <input maxLength="15" className={styles.input} value={city} onChange={(e) => { setCity(e.target.value) }} type="text" /> */}
                <div style={{marginTop:"-7px", width:"81%", marginLeft:"18px"}}>
                           <CreatableSelect                          
                          options={CTags}
                          value={citytag}
                          onChange={handleChangeCityTag}     
                        />
                         </div>
            
              </label>

              <label className={styles.inputName}>
                <h4>Age:</h4>
                <input maxLength="3" className={styles.input} value={age} onChange={(e) => { setage(e.target.value) }} type="number" />
              </label>

              <label className={styles.inputName}>
                <h4>Phone number:</h4>
                <input maxLength="15" className={styles.input} value={phoneNumber} onChange={(e) => { setphoneNumber(e.target.value) }} type="text" />
              </label>

              <label className={styles.inputName}>
                <h4>Aadhaar number:</h4>
                <input maxLength="16" className={styles.input} value={Aadhar} onChange={(e) => { AadharhandleChange(e) }} type="number" />
              </label>

              <label className={styles.inputName}>
                <h4>Pan Card Number:</h4>
                <input maxLength="16" className={styles.input} value={panCard} onChange={(e) => { PanCardhandleChange(e) }} type="text" />
              </label>

              <label className={styles.inputName}>
                <h4>Notice Period in days: </h4>
                <input maxLength="7" className={styles.input} value={NoticePeriod} onChange={(e) => { setNoticePeriod(e.target.value) }} type="text" />
              </label>

              <label className={styles.inputName}>
                <h4>Expected Salary:</h4>
                <input maxLength="5" className={styles.input} value={ExpectedSalary} onChange={(e) => { setExpectedSalary(e.target.value) }} type="text" />
              </label>

              <label className={styles.inputName}>
                <h4>Current CTC:</h4>
                <input maxLength="5" className={styles.input} value={currentCTC} onChange={(e) => { setcurrentCTC(e.target.value) }} type="text" />
              </label>

              <label className={styles.inputName}>
                <h4>Qualification:</h4>
                <input maxLength="12" className={styles.input} value={Qualification} onChange={(e) => { setQualification(e.target.value) }} type="text" />
              </label>

              <label className={styles.inputName}>
                <h4>Experience:</h4>
                <input maxLength="5" className={styles.input} value={Experiance} onChange={(e) => { setExperiance(e.target.value) }} type="text" />
              </label>

              <label className={styles.inputName}>
                <h4>Skill Tags:</h4>
                <div style={{marginTop:"-7px", width:"81%", marginLeft:"18px"}}>
                           <CreatableSelect  
                          isMulti={true}
                          options={jobTags}
                          value={Tags}
                          onChange={handleChange} 
  
                        />
                         </div>
              </label>

              <label className={styles.inputName}>
                <h4>Skills:</h4>
                <input maxLength="100" className={styles.input} value={Skills} onChange={(e) => { setSkills(e.target.value) }} type="text" />
              </label>

              <button className={styles.Save} onClick={(e) => { saveUpdate(e) }}>Save</button>
              <button className={styles.cancel} onClick={() => { navigate(-1) }} >cancel</button>

            </div>
            :
            <>

              <label className={styles.MobileinputName}>
                <h4 className={styles.MobileName}>Name:</h4>
                <input maxLength="20" className={styles.Mobileinput} value={name} onChange={(e) => { setname(e.target.value) }} type="text" />
              </label>

              <label className={styles.MobileinputName}>
                <h4 className={styles.MobileName}>Email Address:</h4>
                <input maxLength="25" className={styles.Mobileinput} value={email} onChange={(e) => { setemail(e.target.value) }} type="text" />
              </label>

              <label className={styles.MobileinputName}>
                <h4>City: <span style={{color:"blue"}}>{city}</span></h4>
                <CreatableSelect                          
                          options={CTags}
                          value={citytag}
                          onChange={handleChangeCityTag}     
                        />
              </label>

              <label className={styles.MobileinputName}>
                <h4 className={styles.MobileName}>Age:</h4>
                <input maxLength="3" className={styles.Mobileinput} value={age} onChange={(e) => { setage(e.target.value) }} type="text" />
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
                <h4 className={styles.MobileName}>Notice Period in days: </h4>
                <input maxLength="10" className={styles.Mobileinput} value={NoticePeriod} onChange={(e) => { setNoticePeriod(e.target.value) }} type="text" />
              </label>

              <label className={styles.MobileinputName}>
                <h4 className={styles.MobileName}>Expected Salary:</h4>
                <input maxLength="5" className={styles.Mobileinput} value={ExpectedSalary} onChange={(e) => { setExpectedSalary(e.target.value) }} type="text" />
              </label>

              <label className={styles.MobileinputName}>
                <h4 className={styles.MobileName}>Current CTC:</h4>
                <input maxLength="15" className={styles.Mobileinput} value={currentCTC} onChange={(e) => { setcurrentCTC(e.target.value) }} type="text" />
              </label>

              <label className={styles.MobileinputName}>
                <h4 className={styles.MobileName}>Qualification:</h4>
                <input maxLength="10" className={styles.Mobileinput} value={Qualification} onChange={(e) => { setQualification(e.target.value) }} type="text" />
              </label>

              <label className={styles.MobileinputName}>
                <h4 className={styles.MobileName}>Skills:</h4>
                <input maxLength="100" className={styles.Mobileinput} value={Skills} onChange={(e) => { setSkills(e.target.value) }} type="text" />
              </label>

              <label className={styles.MobileinputName}>
                <h4 className={styles.MobileName}>Experience: </h4>
                <input maxLength="5" className={styles.Mobileinput} value={Experiance} onChange={(e) => { setExperiance(e.target.value) }} type="text" />
              </label>
               <label className={styles.inputName}>
                <h4 className={styles.MobileName}>Skill Tags:</h4>
                <div style={{ width:"88%", marginLeft:"10px"}}>
                           <CreatableSelect  
                          isMulti={true}
                          options={jobTags}
                          value={Tags}
                          onChange={handleChange}     
                        />
                         </div>
              </label>



              <label className={styles.MobileinputName}>
                <h4 className={styles.MobileName}>School:</h4>
                <input maxLength="5" className={styles.Mobileinput} value={Experiance}  type="text" />
              </label>

              <button className={styles.MobileSave} onClick={(e) => { saveUpdate(e) }}>Save</button>
              <button className={styles.Mobilecancel} onClick={() => { navigate(-1) }} >cancel</button>

            </>

          }
        </div>

      </div>

    </>
  )
}
export default StudentUpdateProfile