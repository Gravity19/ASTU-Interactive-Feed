import React from 'react';
import {useState, useEffect, useRef} from 'react';

import "../styles/Notify.css";

import { MdNotifications } from "react-icons/md";
import user_avatar from '../assets/img_avatar.png';
import user_avatar2 from '../assets/img_avatar2.png';

function Notify() {

	// Pop-Up Functionality

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


    return (
        <div className='head-notify'>

            <div className='notification' onClick={()=> setOpen(!open)}>
                <div className='perspective'>
                    <MdNotifications className='icon'/>
                    <span>5</span>
                </div>
            </div>

            {open && (
                <div className="notify-dropdown" ref={dropdownRef}>
                    <div className='triangle'></div>

                    <p>Notifications</p>

                    <div className='content'>
                        <img src={user_avatar} alt='icon-img'/>

                        <div className='block'>
                            <div className='line'><b>Yabets</b> has made to your post <b>Python Developers</b></div>
                            <div className='loc'>Space</div>
                        </div>
                    </div>

                    <div className='content'>
                        <img src={user_avatar2} alt='icon-img'/>

                        <div className='block'>
                            <div className='line'><b>Nati</b> has made to your post <b>Java Developers</b></div>
                            <div className='loc'>Stadium</div>
                        </div>
                    </div>

                </div>
            )}
            
        </div>
    );
}

export default Notify;