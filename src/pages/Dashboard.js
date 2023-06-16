import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from "axios";
import "../styles/Dashboard.css";
import Modal from 'react-modal';

import SideBar from '../components/SideBar';
import HeadIcon from '../components/HeadIcon';
import { PostList } from "../helpers/PostList";
import PostItem from "../helpers/PostItem";
import ip from '../helpers/Config.js';

import { MdEmail, MdAddLocationAlt, MdCall, MdVerified, MdOutlineCreate } from "react-icons/md";
import { BsFillBookmarkPlusFill, BsFillPeopleFill, BsPersonFill } from "react-icons/bs";
import { FaWalking, FaSchool } from "react-icons/fa";
import { RiUploadCloud2Fill } from "react-icons/ri";
import logo from "../assets/logo1.png";
import Student_badge from "../assets/badges/Student_badge.png";
import Staff_badge from "../assets/badges/Staff_badge.png";


function Dashboard() {

    const [Visible, setVisible] = useState(false);

    // Get Current User

    const [name, setName] = useState('');
    const [senderType, setSenderType] = useState('');

	axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3000/api/user')
        .then(res => {
            if(res.data.status === "Success"){
                setName(res.data.user.user);

                if (res.data.user.user.hasOwnProperty('studentId')) {
                    setSenderType ('Student');
                } else {
                    setSenderType ('Staff');
                }
            }
            else{
                setName("Something went wrong");
            } 
        })
    }, []);


    
    // Get Student Post

    const [letter, setLetter] = useState([]);

    useEffect(() => {
        ip.get(`/api/staff/viewPost?depName=${name.depName}`)
        .then(res => {setLetter(res.data);})
        .catch(err => console.log(err));
    }, [name.depName]);



    // Get MyPost

    const [myPost, SetMyPost] = useState([]);

    useEffect(() => {
        ip.get(`/api/staff/myPost?staffId=${name.staffId}`)
        .then(res => {SetMyPost(res.data);})
        .catch(err => 
            console.log("there is something wrong in get MyPost")
        );
    }, [name.staffId]);


    // Get Department

    const [depts, setDepts] = useState([]);

    useEffect(() => { 
        ip.get('/api/student/getDep')
        .then(response => setDepts(response.data))
        .catch(err => console.log(err));
    }, []);



    // Create Post

    const [image, setImage] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        staffId: "",
        categoryId: "",
        eventLocation: "",
    });

    const handlePost = async (event) => {
        event.preventDefault();
        try {
            const updatedFormData = {
                ...formData,
                staffId: name.staffId,
                image: image,
            };

            const response = await ip.post("/api/staff/post", updatedFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            
            setFormData({});
            setImage("");

            console.log(response.data);
            setVisible(false);
        } catch (error) {
            console.log(error.response.data);
        }
    
    };
    

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });

    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };



    // Upload Image Preview

    const [file, setFile] = useState();

    function getFile(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
    }


    const twoFunctions = (e) => {
        getFile(e);
        handleImageChange(e);
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
                        <MdOutlineCreate className='icon'/>
                    </button>


                {/* Modal Body */}

                    <Modal isOpen={Visible} className='create-modal' style={{overlay: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',}}}>


                        <img src={logo} alt='Astu-logo' className='logo'/>

                        <form className='publish-form' onSubmit={handlePost}>
                            <div className="publish-box">
                                <label htmlFor="title">Title</label>
                                <input className="inputs" type='text' name="title" placeholder="Place Your title here" onChange={handleInputChange} />
                            </div>

                            <div className="publish-box">
                                <label htmlFor="eventLocation">Location</label>
                                <input className="inputs" type='text' name="eventLocation" placeholder="Location" onChange={handleInputChange} />
                            </div>

                            <div className="publish-box">
                                <label htmlFor="content">Description</label>
                                <textarea name="content" placeholder="Enter Description" onChange={handleInputChange} required></textarea>
                            </div>

                            {/* -- Upload Button -- */}

                            <div className="publish-box">
                                <input className="inputs" type="file" id="image" accept='image/*' onChange={twoFunctions} />
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
                                <select id="depId" name="depId" required>
                                    <option hidden>Department</option>
                                    {/* <option>Computer Science</option>
                                    <option>Mechanical Engineering</option>
                                    <option>Civil Engineering</option> */}
                                    {depts.map((Depart, i) => (
                                        <option key={i} value={Depart.depId}>{Depart.name}</option>
                                        )
                                    )}
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

                {/* -- Field One -- */}
                
                <div className='field-one'>

                    <div className='profile'>
                        <img src="https://images.unsplash.com/photo-1545703549-7bdb1d01b734?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ" alt="account-bgr" className="bgr"/>

                        <div className="detail">
                            <img src="https://i.pinimg.com/564x/bf/d6/b5/bfd6b5ead3e81c7d0ff530a2a6c98de3.jpg" alt="user-img" className="user-img"/>

                            <div className='left'>

                                {senderType === 'Student' ? (
                                <>
                                    <div className="big">{name.fullname}<MdVerified className='verified-student'/></div>
                                    <img src={Student_badge} alt="role" className="role"/>
                                    <div className="small">{name.Name}</div>
                                </>
                                ):(
                                <>
                                    <div className="big">{name.fullname}<MdVerified className='verified-staff'/></div>
                                    <img src={Staff_badge} alt="role" className="role"/>
                                </>
                                )}

                                {/* <div className="small">Computer Science</div> */}

                            </div>

                            <Link to="/profile" className='edit-btn'>Edit Profile</Link>
                            
                        </div>

                    </div>


                    <div className='posts'>
                        <div className='post-nav'>
                            <button className={`button ${activeTab === null ? 'active' : ''}`} onClick={() => handleClick(null)}>Feed</button>
                            {senderType === 'Student' ? (
                            <>
                                <button className={`button ${activeTab === 1 ? 'active' : ''}`} onClick={() => handleClick(1)}>Personalized</button>
                            </>
                            ):(
                                <button className={`button ${activeTab === 2 ? 'active' : ''}`} onClick={() => handleClick(2)}>My Posts</button>
                            )}
                            
                        </div>


                    {/* ==== SPECIFIC CONTENT ==== */}

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
                                        day={Item.day}
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
                        {myPost.length > 0 ? (
                            <div className='post-list'>

                            {letter.map((item, i) => (
                                    <PostItem
                                        key={i}

                                        user_name={item.staffName}
                                        loc={item.eventLocation}
                                        desc={item.content}
                                        title={item.title}
                                    />
                                )
                            )}

                            </div>
                        ) : (
                            <div className='post-list'>
                                <p className='no-post'>There is no post yet ..</p>
                            </div>
                        )}
                    </>
                    )}


                    {activeTab === 2 && (
                    <>
                        {myPost.length > 0 ? (
                            <div className='post-list'>
                                {myPost.map((item, i) => {
                                    
                                const postDate = new Date(item.createdAt);
                                const formattedDate = postDate.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit',});
                                const formattedTime = postDate.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit', hour12: true,});

                                return (
                                    <PostItem
                                    key={i}
                                    user_name={item.staffName}
                                    loc={item.eventLocation}
                                    desc={item.content}
                                    title={item.title}
                                    day={formattedDate}
                                    time={formattedTime}
                                    postId={item.postId}
                                    />
                                );
                                })}
                            </div>
                        ) : (
                            <div className='post-list'>
                                <p className='no-post'>You have not posted yet</p>
                            </div>
                        )}
                    </>
                    )}







                    </div>
                </div>
                <div className='field-two'>

                    <div className='about'>
                        <p>About</p>
                        <div className='entry'><MdEmail className='icon'/>{name.email}</div>
                        <div className='entry'><BsPersonFill className='icon'/>{senderType}</div>
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