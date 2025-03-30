import { useState, useRef, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { handleLogin, handleSignup } from "../../services/ApiAuth";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  //Stores the username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  //Used to see which button name and function to use
  const [login, setLogin] = useState(false);
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
    } else {
      setLogin(true);
    }
  };
  //Calls the login or sign up function depending on the state of the login variable
  const handleSignOrLog = async () => {
    if (!CanClick) {
      return;
    }

    if (login) {
      await handleLogin(email, password); //
    } else {
      await handleSignup(email, password, username);
    }
  };

  useEffect(() => {
    console.log(login);
  }, []);

  return (
    <>
      {/* Outside container */}
      <div className="LogSignContainer">
        {/* The inside container that holds the text boxes */}
        <div className="LogSignPage">
          <h1>Please enter or create an account</h1>
          {!login && (
            <>
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
            </>
          )}
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
          <div className="UP-Container">
            <h2>Email</h2>
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
