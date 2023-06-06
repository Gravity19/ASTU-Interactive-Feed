import React from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';        //Api Fetching
import ReactPaginate from 'react-paginate';


import "../styles/Home.css";
import Footer from '../components/Footer';      //Footer
import NavBar from '../components/NavBar';      //NavBar


import barc from "../assets/search.png";                //Search icon
import utensil from "../assets/utensil.png";
import trend_icon from "../assets/trend-icon.png";       //Trend icon

import { PostList } from "../helpers/PostList";
import PostItem from "../helpers/PostItem";



function Home() {


    // Session Management

	const [authState, setAuthState]=useState(false);
    const [name, setName] = useState('');

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3000/api/user')
        .then(res => {
            if(res.data.status === "Success"){
				setAuthState(true);
                setName(res.data.user.user);
            }
            else{
				setAuthState(false);
                setName("Something went wrong");
            } 
        })
    }, []);


    // View Post API

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/student/ViewPost')
        .then(response => response.json())
        .then(data => setPosts(data))
        .catch(err => console.log(err));
    }, []);


    // Pagination 

    const [pageNumber, setPageNumber] = useState(0);

    const postsPerPage = 4;
    const pagesVisited = pageNumber * postsPerPage;

    const displayPosts = PostList
        .slice(pagesVisited, pagesVisited + postsPerPage)
        .map((Item, keys) => {
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
                    sum= {Item.summary}
                    time={Item.time}
                    date={Item.date}
                    loc={Item.loc}
                />
            );
        });

    const pageCount = Math.ceil(PostList.length / postsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };


    return (
        <div className='hmain'>
            <NavBar />

            {/* Header Section */}
            <div className='homey'>

                <div className='home-write'>
                    <div className='z-words'>
                        <h1 className='m-title'>Do your best work, supported by your Adama Science and Technology</h1>
                        <h4 className='m-desc'>ASTU interactive Feed lets members publish directly to students and other audience, without getting into any hassle.</h4>
                    </div>
                    <button className='more-button-one'>Start Reading</button>

                {!authState && (
                    <button className='more-button-two'>Register</button>
                )}
                    
                </div>
                
                <img src={utensil} alt='utensil' className='utensil'/>


                {/* Search Section */}
                <div className='input-box'>
                    <img src={barc} alt='barc' className='bicon'/>
                    
                    <i className="uil uil-search"></i>
                    <input type="text" placeholder="Search here..." />
                    <button className="button">Search</button> 
                </div>

            </div>


            {/* Middle Header Place */}

            <div className='mid-head'>
                <h3 className='mid-title'><img src={trend_icon} alt='latest' className='trend-icon'/>Latest posts</h3>
            </div>

        
        {/* POST Section */}

            <div className='post'>

                    {/* POST Custom */}
            
                    {/* {PostList.map((Item, keys) => {
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
                                sum= {Item.summary}
                                time={Item.time}
                                date={Item.date}
                                loc={Item.loc}
                            />
                        );
                    })}

                    <PostItem/>

                    */}

                    {displayPosts}

                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                    />


                    {/* POST APi /EXPERIMENTAL */}

                    {/* {posts.map((item, i) => (
                            <PostItem
                                key={i}

                                user_name={item.staffName}
                                loc={item.eventLocation}
                                desc={item.content}
                            />
                        )
                    )} */}




            {/* Message BOARD */}

            {!authState ? (
                <>
                    <div  className='discussions-board'> Noting to see</div>
                    
                </>
            ):(
                <>
                    
                    <div className='discussions-board'>

                        <div className='board-upper'><p>Discussion Board</p></div>

                        <div className='board-body'>
                            <div class="desc-board">
                                    <div class="photo" style={{backgroundImage: 'url(https://i.pinimg.com/originals/a9/26/52/a926525d966c9479c18d3b4f8e64b434.jpg)'}}></div>
                                    
                                    <div class="desc-contact">
                                        <p class="desc-title">Day Corlew</p>
                                        <p class="desc-message">Let's meet for a coffee CSS word-wrap property is used to break the long words and wrap onto the next line.</p>
                                    </div>

                                    <div class="desc-timer">3 min</div>
                            </div>

                            <div class="desc-board">
                                    <div class="photo" style={{backgroundImage: 'url(https://i.pinimg.com/originals/a9/26/52/a926525d966c9479c18d3b4f8e64b434.jpg)'}}></div>
                                    
                                    <div class="desc-contact">
                                        <p class="desc-title">Campus Group</p>
                                        <p class="desc-message">Let's meet for a coffee CSS word-wrap property is used to break the long words.</p>
                                    </div>
                                    
                                    <div class="desc-timer">35 min</div>
                            </div>

                            <div class="desc-board">
                                    <div class="photo" style={{backgroundImage: 'url(https://i.pinimg.com/originals/a9/26/52/a926525d966c9479c18d3b4f8e64b434.jpg)'}}></div>
                                    
                                    <div class="desc-contact">
                                        <p class="desc-title">School Board Meeting</p>
                                        <p class="desc-message">Let's meet for a coffee CSS word-wrap property is used to break the long words and wrap onto the next.</p>
                                    </div>
                                    
                                    <div class="desc-timer">1 hour</div>
                            </div>

                        </div>

                        <div className='board-lower'>
                            <Link className='btn-discussion' to="/chat" >Discussion</Link>
                        </div>
                        
                    </div>
                </>
            )}  
            
            {/* Message BOARD - END */}

                    
                    
            </div>

            {/* Footer */}

            <Footer />

        </div>
    
        
    );
}

export default Home;