import React from 'react';
import {Link} from 'react-router-dom';
import "../styles/NavBar.css";
import "../styles/HeadIcon.css";
import { useState } from "react";


import { FaUser } from "react-icons/fa";
import { BsFillChatRightTextFill } from "react-icons/bs";
import { MdArrowForwardIos, MdDashboardCustomize } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

import profile_img from "../assets/img_avatar.png";



function HeadIcon() {

    const [authState, setAuthState]=useState(false);
    const [open, setOpen]=useState(false);

    // Logout function

	const logout = () => {
		localStorage.removeItem("accessToken");
		setAuthState(false);
		window.location.reload();
	};


    return (
        <div className='HeadIcon'>
                        <img onClick={()=> setOpen(!open)} src={profile_img} alt='Profile-img' className='profile-img' />

                        {open && (

                        <div className="dropdown">
								<div className='triangle'></div>
								<div className='dropdown-pro'>
									<img src={profile_img} alt='Profile-img' className='profile-img-min' />
									<p>Yabets Urgo</p>
								</div>

								<ul>
									<li>										
										<Link to="/#">
											<div className='dropdown-icons'><FaUser/></div>
											<p>Profile</p>
											<div className='arrow-right'><MdArrowForwardIos/></div>
										</Link>
									</li>

									<li>									
										<Link to="/#">
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
            
        </div>
    );
}

export default HeadIcon;