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

          const addNewRoutine = async (token, { name, goal, isPublic }) => {
            try {
              const response = await fetch(`${APIURL}/routines`, {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                  name: name,
                  goal: goal,
                  isPublic: isPublic,
                })
              })
              const results = response.json();
              return results
            } catch (ex) {
              console.log('Error adding new routine')
            }
          }

          const userName= async (token) => {
            try {
              const response = await fetch(`${APIURL}/users/me`, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
              })
          
              const results = await response.json();
              return results;
            } catch (ex) {
              console.log('Error getting user information')
            }
          }

          const getMyRoutines = async (token, user) => {
            try {
              const response = await fetch(`${APIURL}/api/users/${userName}/routines`, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
              })
              const results = response.json();
              return results;
            } catch (ex) {
              console.log('Error getting my routines')
            }
          }}
          


  const handleDelete = async(routineIdToDelete) => {
      const response = await fetch(`${APIURL}/api/routines/${routineIdToDelete}`, {
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

