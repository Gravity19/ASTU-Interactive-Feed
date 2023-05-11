import React from "react";
import {useNavigate} from 'react-router-dom';
import "../styles/Register.css";
// import svgback from "../assets/shape/svg-back4.png";

import axios from "axios";
import { useState, useEffect } from 'react';


function Register() {

// GET DEPARTMENT

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
            {/* <img src={svgback} className='svg-back' alt="svg-back"/> */}
            <div className='svg-back'></div>

            <div className="reg-container">
                <div className="reg-title">Registration Form</div>

                <form onSubmit={handleSubmit} className="reg-form">
                    <div className="reg-input-box">
                        <label htmlFor="fullname">Full Name</label>
                        <input type="text" name="fullname" id="fullname" placeholder="Enter full name" onChange={handleInputChange} required />
                    </div>

                    {/* <div className="reg-input-box">
                        <label htmlFor="studentId">Student ID</label>
                        <input type="text" name="studentId" id="studentId" placeholder="UGR/xxx-xx/11" maxLength={13} onChange={handleInputChange} required />
                    </div> */}

                    <div className="reg-input-box">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="example@astu.edu.et" onChange={handleInputChange} required />
                    </div>


                    <div className="x-y-combo">
                        <div className="x-y-box">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" placeholder="Enter Password" onChange={handleInputChange} required />
                        </div>

                        <div className="x-y-box">
                            <label htmlFor="picture">picture</label>
                            <input type="text" name="picture" id="picture" placeholder="Enter picture" onChange={handleInputChange} required />
                        </div>
                    </div>


                    <div className="reg-input-box">
                        <label htmlFor="year">year</label>
                        <input type="text" name="year" id="year" placeholder="Enter year" onChange={handleInputChange} required />
                    </div>
{/*
                    <div className="reg-input-box">
                        <label htmlFor="depId">dep Id</label>
                        <input type="text" name="depId" id="depId" placeholder="Enter depId" onChange={handleInputChange} required />
                    </div>


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


                    <button className="reg-button">Submit</button>
                    
                </form>
            </div>
        </div>


    );
}

export default Register;


