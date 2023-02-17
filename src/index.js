import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { Home, Login, MyRoutines, Signup, CreateRoutine, CreateActivities, Activities, Send_a_message } from "./components";
import Routines from "./components/Routines";


export const APIURL =
  "https://fitnesstrac-kr.herokuapp.com/";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("myToken"));
  const saveToken = (token) => {
    setToken(token);
    localStorage.setItem("myToken", token);
  };
  const [routineId, setRoutineId] = useState('')
  const [activityId, setActivityId] = useState('')


  const removeToken = () => {
    setToken(null)
    localStorage.removeItem("myToken");
  }





  return (
    <BrowserRouter>
      <div>
        <header>
          <nav className="nav">
            <h1 className="mainTitle">Fitness Tracker</h1>
            <h2 className="Links">
              <div><Link className="HomeLink" to="/Home">Home</Link></div>
              <div><Link className="RoutineLink" to="/Routines">Routines</Link></div>
              <div><Link className="ActivitiesLink" to="/Activities">Activities</Link></div>
              <Link to="/MyRoutines"><div className="MyRoutineLink">
                {token === null ? '' : 'MyRoutines'}
              </div></Link>
              <Link to="/Login">
                <div className="Logbutton">
                  {token === null ? "Login/Signup" : <button className="logout" onClick={removeToken}>LogOut</button>}
                </div>
              </Link>
            </h2>
          </nav>

          <div>
            <Switch>
              <Route exact path="/Home">
                <Home token={token} />
              </Route>
              <Route path="/Routines">
                <Routines token={token}
                  setRoutineId={setRoutineId} />
              </Route>
              <Route path="/MyRoutines">
                <MyRoutines token={token}
                  routineId={routineId} />
              </Route>
              <Route path="/Login">
                <Login setToken={saveToken} token={token} />
              </Route>
              <Route path="/Signup">
                <Signup setToken={saveToken} />
              </Route>
              <Route path="/CreateRoutine">
                <CreateRoutine token={token} />
              </Route>
              <Route path="/CreateActivities">
                <CreateActivities token={token} />
              </Route>
              <Route path="/Activities">
                <Activities
                  token={token}
                  routineId={routineId}
                  setRoutineId={setRoutineId}
                  activityId={activityId}
                  setActivityId={setActivityId} />
              </Route>
            </Switch>
          </div>
        </header>
      </div>
    </BrowserRouter>
  );
};

//test
ReactDOM.render(<App />, document.getElementById("app"));

