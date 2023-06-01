import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import "../styles/login.css";
import astu_logo from "../assets/badges/AstuFeed_badge.png";
import login_graphics from "../assets/login-graphic.png";
import { IoWarningOutline } from "react-icons/io5";

import axios from "axios";
import Modal from 'react-modal';

function Login() {

    // POST LOGIN

    const [loginData, setLoginData] = useState({
        loginAs: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();             // define navigation
    const [error, setError] = useState('');     // define error
    const [authState, setAuthState]=useState(false);

    axios.defaults.withCredentials = true;
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3000/api/login",
                loginData,
                { withCredentials: true }
            );
            if (response.data.error) {
                alert(response.data.error);
            } else {
                setAuthState(true);
                navigate("/");
            }
        } catch (error) {
            if (error.response.status === 401) {
                setError(error.response.data.message);
            } else {
                console.log(error);
            }
        }
    };

    
    const handleInputChange = (event) => {
        setLoginData({ ...loginData, [event.target.name]: event.target.value });
    };


    // Error Modal
    const closeModal = () => {
        setError('');
    };



    return (
        <div className="insign">

            <Link to="/" >
                <img src={astu_logo} className='astu-logo' alt="astu-logo"/>
            </Link>

            <div className='insign-body'>

                {/* The Graphics */}

                <div className='login-graphics-overlay'>
                    <img src={login_graphics} className='login-graphics' alt="login-graphics"/>
                    <div className='login-graphics-word'>
                        <p className='login-graphics-title'>Create. Communicate. Learn</p>
                        <p className='login-graphics-text'>Welcome to Astu Interactive Feed</p>
                    </div>
                </div>
                
                    
                {/* The Form */}
            
                <form onSubmit={handleSubmit} className="login-form">
                    <p class="form-title">Log in</p>
                    <p class="signup-link">No account? <a href="/register"> Create an Account</a></p>


                    <div class="input-container">
                        <input placeholder="Email" type="email" name="email" id="email" onChange={handleInputChange} required/>
                    </div>
                    <div class="input-container">
                        <input placeholder="Password" type="password" name="password" id="password" onChange={handleInputChange} required/>
                        <span>
                            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
                            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
                            </svg>
                        </span>
                    </div>

                    <div className="login__choice">    
                        <select id="loginAs" name="loginAs" onChange={handleInputChange} required>
                            <option hidden>Login As</option>
                            <option value="student">Student</option>
                            <option value="staff">Staff</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>


                    <button class="submit" type="submit">Log in</button>
                </form>

            </div>

            <div className='closing-tag'>
                Copyright Ⓒ 2023 AstuFeed by ASTU Design inc. All rights reserved
            </div>


            {/* MODAL ERROR POP UP */}

            <Modal className ="modal-pop" isOpen={!!error} onRequestClose={closeModal} contentLabel="Error message" ariaHideApp={false} style={{overlay: {
                backgroundColor: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',}}}>

                <div className='icon'><IoWarningOutline className="image"/></div>
                <p>{error}</p>
                <button onClick={closeModal}>Close</button>
            </Modal>

        </div>
    );
}

export default Login;