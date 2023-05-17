import React from 'react';
import { Link} from 'react-router-dom';

import "../styles/NavBar.css";
import { useState, useEffect } from "react";

import { FaUser } from "react-icons/fa";
import { BsFillChatRightTextFill } from "react-icons/bs";
import { MdArrowForwardIos, MdDashboardCustomize } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";


import logo from "../assets/logo2.png";
import profile_img from "../assets/img_avatar.png";

function NavBar() {

	// Session Management
	const [authState, setAuthState]=useState(false);
	const [open, setOpen]=useState(false);
	

	useEffect(() => {
		if(localStorage.getItem('accessToken')){
			setAuthState(true);
		}
	}, []);


	// Logout function

	const logout = () => {
		localStorage.removeItem("accessToken");
		setAuthState(false);
		window.location.reload();
	};



    return (
        <div className='nav-bar'>
            <img src={logo} alt='logo' className='nav-logo'/>

			{/* Left Side */}
				<div className='left-div'>
					<a href="/#" className='mid'>Home</a>
					<a href="/#" className='mid'>Platform</a>
					<a href="/About" className='mid'>About</a>
					{/* <a href="/About" className='mid'>{Username}</a> */}
				</div>

			{/* Right-Side */}
				{!authState ? (
					<>
						<a href="/Register" className='loj'>Register</a>
						<a href="/login" className='log'>Login</a>

					</>
				):(
					<>
						{/* <a href="/Profile" className='loj'>Profile</a> */}


						<img onClick={()=> setOpen(!open)} src={profile_img} alt='Profile-img' className='profile-img' />

						{/* DropDown */}

						{open && (
							<div className="dropdown">
								<div className='triangle'></div>
								<div className='dropdown-pro'>
									<img src={profile_img} alt='Profile-img' className='profile-img-min' />
									<p>Yabets Urgo</p>
								</div>

								<ul>
									<li>										
										<Link to="/profile">
											<div className='dropdown-icons'><FaUser/></div>
											<p>Profile</p>
											<div className='arrow-right'><MdArrowForwardIos/></div>
										</Link>
									</li>

									<li>									
										<Link to="/dashboard">
											<div className='dropdown-icons'><MdDashboardCustomize/></div>
											<p>Dashboard</p>
											<div className='arrow-right'><MdArrowForwardIos/></div>
										</Link>
									</li>

									<li>
										<Link to="/chat">
											<div className='dropdown-icons'><BsFillChatRightTextFill/></div>
											<p>Chat</p>
											<div className='arrow-right'><MdArrowForwardIos/></div>
										</Link>
									</li>

									<li>
										<Link onClick={logout}>
											<div className='dropdown-icons'><IoLogOut/></div>
											<p>Logout</p>
											<div className='arrow-right'><MdArrowForwardIos/></div>
										</Link>
									</li>

								</ul>

							</div>
						)}

					</>
				)}

        </div>
    );
}

export default NavBar;