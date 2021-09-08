import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';
import Navbar from './Components/Navbar';
import Chat from './Components/Chat';
import Home from './Components/Home'
import Signup from './Components/Signup.jsx';
import { useAuth } from './Context/AuthContext';

function App() {

  const {currentUser} = useAuth()
  return (
    <div className="App">
      {/* Website Routes */}
       <Router>
        <div>
          <Switch >

            <Route exact path="/">
            <Navbar/>
            <Home/>
            </Route>
            <Route path="/register">
            {currentUser? 
            <Redirect to = '/chat'/>
            :
            <>
            <Navbar/>
            <Signup loginPage/>
            </>
            
          }
            </Route>
            <Route path="/chat">
              {currentUser ?
              <>
              <Navbar/>
              <Chat/>
              </>
              : 
              <Redirect to = '/register'/>}
             
            </Route>
          </Switch>
        </div>
      </Router>
            
        
    </div>
    
  );
}

export default App;
