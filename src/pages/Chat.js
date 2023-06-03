import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import "../styles/Chat.css";
import ip from '../helpers/Config.js';
import SideBar from '../components/SideBar';

import { IoSend, IoSearch } from "react-icons/io5"; 
import { RxChevronLeft } from "react-icons/rx"
import { MdPostAdd } from "react-icons/md";


function Chat() {

    //Update Pop-Up Functionality

    const [create, setCreate]=useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setCreate(false);
            }
        };
    
        document.addEventListener('mousedown', handleOutsideClick);
    
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
    

    // Get Current User

    const [name, setName] = useState('');
    const [senderType, setSenderType] = useState('');

	axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3000/api/user')
        .then(res => {
            if(res.data.status === "Success"){
                setName(res.data.user.user);

                if (res.data.user.user.hasOwnProperty('studentId')) {   // sender type declaration
                    setSenderType ('student');
                } else {
                    setSenderType ('staff');
                }
            }
            else{
                setName("Something went wrong");
            } 
        })
    }, []);



    // send message

    const [messages, setMessages] = useState('');

    const sendMessage = async () => {
        const type= senderType;
        const userId = name.studentId;
        const chatId = activeChatID;
        const message = messages;
        try {
        const data = {message: message, userId: userId, senderType: type, chatId: chatId};

        const response = await axios.post('http://localhost:3000/api/student/conv', data);
        console.log(response.data);
        setMessages('');        // clear input field
        } catch (error) {
            console.error(error);
        }
    };

    const handleMessageChange = (event) => {
        setMessages(event.target.value);
    };



    // conversation to Chat change 

    const [zIndex1, setZIndex1] = useState(1);
    const [zIndex2, setZIndex2] = useState(0);

    const handleClickDiv1 = () => {
        setZIndex2(2);
        setZIndex1(1);
    };

    const handleClickDiv2 = () => {
        setZIndex1(2);
        setZIndex2(1);
    };


    // View Chat API

    const [chats, setChats] = useState([]);

    useEffect(() => {
        ip.get('/api/student/getchat')
        .then(res => {setChats(res.data)})
        .catch(err => console.log(err));
    }, []);



    // View Convo API

    const [message, setMessage] = useState([]);
    const [chatId, setChatId] = useState(null);
    const [topic, setTopic] = useState([]);

    useEffect(() => {
        ip.get(`/api/student/getconv?chatId=${chatId}`)
        .then(res => {setMessage(res.data);})
        .catch(err => console.log(err));
    }, [chatId]);

    
    const handleChatBtn = (newChatId) => {      // Function to handle changing chatId
        setChatId(newChatId);
    };



    // Active Click Chat

    const [activeChat, setActiveChat] = useState('0');
    const [activeChatID, setActiveChatID] = useState(null);

    const handleChatClick = (chat) => {
        setActiveChat(chat);
        // setConversation(false);
        handleClickDiv1();
    }

    return (
        <div className="user-home">
            
            <SideBar />


            {/* ======= Discussion Section ====== */}

            <div class="chat-box">
                <div class="row">

                    <section class="discussions" style={{ zIndex: zIndex1 }}>
                        <div class="top-bar">
                            <div class="searchbar">
                                <IoSearch className='icon'/>
                                <input type="text" placeholder="Search..." className='input-me'></input>
                            </div>
                            <div class="options">
                                <MdPostAdd className='icon' onClick={()=> setCreate(!create)}/>

                                {create && (
                                    <div className='add-chat' ref={dropdownRef}>
                                        <p>Create Chat</p>
                                        <input type="text" placeholder="Topic"></input>
                                        <select name="type" id="type">
                                            <option hidden>Participants</option>
                                            <option value="group">All</option>
                                            <option value="group">Student</option>
                                            <option value="individual">Staff</option>
                                        </select>
                                        <button>Create</button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='scroll-discussions'>
                            
                        {chats.map((chat, index) => (
                        <div key={index}>

                            <div className={`discussion ${activeChat === chat.chatId ? 'message-active' : ''}`}
                                    onClick={(event) => {
                                        handleChatClick(chat.chatId);
                                        setActiveChatID(chat.chatId);
                                        handleChatBtn(chat.chatId);
                                        setTopic(chat.topic);
                                        event.stopPropagation(); // To prevent event bubbling
                                    }}
                                    >
                            
                                <div className="photo" style={{backgroundImage: 'url(https://i.pinimg.com/564x/0f/91/5a/0f915a0565ffb4470a78552eed75ac83.jpg)'}}></div>
                                <div className="desc-contact">
                                    <p className="name">{chat.topic}</p>
                                    <p className="message">Let's meet for a coffee CSS word-wrap property is used to break the long words.</p>
                                </div>
                                <div className="timer">{chat.chatId}</div>
                            </div>

                        </div>
                        ))}


                        </div>
                        
                    </section>



            {/* ====== CHAT SECTION ======= */}


                {activeChat === activeChatID && activeChat !=='0' ? (
                <>
                    <section class="chat" style={{ zIndex: zIndex2 }}>
                        <div class="header-chat">
                            <RxChevronLeft className='icon'  onClick={handleClickDiv2}/>
                            <p class="name">{topic}</p>
                        </div>

                        
                        <div class="messages-chat"> 

                        {message.map((messages, i) => (
                        <div key={i}>

                            {messages.senderType === 'Student' && messages.userid === name.studentId ? (

                            <div class="message-container-right">
                                <div class="message text-only">
                                    <div class="response">
                                    <p class="text">{messages.message}</p>
                                    </div>
                                </div>
                                {/* <div class="response-time"> 15h04</div> */}
                            </div>

                            ) : messages.senderType === 'staff' && messages.userid === name.staffId ? (

                            <div class="message-container-right">
                                <div class="message text-only">
                                    <div class="response">
                                    <p class="text">{messages.message}</p>
                                    </div>
                                </div>
                                {/* <div class="response-time"> 15h04</div> */}
                            </div>

                            ) : (

                            <div class="message-container">
                                <div class="message">
                                    <div class="photo" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1553514029-1318c9127859?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80)'}}></div>
                                    <div class="text">
                                        <div className='name-text'>{messages.from}</div>
                                        <div className='focus-text'>{messages.message}</div>
                                    </div>
                                </div>
                                {/* <p class="time"> 15h09</p> */}
                            </div>

                            )}
                                

                        </div>
                        ))}

                        </div>


                        <div class="footer-chat">
                            <input type="text" className="write-message" placeholder="Type your message here" value={messages} onChange={handleMessageChange}/>
                            <button className='send_button' onClick={sendMessage}><IoSend className="icon"/></button>
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



                </div>
            </div>



        </div>
    );
}

export default Chat;
