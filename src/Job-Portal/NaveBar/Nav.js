import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, NavLink, useSearchParams } from "react-router-dom";
import Styles from "./nav.module.css"
import logo from "../img/Blue.jpg"
import Itwalkinlogo from "../img/ItwalkInLogo.jpg"
import logIn from "../img/user_3177440.png"
import NavIcon from "../img/icons8-menu-50.png"
import Cancel from "../img/icons8-cross-50.png"
import HomeIcon from "../img/icons8-home-30.png"
import EmpNotification from "../img/icons8-notification-33.png"
import JobseekerNotification from "../img/icons8-notification-30.png"
import useScreenSize from '../SizeHook';
import SidebarNav from "./SidebarNav"
import BigSidebarNav from '../BigSideNav'
import loginuser from "../img/icons8-user-96.png"
import StudentUpdateProfile from '../Profile/StudentUpdateProfile';

import Modal from "../Login/EmpLogModal";
import StuModal from "../Login/StudLogModal";

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
  let newReg = useRef();
  let Reg = useRef();

  window.addEventListener("click", (e) => {
    if (e.target !== newReg.current && e.target !== Reg.current) {
      setShowRegister(false)
    }
  })
  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== imgRef.current) {
      setShowprofile(false)
    }
  })

  // window.addEventListener("click", (e) => {
  //   if (e.target !== SmenuRef.current && e.target !== SimgRef.current) {
  //     setShowSideNave(false)
  //   }
  // })

  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? "rgb(40, 4, 99)" : "",
      // textDecoration: isActive ? "underline" : "",
      // position: isActive ? "absolute" : "",
      // padding: isActive ? "3px" : "",
      backgroundColor: isActive ? "white" : "",
      // textDecoration: isActive ? "underline" : "",

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
  function AskQuestion() {
    navigate("/AskQuestion")
  }

  function updateEmployeeProfile() {
    navigate("/UpdateProfile")
  }
  function mypostedjob() {
    navigate("/postedjobs")
  }
  function mypostedArticle() {
    navigate("/posted-Blogs")
  }
  function PostBlogs() {
    navigate("/PostBlogs")
  }

  function EmployeeProfile() {
    navigate("/MyProfile")
  }
  // ......Modal....
  const [open, setOpen] = useState(false);
  const [Stuopen, setStuopen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleEmpOpen = () => {
    setOpen(true);
  };
  const handleStuOpen = () => {
    setStuopen(true);
  };

  const handleStuClose = () => {
    setStuopen(false);
  };


  const [ShowBigSideNave, setShowBigSideNave] = useState(false)

  function ChangeSideNaveBar() {
    props.chandinmargin((prev) => !prev)
    setShowBigSideNave((prev) => !prev)
  }
  function ChangeSideNaveMobile() {
    setShowSideNave((prev) => !prev)
  }
  const [ShowRegister, setShowRegister] = useState(false)

  function handleOpenAccont(){
    setShowRegister((prev)=>!prev)
  }

  return (
    <>

      {

        //  ............................................Jobseeker Login...............................................   
        screenSize.width > 750 ?

          StudentAuth ?
            <>
              <div className={Styles.fullnavewrapper}>
                <div style={{ width:"20px"}}>
                  <i style={{ fontSize: "Large", color: "white", zIndex: "1000",  }}
                    className={ShowBigSideNave ? "fas fa-times" : "fas fa-bars"} onClick={ChangeSideNaveBar}>
                  </i>
                  <div className="BigNavWrapper" style={ShowBigSideNave ? { marginLeft: "-5px" } : { marginLeft: "-115px" }}>
                    <BigSidebarNav />
                  </div>
                </div>
                {/* <div className={Styles.logoWrapper}> */}
                <div className={Styles.ITwalkinWrapper}>
                <img className={Styles.IwalkinLogologo} src={Itwalkinlogo} />
{/* 
                  <p className={Styles.ITwalkin}>ITwalkin</p>
                  <p className={Styles.onlyforITjobs}>Only for IT jobs</p> */}
                </div>
                {/* <NavLink to="/" > <img className={Styles.logo} src={logo} /> </NavLink> */}
                {/* </div> */}
                <div className={Styles.linkWrapper}>

                  <NavLink to="/alljobs" className={Styles.AllJobJobSeeker}  style={navLinkStyles}>All Jobs </NavLink>
                  {/* <NavLink to="/AboutUs" className={Styles.link} style={navLinkStyles}>About Us</NavLink>
                  <NavLink to="/Services" className={Styles.link} style={navLinkStyles}>Services</NavLink>
                  <NavLink to="/Contact" className={Styles.link} style={navLinkStyles}>Contact</NavLink> */}
                  <div className={`${Styles.link} ${Styles.JobSeekerIconeWrapper}`}>

                    {/* <NavLink to="/" className={` ${Styles.notificationIcon}`}><img src={JobseekerNotification} /> </NavLink> */}
                    <img className={`${Styles.Icon} ${Styles.JobSeekerprofileIcon

                      }`} src={loginuser} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />
                    {/* .....................drop down............ */}
                    {showprofile ?
                      <div className={Styles.Alldownwrapper} >
                        <div className={Styles.JobSeekerdropdownwrapper} ref={menuRef} >
                          <p className={Styles.text} ref={menuRef} onClick={myprofile}>My profile</p>
                          {/* <p className={Styles.text} ref={menuRef} onClick={updateprofile}>Update profile</p> */}
                          <p className={Styles.text} ref={menuRef} onClick={MyJobApplied}>Jobs Applied</p>
                          <p className={Styles.text} ref={menuRef} onClick={AskQuestion}>Ask Question</p>
                          <p className={Styles.text} ref={menuRef} onClick={StudlogOut}>Logout</p>

                        </div>
                      </div>
                      : ""}

                  </div >

                </div>
              </div>

            </>

            // ..........................................Emplyee login.......................................................              
            :
            
            (EmployeeAuth) ?
              <>
                <div className={Styles.fullnavewrapper}>
                  {/* <div className={Styles.logoWrapper}> */}
                  <div style={{ width:"20px"}}>
                  <i style={{ fontSize: "Large", color: "white", zIndex: "1000",  }}
                    className={ShowBigSideNave ? "fas fa-times" : "fas fa-bars"} onClick={ChangeSideNaveBar}>
                  </i>
                  <div className="BigNavWrapper" style={ShowBigSideNave ? { marginLeft: "-5px" } : { marginLeft: "-115px" }}>
                    <BigSidebarNav  />
                  </div>
                </div>
                    {/* <NavLink to="/" > <img className={Styles.logo} src={logo} /> </NavLink> */}
                    <div className={Styles.ITwalkinWrapper}>
                      {/* <p className={Styles.ITwalkin}>ITwalkin</p>
                      <p className={Styles.onlyforITjobs}>Only for IT jobs</p> */}
                        <img className={Styles.IwalkinLogologo} src={Itwalkinlogo} />

                    </div>
                  
                  <div className={Styles.linkWrapper}>

                    <NavLink to="/PostJobs" className={Styles.PostJobLink} style={navLinkStyles}>Post a Job</NavLink>
                    <NavLink to="/Search-Candidate" className={Styles.SearchCandidate} style={navLinkStyles}>Employer Home</NavLink>
                    <div className={`${Styles.link} ${Styles.EmpIconeWrapper}`}>
                      <img className={`${Styles.Icon} ${Styles.EmpProfileIcon}`} src={loginuser} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />

                      {/* .....................drop down............ */}
                      {showprofile ?
                        <div className={Styles.Alldownwrapper} >
                          <div className={Styles.Empdropdownwrapper} ref={menuRef} >
                            <p className={Styles.text} ref={menuRef} onClick={EmployeeProfile} >My profile</p>
                            <p className={Styles.text} ref={menuRef} onClick={mypostedjob}>My posted Jobs</p>
                            <p className={Styles.text} ref={menuRef} onClick={mypostedArticle}>posted Articles</p>
                            <p className={Styles.text} ref={menuRef} onClick={PostBlogs}>Write Article</p>
                            <p className={Styles.text} ref={menuRef} onClick={logutEmp}>Logout</p>
                          </div>
                        </div>
                        : ""}
                    </div >


                  </div>
                </div>

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
                      {/* <NavLink to="/BIAddmin@Profile" className={Styles.link} style={navLinkStyles}>All </NavLink> */}
                      <NavLink to="/" className={Styles.HomeJobs} style={navLinkStyles}><i style={{ marginLeft: 0, marginRight: "5px" }} class="fa-solid fa-house"></i>Home</NavLink>

                      <NavLink to="/AboutUs" className={`${Styles.Aboutlink}`} style={navLinkStyles} >About Us</NavLink>
                      <NavLink to="/Services" className={Styles.link} style={navLinkStyles}>Services</NavLink>
                      <NavLink to="/BIAddmin@PostJob" className={Styles.link} style={navLinkStyles}> Post Job</NavLink>
                      <NavLink to="/BIAddmin@AdminCareerPostJobs" className={Styles.link} style={navLinkStyles}>Career Job Post</NavLink>
                      <NavLink to="/Blogs" className={Styles.link} style={navLinkStyles}>Blogs</NavLink>
        {/* <p onClick={()=>{navigate("/Blogs")}} className={`${Styles.textinMobileSodeBar} `}>Blogs </p> */}

                      <div className={`${Styles.link} ${Styles.IconeWrapper}`}>
                        <img className={`${Styles.Icon} ${Styles.profileIcon}`} src={loginuser} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />
                      </div >
                    </div>
                  </div>
                  {/* .....................drop down............ */}
                  {showprofile ?
                    <div className={Styles.Alldownwrapper} >

                      <div style={{ marginLeft: "-11%" }} className={Styles.Admindropdownwrapper} ref={menuRef} >
                        {/* <p className={Styles.text} ref={menuRef} >My profile</p>

                      <p className={Styles.text} ref={menuRef} >Update BIAdd@PostedCareerJobs</p> */}
                        <p className={Styles.text} ref={menuRef} onClick={() => { navigate("BIAdd@PostedCareerJobs") }}>Posted Career Jobs</p>
                        <p className={Styles.text} ref={menuRef} onClick={() => { navigate("BIAdd@AdminPostedJobs") }}>Admin Posted Jobs</p>

                        <p className={Styles.text} ref={menuRef} onClick={AdminlogOut}>Logout</p>

                      </div>
                    </div>
                    : ""}
                  {/* .........only for Super Admin */}
                  {SuperAdminLogin ?
                  <>
                    <div className={Styles.Supfullnavewrapper}>
                      <div className={Styles.linkWrapper} style={{ marginLeft: "1%" }}>

                        {/* <NavLink to="/BIAddmin@AllJobs" style={navLinkStyles} className={Styles.linkSuperAdmin}>All Jobs </NavLink> */}
                        <NavLink to="BIAddmin@AllEmployees" className={Styles.linkSuperAdmin} style={navLinkStyles}>All Employers</NavLink>
                        <NavLink to="BIAddmin@AllEmployeeAdmin" className={Styles.linkSuperAdmin} style={navLinkStyles}>All Jobseeker</NavLink>
                        {/* <NavLink to="BIAddmin@AllJobSeekers" className={Styles.linkSuperAdmin} style={navLinkStyles}>All old design Jobseekers</NavLink> */}
                        <NavLink to="BIAddmin@AdminUpdate" className={Styles.linkSuperAdmin} style={navLinkStyles}> UpdateWebsite</NavLink>
                        <NavLink to="BIAddmin@AllIds" className={Styles.linkSuperAdmin} style={navLinkStyles}> All Email Id's</NavLink>
                        <NavLink to="BIAddAdminAccess" className={Styles.linkSuperAdmin} style={navLinkStyles}> Admin Access</NavLink>
                      
                      </div>
                    </div>
                    <div className={Styles.Supfullnavewrapper}>
                      <div className={Styles.linkWrapper} style={{ marginLeft: "1%" }}>

                        {/* <NavLink to="/BIAddmin@AllJobs" style={navLinkStyles} className={Styles.linkSuperAdmin}>All Jobs </NavLink> */}
                        
                        
                        <NavLink to="BIAddmin@DeletedJobSeekers" className={Styles.linkSuperAdmin} style={navLinkStyles}> Deleted Jobseeker</NavLink>
                        <NavLink to="BIAddmin@ArchiveJobSeekers" className={Styles.linkSuperAdmin} style={navLinkStyles}> Archive Jobseeker</NavLink>
                        <NavLink to="BIAddmin@ArchiveJobs" className={Styles.linkSuperAdmin} style={navLinkStyles}> Archived Jobs</NavLink>
                        <NavLink to="BIAddmin@DeletedJobs" className={Styles.linkSuperAdmin} style={navLinkStyles}> Deleted Jobs</NavLink>
                        <NavLink to="BIAddmin@DeletedBlogs" className={Styles.linkSuperAdmin} style={navLinkStyles}> Deleted Blogs</NavLink>
                      </div>
                    </div>
                    </>
                    : ""}

                </>
                // ............................................Home Nave....................................................      
                :
                <>
                  <div className={Styles.fullnavewrapper}>
                      {/* <NavLink to="/"> <img className={Styles.logo} src={logo} /> </NavLink> */}

                      <div style={{ width:"20px"}}>
                  <i style={{ fontSize: "Large", color: "white", zIndex: "1000",  }}
                    className={ShowBigSideNave ? "fas fa-times" : "fas fa-bars"} onClick={ChangeSideNaveBar}>
                  </i>
                  <div className="BigNavWrapper" style={ShowBigSideNave ? { marginLeft: "-5px" } : { marginLeft: "-112px" }}>
                    <BigSidebarNav />
                  </div>
                </div>


                      <div className={Styles.ITwalkinWrapper}>
                        {/* <p className={Styles.ITwalkin}>ITwalkin</p>
                        <p className={Styles.onlyforITjobs}>Only for IT jobs</p> */}
                        <img className={Styles.IwalkinLogologo} src={Itwalkinlogo} />
                      </div>
                    <div className={Styles.linkWrapper}>

                      <NavLink to="/" className={Styles.HomeJobs} style={navLinkStyles}><i style={{ marginLeft: 0, marginRight: "5px" }} class="fa-solid fa-house"></i>Home</NavLink>
                      {/* <NavLink to="/AboutUs" className={`${Styles.Hlink} ${Styles.Aboutus}`} style={navLinkStyles} >About Us</NavLink>
                      <NavLink to="/Services" className={Styles.Hlink} style={navLinkStyles}>Services</NavLink>
                      <NavLink to="/Contact" className={Styles.Hlink} style={navLinkStyles}>Contact</NavLink> */}
                      <div className={` ${Styles.LoginlinkwrapperHome}`}>
                        <NavLink to="/Search-Candidate-Home" className={` ${Styles.HomeSearchCandidate}`} style={navLinkStyles}>Employer </NavLink>
                        {/* <NavLink to="/New-Registration" className={` ${Styles.HomeSearchCandidate}`} style={navLinkStyles}>New Register </NavLink> */}
                        {/* <NavLink to="/Jobseeker-New-Registration" className={` ${Styles.HomeSearchCandidate}`} style={navLinkStyles}>Student Register </NavLink> */}
<div>
<p className={` ${Styles.openAccount}`} onClick={handleOpenAccont} ref={Reg} >Open an Account</p>
{
  ShowRegister?
  <div className={Styles.dropdownwrapperHomeRegistration} ref={newReg} >
  <p onClick={()=>{navigate("/New-Registration");setShowRegister(false)}}>Employer Registration</p>
  <p onClick={()=>{navigate("/Jobseeker-New-Registration");setShowRegister(false)}}>JobSeeker Registration</p>
  </div>
  :""
}
</div>
                        <img className={` ${Styles.HomeprofileIcon}`} src={loginuser} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />
                        {/* <NavLink to="/JobSeekerLogin" className={`${Styles.Loginlink} ${Styles.StuLogin}`} style={navLinkStyles}>Job Seeker Login</NavLink> */}
                        {showprofile ?
                    <div className={Styles.Alldownwrapper} >

                      <div style={{  }} className={Styles.dropdownwrapperHome} ref={menuRef} >
                        {/* <p onClick={() => { navigate("/EmployeeLogin") }}>Employee Login </p>
                      <p onClick={() => { navigate("/JobSeekerLogin") }}>Job Seeker Login</p> */}
                        <p onClick={() => { handleEmpOpen(); handleStuClose() }}>Employer Login</p>
                        <p onClick={() => { handleStuOpen(); handleClose() }}>Job Seeker Login</p>
                      </div>
                    </div>

                    : ""}
                      </div>
                    </div>
                  </div>
                  <>
                    <StuModal isStuOpen={Stuopen} onClose={() => { handleStuClose() }} />
                    <Modal isOpen={open} onClose={() => { handleClose() }} />
                  </>


                </>

          :    //OR  mobile Nave


          //  ............................................Jobseeker Login...Mobile view............................................   
          StudentAuth ?
            <>
              <div className={Styles.fullnavewrapper}>
              <div style={{ width:"30px"}}>

<i style={{ fontSize: "Large", color: "white", zIndex: "1000",  }}
className={ShowSideNave ? "fas fa-times" : "fas fa-bars"} ref={SimgRef} onClick={() => { setShowSideNave((prev) => !prev)}}>
</i>
</div>
                {/* <div className={Styles.logoWrapper}> */}
                {/* <NavLink to="/" > <img className={Styles.Moblogo} src={logo} /> </NavLink> */}
                <div className={Styles.ITwalkinWrapper} style={{marginTop:"10px"}}>
                  {/* <p className={Styles.ITwalkin}>ITwalkin</p>
                  <p className={Styles.onlyforITjobs}>Only for IT jobs</p> */}
                        <img className={Styles.MobIwalkinLogologo} src={Itwalkinlogo} />

                </div>
                {/* </div> */}
                <div className={Styles.linkWrapper}>

                  <NavLink to="/alljobs" className={`${Styles.Moblink} ${Styles.AlllJobs}`} >All Jobs </NavLink>

                  <div className={`${Styles.link} ${Styles.MobileIconeWrapper}`}>

                    {/* <NavLink to="/" className={` ${Styles.MobJobseekerNotificationIcon}`}><img src={JobseekerNotification} /> </NavLink> */}
                    <img className={`${Styles.Icon} ${Styles.MobJobseekerProfileIcon}`} src={loginuser} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />

                  </div >

                </div>
              </div>
              {/* .....................drop down..Mobile View.......... */}
              {showprofile ?
                <div className={Styles.Alldownwrapper} >

                  <div className={Styles.MobJobseekerDropdownwrapper} ref={menuRef} >
                    <p className={Styles.text} ref={menuRef} onClick={myprofile}>My profile</p>

                    {/* <p className={Styles.text} ref={menuRef} onClick={updateprofile}>Update profile</p> */}

                    <p className={Styles.text} ref={menuRef} onClick={MyJobApplied}>Jobs Applied</p>
                    <p className={Styles.text} ref={menuRef} onClick={AskQuestion}>Ask Question</p>

                    <p className={Styles.text} ref={menuRef} onClick={StudlogOut}>Logout</p>

                  </div>
                </div>
                : ""}
                <div ref={SmenuRef} className={`${Styles.MovileNavOptions} `}
                    style={ShowSideNave ? { marginLeft: "0px" } : { marginLeft: "-380px" }} >
                    <SidebarNav setShowSideNaveProps={setShowSideNave} />
                  </div>
            </>

            // ..........................................Emplyee login......Mobile View.................................................              
            :
            (EmployeeAuth) ?
              <>
                <div className={Styles.MobilEmployeeFullnavewrapper}>
                <div style={{ width:"30px"}}>

<i style={{ fontSize: "Large", color: "white", zIndex: "1000",  }}
className={ShowSideNave ? "fas fa-times" : "fas fa-bars"} ref={SimgRef} onClick={() => { setShowSideNave((prev) => !prev)}}>
</i>
</div>
                  {/* <div className={Styles.logoWrapper}> */}
                  {/* <NavLink to="/"> <img className={Styles.Moblogo} src={logo} /> </NavLink> */}
                  <div className={Styles.ITwalkinWrapper} style={{marginTop:"10px"}}>
                    {/* <p className={Styles.ITwalkin}>ITwalkin</p>
                    <p className={Styles.onlyforITjobs}>Only for IT jobs</p> */}
                        <img className={Styles.MobIwalkinLogologo} src={Itwalkinlogo} />

                  </div>
                  {/* </div> */}
                  <div className={Styles.linkWrapper}>

                    {/* <NavLink to="/postedjobs" className={`${Styles.Moblink} ${Styles.PostedJobs}`} > Posted jobs</NavLink> */}

                    <NavLink to="/PostJobs" className={`${Styles.Moblink} ${Styles.PostJob}`} >Post a Job</NavLink>



                    <div className={`${Styles.link} ${Styles.MobileIconeWrapperEmp}`}>

                      {/* <NavLink to="/" className={` ${Styles.JobMobileNotificationIcon}`}><img src={JobseekerNotification} /> </NavLink> */}

                      <img className={`${Styles.Icon} ${Styles.EmpMobileProfileIcon}`} src={loginuser} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />
                      {showprofile ?
                  <div className={Styles.EmpMobDropdownwrapper} ref={menuRef} >
                    <p className={Styles.text} ref={menuRef} onClick={EmployeeProfile} >My profile</p>
                    <NavLink to="/postedjobs" className={`${Styles.text} `} > Posted jobs</NavLink>
                    <p className={Styles.text} ref={menuRef} onClick={logutEmp}>Logout</p>
                  </div>
                  : ""}

                    </div >

                  </div>
                </div>
                {/* ............Mobile View.........drop down............ */}
                <div ref={SmenuRef} className={`${Styles.MovileNavOptions} `}
                    style={ShowSideNave ? { marginLeft: "0px" } : { marginLeft: "-380px" }} >
                    <SidebarNav setShowSideNaveProps={setShowSideNave} />
                  </div>

              </>
              // ............Admin Login............Mobile View..........
              :
              (adminLogin) ?
                <>
                  <div className={Styles.fullnavewrapper}>
                    {/* <div className={Styles.logoWrapper}> */}
                    {/* <NavLink to="/" > <img className={Styles.Moblogo} src={logo} /> </NavLink> */}
                    <div className={Styles.ITwalkinWrapper}>
                      {/* <p className={Styles.ITwalkin}>ITwalkin</p>
                      <p className={Styles.onlyforITjobs}>Only for IT jobs</p> */}
                        <img className={Styles.MobIwalkinLogologo} src={Itwalkinlogo} />

                    </div>
                    {/* </div> */}
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
                  {/* .....................drop down...Mobile View......... */}
                  {showprofile ?
                    <div style={{ marginLeft: "-2%" }} className={Styles.Admindropdownwrapper} ref={menuRef} >
                      {/* <p className={Styles.text} ref={menuRef} >My profile</p> */}
                      {/* <p className={Styles.text} ref={menuRef} >Update profile</p> */}
                      <p className={Styles.text} ref={menuRef} onClick={AdminlogOut}>Logout</p>

                    </div>
                    : ""}
                </>
                // ............................................Home Nave....Mobile View................................................      
                :

                <>

                  <div className={Styles.fullnavewrapper}>
                    {/* {ShowSideNave ?
                      <img className={`${Styles.NavIconCross} `} src={Cancel} ref={SimgRef} onClick={() => { setShowSideNave((prev) => !prev) }} />
                      : <img className={`${Styles.NavIconBars} `} src={NavIcon} ref={SimgRef} onClick={() => { setShowSideNave((prev) => !prev) }} />
                    } */}
                <div style={{ width:"30px"}}>

                    <i style={{ fontSize: "Large", color: "white", zIndex: "1000",  }}
                    className={ShowSideNave ? "fas fa-times" : "fas fa-bars"} ref={SimgRef} onClick={() => { setShowSideNave((prev) => !prev)}}>
                  </i>
                </div>

                    <div className={Styles.ITwalkinWrapperHomeMobile}>
                      {/* <p className={Styles.ITwalkinMob}>ITwalkin</p>
                      <p className={Styles.onlyforITjobsMob}>Only for IT jobs</p> */}
                        <img className={Styles.MobIwalkinLogologo} src={Itwalkinlogo} />

                    </div>

                    {/* <NavLink to="/" > <img className={Styles.MobHomelogo} src={logo} /> </NavLink> */}
                    {/* <NavLink to="/" className={`${Styles.Hlink} ${Styles.HomeIcon}`}>  <img src={HomeIcon} /></NavLink> */}
                    <div className={Styles.MobileLoginIconWrapper}>

                      <img className={`${Styles.MobloginLogo} `} src={logIn} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />
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
                    style={ShowSideNave ? { marginLeft: "0px" } : { marginLeft: "-380px" }} >
                    <SidebarNav setShowSideNaveProps={setShowSideNave} />
                  </div>
                  {/* :"" }   */}
                </>
      }

    </>

  )
}
export default Nav;