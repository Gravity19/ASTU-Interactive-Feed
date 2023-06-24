import React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import "../styles/login.css";

import astu_logo from "../assets/badges/AstuFeed_badge.png";
import login_graphics from "../assets/login-graphic.png";

import { BiCheckCircle } from "react-icons/bi";

function Forgot() {

    const [sent, setSent]=useState(false);


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
            
                <form className="login-form reset-form">
                {!sent ? (
                <>
                    <p class="form-title">Forgot Password</p>
                    <p class="signup-link memo">Enter your <b className='color'>email</b> and we will send you a link to reset your password</p>


                    <div class="input-container reset-email">
                        <input placeholder="Email" type="email" name="email" id="email"   required/>
                    </div>

                    <button class="submit" type="submit" onClick={()=>setSent(true)}>SEND</button>

                    <div className="error-log">error</div>
                </>
                ) : (
                <>


                    <div className='sent'>
                        <BiCheckCircle className="icon"/>
                        <p>Email Verification Sent</p>
                    </div>

                </>
                )}
                </form>

            </div>

            <div className='closing-tag'>
                Copyright Ⓒ 2023 AstuFeed by ASTU Design inc. All rights reserved
            </div>

        </div>
    );
}

export default Forgot;