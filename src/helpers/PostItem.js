import React from "react";
import date_icon from "../assets/date_icon.png";            //Date Icon
import map_icon from "../assets/map_icon.png";    //map_icon




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

                                <img src={map_icon} alt="map_icon" className="map_icon"/>
                                <div className="Map_info">
                                    <h5>{loc}</h5>
                                </div>

                                {/*
                                <button className="like_button">
                                    <svg className="empty_like" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32"><path fill="none" d="M0 0H24V24H0z"></path><path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2zm-3.566 15.604c.881-.556 1.676-1.109 2.42-1.701C18.335 14.533 20 11.943 20 9c0-2.36-1.537-4-3.5-4-1.076 0-2.24.57-3.086 1.414L12 7.828l-1.414-1.414C9.74 5.57 8.576 5 7.5 5 5.56 5 4 6.656 4 9c0 2.944 1.666 5.533 4.645 7.903.745.592 1.54 1.145 2.421 1.7.299.189.595.37.934.572.339-.202.635-.383.934-.571z"></path></svg>
                                    <svg className="filled_like" height="32" width="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0H24V24H0z" fill="none"></path><path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"></path></svg>
                                    Like
                                </button>
                                */}
                            </div>
                        </div>
        </div>
    );
}

export default PostItem;