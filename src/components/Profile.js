import React, { useState, useEffect } from "react";
import { APIURL } from "..";

const Profile = ({ token }) => {

  const [myPosts, setMyPosts] = useState([])


  const postedByMe = async () => {
    try {
      const res = await fetch(`${APIURL}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      console.log(data)
      setMyPosts(data.data.posts);
    } catch (error) {
      console.error(error)
    }
  }

  const postDelete = async (id) => {
    try {
      const response = await fetch(`${APIURL}/posts/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const deletedPost = await response.json();
      console.log(deletedPost);
    } catch (error) {
      console.log('err'.err);
    }
  };

  const handleDelete = async (id) => {
    await postDelete(id)
    postedByMe()
  }

  useEffect(() => {
    postedByMe();

  }, []);

  return <>
    <div>
      {myPosts.filter((post) => {
        return post.active
      }).map((post, i) => {
        return (
          <div className="posts_info" key={i}>
            <h2 className="postTitle" >Title: {post.title}</h2>
            <h2 className="postPrice">Price: ${post.price}</h2>
            <h2 className="postDescription" >Description: {post.description}</h2>
            <div className="myMessages">
              {post.messages.map((message, i) => {
                return (
                  <div key={i}>
                    <h3 className="gotMessages">message:</h3>
                    <h4 className="messageUserName">From: {message.fromUser.username}</h4>
                    <h4 className="messageContent">"{message.content}"</h4>

                  </div>)
              })
              }
            </div>


            <div>{post.active === true ? <button className="deleteButton" onClick={() => handleDelete(post._id)} >Delete</button> : ''}
            </div>
          </div>
        )

      })}
    </div>
  </>

};


export default Profile;
