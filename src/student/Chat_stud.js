import React, { useState, useEffect } from 'react';
import axios from "axios";

import "../styles/Chat_stud.css";

import SideBar_Stud from '../components/SideBar_Stud';
import HeadIcon_stud from '../components/HeadIcon_stud'; 
import { IoSend } from "react-icons/io5";
import { RxChevronLeft } from "react-icons/rx"

  function Chat_stud() {
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

    const [chats, setChats] = useState([]);
    const [message, setMessage] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [activeChatID, setActiveChatID] = useState(null);
    const [newChatTopic, setNewChatTopic] = useState("");

    useEffect(() => {
      axios.get('http://localhost:3000/api/student/getchat')
        .then(res => setChats(res.data))
        .catch(err => console.log(err));
    }, []);

    useEffect(() => {
      if (activeChatID) {
        axios.get(`http://localhost:3000/api/student/getconv?chatId=${activeChatID}`)
          .then(res => setMessage(res.data))
          .catch(err => console.log(err));
      }
    }, [activeChatID]);

    const handleChatClick = (chat) => {
      setActiveChat(chat);
      handleClickDiv1();
    }

      const handleCreateChat = (e) => {
        e.preventDefault();
        const payload = {
          topic: newChatTopic,
          categoryId: "8",
          creatorType: "Staff",
          creatorId: "5",
          restrictedMode: "0"
        };
      axios.post('http://localhost:3000/api/student/chat', payload)
          .then(res => {
            setChats([...chats, res.data]);
            setNewChatTopic("");
          })
          .catch(err => console.log(err));
      }

      return (
        <div className="user-home">
          <SideBar_Stud />

          <div className="chat-box">
            <div className="row">
              <section className="discussions" style={{ zIndex: zIndex1 }}>
                <div className="search">
                  <div className="searchbar">
                    <input type="text" placeholder="Search..." />
                  </div>
                </div>

                <div className="scroll-discussions">
                  {chats.map((chat, index) => (
                    <div key={index}>
                      <div
                        className={`discussion ${activeChat === chat.chatId ? 'message-active' : ''}`}
                        onClick={() => { handleChatClick(chat.chatId); setActiveChatID(chat.chatId); }}
                      >
                        <div className="photo" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)' }}></div>
                        <div className="desc-contact">
                          <p className="name">{chat.topic}</p>
                          <p className="desc">Description of the chat here...</p>
                        </div>
                        <div className="timer">{chat.chatId}</div>
                      </div>
                    </div>
                  ))}

                  <form className="discussion" onSubmit={handleCreateChat}>
                    <input
                      type="text"
                      placeholder="Enter new chat topic"
                      value={newChatTopic}
                      onChange={e => setNewChatTopic(e.target.value)}
                      required
                    />
                    <button type="submit">Create Chat</button>
                  </form>
                </div>
              </section>

              {activeChat === activeChatID ? (
                <>
                  <section className="chat" style={{ zIndex: zIndex2 }}>
                    <div className="header-chat">
                      <RxChevronLeft className="icon" onClick={handleClickDiv2} />
                      <p className="name">{activeChatID}</p>
                    </div>

                    <div className="messages-chat">
                      {message.map((messages, i) => (
                        <div key={i}>
                          <div className="message-container">
                            <div className="message">
                              <div className="photo" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1553514029-1318c9127859?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80)' }}></div>
                              <div className="text">
                                <div className="name-text">{messages.from}</div>
                                <div className="focus-text">{messages.message}</div>
                              </div>
                            </div>
                            <p className="time">15h09</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="footer-chat">
                      <input type="text" className="write-message" placeholder="Type your message here"></input>
                      <button className="send_button"><IoSend className="icon" /></button>
                    </div>

                    //head icon 
                    <HeadIcon_stud/>

                    
                  </section>
                </>
              ) : (
                <>
                  <section className="chat">
                    <div className="header-chat">
                      <i className="icon fa fa-user-o" aria-hidden="true"></i>
                      <p className="name"> </p>
                      <i className="icon clickable fa fa-ellipsis-h right" aria-hidden="true"></i>
                    </div>

                    <div className="messages-null">
                      <p className="null">Select a chat to start messaging...</p>
                    </div>

                    <div className="footer-chat">
                      <input type="text" className="write-message" placeholder="Type your message here"></input>
                      <button className="send_button"><IoSend className="icon" /></button>
                    </div>
                  </section>
                </>
              )}
              
            </div>

            
          </div>
          
        </div>
      );
  }

export default Chat_stud;
