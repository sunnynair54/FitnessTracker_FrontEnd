import React, { useEffect, useState } from "react";
import { APIURL } from "..";
import { Link } from "react-router-dom";
import { async } from "q";



const Activities = ({ token }) => {
  const [activities, setActivities] = useState([]);


  useEffect(() => {
    fetchActivities()
  }, []);


  const fetchActivities = async () => {
    const res = await fetch(`${APIURL}api/activities`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();
    setActivities(data);
    // console.log(data)

  };


  return (
    <>
      {token !== null && <Link className="CreateActivityLink" to="/CreateActivities">Create New Activity</Link>}
      <div className="activityBody">
        {
          activities.reverse().map((activity) => {
            return (

              <div className="activity_id" key={activity.id}>
                <h2 className="activityName">Name: {activity.name}</h2>
                <h3 className="activityDescription"> Description: {activity.description}</h3>
              </div>
            );
          })}
      </div></>
  );
};


export default Activities;
