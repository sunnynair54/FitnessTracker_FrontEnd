import React, { useState, useEffect } from "react";
import { APIURL } from "..";
import { async } from "q";

const MyRoutines = ({routines, setRoutines}) => {
  const [name, setName] = useState("")
  const [goal, setGoal] = useState("")
  const [myRoutines, setMyRoutines] = useState([])

  const handleRoutinesSubmit = async(event) => {
          event.preventDefault();

          const token = localStorage.getItem("userToken")

          const response = await fetch("https://fitnesstrac-kr.herokuapp.com/api/routines", {
              method: "POST",
              headers: {
                  "Content-Type" : "Application/json",
                  "Authorization" : `Bearer ${token}`
              },
              body: JSON.stringify({
                  name: name,
                  goal: goal
              })
          })

          const userName = '';
          await fetch('http://fitnesstrac-kr.herokuapp.com/api/users/me', {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
          }).then(response => response.json())
          .then(result => {
              userName = result.username;
          })
          .catch(console.error);


          await fetch(`http://fitnesstrac-kr.herokuapp.com/api/users/${userName}/routines`, {
              headers: {
                  'Content-Type': 'application/json',
              },
          }).then(response => response.json())
          .then(result => {
              setMyRoutines(result);
          })
          .catch(console.error);   
          
  }

  // const handleUpdate = () => {
      
  // }

  const handleDelete = async(routineIdToDelete) => {
      const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${routineIdToDelete}`, {
          method: "DELETE",
          headers: {
              'Content-Type': 'Application/json',
              'Authorization': `Bearer ${token}`
          }
      }).then(response => response.json())
      .then(result => {
          console.log(result);
          
          if (result) {
              const newRoutines = routines.filter(routine => routine.id !== routineIdToDelete);
          }
      
  }).catch(console.error);
  }

  return (
      <>
          <h1 id = "CreateRoutines">Create your own Routines</h1>
          <form onSubmit = {handleRoutinesSubmit}>

              <label htmlFor = "RoutineName">Routine Name</label>
              <input type = "text" placeholder = "Name"
                     value = {name}
                     onChange = {(event) => {setName(event.target.value)}}>
              </input>

              <label htmlFor = "RoutineGoal">Goal</label>
              <input type = "text" placeholder = "Goal"
                     value = {goal}
                     onChange = {(event) => {setGoal(event.target.value)}}>    
              </input>

              <button type = "submit">Submit</button>
          </form>
          <div>
              { myRoutines.length > 0 ?
                  myRoutines.map((routine) => (
                      <div key={routine.id}><br></br>
                          <h2>Name: {routine.name}</h2>
                          <h2>Goal: {routine.goal}</h2>

                          {
                              routine.activities.map(activity =>
                                  <div key={activity.id}>
                                      <h2>Activities {activity.id}</h2>
                                      <h3>Description: {activity.description}</h3>
                                      <h3>Duration: {activity.duration}</h3>
                                      <h3>Count: {activity.count}</h3>
                                  </div> 
                                  )
                          }

                      <button className="Update" onClick={() => handleUpdate()}>Update</button>

                      <button className="delete-bn" onClick ={() => handleDelete(routine.id)}>Delete</button>
                          
                      </div>

                  )) : <p>No Routines Yet!!!</p>
              }
          </div>
      </>
  )
}

export default MyRoutines;

// const MyRoutines = ({ token }) => {

//   const [myPosts, setMyPosts] = useState([])


//   const postedByMe = async () => {
//     try {
//       const res = await fetch(`${APIURL}/users/me`, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       const data = await res.json();
//       console.log(data)
//       setMyPosts(data.data.posts);
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   const postDelete = async (id) => {
//     try {
//       const response = await fetch(`${APIURL}/posts/${id}`, {
//         method: "DELETE",
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const deletedPost = await response.json();
//       console.log(deletedPost);
//     } catch (error) {
//       console.log('err'.err);
//     }
//   };

//   const handleDelete = async (id) => {
//     await postDelete(id)
//     postedByMe()
//   }

//   useEffect(() => {
//     postedByMe();

//   }, []);

//   return <>
//     <div>
//       {myPosts.filter((post) => {
//         return post.active
//       }).map((post, i) => {
//         return (
//           <div className="posts_info" key={i}>
//             <h2 className="postTitle" >Title: {post.title}</h2>
//             <h2 className="postPrice">Price: ${post.price}</h2>
//             <h2 className="postDescription" >Description: {post.description}</h2>
//             <div className="myMessages">
//               {post.messages.map((message, i) => {
//                 return (
//                   <div key={i}>
//                     <h3 className="gotMessages">message:</h3>
//                     <h4 className="messageUserName">From: {message.fromUser.username}</h4>
//                     <h4 className="messageContent">"{message.content}"</h4>

//                   </div>)
//               })
//               }
//             </div>


//             <div>{post.active === true ? <button className="deleteButton" onClick={() => handleDelete(post._id)} >Delete</button> : ''}
//             </div>
//           </div>
//         )

//       })}
//     </div>
//   </>

// };


// export default MyRoutines;
