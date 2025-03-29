import { useState, useRef, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Context } from "../Provider";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  //Important context values used across the app
  const { isSignedIn, setIsSignedIn } = useContext(Context);
  //Stores the username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  //Used to see which button name and function to use
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [CanClick, setCanClick] = useState(true);

  function handleNameChange(event, type) {
    if (event.target.value.length > 249) {
      alert("Name is too long");
      return;
    }
    if (event.target.value.includes(" ")) {
      alert("Value cannot contain spaces");
    } else {
      if (type === "username") {
        setUsername(event.target.value);
      } else if (type === "password") {
        setPassword(event.target.value);
      } else {
        setEmail(event.target.value);
      }
    }
  }
  //Switch between login and signup
  const handleSwitch = () => {
    if (login) {
      setLogin(false);
      setSignup(true);
    } else {
      setLogin(true);
      setSignup(false);
    }
  };
  //Calls the login or sign up function depending on the state of the login variable
  const handleSignOrLog = () => {
    if (!CanClick) {
      return;
    }
    if (login) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  //Sends the sign up data to be checked by the server and returns a response
  //The response returns a true value if the sign up was successful that is used in creating tasks
  const handleLogin = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/login`,
        options
      );
      const responseData = await response.json();
      if (response.ok) {
        localStorage.removeItem("token");
        localStorage.setItem("token", responseData.token);
        setIsSignedIn(true);
        alert("Login successful!");
      } else {
        alert(responseData.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  //Sends the data to the server to be inserted into the database
  const handleSignup = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/register`,
        options
      );
      const responseData = await response.json();

      if (response.ok) {
        localStorage.setItem("token", responseData.token);
        setIsSignedIn(true);
        alert("Registration successful!");
      } else {
        alert(responseData.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed");
    }
  };
  return (
    <>
      {/* Outside container */}
      <div className="LogSignContainer">
        {/* The inside container that holds the text boxes */}
        <div className="LogSignPage">
          <h1>Please enter or create an account</h1>
          <div className="UP-Container">
            <h2>Username</h2>
          </div>
          <div className="input-group">
            <input
              type="text"
              value={username}
              onChange={(e) => handleNameChange(e, "username")}
            />
          </div>
          <div className="UP-Container">
            <h2>Password</h2>
          </div>
          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => handleNameChange(e, "password")}
            />
          </div>
          <div className="input-group">
            <input
              type="gmail"
              value={email}
              onChange={(e) => handleNameChange(e, "")}
            />
          </div>
          <div className="Button-Container-Login">
            <button className="loginOrSign" onClick={handleSignOrLog}>
              {login ? "Login" : "Signup"}
            </button>
            <button className="Switch" onClick={handleSwitch}>
              {login ? "Switch to Signup" : "Switch to Login"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
