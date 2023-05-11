import React from 'react';
import "../styles/Chat.css";
import SideBar from '../components/SideBar';      //SideBar

import send_icon from "../assets/icons2/bx-send.png";       //send icon


function Chat() {

    return (
        <div className="user-home">
            
            <SideBar />


        {/* Home Section */}
            <div class="profile-section">
                <div class="text"></div>
            </div>



            {/* New Chat Section */}

            <div class="chat-box">
                <div class="row">

                    <section class="discussions">
                        <div class="search">
                            <div class="searchbar">
                                {/* <i class="fa fa-search" aria-hidden="true"></i> */}
                                <input type="text" placeholder="Search..."></input>
                            </div>
                        </div>

                {/* Discussion-Box */}

                        <div className='scroll-discussions'>         {/* Scrollable-Box */}

                        <div class="discussion message-active">
                            <div class="photo" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)'}}>
                                <div class="online"></div>
                            </div>
                            <div class="desc-contact">
                                <p class="name">Campus Group</p>
                                <p class="message">Let's meet for a coffee CSS word-wrap property is used to break the long words.</p>
                            </div>
                            <div class="timer">12 sec</div>
                        </div>

                        <div class="discussion">
                            <div class="photo" style={{backgroundImage: 'url(https://i.pinimg.com/originals/a9/26/52/a926525d966c9479c18d3b4f8e64b434.jpg)'}}>
                                <div class="online"></div>
                            </div>
                            <div class="desc-contact">
                                <p class="name">School Board Meeting</p>
                                <p class="message">The students council needs a change</p>
                            </div>
                            <div class="timer">3 min</div>
                        </div>

                        <div class="discussion">
                            <div class="photo" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80)'}}>
                            </div>
                            <div class="desc-contact">
                                <p class="name">Web Design Group</p>
                                <p class="message">I've sent you the annual report</p>
                            </div>
                            <div class="timer">42 min</div>
                        </div>

                        <div class="discussion">
                            <div class="photo" style={{backgroundImage: 'url(https://card.thomasdaubenton.com/img/photo.jpg)'}}>
                                <div class="online"></div>
                            </div>
                            <div class="desc-contact">
                                <p class="name">Debate Club</p>
                                <p class="message">We should shuffle the topics next</p>
                            </div>
                            <div class="timer">2 hour</div>
                        </div>

                        <div class="discussion">
                            <div class="photo" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1553514029-1318c9127859?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80)'}}>
                            </div>
                            <div class="desc-contact">
                                <p class="name">5th Year NLP Class</p>
                                <p class="message">The question on table 5,8 is not clear</p>
                            </div>
                            <div class="timer">1 day</div>
                        </div>

                        <div class="discussion">
                            <div class="photo" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1541747157478-3222166cf342?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=967&q=80)'}}>
                            </div>
                            <div class="desc-contact">
                                <p class="name">Graduation Talk</p>
                                <p class="message">when was it, Ahahah 😂</p>
                            </div>
                            <div class="timer">2 days</div>
                        </div>

                        <div class="discussion">
                            <div class="photo" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1435348773030-a1d74f568bc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80)'}}>
                                <div class="online"></div>
                            </div>
                            <div class="desc-contact">
                                <p class="name">5th Year - Section 5</p>
                                <p class="message">You can't see me</p>
                            </div>
                            <div class="timer">3 days</div>
                        </div>

                {/* Extra Discussions - for scroll test */}
                        <div class="discussion">
                            <div class="photo" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1541747157478-3222166cf342?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=967&q=80)'}}>
                            </div>
                            <div class="desc-contact">
                                <p class="name">ASTU Football</p>
                                <p class="message">You shouldn't hold the line</p>
                            </div>
                            <div class="timer">4 days</div>
                        </div>

                        <div class="discussion">
                            <div class="photo" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1541747157478-3222166cf342?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=967&q=80)'}}>
                            </div>
                            <div class="desc-contact">
                                <p class="name">Physics</p>
                                <p class="message">The text on the course</p>
                            </div>
                            <div class="timer">5 days</div>
                        </div>

                        <div class="discussion">
                            <div class="photo" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1435348773030-a1d74f568bc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80)'}}>
                                <div class="online"></div>
                            </div>
                            <div class="desc-contact">
                                <p class="name">Women's Club</p>
                                <p class="message">next to the library,</p>
                            </div>
                            <div class="timer">1 week</div>
                        </div>


                        </div>
                        
                    </section>

        {/* CHAT-Box */}

                    <section class="chat">
                        <div class="header-chat">
                            <i class="icon fa fa-user-o" aria-hidden="true"></i>
                            <p class="name">Campus Group</p>
                            <i class="icon clickable fa fa-ellipsis-h right" aria-hidden="true"></i>
                        </div>

                        <div class="messages-chat">         {/* Scrollable Chat-Box */}

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
                            

                            {/* <div class="message text-only">
                                <p class="text"> What are you doing tonight ? Want to go take a drink ?</p>
                            </div>
                            <p class="time"> 14h58</p> */}
                            
                            <div class="message text-only">
                                <div class="response">
                                <p class="text"> Hey Megan ! It's been a while 😃</p>
                                </div>
                            </div>

                            <div class="message-container-right">
                                <div class="message text-only">
                                    <div class="response">
                                    <p class="text"> When can we meet ?</p>
                                    </div>
                                </div>
                                <div class="response-time"> 15h04</div>
                            </div>
                            
                            <div class="message-container">
                                <div class="message">
                                    <div class="photo" style={{backgroundImage: 'url(https://card.thomasdaubenton.com/img/photo.jpg)'}}>
                                        <div class="online"></div>
                                    </div>
                                    <div class="text">
                                        <div className='name-text'>Abraham Abebe</div>
                                        <div className='focus-text'>
                                            We need to look at the table to understand
                                        </div>
                                    </div>
                                </div>
                                <p class="time"> 15h09</p>
                            </div>
                            
                            

                        {/* Extra Chat for The Scroll Test */}


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

                            
                            <div class="message-container">
                                <div class="message">
                                    <div class="photo" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1541747157478-3222166cf342?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=967&q=80)'}}>
                                        <div class="online"></div>
                                    </div>
                                    <div class="text">
                                        <div className='name-text'>Yabets Urgo</div>
                                        <div className='focus-text'>
                                            Not only will you learn subjects but you will also learn new skills, including social skills.
                                            The skills and knowledge that you learn at school will help you now and in later life as you start work.
                                        </div>
                                    </div>
                                </div>
                                <p class="time"> 15h09</p>
                            </div>

                            
                        </div>

                        <div class="footer-chat">
                            {/* <i class="icon fa fa-smile-o clickable" style={{fontSize: '25pt'}} aria-hidden="true"></i> */}
                            <input type="text" class="write-message" placeholder="Type your message here"></input>
                            {/* <i class="icon send fa fa-paper-plane-o clickable" aria-hidden="true"></i> */}
                            <button className='send_button'><img src={send_icon} alt='icon' /></button>
                        </div>
                    </section>

                </div>
            </div>



        </div>
    );
}

export default Chat;
