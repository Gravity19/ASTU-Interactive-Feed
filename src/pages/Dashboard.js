import React from 'react';
import {useState} from 'react';
import "../styles/Dashboard.css";
import Modal from 'react-modal';    // import modal

import SideBar from '../components/SideBar';      //SideBar
import HeadIcon from '../components/HeadIcon';      //HeadIcon
import { PostList } from "../helpers/PostList";
import PostItem from "../helpers/PostItem";

import { BsFillBookmarkPlusFill, BsFillPeopleFill } from "react-icons/bs";       //plus icon
import { FaWalking, FaSchool } from "react-icons/fa";                  //Book icon

import { RiAddCircleFill, RiUploadCloud2Fill } from "react-icons/ri";                  //plus icon


function Dashboard() {

    // Modal Functionality

    const [Visible, setVisible] = useState(false);


    // Radio Button Functionality

    const [answer, setAnswer] = useState('');

    const handlePostChange = (e) => {
        const selectedAnswer = e.target.value;              // Make the value of the button the Selected Answer 
        setAnswer(selectedAnswer);
    };

    // Upload Image Preview

    const [file, setFile] = useState();

    function getFile(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
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
                        background: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',}}}>
                            

                        <p>Modal Body</p>

                        <form className='publish-form'>
                            <div className="publish-box">
                                <label htmlFor="title">Title</label>
                                <input type="text" name="title" id="title" placeholder="Place Your title here" required />
                            </div>

                            <div className="publish-box">
                                <label htmlFor="body">Description</label>
                                <textarea className="input" placeholder="Enter Description" required></textarea>
                            </div>

                        {/* -- Upload Button -- */}
                            <div className="publish-box">
                                <input type="file" id="image" accept='image/*' onChange={getFile} />
                                <label htmlFor="image" className='upload'><RiUploadCloud2Fill className='icon'/>Upload Image</label>
                                {/* <img src={file} alt="No Photo Uploaded" className='image'/> */}

                                {file ? (
                                    <img src={file} alt="Uploaded Photo" className="image" />
                                ) : (
                                    <img src="" alt="No Photo Uploaded" style={{ display: "none" }} />
                                )}
                            </div>


                        {/* -- Radio Button -- */}

                            <div className='publish-radio'>
                                <div className="publish-to">
                                    <div className="audience">
                                        <input className='input' type="radio" id="all" name="audience" value="all" checked={answer === 'all'}  onChange={handlePostChange}/>
                                        <div className='Radio-tile'>
                                            <BsFillPeopleFill className='icon'/>
                                            <span>ALL</span>
                                        </div>
                                    </div>  
                                    
                                    <div className="audience">
                                        <input className='input' type="radio" id="school" name="audience" value="school" checked={answer === 'school'} onChange={handlePostChange}/>                                    
                                        <div className='Radio-tile'>
                                            <FaSchool className='icon'/>
                                            <span>SCL</span>
                                        </div>
                                    </div>

                                    <div className="audience">
                                        <input type="radio" id="department" name="audience" value="department" checked={answer === 'department'} onChange={handlePostChange}/>
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

                        </form>

                        <div className='bottom-btn'>
                            <button className='publish'>Publish<BsFillBookmarkPlusFill/></button>
                            <button className='close-modal' onClick={()=>setVisible(false)}> Cancel</button>
                        </div>

                    </Modal>

                </div>

                
                <div className='field-one'>
                    <div className='post'>

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
                </div>
                <div className='field-two'></div>


                
                {/* Head Icon */}

                <HeadIcon/>


            </div>
        </div>
    );
}

export default Dashboard;