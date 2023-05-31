import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/delete.css';

function DeletePost() {
  // State variables
  const [posts, setPosts] = useState([]); // Stores the list of posts
  const [message, setMessage] = useState(''); // Stores success message
  const [error, setError] = useState(''); // Stores error message
  const [currentPage, setCurrentPage] = useState(1); // Stores the current page number
  const [postsPerPage] = useState(5); // Number of posts to display per page
  const [confirmDelete, setConfirmDelete] = useState(false); // Flag to confirm deletion
  const [postIdToDelete, setPostIdToDelete] = useState(''); // Stores the post ID to be deleted

  // Fetch posts on component mount
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/staff/viewPost')
      .then((response) => {
        console.log(response.data);
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError('Failed to fetch posts. Please try again later.');
      });
  }, []);

  // Event handler for delete button click
  const handleDelete = (postId) => {
    setConfirmDelete(true);
    setPostIdToDelete(postId);
  };

  // Confirm deletion and send delete request
  const confirmDeletePost = () => {
    axios
      .delete(`http://localhost:4000/api/admin/deletePost`, { data: { postId: postIdToDelete } })
      .then((response) => {
        console.log(response.data);
        setMessage('Post successfully deleted.');
        setPosts(posts.filter((post) => post.postId !== postIdToDelete));
        cancelDelete();
      })
      .catch((error) => {
        console.log(error);
        setError('Failed to delete post. Please try again later.');
        cancelDelete();
      });
  };

  // Cancel deletion
  const cancelDelete = () => {
    setConfirmDelete(false);
    setPostIdToDelete('');
  };

  // Get current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='delete-container'>
      <h2>Delete Post</h2>
      <table>
        <thead>
          <tr>
            <th>Post ID</th>
            <th>Content</th>
            <th>Category ID</th>
            <th>Staff Name</th>
            <th>Event Location</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post) => (
            <tr key={post.postId}>
              <td>{post.postId}</td>
              <td>{post.content}</td>
              <td>{post.categoryId}</td>
              <td>{post.staffName}</td>
              <td>{post.eventLocation}</td>
              <td>
                <button className='delete-btn' onClick={() => handleDelete(post.postId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <p className='error'>{error}</p>}
      {message && <p>{message}</p>}
      <div className='pagination'>
        {posts.length > postsPerPage &&
          Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map((_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
      </div>

      {confirmDelete && (
        <div className='confirmation-modal'>
          <div className='confirmation-content'>
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this post?</p>
            <div>
              <button className='confirm-btn' onClick={confirmDeletePost}>
                Confirm
              </button>
              <button className='cancel-btn' onClick={cancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeletePost;
