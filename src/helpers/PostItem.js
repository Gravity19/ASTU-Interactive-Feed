import React from "react";
import {useState, useEffect, useRef} from 'react';
import Modal from 'react-modal';

import date_icon from "../assets/date_icon.png";            //Date Icon
import map_icon from "../assets/map_icon.png";    //map_icon
import { BsFillBookmarkPlusFill, BsFillPeopleFill, BsFillHeartFill } from "react-icons/bs";
import { IoOptionsOutline } from "react-icons/io5";                  //Option icon
import { RiUploadCloud2Fill } from "react-icons/ri";                  //upload + Add icon
import { FaWalking, FaSchool } from "react-icons/fa";                  //walking + School icon
import logo from "../assets/logo1.png";


function PostItem({ user_image, user_name, user_badge, card_image, tag, title, desc, time, date, loc}) {


    const [Popup, setPopup] = useState(false);      //modal Functionality

    //Update Pop-Up Functionality
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


    return (
        <div className="card">

            {/* API LOGIC */}
                        
                        <div className="card__header">
                            <div className="user_info">
                                <img src={user_image} alt="user_image" className="user_image"/>
                                <h5 className="user_name">{user_name}</h5>
                                <img src={user_badge} alt="user_badge" className="user_badge"/>
                                <IoOptionsOutline className="options" onClick={()=> setOpen(!open)}/>

                                {open && (
                                <div className="update" ref={dropdownRef}>
                                    <div className="line" onClick={()=>{setPopup(true); setOpen(!open);}} >Update</div>
                                    <div className="line" onClick={()=> setOpen(!open)}>Exit</div>
                                </div>
                                )}

                                
                        {/* Update Modal */}

                                <Modal isOpen={Popup} className='create-modal' style={{overlay: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',}}}>


                                    <img src={logo} alt='Astu-logo' className='logo'/>

                                    <form className='publish-form'>
                                        <div className="publish-box">
                                            <label htmlFor="staffId">Title</label>
                                            <input type='text' name="staffId" placeholder="Place Your title here"/>
                                        </div>

                                        <div className="publish-box">
                                            <label htmlFor="content">Description</label>
                                            <textarea className="input"  name="content" placeholder="Enter Description" required>{desc}</textarea>
                                        </div>

                                    {/* -- Upload Button -- */}

                                        <div className="publish-box">
                                            <input type="file" id="image" accept='image/*' onChange={getFile} />
                                            <label htmlFor="image" className='upload'><RiUploadCloud2Fill className='icon'/>Upload Image</label>

                                            {file && (
                                                <img src={file} alt="Uploaded-File" className="image"/>
                                            )}
                                        </div>


                                    {/* -- Radio Button -- */}

                                        <div className='publish-radio'>
                                            <div className="publish-to">
                                                <div className="audience">
                                                    <input className='input' type="radio" name='categoryId' value="1" checked={answer === '1'} onChange={handlePostChange} />
                                                    <div className='Radio-tile'>
                                                        <BsFillPeopleFill className='icon'/>
                                                        <span>ALL</span>
                                                    </div>
                                                </div>  
                                                
                                                <div className="audience">
                                                    <input className='input' type="radio" name="categoryId"  value="school" checked={answer === 'school'} onChange={handlePostChange}/>                                    
                                                    <div className='Radio-tile'>
                                                        <FaSchool className='icon'/>
                                                        <span>SCL</span>
                                                    </div>
                                                </div>

                                                <div className="audience">
                                                    <input className='input' type="radio" name="categoryId" value="department" checked={answer === 'department'} onChange={handlePostChange}/>
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
                        </div>

                        <div className="card__footer">
                            <div className="supplies">
                                <img src={date_icon} alt="date_icon" className="date_icon"/>
                                <div className="date_info">
                                    <h5>{date}</h5>
                                    <small>{time}</small>
                                </div>
                            </div>

                            <div className="location">
                                <img src={map_icon} alt="map_icon" className="map_icon"/>
                                <div className="Map_info">
                                    <h5>{loc}</h5>
                                </div>
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

export default PostItem;