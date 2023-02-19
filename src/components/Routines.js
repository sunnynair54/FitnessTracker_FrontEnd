import React, { useEffect, useState } from "react";
import { APIURL } from "..";
import { async } from "q";
import MyRoutines from "./MyRoutines";

const Routines = () => {
    const [routines, setRoutines] = useState([])

    const token = localStorage.getItem("userToken");

    useEffect(() => {
        const fetchRoutines = async () => {
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
            <div className="logoutRoutines">

                <h1 classname="RoutineHeader" >All Routines</h1>

                {
                    token ? <MyRoutines routines={routines} setRoutines={setRoutines} /> : <></>
                }


                {
                    routines.map((routine) => (
                        <div key={routine.id}><br></br>
                            <h2 className="routineDetails">Name: {routine.name}</h2>
                            <h2 className="routineDetails">Goal: {routine.goal}</h2>
                            <h2 className="routineDetails">Creator Name: {routine.creatorName}</h2>

                            {
                                routine.activities.map(activity =>
                                    <div key={activity.id}>
                                        <h2 className="routineActivityDetails">Activities {activity.id}</h2>
                                        <h3 className="routineActivityDetails">Name: {activity.name}</h3>
                                        <h3 className="routineActivityDetails">Description: {activity.description}</h3>
                                        <h3 className="routineActivityDetails">Duration: {activity.duration}</h3>
                                        <h3 className="routineActivityDetails">Count: {activity.count}</h3>
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
