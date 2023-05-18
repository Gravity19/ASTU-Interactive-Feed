import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from "axios";

import "../styles/Dashboard.css";
import Modal from 'react-modal';    // import modal

import SideBar from '../components/SideBar';      //SideBar
import HeadIcon from '../components/HeadIcon';      //HeadIcon
import { PostList } from "../helpers/PostList";
import PostItem from "../helpers/PostItem";

import { BsFillBookmarkPlusFill, BsFillPeopleFill } from "react-icons/bs";       //plus icon
import { FaWalking, FaSchool } from "react-icons/fa";                  //Book icon

import { RiAddCircleFill, RiUploadCloud2Fill } from "react-icons/ri";                  //plus icon
import logo from "../assets/logo1.png";


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


    const twoFunctions = (e) => {                       // Merging Two Functions together
        getFile(e);
        handleInputChange(e);
    }



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
                                <input type='text' name="staffId" placeholder="Place Your title here" onChange={handleInputChange} />
                            </div>

                            <div className="publish-box">
                                <label htmlFor="content">Description</label>
                                <textarea className="input"  name="content" placeholder="Enter Description" onChange={handleInputChange} required></textarea>
                            </div>

                        {/* -- Upload Button -- */}

                            <div className="publish-box">
                                <input type="file" id="image" accept='image/*' onChange={getFile} />
                                <label htmlFor="image" className='upload'><RiUploadCloud2Fill className='icon'/>Upload Image</label>

                                {file && (
                                    <img src={file} alt="Uploaded-Photo" className="image" />
                                )}
                            </div>


                        {/* -- Radio Button -- */}

                            <div className='publish-radio'>
                                <div className="publish-to">
                                    <div className="audience">
                                        <input className='input' type="radio" name='categoryId' value="1" checked={answer === '1'} onChange={DosFunctions} />
                                        <div className='Radio-tile'>
                                            <BsFillPeopleFill className='icon'/>
                                            <span>ALL</span>
                                        </div>
                                    </div>  
                                    
                                    <div className="audience">
                                        <input className='input' type="radio" name="categoryId"  value="school" checked={answer === 'school'} onChange={DosFunctions}/>                                    
                                        <div className='Radio-tile'>
                                            <FaSchool className='icon'/>
                                            <span>SCL</span>
                                        </div>
                                    </div>

                                    <div className="audience">
                                        <input className='input' type="radio" name="categoryId" value="department" checked={answer === 'department'} onChange={DosFunctions}/>
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
                                <button className='publish'>Publish<BsFillBookmarkPlusFill/></button>
                                <button className='close-modal' onClick={()=>setVisible(false)}> Cancel</button>
                            </div>

                        </form>

                    </Modal>

                </div>

                
                <div className='field-one'>
                    <div className='posts'>

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
                {/* <div className='field-two'></div> */}


                
                {/* Head Icon */}

                <HeadIcon/>


            </div>
        </div>
    );
}

export default Dashboard;