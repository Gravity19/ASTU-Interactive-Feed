import React from "react";
import {useNavigate, Link} from 'react-router-dom';
import "../styles/Register.css";

import axios from "axios";
import { useState, useEffect } from 'react';

import login_graphics from "../assets/login-graphic.png";
import astu_logo from "../assets/badges/AstuFeed_badge.png";

function Register() {


    // Radio Button functionality

    const [selectedOption, setSelectedOption] = useState('student');

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };


    // Get Department

    const [depts, setDepts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/student/getDep')
        .then(response => response.json())
        .then(data => setDepts(data))
        .catch(err => console.log(err));
    }, []);

    console.log(depts);



    // POST Registration

    const navigate = useNavigate();             // define navigation

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
        picture: "",
        year: "",
        depId: "",
        // schoolYear: "",
        // birthDate: "",
        // degreeType: "UG",
        // department: "",
    });
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/student/register", formData);
            console.log(response.data); // handle response data here
            navigate('/login');
            
        }    
        catch (error) {
          console.log(error); // handle error here
        }
    };
    
    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };



    return (
        <div className="reg-main">

            <Link to="/" >
                <img src={astu_logo} className='astu-logo' alt="astu-logo"/>
            </Link>

            <div className='register-graphics-overlay'>
                <img src={login_graphics} className='register-graphics' alt="login-graphics"/>
                <div className='register-graphics-word'>
                    <p className='register-graphics-title'>Create. Communicate. Learn</p>
                    <p className='register-graphics-text'>Welcome to Astu Interactive Feed</p>
                </div>
            </div>

            <div className="reg-container">

                <div class="radio-reg">
                    <label class="radio">
                        <input type="radio" name="radio" value="student" checked={selectedOption === 'student'} onChange={handleOptionChange}/>
                        <span>Student</span>
                    </label>
                    <label class="radio">
                        <input type="radio" name="radio" value="staff" checked={selectedOption === 'staff'} onChange={handleOptionChange}/>
                        <span>Staff</span>
                    </label>
                </div>
                
            {selectedOption === 'student' && (
            <>
                <div className="reg-title">Registration<p>student</p></div>

                <form onSubmit={handleSubmit} className="reg-form">

                    <div className="x-y-combo">
                        <div className="x-y-box">
                            <label htmlFor="fullname">Full Name</label>
                            <input type="text" name="fullname" id="fullname" placeholder="Enter full name" onChange={handleInputChange} required />
                        </div>

                        <div className="x-y-box">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" placeholder="example@astu.edu.et" onChange={handleInputChange} required />
                        </div>
                    </div>


                    <div className="x-y-combo">
                        <div className="x-y-box">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" placeholder="Enter Password" onChange={handleInputChange} required />
                        </div>

                        <div className="x-y-box">
                            <label htmlFor="picture">Picture</label>
                            <input type="text" name="picture" id="picture" placeholder="Enter picture" onChange={handleInputChange} required />
                        </div>
                    </div>


                    <div className="reg-input-box">
                        <label htmlFor="year">Year</label>
                        <input type="text" name="year" id="year" placeholder="Enter year" onChange={handleInputChange} required />
                    </div>
{/*

                    <div className="column">
                        <div className="reg-input-box">
                            <label htmlFor="s-year">Year</label>
                            <input type="number" name="s-year" id="s-year" placeholder="Enter School year" onChange={handleInputChange} required />
                        </div>
                        <div className="reg-input-box">
                            <label htmlFor="s-date">Birth Date</label>
                            <input type="date" name="s-date" id="s-date" placeholder="Enter birth date" onChange={handleInputChange} required />
                        </div>
                    </div>


                    <div className="degree-box">
                        <h3>Degree Type</h3>
                        <div className="degree-option">
                            <div className="degree">
                                <input type="radio" id="check-UG" name="degree" value="UG" checked={formData.degreeType === 'UG'} onChange={handleInputChange} />
                                <label htmlFor="check-UG">UG</label>
                            </div>
                            <div className="degree">
                                <input type="radio" id="check-PG" name="degree" value="PG" checked={formData.degreeType === 'UG'} onChange={handleInputChange}/>
                                <label htmlFor="check-PG">PG</label>
                            </div>
                        </div>
                    </div>
*/}

                    <div className="reg-input-box address">
                        <div className="column">
                            <div className="select-box">
                                <select id="depId" name="depId" onChange={handleInputChange} required>
                                    <option hidden>Department</option>
                                    {depts.map((Depart, i) => (
                                        <option key={i} value={Depart.depId}>{Depart.name}</option>
                                        )
                                    )}
                                </select>
                            </div>

                             {/* <input type="text" placeholder="Enter your city" required />  */}
                        </div>
                    </div>

                    <div className="reg-footer">
                        <button className="reg-button">Register</button>
                        <p>Already have an account? <a href="/login">Login</a></p>
                    </div>
                    
                </form>
            </>
            )}

            {selectedOption === 'staff' && (
            <>
                <div className="reg-title">Registration<p>staff</p></div>

                <form onSubmit={handleSubmit} className="reg-form">

                    <div className="x-y-combo">
                        <div className="x-y-box">
                            <label htmlFor="fullname">Full Name</label>
                            <input type="text" name="fullname" id="fullname" placeholder="Enter full name" onChange={handleInputChange} required />
                        </div>

                        <div className="x-y-box">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" placeholder="example@astu.edu.et" onChange={handleInputChange} required />
                        </div>
                    </div>

                    <div className="x-y-combo">
                        <div className="x-y-box">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" placeholder="Enter Password" onChange={handleInputChange} required />
                        </div>

                        <div className="x-y-box">
                            <label htmlFor="picture">Picture</label>
                            <input type="text" name="picture" id="picture" placeholder="Enter picture" onChange={handleInputChange} required />
                        </div>
                    </div>

                    <div className="reg-input-box">
                        <label htmlFor="year">Year</label>
                        <input type="text" name="year" id="year" placeholder="Enter year" onChange={handleInputChange} required />
                    </div>

                    <div className="reg-input-box address">
                        <div className="column">
                            <div className="select-box">
                                <select id="depId" name="depId" onChange={handleInputChange} required>
                                    <option hidden>Department</option>
                                    {depts.map((Depart, i) => (
                                        <option key={i} value={Depart.depId}>{Depart.name}</option>
                                        )
                                    )}
                                </select>
                            </div>

                             {/* <input type="text" placeholder="Enter your city" required />  */}
                        </div>
                    </div>

                    <div className="reg-footer">
                        <button className="reg-button">Register</button>
                        <p>Already have an account? <a href="/login">Login</a></p>
                    </div>
                    
                </form>
            </>
            )}


            </div>

            <div className='closing-tag'>
                Copyright Ⓒ 2023 AstuFeed by ASTU Design inc. All rights reserved
            </div>
        </div>


    );
}

export default Register;


