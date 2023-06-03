import { useState, useEffect, useRef } from "react";
import {useNavigate, Link} from 'react-router-dom';
import axios from "axios";

import "../styles/SideBar.css";

import menu_icon from "../assets/icons/bx-menu.png";       //menu icon

import cube_icon from "../assets/logo1.png";       //ASTU logo
import adobe_icon from "../assets/icons2/bxs-chat.png";       //discussion icon
import discord_icon from "../assets/icons2/bxs-user-circle.png";       //Profile icon
import dribble_icon from "../assets/icons2/bxs-dashboard.png";       //Dashboard icon
import steam_icon from "../assets/icons2/bx-arrow-back.png";       //Back icon
import reddit_icon2 from "../assets/icons2/log-out-regular-48.png";       //white reddit icon
import user_image from "../assets/img_avatar.png";      //User image

function SideBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [authState, setAuthState]=useState(false);
    const navigate = useNavigate();

    function toggleSidebar() {
        setIsOpen(!isOpen);
    }


    //Update Pop-Up Functionality

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
    
        document.addEventListener('mousedown', handleOutsideClick);
    
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);



    // Get Current User

    const [name, setName] = useState('');
    const [senderType, setSenderType] = useState('');

	axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3000/api/user')
        .then(res => {
            if(res.data.status === "Success"){
                setName(res.data.user.user);

                if (res.data.user.user.hasOwnProperty('studentId')) {
                    setSenderType ('Student');
                } else {
                    setSenderType ('Staff');
                }
            }
            else{
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
            }
            else{
				alert("error");
            } 
        })
		.catch (err => console.log(err))
	};



    return (
        <div className="SideBar-home">
            <div className={`sidebar ${isOpen ? "open" : ""}`} ref={dropdownRef}>
                <div className="logo-details">
                    <img src={cube_icon} alt='icon' className="logo_icon"/>
                    <img src={menu_icon} alt='icon' id="btn" onClick={toggleSidebar}/>
                </div>

                {/* The Lists */}
                <ul className="nav-list">

                    <div className="upper-nav">
                    
                        <li>
                            <Link to="/dashboard">
                                <img src={dribble_icon} alt='icon'/>
                                <span className="links_name">Dashboard</span>
                            </Link>
                            <span className="tooltip">Dashboard</span>
                        </li>
                        <li>
                            <Link to="/profile">
                            <img src={discord_icon} alt='icon'/>
                            <span className="links_name">Profile</span>
                            </Link>
                            <span className="tooltip">Profile</span>
                        </li>
                        <li>
                            <Link to="/chat">
                            <img src={adobe_icon} alt='icon'/>
                            <span className="links_name">Discussion</span>
                            </Link>
                            <span className="tooltip">Discussion</span>
                        </li>
                        <li>
                            <Link to="/">
                                <img src={steam_icon} alt='icon'/>
                                <span className="links_name">Home</span>
                            </Link>
                            <span className="tooltip">Home</span>
                            </li>

                    </div>


                    {/* Lower Profile */}
                    <li className="profile">
                        <div className="profile-details">
                            <img src={user_image} alt="profileImg" />
                            <div className="name_job">
                                <div className="name">{name.fullname}</div>
                                <div className="role">{senderType}</div>
                            </div>
                        </div>

                        <button onClick={logout} className="logout-div">
                            <img src={reddit_icon2} alt='icon' className="log_out"/>
                        </button>
                        {/* <span className="tooltip">Logout</span> */}
                    </li>

                </ul>
                
            </div>

        </div>
    );
}

export default SideBar;
