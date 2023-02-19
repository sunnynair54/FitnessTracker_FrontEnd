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
