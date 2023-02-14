import React, { useState } from 'react'
import { APIURL } from "..";
import { useHistory } from "react-router-dom";

const Send_a_message = ({ token, postId }) => {
    const [message, setMessage] = useState('')
    const history = useHistory();
    // console.log(postId)


    const handleMessage = async (event) => {
        event.preventDefault();

        try {
            const res = await fetch(`${APIURL}/posts/${postId}/messages`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    message: {
                        content: `${message}`
                    }
                })
            });
            const data = await res.json();
            console.log(data)
            setMessage('');
            alert("Message Sent!")
            history.push("/Posts");
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = async (event) => {
        await setMessage(event.target.value);
    }



    return (
        <div className="sendAMessage">
            <form onSubmit={handleMessage}>
                <div className="messageCreate">
                    <label className="message" htmlFor="message">Message:</label>
                    <input className="messageContent"
                        type="text"
                        name="message"
                        value={message}
                        onChange={handleChange}
                    />
                </div>
                <button className="sendMessageButton" type="submit">Send Message!</button>
            </form>
        </div>
    )
};


;

export default Send_a_message