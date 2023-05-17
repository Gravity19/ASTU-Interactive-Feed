import React from "react";
import date_icon from "../assets/date_icon.png";            //Date Icon
import map_icon from "../assets/map_icon.png";    //map_icon

import { BsFillHeartFill } from "react-icons/bs";  //Heart Icon




function PostItem({ user_image, user_name, user_badge, card_image, tag, title, desc, time, date, loc}) {

    return (
        <div className="card">

            {/* API LOGIC */}
                        
                        <div className="card__header">
                            <div className="user_info">
                                <img src={user_image} alt="user_image" className="user_image"/>
                                <h5 className="user_name">{user_name}</h5>
                                <img src={user_badge} alt="user_badge" className="user_badge"/>
                            </div>
                            <img src={card_image} alt="card_image" className="card_image" width="600"/>
                        </div>

                        <div className="card__body">
                            <span className="tag tag-red">{tag}</span>
                            <h4 className='title'>{title}</h4>
                            <p className='desc'>{desc}</p>
                        </div>

                        <div className="card__footer">
                            <div className="supplies">
                                <img src={date_icon} alt="date_icon" className="date_icon"/>
                                <div className="date_info">
                                    <h5>{date}</h5>
                                    <small>{time}</small>
                                </div>
                            </div>

                            <div className="location">
                                <img src={map_icon} alt="map_icon" className="map_icon"/>
                                <div className="Map_info">
                                    <h5>{loc}</h5>
                                </div>
                            </div> 
                            
                            <div className="like-heart">
                                <label class="like-container">
                                    <input type="checkbox"/><BsFillHeartFill className="svg"/>
                                </label>
                                <p>5</p>
                            </div>
                        </div>
        </div>
    );
}

export default PostItem;