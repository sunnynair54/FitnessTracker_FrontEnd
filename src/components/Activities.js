import React, { useEffect, useState } from "react";
import { APIURL } from "..";
import { Link } from "react-router-dom";
import { async } from "q";



const Activities = ({ token, setActivityId }) => {
  const [activities, setActivities] = useState([]);


  useEffect(() => {
    fetchActivities()
  }, []);


  const fetchActivities = async () => {
    const res = await fetch(`${APIURL}api/activities`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await res.json();
    setActivities(data);
    console.log("data", data)

    // console.log(data);
  };
  //   console.log(posts.title);

  // const handleDelete = async (id) => {
  //   await postDelete(id)
  //   fetchActivities()
  // }

  // const activityDelete = async (id) => {
  //   try {
  //     const response = await fetch(`${APIURL}/posts/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       }
  //     });

  //     const deletedPost = await response.json();
  //     console.log(deletedPost);
  //   } catch (error) {
  //     console.log('err'.err);
  //   }
  // };

  const handleMessage = (id) => {
    setActivityId(id)
  }




  return (
    <>
      {token === null ? '' : <Link className="CreatePostLink" to="/CreatePost">Create Strange New Post</Link>}
      <div className="postBody">
        {/* {activities.reverse().map((activity) => {
          return (
            <div className="posts_info" key={post._id}>
              <h2 className="postTitle">Title: {post.title}</h2>
              <h3 className="postAuthor">Author: {post.author.username}</h3>
              <h3 className="postPrice"> Price: ${post.price}</h3>
              <h3 className="postDescription"> Description: {post.description}</h3>
              <div className="username">
                {post.isAuthor === true ? `Posted by you: ${post.author.username}` : ''}

                {post.isAuthor === true ? <button className="deleteButton" onClick={() => handleDelete(post._id)} id='deleteButton'>Delete</button> : ''}

              </div>
              {token === null ? '' : <div>{
                post.isAuthor === false ? <Link to="/Send_a_message">
                  <button className="messageButton" onClick={() => handleMessage(post._id)}>Message</button>
                </Link> : ''
              }
              </div>}
            </div>
          );
        })} */}
      </div></>
  );
};


export default Activities;
