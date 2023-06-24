import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import "../styles/login.css";

import astu_logo from "../assets/badges/AstuFeed_badge.png";
import login_graphics from "../assets/login-graphic.png";
import { BiShowAlt, BiHide } from "react-icons/bi";


function Reset() {


    // Show and Hide Password

    const [passwordVisible, setPasswordVisible] = useState(false);

    const handlePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
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
            
                <form className="login-form">
                    <p class="form-title">Reset Password</p>
                    <p class="signup-link">No account? <a href="/register"> Create an Account</a></p>

                    <div class="input-container">
                        <input placeholder="New Password" type={passwordVisible ? 'text' : 'password'} name="password" id="password" required/>
                        <span onClick={handlePasswordVisibility}>
                            {passwordVisible ? (
                                <BiHide className='svg'/>
                            ) : (
                                <BiShowAlt className='svg'/>
                            )}
                        </span>
                    </div>


                    <div class="input-container">
                        <input placeholder="Confirm Password" type={passwordVisible ? 'text' : 'password'} name="password" id="password" required/>
                        <span onClick={handlePasswordVisibility}>
                            {passwordVisible ? (
                                <BiHide className='svg'/>
                            ) : (
                                <BiShowAlt className='svg'/>
                            )}
                        </span>
                    </div>

                    <button class="submit reset-btn" type="submit">Reset</button>

                    <div className="error-log">error</div>
                </form>

            </div>

            <div className='closing-tag'>
                Copyright Ⓒ 2023 AstuFeed by ASTU Design inc. All rights reserved
            </div>

        </div>
    );
}

export default Reset;