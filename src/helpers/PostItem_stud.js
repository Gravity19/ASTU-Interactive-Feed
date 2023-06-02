import React from "react";
import {useState, useEffect, useRef} from 'react';
import Modal from 'react-modal';

import date_icon from "../assets/date_icon.png";
import map_icon from "../assets/map_icon.png";
import { BsFillBookmarkPlusFill, BsFillPeopleFill, BsFillHeartFill, BsRobot } from "react-icons/bs";
import { IoOptionsOutline } from "react-icons/io5";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { FaWalking, FaSchool } from "react-icons/fa";

import logo from "../assets/logo1.png";
import B507 from "../assets/loc/b507.png";
import B508 from "../assets/loc/b508.png";
import B509 from "../assets/loc/b509.png";


function PostItem_stud({ user_image, user_name, user_badge, card_image, tag, title, desc, sum, time, date, loc}) {


    const [Popup, setPopup] = useState(false);      //modal Functionality

    //Update Pop-Up Functionality
    const [open, setOpen]=useState(false);          //Update Functionality
    const [locate, setLocate]=useState(false);          //Map Functionality
    const [summary, setSummary]=useState(false);          //Summary Functionality

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
                setSummary(false);
                setLocate(false);
            }
        };
    
        document.addEventListener('mousedown', handleOutsideClick);
    
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
    

    // Upload Image Preview

    const [file, setFile] = useState();

    function getFile(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
    }


    // Radio Button Functionality

    const [answer, setAnswer] = useState('');

    const handlePostChange = (e) => {
        const selectedAnswer = e.target.value;              // Make the value of the button the Selected Answer 
        setAnswer(selectedAnswer);
    };

    // mapping location to image

    
    const getImageByLoc = (loc) => {
        switch (loc) {
            case 'B507': return B507;
            case 'B508': return B508;
            case 'B509': return B509;
            default: return null;
        }
    };

    const imageSrc = getImageByLoc(loc)

    return (
        <div className="card">

            {/* API LOGIC */}
                        
                        <div className="card__header">
                            <div className="user_info">
                                <img src={user_image} alt="user_image" className="user_image"/>
                                <h5 className="user_name">{user_name}</h5>
                                <img src={user_badge} alt="user_badge" className="user_badge"/>
                                

                                
                        {/* Update Modal */}

                                <Modal isOpen={Popup} className='create-modal' style={{overlay: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',}}}>


                                    <img src={logo} alt='Astu-logo' className='logo'/>

                                    <form className='publish-form'>
                                        <div className="publish-box">
                                            <label htmlFor="staffId">Title</label>
                                            <input className="inputs" type='text' name="staffId" placeholder="Place Your title here"/>
                                        </div>

                                        <div className="publish-box">
                                            <label htmlFor="content">Description</label>
                                            <textarea className="input"  name="content" placeholder="Enter Description" required>{desc}</textarea>
                                        </div>

                                    {/* -- Upload Button -- */}

                                        <div className="publish-box">
                                            <input  className="inputs" type="file" id="image" accept='image/*' onChange={getFile} />
                                            <label htmlFor="image" className='upload'><RiUploadCloud2Fill className='icon'/>Upload Image</label>

                                            {file && (
                                                <img src={file} alt="Uploaded-File" className="image"/>
                                            )}
                                        </div>


                                    {/* -- Radio Button -- */}

                                        <div className='publish-radio'>
                                            <div className="publish-to">
                                                <div className="audience">
                                                    <input className="inputs" type="radio" name='categoryId' value="1" checked={answer === '1'} onChange={handlePostChange} />
                                                    <div className='Radio-tile'>
                                                        <BsFillPeopleFill className='icon'/>
                                                        <span>ALL</span>
                                                    </div>
                                                </div>  
                                                
                                                <div className="audience">
                                                    <input className="inputs" type="radio" name="categoryId"  value="school" checked={answer === 'school'} onChange={handlePostChange}/>                                    
                                                    <div className='Radio-tile'>
                                                        <FaSchool className='icon'/>
                                                        <span>SCL</span>
                                                    </div>
                                                </div>

                                                <div className="audience">
                                                    <input className="inputs" type="radio" name="categoryId" value="department" checked={answer === 'department'} onChange={handlePostChange}/>
                                                    <div className='Radio-tile'>
                                                        <FaWalking className='icon'/>
                                                        <span>DEPT</span>
                                                    </div>
                                                </div>
                                            </div>



                                        {answer === 'school' && (
                                            <select id="depId" name="depId" required>
                                                <option hidden>School</option>
                                                <option>SOEEC</option>
                                                <option>SOASE</option>
                                                <option>SEOSCE</option>
                                            </select>
                                        )}


                                        {answer === 'department' && (
                                            <select id="depId" name="depId"   required>
                                                <option hidden>Department</option>
                                                <option>Computer Science</option>
                                                <option>Mechanical Engineering</option>
                                                <option>Civil Engineering</option>
                                            </select>
                                        )}

                                        </div>

                                {/* -- Radio-Button Ends -- */}

                                        <div className='bottom-btn'>
                                            <button className='publish'>Update<BsFillBookmarkPlusFill/></button>
                                            <button className='close-modal' onClick={()=>setPopup(false)}> Cancel</button>
                                        </div>

                                    </form>

                                </Modal>


                    {/* END- Modal */}


                            </div>
                            <img src={card_image} alt="card_image" className="card_image" width="600"/>
                        </div>

                        <div className="card__body">
                            <span className="tag tag-red">{tag}</span>
                            <h4 className='title'>{title}</h4>
                            <p className='desc'>{desc}</p>

                            <button className="summary-btn" onClick={()=> setSummary(!open)}>
                                <p>Summarize</p>
                            </button>

                            {summary && (
                            <div className="summary" ref={dropdownRef}>
                                <div className="upper"><span>Summary</span><BsRobot className="icon"/></div>
                                <p>{sum}</p>
                                <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 390" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150"><defs><linearGradient id="gradient" x1="12%" y1="83%" x2="88%" y2="17%"><stop offset="5%" stop-color="#cb2d3e"></stop><stop offset="95%" stop-color="#f78da7"></stop></linearGradient></defs><path d="M 0,400 C 0,400 0,133 0,133 C 144.10714285714283,151.96428571428572 288.21428571428567,170.92857142857142 406,174 C 523.7857142857143,177.07142857142858 615.2500000000001,164.25 734,148 C 852.7499999999999,131.75 998.7857142857142,112.07142857142857 1121,109 C 1243.2142857142858,105.92857142857143 1341.607142857143,119.46428571428572 1440,133 C 1440,133 1440,400 1440,400 Z" stroke="none" stroke-width="0" fill="url(#gradient)" fill-opacity="0.53" class="transition-all duration-300 ease-in-out delay-150 path-0"></path><defs><linearGradient id="gradient" x1="12%" y1="83%" x2="88%" y2="17%"><stop offset="5%" stop-color="#cb2d3e"></stop><stop offset="95%" stop-color="#f78da7"></stop></linearGradient></defs><path d="M 0,400 C 0,400 0,266 0,266 C 134.42857142857144,249.64285714285714 268.8571428571429,233.28571428571428 396,223 C 523.1428571428571,212.71428571428572 643.0000000000001,208.49999999999997 765,224 C 886.9999999999999,239.50000000000003 1011.1428571428571,274.7142857142857 1124,285 C 1236.857142857143,295.2857142857143 1338.4285714285716,280.6428571428571 1440,266 C 1440,266 1440,400 1440,400 Z" stroke="none" stroke-width="0" fill="url(#gradient)" fill-opacity="1" class="transition-all duration-300 ease-in-out delay-150 path-1"></path></svg>
                            </div>
                            )}
                            
                        </div>

                        <div className="card__footer">
                            <div className="supplies">
                                <img src={date_icon} alt="date_icon" className="date_icon"/>
                                <div className="date_info">
                                    <h5>{date}</h5>
                                    <small>{time}</small>
                                </div>
                            </div>
                            
                            <div className="mid">
                                <div className="location" onClick={()=> setLocate(!locate)}>
                                    <img src={map_icon} alt="map_icon" className="map_icon"/>
                                    <div className="Map_info">
                                        <h5>{loc}</h5>
                                    </div>
                                </div>

                                {locate && (
                                <div className="location-img" ref={dropdownRef}>
                                    <img src={imageSrc} alt="loc_image"/>
                                </div>
                                )}
                            </div>
                            
                            
                            <div className="like-heart">
                                <label class="like-container">
                                    <input type="checkbox"/><BsFillHeartFill className="svg"/>
                                </label>
                                <p>5</p>
                            </div>
                        </div>
        </div>
    );
}

export default PostItem_stud;