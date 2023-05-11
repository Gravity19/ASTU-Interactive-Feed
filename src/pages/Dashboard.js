import React from 'react';
import "../styles/Dashboard.css";
import SideBar from '../components/SideBar';      //SideBar

import { PostList } from "../helpers/PostList";
import PostItem from "../helpers/PostItem";

import HeadIcon from '../components/HeadIcon';      //HeadIcon

function Dashboard() {
    return (
        <div>
            <SideBar />
            <div className='Dashboard'>

                
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