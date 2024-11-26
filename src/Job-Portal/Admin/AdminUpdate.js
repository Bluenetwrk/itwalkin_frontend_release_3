import React from 'react'
import { useEffect, useState , useRef} from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import styles from "./AdminProfile.module.css"
import toast from 'react-hot-toast';

import JoditEditor from 'jodit-react'
import HTMLReactParser from 'html-react-parser'


import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"; 


function AdminUpdate() {
  let navigate = useNavigate()
  const editor=useRef(null)

  useEffect(()=>{
    let adminLogin= localStorage.getItem("SupAdMLog")
        if(!adminLogin){
            navigate("/")
        }
    },[])

  const [AboutUs,  setAboutUs  ] = useState("")
  const [AboutUss,  setAboutUss  ] = useState("")
  const [Services, setServices ] = useState("")
  const [Contact,  setContact  ] = useState("")
  const [TermsAndCondition, setTermsAndCondition] = useState("")

  async function update(){
    await axios.put("/admin/UpdateWebsite", {AboutUs, Services, Contact, TermsAndCondition } )
    .then((res)=>{
        if(res.data){
        alert("Updated successfully")
    // toast.success("Your Cart is Empty")

        }
    }).catch((err)=>{
        alert("some thing went wrong")
      })
  }

  async function getWebsiteDetails(){
    await axios.get("/admin/getWebsiteDetails")
    .then((res)=>{
             
let result = res.data.result[0]
setAboutUs(result.AboutUs)
setServices(result.Services)
setContact(result.Contact)
setTermsAndCondition(result.TermsAndCondition)

    }).catch((err)=>{
      alert("some thing went wrong")

    })
  }

  useEffect(()=>{
    getWebsiteDetails()
  },[])

  return (
    <>   

     <div className={styles.AdminEditWrapper}>

     <h4 className={styles.AdminEdit}  >About Us</h4>

     {/* <textarea className={styles.inputbox} type="text" value={AboutUs} onChange={(e)=>{ setAboutUs(e.target.value) }}/> */}
     <div style={{width:"98%"}}>

<JoditEditor  ref={editor} value={AboutUs.toString()} onChange={(e)=>{setAboutUs(e)}} />
     </div>

          <h4 className={styles.AdminEdit}  >Services</h4>
       {/* <textarea className={styles.inputbox} type="text" value={Services} onChange={(e) => { setServices(e.target.value) }}></textarea> */}
<div style={{width:"98%"}}>
<JoditEditor  ref={editor} value={Services.toString()} onChange={(e)=>{setServices(e)}} />

</div>     

      
         <h4 className={styles.AdminEdit}  >Contact Us</h4>
       {/* <textarea className={styles.inputbox} type="text" value={Contact} onChange={(e) => { setContact(e.target.value) }}></textarea> */}
<div style={{width:"98%"}}>
<JoditEditor  ref={editor} value={Contact.toString()} onChange={(e)=>{setContact(e)}} />

</div>  

      
         {/* <h4 className={styles.AdminEdit}  >Terms And Conditions</h4> */}
       {/* <textarea className={styles.inputbox} type="text" value={TermsAndCondition} onChange={(e) => { setTermsAndCondition(e.target.value) }}></textarea><br></br> */}
       {/* <JoditEditor ref={editor} value={TermsAndCondition.toString()} onChange={(e)=>{setTermsAndCondition(e)}} /> */}

       
        <button onClick={()=>{update()}} style={{margin:"5px", marginBottom:"10px"}}>Update</button>       

     </div>

    </>

  )
}

export default AdminUpdate