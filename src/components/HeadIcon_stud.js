import React from 'react';
import {Link} from 'react-router-dom';
import "../styles/NavBar_stud.css";
import "../styles/HeadIcon_stud.css";
import {useState, useEffect, useRef} from 'react';



import { FaUser } from "react-icons/fa";
import { BsFillChatRightTextFill } from "react-icons/bs";
import { MdArrowForwardIos, MdDashboardCustomize } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

import profile_img from "../assets/img_avatar.png";



function HeadIcon_stud() {

    const [/*authState,*/ setAuthState]=useState(false);

	// Pop-Up Functionality

    const [open, setOpen]=useState(false);

	const dropdownRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
    
        document.addEventListener('mousedown', handleOutsideClick);
    
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
    

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

                        <div className="dropdown" ref={dropdownRef}>
								<div className='triangle'></div>
								<div className='dropdown-pro'>
									<img src={profile_img} alt='Profile-img' className='profile-img-min' />
									<p>Milkias Sol</p>
								</div>

								<ul>
									<li>										
										<Link to="/profile_Stud">
											<div className='dropdown-icons'><FaUser/></div>
											<p>Profile</p>
											<div className='arrow-right'><MdArrowForwardIos/></div>
										</Link>
									</li>

									<li>									
										<Link to="/dashboard_stud">
											<div className='dropdown-icons'><MdDashboardCustomize/></div>
											<p>Dashboard</p>
											<div className='arrow-right'><MdArrowForwardIos/></div>
										</Link>
									</li>

									<li>
										<Link to="/chat_stud">
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

export default HeadIcon_stud;