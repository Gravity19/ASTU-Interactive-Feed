import React from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {useState, useEffect, useRef} from 'react';
import axios from "axios";
import "../styles/NavBar.css";

import { FaUser } from "react-icons/fa";
import { BsFillChatRightTextFill } from "react-icons/bs";
import { MdArrowForwardIos, MdDashboardCustomize } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";


import logo from "../assets/logo2.png";
import profile_img from "../assets/img_avatar.png";

function NavBar() {

	const navigate = useNavigate();

	// Get Current User

    const [name, setName] = useState('');
	const [authState, setAuthState]=useState(false);

	axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3000/api/user')
        .then(res => {
            if(res.data.status === "Success"){
				setAuthState(true);
                setName(res.data.user.user);
            }
            else{
				setAuthState(false);
                setName("Something went wrong");
            } 
        })
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

    //Pop-Up Functionality
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
							<div className="dropdown" ref={dropdownRef}>
								<div className='triangle'></div>
								<div className='dropdown-pro'>
									<img src={profile_img} alt='Profile-img' className='profile-img-min' />
									<p>{name.fullname}</p>
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