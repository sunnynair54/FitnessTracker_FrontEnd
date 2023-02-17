import React, { useEffect, useState } from "react";
import { APIURL } from "..";
import { async } from "q";
import MyRoutines from "./MyRoutines";

const Routines = () => {
    const [routines, setRoutines] = useState([])

    const token = localStorage.getItem("userToken");

    useEffect(() => {
        const fetchRoutines = async() => {
            const response = await fetch(" http://fitnesstrac-kr.herokuapp.com/api/routines")
                .then(response => response.json())
                .then(result => {
                    setRoutines(result)
                    console.log(result)
                })
                .catch(console.error)
        }
        fetchRoutines()
    }, [])

    return (
        <>
            <div id = "logoutRoutines">

                <h1>All Routines</h1>

                {
                    token ? <MyRoutines routines={routines} setRoutines={setRoutines} /> : <></>
                }


                {
                    routines.map((routine) => (
                        <div key={routine.id}><br></br>
                            <h2>Name: {routine.name}</h2>
                            <h2>Goal: {routine.goal}</h2>
                            <h2>Creator Name: {routine.creatorName}</h2>

                            {
                                routine.activities.map(activity =>
                                    <div key={activity.id}>
                                        <h2>Activities {activity.id}</h2>
                                        <h3>Name: {activity.name}</h3>
                                        <h3>Description: {activity.description}</h3>
                                        <h3>Duration: {activity.duration}</h3>
                                        <h3>Count: {activity.count}</h3>
                                    </div> 
                                    )
                            }
                            
                        </div>

                    ))
                }

            </div>

        </>
    )
}

export default Routines;
// const getRoutines = async () => {
//   try {
//     const response = await fetch(`${APIURL}/routines`, {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
    
//     const routines = await response.json();
//     return routines;
    
//   }catch(error){
    
//   }
// }

// const createNewRoutine = async (rName, rGoal) => {
//   const bodyData = {
//     name: rName,
//     goal: rGoal,
//     isPublic: true
//   }
//   try{
//     const response = await fetch(`${APIURL}/routines`, {
//       method: 'POST',
//       body: JSON.stringify(bodyData),
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer ' + localStorage.getItem("token")
//       }
//     })
//   const newRoutine = await response.json() 
//   return newRoutine 
//   }catch(error){ 
//     console.error(error) 
//   }
// }

// const Routines = () => {
//   const [routines, setRoutines] = useState([]);
//   const [name, setName] = useState('');
//   const [goal, setGoal] = useState('');
//   const [editRoutine, setEditRoutine] = useState({});
//   const token = localStorage.getItem("token");

//   const loadRoutines = async() => {
//       const routines = await getRoutines();
//       setRoutines(routines);
//   }

//   (async () => {loadRoutines();
//   }, []);

//   const renderRoutines = () => {
//       return (
//         <div>
//           {routines.map(routine => {
//               const { name, id, creatorName, goal, activities } = routine;

//               return (
//                  <div key={id} style={{ paddingBottom: 20 }}>
//                    <div>Name: {name}</div>
//                    <div>Goal: {goal}</div>
//                    <div> Creator name: {creatorName}</div>
//                     <div>
//                       <div>Activities for this routine:</div>
//                        {activities.map(activity => {
//                           const { id,description, duration, count, name } = activity;
//                           return (
//                               <div key={id} style={{ paddingTop: 20 }}>
//                                   <div>Activity name: {name}</div>
//                                   <div>Activity description: {description}</div>
//                                   <div>Activity count: {count}</div>
//                                   <div>Activity duration: {duration}</div>
//                               </div>
//                           )

//                        })}
//                     </div>
//                  </div>
//               );
//            })}
//         </div>
//       )
//   }

//   const createRoutine = async () => {
//       try {
//           await createNewRoutine(name, goal);
//           loadRoutines();
//       } catch(err) {
//           console.error("error creating: ", err);
//       }
//   }
//   const renderForm = () => {
//       return (
//         <div>
//           <div>Create a new Routine:</div>
//           <div>
//             Name: 
//             <input type="text" value={name} onChange={e => setName(e.target.value)} />
//           </div>
//           <div>
//             Goal: 
//             <input type="text" value={goal} onChange={e => setGoal(e.target.value)} />
//           </div>
//           <button onClick={() => createRoutine()}>Create</button>
//         </div>
//       )};

//   return (
//     <>
//       <div id="forms">
//           {token ? renderForm() : <p>Please Log In to Create a New Routine</p>}
//       </div>

//       {renderRoutines()}
//     </>
//   );
// };
// export default Routines;