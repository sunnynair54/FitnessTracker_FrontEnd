import React from 'react'
import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div className="Welcome">
            <h1 className="welcomeBanner">Welcome to Stranger's Things!</h1>
            <h2 className="secondBanner">A place for Strangers to sell their strange things!</h2>
            <h2 className="descriptionBanner">
                <div className="logInSignUp"><Link className="logInSignUpButton" to="/Login">Login</Link> or <Link className="logInSignUpButton" to="/Signup">Signup</Link></div>
                to buy items, messages Strangers, and even sell your own brand of strange! Come be apart of the strangeness today!!!
            </h2>
        </div>
    )
}

export default Home