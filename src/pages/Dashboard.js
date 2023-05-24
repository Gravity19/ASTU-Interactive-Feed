import React from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";

import "../styles/Dashboard.css";
import Modal from 'react-modal';    // import modal

import SideBar from '../components/SideBar';      //SideBar
import HeadIcon from '../components/HeadIcon';      //HeadIcon
import { PostList } from "../helpers/PostList";
import PostItem from "../helpers/PostItem";


import { MdEmail, MdAddLocationAlt, MdCall } from "react-icons/md";
import { BsFillBookmarkPlusFill, BsFillPeopleFill, BsPersonFill } from "react-icons/bs";
import { FaWalking, FaSchool } from "react-icons/fa";                  //walking + School icon
import { RiAddCircleFill, RiUploadCloud2Fill } from "react-icons/ri";                  //upload + Add icon 
import logo from "../assets/logo1.png";
import teacher_badge from "../assets/badges/Teacher_badge.png";      //Teacher Badge


function Dashboard() {

    // Modal Functionality

    const [Visible, setVisible] = useState(false);


    // Create Post


    const [formData, setFormData] = useState({
        content: "",
        staffId: "",
        categoryId: "",
        // rsvp: "",
    });
    
    const handlePost = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/staff/post", formData);
            console.log(response.data);     // handle response data here
            
        }    
        catch (error) {
          console.log(error.response.data); // handle error here
        }

        setVisible(false);
    };
    

    // -------

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });

    };



    // Upload Image Preview

    const [file, setFile] = useState();

    function getFile(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
    }


    // const twoFunctions = (e) => {
    //     getFile(e);
    //     handleInputChange(e);
    // }



    // Radio Button Functionality

    const [answer, setAnswer] = useState('');

    const handlePostChange = (e) => {
        const selectedAnswer = e.target.value;              // Make the value of the button the Selected Answer 
        setAnswer(selectedAnswer);
    };


    const DosFunctions = (e) => { 
        handleInputChange(e);
        handlePostChange(e);
        
    }

    // Handle Active Tab

    const [activeTab, setActiveTab] = useState(null);

    const handleClick = (tab) => {
        setActiveTab(tab);
    }


    return (
        <div>
            <SideBar />
            <div className='Dashboard'>

                <div className='Dashboard-nav'>
                    <button className='create-btn' onClick={()=>setVisible(true)}>
                        <p>Create Post</p>
                        <RiAddCircleFill className='icon'/>
                    </button>


                {/* Modal Body */}

                    <Modal isOpen={Visible} className='create-modal' style={{overlay: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',}}}>


                        <img src={logo} alt='Astu-logo' className='logo'/>

                        <form className='publish-form' onSubmit={handlePost}>
                            <div className="publish-box">
                                <label htmlFor="staffId">Title</label>
                                <input className="inputs" type='text' name="staffId" placeholder="Place Your title here" onChange={handleInputChange} />
                            </div>

                            <div className="publish-box">
                                <label htmlFor="content">Description</label>
                                <textarea name="content" placeholder="Enter Description" onChange={handleInputChange} required></textarea>
                            </div>

                        {/* -- Upload Button -- */}

                            <div className="publish-box">
                                <input className="inputs" type="file" id="image" accept='image/*' onChange={getFile} />
                                <label htmlFor="image" className='upload'><RiUploadCloud2Fill className='icon'/>Upload Image</label>

                                {file && (
                                    <img src={file} alt="Uploaded" className="image" />
                                )}
                            </div>


                        {/* -- Radio Button -- */}

                            <div className='publish-radio'>
                                <div className="publish-to">
                                    <div className="audience">
                                        <input className='inputs' type="radio" name='categoryId' value="1" checked={answer === '1'} onChange={DosFunctions} />
                                        <div className='Radio-tile'>
                                            <BsFillPeopleFill className='icon'/>
                                            <span>ALL</span>
                                        </div>
                                    </div>  
                                    
                                    <div className="audience">
                                        <input className='inputs' type="radio" name="categoryId"  value="school" checked={answer === 'school'} onChange={DosFunctions}/>                                    
                                        <div className='Radio-tile'>
                                            <FaSchool className='icon'/>
                                            <span>SCL</span>
                                        </div>
                                    </div>

                                    <div className="audience">
                                        <input className='inputs' type="radio" name="categoryId" value="department" checked={answer === 'department'} onChange={DosFunctions}/>
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


                        {/* -- Switch RSVP -- */}

                            <div className='switch-box'>
                                <span>RSVP</span>
                                <input className="switch" type="checkbox"/>
                            </div>


                    {/* -- Radio-Button Ends -- */}

                            <div className='bottom-btn'>
                                <button className='publish'>Publish<BsFillBookmarkPlusFill/></button>
                                <button className='close-modal' onClick={()=>setVisible(false)}> Cancel</button>
                            </div>

                        </form>

                    </Modal>

                </div>

                
                <div className='field-one'>

                    <div className='profile'>
                        <img src="https://images.unsplash.com/photo-1545703549-7bdb1d01b734?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ" alt="account-bgr" className="bgr"/>

                        <div className="detail">
                            <img src="https://i.pinimg.com/564x/bf/d6/b5/bfd6b5ead3e81c7d0ff530a2a6c98de3.jpg" alt="user-img" className="user-img"/>

                            <div className='left'>
                                <div className="big">Yabets Urgo</div>
                                <img src={teacher_badge} alt="role" className="role"/>
                                <div className="small">Computer Science</div>
                                <div className="small"><RiAddCircleFill className='icon' /> ASTU, Adama</div>
                            </div>

                            <Link to="/profile" className='edit-btn'>Edit Profile</Link>
                            
                        </div>

                    </div>


                    <div className='posts'>
                        <div className='post-nav'>
                            <button className={`button ${activeTab === null ? 'active' : ''}`} onClick={() => handleClick(null)}>Feed</button>
                            <button className={`button ${activeTab === 1 ? 'active' : ''}`} onClick={() => handleClick(1)}>Personalized</button>
                            <button className={`button ${activeTab === 3 ? 'active' : ''}`} onClick={() => handleClick(3)}>School</button>
                        </div>

                    {activeTab === null && (
                    <>
                        <div className='post-list'>

                            {/* POST Custom */}

                            {PostList.map((Item, keys) => {
                                return (
                                    <PostItem
                                        key={keys}
                                        
                                        user_name={Item.user_name}
                                        user_image={Item.user_image}
                                        user_badge={Item.user_badge}
                                        card_image={Item.card_image}
                                        tag= {Item.tag}
                                        title= {Item.title}
                                        desc= {Item.desc}
                                        time={Item.time}
                                        date={Item.date}
                                        loc={Item.loc}
                                    />
                                );
                            })}

                            <PostItem/>

                        </div>
                    </>
                    )}

                    
                    {activeTab === 1 && (
                    <>
                        <div className='post-list'>

                            {/* POST Custom */}

                            {PostList.map((Item, keys) => {
                                return (
                                    <PostItem
                                        key={keys}
                                        
                                        user_name={Item.user_name}
                                        user_image={Item.user_image}
                                        user_badge={Item.user_badge}
                                        card_image={Item.card_image}
                                        tag= {Item.tag}
                                        title= {Item.title}
                                        desc= {Item.desc}
                                        time={Item.time}
                                        date={Item.date}
                                        loc={Item.loc}
                                    />
                                );
                            })}

                            <PostItem/>

                        </div>
                    </>
                    )}


                    </div>
                </div>
                <div className='field-two'>

                    <div className='about'>
                        <p>About</p>
                        <div className='entry'><MdEmail className='icon'/>YabetsUrgo@gmail.com</div>
                        <div className='entry'><BsPersonFill className='icon'/>Teacher</div>
                        <div className='entry'><MdCall className='icon'/>+251-953-6459-08</div>
                        <div className='entry'><MdAddLocationAlt className='icon'/>Ethiopia, Addis Abeba</div>
                    </div>

                </div>


                
                {/* Head Icon */}

                <HeadIcon/>


            </div>
        </div>
    );
}

export default Dashboard;