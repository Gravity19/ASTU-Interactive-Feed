import React from 'react';
import "../styles/Profile.css";

import SideBar from '../components/SideBar';      //SideBar
import HeadIcon from '../components/HeadIcon';      //HeadIcon

import account_bgr from "../assets/stue.jpg";    //account card bgr


function Profile() {
    return (
        <div className='account-setting'>
            <SideBar />

            <div className="account-setup">
                <div className="title">Account Setting</div>

                <form className="account-update"> 
                    <div className="account-div">
                        <label htmlFor="fullname">Full Name</label>
                        <input type="text" name="fullname" id="fullname" placeholder="Enter full name"   required />
                    </div>

                    <div className="account-div">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="example@astu.edu.et"   required />
                    </div>


                    <div className="form-pair">
                        <div className="x-y-box">
                            <label htmlFor="password">Full Name</label>
                            <input type="password" name="password" id="password" placeholder="Enter Name"   required />
                        </div>

                        <div className="x-y-box">
                            <label htmlFor="picture">Email</label>
                            <input type="text" name="picture" id="picture" placeholder="Enter picture"   required />
                        </div>
                    </div>




                    {/* <div className="form-pair">
                        <div className="x-y-box">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" placeholder="Enter Password"   required />
                        </div>

                        <div className="x-y-box">
                            <label htmlFor="password">Password</label>
                            <div className="select-box">
                                <select id="depId" name="depId"   required>
                                    <option hidden>Department</option>
                                    <option>Computer Science</option>
                                    <option>Mechanical Engineering</option>
                                </select>
                            </div>
                        </div>

                    </div> */}


                    <div className="account-div">
                        <label htmlFor="year">year</label>
                        <input type="text" name="year" id="year" placeholder="Enter year"   required />
                    </div>
                    

                    <div className="account-div address">
                            <div className="select-box">
                                <select id="depId" name="depId"   required>
                                    <option hidden>Department</option>
                                    <option>Computer Science</option>
                                    <option>Mechanical Engineering</option>
                                    <option>Civil Engineering</option>

                                {/* 
                                    {depts.map((Depart, i) => (
                                        <option key={i} value={Depart.depId}>{Depart.name}</option>
                                        )
                                    )}
                                */}

                                </select>
                            </div>

                    </div>

                    <button className="reg-button">Update</button>
                    
                </form>
            </div>


            
            <div className='account-card'>
                <img src="https://images.unsplash.com/photo-1545703549-7bdb1d01b734?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ" alt="account-bgr" className="account-bgr"/>


                <div className="card-banner">
                    <img src="https://i.pinimg.com/564x/bf/d6/b5/bfd6b5ead3e81c7d0ff530a2a6c98de3.jpg" alt="account-user-img" className="account-user-img"/>

                    <div className="card-banner-space"></div>
                    <div className="card-banner-big">Yabets Urgo</div>
                    <div className="card-banner-small">Computer Science</div>
                    <div className="card-banner-tag">Student</div>
                    <div className="card-banner-text">Morgan has collected 
                    ants since they were six years old and now has many dozen 
                    ants but none in their pants.</div>
                    
                </div>

            </div>

            <HeadIcon />

        </div>
    );
}

export default Profile;