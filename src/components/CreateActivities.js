import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { APIURL } from "..";


const CreateActivities = ({ token }) => {
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const history = useHistory()
    useEffect(() => { }, [error])
    console.log(error)

    const handleName = (event) => {
        setName(event.target.value);

    }
    const handleDescription = (event) => {
        setDescription(event.target.value);

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            const response = await fetch(`${APIURL}api/activities`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: name,
                    description: description
                })
            });
            const newActivity = await response.json();
            console.log(newActivity);
            if (!newActivity.error) {
                setName(newActivity.name);
                setDescription(newActivity.description);
                history.push("/Activities")
            } else { setError(newActivity.error) }

        } catch (e) {
            console.error(e)
            setError(e);
        }
        setName('')
        setDescription('')

    }
    return (
        <div className='createActivityCenter'>
            <form onSubmit={handleSubmit}>
                <div className="activityName">
                    <label className="nameLabel" htmlFor="name">Name:</label>
                    <input className="nameInput"
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleName}
                    />
                </div>

                <div className="activityDescription">
                    <label className="descriptionLabel" htmlFor="description">Description:</label>
                    <input className="descriptionInput"
                        type="text"
                        name="description"
                        value={description}
                        onChange={handleDescription}
                    />
                </div>
                <div className="newActivityError">{error}</div>
                <button className="createButton" type="submit">Create Activity!</button>
            </form>
        </div>
    )
}


export default CreateActivities;