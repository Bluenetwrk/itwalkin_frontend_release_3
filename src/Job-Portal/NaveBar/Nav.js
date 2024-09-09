import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, NavLink } from "react-router-dom";
import Styles from "./nav.module.css"
import logo from "../img/Blue.jpg"
import logIn from "../img/user_3177440.png"
import NavIcon from "../img/icons8-menu-50.png"
import Cancel from "../img/icons8-cross-50.png"
import HomeIcon from "../img/icons8-home-30.png"
import EmpNotification from "../img/icons8-notification-33.png"
import JobseekerNotification from "../img/icons8-notification-30.png"
import useScreenSize from '../SizeHook';
import SidebarNav from "./SidebarNav"


import loginuser from "../img/icons8-user-96.png"
import StudentUpdateProfile from '../Profile/StudentUpdateProfile';

function Nav(props) {


  const [showprofile, setShowprofile] = useState(false)
  const [ShowSideNave, setShowSideNave] = useState(false)
  const navigate = useNavigate()

  let StudentAuth = localStorage.getItem("StudLog")
  let EmployeeAuth = localStorage.getItem("EmpLog")
  let adminLogin = localStorage.getItem("AdMLog")
  let SuperAdminLogin = localStorage.getItem("SupAdMLog")
  const screenSize = useScreenSize();

  const StudlogOut = () => {
    navigate("/")
    localStorage.clear("StudLog")
  }
  const logutEmp = () => {
    navigate("/")
    localStorage.clear("EmpLog")
  }
  const AdminlogOut = () => {
    navigate("/BIAdd@Logg")
    localStorage.clear("AdMLog")
  }

  let menuRef = useRef();
  let imgRef = useRef();

  let SmenuRef = useRef();
  let SimgRef = useRef();

  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== imgRef.current) {
      setShowprofile(false)

    }
  })

  window.addEventListener("click", (e) => {
    if (e.target !== SmenuRef.current && e.target !== SimgRef.current) {
      setShowSideNave(false)

    }

  })

  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? "red" : "",
      textDecoration: isActive ? "underline" : ""
    }
  }
  function myprofile() {
    navigate("/My-Profile")
  }
  function updateprofile() {
    navigate("/Update-Profile")
  }

  function MyJobApplied() {
    navigate("/My-Applied-Jobs")
  }

  function updateEmployeeProfile() {
    navigate("/UpdateProfile")
  }
  function mypostedjob() {
    navigate("/postedjobs")
  }

  function EmployeeProfile() {
    navigate("/MyProfile")
  }

  return (
    <>
      {
        screenSize.width > 750 ?
          //  ............................................Jobseeker Login...............................................   
          StudentAuth ?
            <>
              <div className={Styles.fullnavewrapper}>
                <div className={Styles.logoWrapper}>
                  <NavLink to="/" > <img className={Styles.logo} src={logo} /> </NavLink>
                </div>
                <div className={Styles.linkWrapper}>

                  <NavLink to="/alljobs" className={Styles.link} style={navLinkStyles}>All Jobs </NavLink>
                  {/* <NavLink to="/AboutUs" className={Styles.link} style={navLinkStyles}>About Us</NavLink>
                  <NavLink to="/Services" className={Styles.link} style={navLinkStyles}>Services</NavLink>
                  <NavLink to="/Contact" className={Styles.link} style={navLinkStyles}>Contact</NavLink> */}
                  <div className={`${Styles.link} ${Styles.JobSeekerIconeWrapper}`}>

                    {/* <NavLink to="/" className={` ${Styles.notificationIcon}`}><img src={JobseekerNotification} /> </NavLink> */}
                    <img className={`${Styles.Icon} ${Styles.profileIcon}`} src={loginuser} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />

                  </div >

                </div>
              </div>
              {/* .....................drop down............ */}
              {showprofile ?
                <div className={Styles.JobSeekerdropdownwrapper} ref={menuRef} >
                  <p className={Styles.text} ref={menuRef} onClick={myprofile}>My profile</p>

                  <p className={Styles.text} ref={menuRef} onClick={updateprofile}>Update profile</p>

                  <p className={Styles.text} ref={menuRef} onClick={MyJobApplied}>Jobs Applied</p>
                  <p className={Styles.text} ref={menuRef} onClick={StudlogOut}>Logout</p>

                </div>
                : ""}
            </>

            // ..........................................Emplyee login.......................................................              
            :
            (EmployeeAuth) ?
              <>
                <div className={Styles.fullnavewrapper}>
                  <div className={Styles.logoWrapper}>
                    <NavLink to="/" > <img className={Styles.logo} src={logo} /> </NavLink>
                  </div>
                  <div className={Styles.linkWrapper}>

                    {/* <NavLink to="/postedjobs" className={Styles.link} style={navLinkStyles}> Posted jobs</NavLink> */}
                    <NavLink to="/PostJobs" className={Styles.link} style={navLinkStyles}>Post a Job</NavLink>
                    {/* <NavLink to="/Services" className={Styles.link} style={navLinkStyles}>Services</NavLink> */}
                    {/* <NavLink to="/Contact" className={Styles.link} style={navLinkStyles}>Contact</NavLink> */}
                    <div className={`${Styles.link} ${Styles.EmpIconeWrapper}`}>
                      {/* <NavLink to="/" className={` ${Styles.notificationIcon}`}><img src={JobseekerNotification} /> </NavLink> */}
                      <img className={`${Styles.Icon} ${Styles.profileIcon}`} src={loginuser} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />

                    </div >

                  </div>
                </div>
                {/* .....................drop down............ */}
                {showprofile ?
                  <div className={Styles.Empdropdownwrapper} ref={menuRef} >
                    <p className={Styles.text} ref={menuRef} onClick={EmployeeProfile} >My profile</p>
                    <p className={Styles.text} ref={menuRef} onClick={updateEmployeeProfile}>Update profile</p>
                    <p className={Styles.text} ref={menuRef} onClick={mypostedjob}>My posted Jobs</p>


                    <p className={Styles.text} ref={menuRef} onClick={logutEmp}>Logout</p>
                  </div>
                  : ""}
              </>
              // ............Admin Login...................... SuperAdminLogin
              :
              (adminLogin) ?
                <>
                  <div className={Styles.fullnavewrapper}>
                    <div className={Styles.logoWrapper}>
                      <NavLink > <img className={Styles.logo} src={logo} /> </NavLink>
                    </div>
                    <div className={Styles.linkWrapper}>
                      <NavLink to="/BIAddmin@Profile" className={Styles.link} style={navLinkStyles}>All </NavLink>

                      <NavLink to="/AboutUs" className={`${Styles.Hlink} ${Styles.Aboutus}`} style={navLinkStyles} >About Us</NavLink>
                      <NavLink to="/Services" className={Styles.Hlink} style={navLinkStyles}>Services</NavLink>
                      <NavLink to="/BIAddmin@PostJob" className={Styles.link} style={navLinkStyles}> Post Job</NavLink>

                      <div className={`${Styles.link} ${Styles.IconeWrapper}`}>
                        <img className={`${Styles.Icon} ${Styles.profileIcon}`} src={loginuser} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />
                      </div >
                    </div>
                  </div>
                  {/* .....................drop down............ */}
                  {showprofile ?
                    <div style={{ marginLeft: "-2%" }} className={Styles.dropdownwrapper} ref={menuRef} >
                      <p className={Styles.text} ref={menuRef} >My profile</p>
                      <p className={Styles.text} ref={menuRef} >Update profile</p>
                      <p className={Styles.text} ref={menuRef} onClick={AdminlogOut}>Logout</p>

                    </div>
                    : ""}
                  {/* .........only for Super Admin */}
{SuperAdminLogin?
                  <div className={Styles.Supfullnavewrapper}>                    
                    <div className={Styles.linkWrapper}>
                      <NavLink to="/BIAddmin@AllJobs" style={navLinkStyles} className={Styles.link}>All Jobs </NavLink>
                      <NavLink to="BIAddmin@AllEmployees" className={Styles.link} style={navLinkStyles}> Employers</NavLink>
                      <NavLink to="BIAddmin@AllJobSeekers" className={Styles.link} style={navLinkStyles}> Jobseekers</NavLink>
                      <NavLink to="BIAddmin@AdminUpdate" className={Styles.link} style={navLinkStyles}> UpdateWebsite</NavLink>
                      <NavLink to="BIAddmin@AllIds" className={Styles.link} style={navLinkStyles}> All Email Id's</NavLink>
                      <NavLink to="BIAddAdminAccess" className={Styles.link} style={navLinkStyles}> Admin Access</NavLink>
                    </div>
                  </div>
                  :""}
                  
                </>
                // ............................................Home Nave....................................................      
                :
                <>
                  <div className={Styles.fullnavewrapper}>
                    <div className={Styles.logoWrapper}>
                      <NavLink to="/"> <img className={Styles.logo} src={logo} /> </NavLink>
                    </div>
                    <div className={Styles.linkWrapper}>
                      <NavLink to="/" className={Styles.Hlink} style={navLinkStyles}><i style={{padding:"5px"}} class="fa-solid fa-house"></i>Home</NavLink>
                      {/* <NavLink to="/AboutUs" className={`${Styles.Hlink} ${Styles.Aboutus}`} style={navLinkStyles} >About Us</NavLink>
                      <NavLink to="/Services" className={Styles.Hlink} style={navLinkStyles}>Services</NavLink>
                      <NavLink to="/Contact" className={Styles.Hlink} style={navLinkStyles}>Contact</NavLink> */}
                      <div className={`${Styles.Hlink} ${Styles.Loginlinkwrapper}`}>
                        <NavLink to="/Search-Candidate-Home" className={`${Styles.Loginlink} ${Styles.EmpLogin}`} style={navLinkStyles}>Employer </NavLink>
                        <img className={`${Styles.Icon} ${Styles.HomeprofileIcon}`} src={loginuser} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />
                        {/* <NavLink to="/JobSeekerLogin" className={`${Styles.Loginlink} ${Styles.StuLogin}`} style={navLinkStyles}>Job Seeker Login</NavLink> */}

                      </div>
                    </div>
                  </div>
                  {showprofile ?
                    <div style={{ marginLeft: "-18px" }} className={Styles.dropdownwrapper} ref={menuRef} >
                      <p onClick={() => { navigate("/EmployeeLogin") }}>Employee Login </p>
                      <p onClick={() => { navigate("/JobSeekerLogin") }}>Job Seeker Login</p>
                    </div>
                    : ""}

                </>

          :    //OR  mobile Nave


          //  ............................................Jobseeker Login...............................................   
          StudentAuth ?
            <>
              <div className={Styles.fullnavewrapper}>
                <div className={Styles.logoWrapper}>
                  <NavLink to="/" > <img className={Styles.Moblogo} src={logo} /> </NavLink>
                </div>
                <div className={Styles.linkWrapper}>

                  <NavLink to="/alljobs" className={`${Styles.Moblink} ${Styles.AlllJobs}`} style={navLinkStyles} style={{ marginLeft: "10px" }}>All Jobs </NavLink>

                  <div className={`${Styles.link} ${Styles.MobileIconeWrapper}`}>

                    {/* <NavLink to="/" className={` ${Styles.MobJobseekerNotificationIcon}`}><img src={JobseekerNotification} /> </NavLink> */}
                    <img className={`${Styles.Icon} ${Styles.MobJobseekerProfileIcon}`} src={loginuser} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />

                  </div >

                </div>
              </div>
              {/* .....................drop down............ */}
              {showprofile ?
                <div className={Styles.MobJobseekerDropdownwrapper} ref={menuRef} >
                  <p className={Styles.text} ref={menuRef} onClick={myprofile}>My profile</p>

                  <p className={Styles.text} ref={menuRef} onClick={updateprofile}>Update profile</p>

                  <p className={Styles.text} ref={menuRef} onClick={MyJobApplied}>Jobs Applied</p>
                  <p className={Styles.text} ref={menuRef} onClick={StudlogOut}>Logout</p>

                </div>
                : ""}
            </>

            // ..........................................Emplyee login.......................................................              
            :
            (EmployeeAuth) ?
              <>
                <div className={Styles.MobilEmployeeFullnavewrapper}>
                  <div className={Styles.logoWrapper}>
                    <NavLink to="/"> <img className={Styles.Moblogo} src={logo} /> </NavLink>
                  </div>
                  <div className={Styles.linkWrapper}>

                    <NavLink to="/postedjobs" className={`${Styles.Moblink} ${Styles.PostedJobs}`} style={navLinkStyles}> Posted jobs</NavLink>

                    <NavLink to="/PostJobs" className={`${Styles.Moblink} ${Styles.PostJob}`} style={navLinkStyles}>Post a Job</NavLink>



                    <div className={`${Styles.link} ${Styles.MobileIconeWrapper}`}>

                      {/* <NavLink to="/" className={` ${Styles.JobMobileNotificationIcon}`}><img src={JobseekerNotification} /> </NavLink> */}
                      <img className={`${Styles.Icon} ${Styles.EmpMobileProfileIcon}`} src={loginuser} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />

                    </div >

                  </div>
                </div>
                {/* .....................drop down............ */}
                {showprofile ?
                  <div className={Styles.EmpMobDropdownwrapper} ref={menuRef} >
                    <p className={Styles.text} ref={menuRef} onClick={EmployeeProfile} >My profile</p>
                    {/* <p className={Styles.text} ref={menuRef} onClick={()=>{navigate("postedjobs")}} >My Posted Jobs</p> */}
                    <p className={Styles.text} ref={menuRef} onClick={updateEmployeeProfile}>Update profile</p>

                    <p className={Styles.text} ref={menuRef} onClick={logutEmp}>Logout</p>
                  </div>
                  : ""}
              </>
              // ............Admin Login......................
              :
              (adminLogin) ?
                <>
                  <div className={Styles.fullnavewrapper}>
                    <div className={Styles.logoWrapper}>
                      <NavLink to="/" > <img className={Styles.Moblogo} src={logo} /> </NavLink>
                    </div>
                    <div className={Styles.linkWrapper}>
                      <NavLink to="/BIAddmin@Profile" className={`${Styles.link} ${Styles.All}`} style={navLinkStyles}>All </NavLink>
                      <NavLink to="/BIAddmin@AllJobs" style={navLinkStyles} className={`${Styles.AllJobs} ${Styles.link}`}>AllJobs </NavLink>
                      <NavLink to="BIAddmin@AllEmployees" className={`${Styles.link} ${Styles.AllEmploy}`} style={navLinkStyles}> Employer</NavLink>
                      <NavLink to="BIAddmin@AllJobSeekers" className={`${Styles.link} ${Styles.AllJobseeker}`} style={navLinkStyles}> Jobseekers</NavLink>
                   
                      <div className={`${Styles.link} ${Styles.IconeWrapper} ${Styles.AdminUser}`}>
                        <img className={`${Styles.Icon} ${Styles.profileIcon}`} src={loginuser} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />
                      </div >

                    </div>
                  </div>
                  {/* .....................drop down............ */}
                  {showprofile ?
                    <div style={{ marginLeft: "-2%" }} className={Styles.Admindropdownwrapper} ref={menuRef} >
                      {/* <p className={Styles.text} ref={menuRef} >My profile</p> */}
                      {/* <p className={Styles.text} ref={menuRef} >Update profile</p> */}
                      <p className={Styles.text} ref={menuRef} onClick={AdminlogOut}>Logout</p>

                    </div>
                    : ""}
                </>
                // ............................................Home Nave....................................................      
                :

                <>

                  <div className={Styles.fullnavewrapper}>
                   {ShowSideNave ?
                      <img className={`${Styles.NavIconCross} `} src={Cancel} ref={SimgRef} onClick={() => { setShowSideNave((prev) => !prev) }} />
                      : <img className={`${Styles.NavIconBars} `} src={NavIcon} ref={SimgRef} onClick={() => { setShowSideNave((prev) => !prev) }} />
                    } 


                    <NavLink to="/" > <img className={Styles.MobHomelogo} src={logo} /> </NavLink>
                    <div className={Styles.linkWrapper}>
                      <NavLink to="/" className={`${Styles.Hlink} ${Styles.HomeIcon}`}>  <img src={HomeIcon} /></NavLink>
                      <img className={`${Styles.loginLogo} `} src={logIn} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />
                      {showprofile ?
                        <div className={Styles.MobHomeDropdownwrapper} ref={menuRef} >
                          <p onClick={() => { navigate("/EmployeeLogin") }}>Employer Login </p>
                          <p onClick={() => { navigate("/JobSeekerLogin") }}>Job Seeker Login</p>
                        </div>
                        : ""}
                    </div>
                  </div>
                  {/* {ShowSideNave? */}
                  <div ref={SmenuRef} className={`${Styles.MovileNavOptions} `}
                    style={ShowSideNave ? { marginLeft: "0px" } : { marginLeft: "-380px" }}
                  >
                    <SidebarNav setShowSideNaveProps={setShowSideNave} />
                  </div>
                  {/* :"" }   */}


                </>

      }



    </>

  )
}
export default Nav;