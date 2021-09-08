import { Button } from "@material-ui/core";
import React, { useState, useRef, useEffect } from "react";
import { db } from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import "./Signup.css";
import { Redirect } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

// Style for Sign up and login Pop up

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  mobile: {
    position: "absolute",
    width: 250,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Signup() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const userName = useRef();
  const email = useRef();
  const password = useRef();
  const passRep = useRef();
  const [open, setOpen] = useState(false);
  const { signup, login } = useAuth();
  const [mobileView, setMobileView] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  //Gets triggered when window size changes
  //Helps with responsive design
  const showButton = () => {
    if (window.innerWidth <= 480) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  };

  window.addEventListener("resize", showButton);

  useEffect(() => {
    showButton();
  }, []);
  // Registers User And Saves them In database
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password.current.value === passRep.current.value) {
      try {
        await signup(email.current.value, password.current.value).then(
          ({ user }) => {

            //Add new user to database as well
            db.collection("users").add({
              userId: user.uid,
              userName: userName.current.value,
            });
            
            
            console.log("User Saved in Database");
            alert("User Registered")
          }
        );
      } catch (error) {
        console.log(error);
      }

      setOpen(false);
    } else {
      alert("Password doesnot match");
    }
  };

  //Login user
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("here");
      await login(email.current.value, password.current.value);
      console.log("User Logged IN");
    } catch (error) {
      console.log(error);
    }

    setLoginOpen(false);
    return <Redirect to="chat" />;
  };

  
  return (

    /* Login Form, Only appears when you click the button */
    <div>
      <Modal open={loginOpen} onClose={() => setLoginOpen(false)}>
        <div
          style={modalStyle}
          className={mobileView ? classes.mobile : classes.paper}
        >
          <form>
            <div className="container">
              <h1>Sign in</h1>

              <hr />

              <label for="email">
                <b>Email</b>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                ref={email}
                required
              />
              <label for="psw">
                <b>Password</b>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                ref={password}
                required
              />

              <center>
                <Button className="signup-button" onClick={handleLogin}>
                  SignIn
                </Button>
                <Button
                  className="cancel-button"
                  onClick={() => setLoginOpen(false)}
                >
                  Cancel
                </Button>
              </center>
            </div>
          </form>
        </div>
      </Modal>

      {/* Sign up Form, Only Appears when you click Sign up Button */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div
          style={modalStyle}
          className={mobileView ? classes.mobile : classes.paper}
        >
          <form>
            <div className="container">
              <h1>Sign Up</h1>
              <p>Please fill in this form to create an account.</p>
              <hr />

              <label for="email">
                <b>Email</b>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                ref={email}
                required
              />

              <label for="username">
                <b>UserName</b>
              </label>
              <input
                type="text"
                placeholder="Enter UserName"
                ref={userName}
                required
              />

              <label for="psw">
                <b>Password</b>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                ref={password}
                required
              />

              <label for="psw-repeat">
                <b>Repeat Password</b>
              </label>
              <input
                type="password"
                placeholder="Repeat Password"
                ref={passRep}
                required
              />

              <center>
                <Button className="signup-button" onClick={handleRegister}>
                  Register
                </Button>
                <Button
                  className="cancel-button"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </center>
            </div>
          </form>
        </div>
      </Modal>

      <form>
        {/* Main Buttons */}
        <div className="landing-page">
          <Button onClick={() => setLoginOpen(true)}>Sign IN</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
