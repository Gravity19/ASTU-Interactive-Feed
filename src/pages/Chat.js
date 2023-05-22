import React from 'react';
import { useState, useEffect } from 'react';        //Api Fetching
import axios from "axios";

import "../styles/Chat.css";

import SideBar from '../components/SideBar';      //SideBar
import send_icon from "../assets/icons2/bx-send.png";       //send icon
import { IoSend } from "react-icons/io5";  


function Chat() {


    // View Chat API

    const [chats, setChats] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/student/getchat')
        .then(res => {setChats(res.data)})
        .catch(err => console.log(err));
    }, []);


    // View Chat API

    const [message, setMessage] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/student/getconv?chatId=1')
        .then(res => {setMessage(res.data)})
        .catch(err => console.log(err));
    }, []);



    // Active Click Chat

    const [activeChat, setActiveChat] = useState(null);
    const [activeChatID, setActiveChatID] = useState(null);

    const handleChatClick = (chat) => {
        setActiveChat(chat);

        // setActiveChatID(chat.chatId);  or put onClick={()=> setActiveChatID(chat.chatId)} on there (that makes it 2 onClicks)
    }

    return (
        <div className="user-home">
            
            <SideBar />


        {/* Home Section */}
            <div class="profile-section">
                <div class="text"></div>
            </div>



            {/* Discussion Section */}

            <div class="chat-box">
                <div class="row">

                    <section class="discussions">
                        <div class="search">
                            <div class="searchbar">
                                {/* <i class="fa fa-search" aria-hidden="true"></i> */}
                                <input type="text" placeholder="Search..."></input>
                            </div>
                        </div>
            
            {/* Discussion Scrollable-Box */}

                        <div className='scroll-discussions'>

        {/* Discussion-Box from Database */}
                            
                    {chats.map((chat, index) => (
                        <div key={index}>

                            <div className={`discussion ${activeChat === chat.chatId ? 'message-active' : ''}`} onClick={()=>{handleChatClick(chat.chatId); setActiveChatID(chat.chatId);}}>
                            
                                <div className="photo" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)'}}></div>
                                <div className="desc-contact">
                                    <p className="name">{chat.topic}</p>
                                    <p className="message">Let's meet for a coffee CSS word-wrap property is used to break the long words.</p>
                                </div>
                                <div className="timer">{chat.chatId}</div>
                            </div>

                        </div>
                    ))}


        {/* Discussion-Box from Database -END */}


                            <div className={`discussion ${activeChat === 5 ? 'message-active' : ''}`} onClick={() => handleChatClick(5)}>
                            
                                <div class="photo" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)'}}>
                                    <div class="online"></div>
                                </div>
                                <div class="desc-contact">
                                    <p class="name">Campus Group</p>
                                    <p class="message">Let's meet for a coffee CSS word-wrap property is used to break the long words.</p>
                                </div>
                                <div class="timer">12 sec</div>
                            </div>

                            <div className={`discussion ${activeChat === 12 ? 'message-active' : ''}`} onClick={() => handleChatClick(12)}>
                                <div class="photo" style={{backgroundImage: 'url(https://i.pinimg.com/originals/a9/26/52/a926525d966c9479c18d3b4f8e64b434.jpg)'}}>
                                    <div class="online"></div>
                                </div>
                                <div class="desc-contact">
                                    <p class="name">School Board Meeting</p>
                                    <p class="message">The students council needs a change</p>
                                </div>
                                <div class="timer">3 min</div>
                            </div>

                        </div>
                        
                    </section>




        {/* CHAT-Box Database */}

        
                {activeChat === activeChatID ? (
                <>
                    <section class="chat">
                        <div class="header-chat">
                            <p class="name">{activeChatID}</p>
                        </div>

                        
                        <div class="messages-chat"> 
                        {message.map((messages, i) => (
                        <div key={i}>

                            <div class="message-container">
                                <div class="message">
                                    <div class="photo" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1553514029-1318c9127859?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80)'}}></div>
                                    <div class="text">
                                        <div className='name-text'>{messages.from}</div>
                                        <div className='focus-text'>{messages.message}</div>
                                    </div>
                                </div>
                                <p class="time"> 15h09</p>
                            </div>
                        </div>
                        ))}
                            
                        </div>


                        <div class="footer-chat">
                            <input type="text" className="write-message" placeholder="Type your message here"></input>
                            <button className='send_button'><IoSend className="icon"/></button>
                        </div>

                    </section>
                </>

                ) : (

                <>
                    <section class="chat">
                        <div class="header-chat">
                            <i class="icon fa fa-user-o" aria-hidden="true"></i>
                            <p class="name"> </p>
                            <i class="icon clickable fa fa-ellipsis-h right" aria-hidden="true"></i>
                        </div>

                        <div class="messages-null"> 
                            <p class="null"> Select a chat to start messaging ... </p>
                        </div>

                        <div class="footer-chat">
                            <input type="text" className="write-message" placeholder="Type your message here"></input>
                            <button className='send_button'><IoSend className="icon"/></button>
                        </div>

                    </section>
                </>
                )}


        {/* CHAT-Box Database END */}









        {/* CHAT-Box */}

        {/* {activeChat === null && (
            <>
                    <section class="chat">
                        <div class="header-chat">
                            <i class="icon fa fa-user-o" aria-hidden="true"></i>
                            <p class="name"> </p>
                            <i class="icon clickable fa fa-ellipsis-h right" aria-hidden="true"></i>
                        </div>

                        <div class="messages-null"> 
                            <p class="null"> Select a chat to start messaging ... </p>
                        </div>

                        <div class="footer-chat">
                            <input type="text" className="write-message" placeholder="Type your message here"></input>
                            <button className='send_button'><IoSend className="icon"/></button>
                        </div>

                    </section>
                            
                            
            </>
            )} */}

        

        {/* CHAT-Box */}

            {activeChat === 5 && (
            <>
                    <section class="chat">
                        <div class="header-chat">
                            <i class="icon fa fa-user-o" aria-hidden="true"></i>
                            <p class="name">Campus Group</p>
                            <i class="icon clickable fa fa-ellipsis-h right" aria-hidden="true"></i>
                        </div>

                        <div class="messages-chat"> 

                            <div class="message-container">
                                <div class="message">
                                    <div class="photo" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)'}}>
                                    <div class="online"></div>
                                    </div>
                                    <div class="text">
                                        <div className='name-text'>Beth Ruth</div>
                                        <div className='focus-text'>
                                            Hi, how are you ?
                                        </div>
                                    </div>
                                </div>
                                <p class="time"> 14h58</p>
                            </div>
                        
                            <div class="message-container-right">
                                <div class="message text-only">
                                    <div class="response">
                                    <p class="text"> When can we meet ?</p>
                                    </div>
                                </div>
                                <div class="response-time"> 15h04</div>
                            </div>

                        </div>

                        <div class="footer-chat">
                            <input type="text" className="write-message" placeholder="Type your message here"></input>
                            <button className='send_button'><IoSend className="icon"/></button>
                        </div>

                    </section>
                            
                            
            </>
            )}

        
        {/* CHAT 2 */}

            {activeChat === 12 && (
                <>

                    <section class="chat">
                        <div class="header-chat">
                            <i class="icon fa fa-user-o" aria-hidden="true"></i>
                            <p class="name">School Board Meeting</p>
                            <i class="icon clickable fa fa-ellipsis-h right" aria-hidden="true"></i>
                        </div>

                        <div class="messages-chat"> 
                            <div class="message-container">
                                <div class="message">
                                    <div class="photo" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1553514029-1318c9127859?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80)'}}>
                                        <div class="online"></div>
                                    </div>
                                    <div class="text">
                                        <div className='name-text'>Dagi Tamene</div>
                                        <div className='focus-text'>
                                            ADD is the term commonly used to describe symptoms of inattention,distractibility.
                                            ADHD is the term used to describe  . 9 pm at the bar if possible 😳
                                        </div>
                                    </div>
                                </div>
                                <p class="time"> 15h09</p>
                            </div>
                            
                        </div>

                        <div class="footer-chat">
                            <input type="text" className="write-message" placeholder="Type your message here"></input>
                            <button className='send_button'><IoSend className="icon"/></button>
                        </div>

                    </section>

            </>
            )}

                </div>
            </div>



        </div>
    );
}

export default Chat;
