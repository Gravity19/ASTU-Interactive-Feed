import React from 'react';
import {useState} from 'react';
import "../styles/Dashboard.css";
import Modal from 'react-modal';    // import modal

import SideBar from '../components/SideBar';      //SideBar
import HeadIcon from '../components/HeadIcon';      //HeadIcon
import { PostList } from "../helpers/PostList";
import PostItem from "../helpers/PostItem";

import { BsFillBookmarkPlusFill } from "react-icons/bs";       //plus icon


function Dashboard() {

    // Modal Functionality
    const [Visible, setVisible] = useState(false);

    return (
        <div>
            <SideBar />
            <div className='Dashboard'>

                <div className='Dashboard-nav'>
                    <button className='create-btn' onClick={()=>setVisible(true)}>
                        <p>Create Post</p>
                        <BsFillBookmarkPlusFill/>
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

                            {/* Radio Button here All/School/Department */}

                            <select id="depId" name="depId"   required>
                                <option hidden>Department</option>
                                <option>Computer Science</option>
                                <option>Mechanical Engineering</option>
                                <option>Civil Engineering</option>
                            </select>

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