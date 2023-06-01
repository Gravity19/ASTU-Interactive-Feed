import React from 'react';
import axios from "axios";
import {useNavigate, Link} from 'react-router-dom';
import {useState, useEffect, useRef} from 'react';

import "../styles/NavBar.css";
import "../styles/HeadIcon.css";


import { FaUser } from "react-icons/fa";
import { BsFillChatRightTextFill } from "react-icons/bs";
import { MdArrowForwardIos, MdDashboardCustomize } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

import profile_img from "../assets/img_avatar.png";



function HeadIcon() {

    const [authState, setAuthState]=useState(false);
	const navigate = useNavigate();

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
		axios.get('http://localhost:3000/api/logout')
        .then(res => {
            if(res.data.message === "Success"){
				setAuthState(false);
				navigate('/login');
				window.location.reload();
            }
            else{
				alert("error");
            } 
        })
		.catch (err => console.log(err))
	};


	// Get Current User

    const [name, setName] = useState('');

	axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3000/api/user')
        .then(res => {
            if(res.data.status === "Success"){
                setName(res.data.user.user);
            }
            else{
                setName("Something went wrong");
            } 
        })
    }, []);


    return (
        <div className='HeadIcon'>
                        <img onClick={()=> setOpen(!open)} src={profile_img} alt='Profile-img' className='profile-img' />

                        {open && (

                        <div className="dropdown" ref={dropdownRef}>
								<div className='triangle'></div>
								<div className='dropdown-pro'>
									<img src={profile_img} alt='Profile-img' className='profile-img-min' />
									<p>{name.fullname}</p>
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