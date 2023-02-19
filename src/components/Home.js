import React from 'react'
import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div className="Welcome">
            <h1 className="welcomeBanner">Welcome to Fitness Tracker!</h1>
            <h2 className="secondBanner">A place for you to track your fitness routines, set goals, and make your fitness journey attainable!</h2>
            <h2 className="descriptionBanner">
                <div className="logInSignUp"><Link className="logInSignUpButton" to="/Login">Login</Link> or <Link className="logInSignUpButton" to="/Signup">Signup</Link></div>
                Make an account to make your own routines and be apart of our amazing fitness community!!!
            </h2>
        </div>
    )
}

export default Home