import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const LOGIN_URL = "http://localhost:5000/users";

const Login = () => {
  const { handleLogin } = useContext(UserContext);

  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${LOGIN_URL}?username=${user}`);

      console.log(response.data);

      if (response.data.length === 1) {
        const userData = response.data[0];

        if (userData.password === pwd) {
          console.log(user + " You are successfully Logged In");
          setUser("");
          setPwd("");
          setSuccess(true);
          handleLogin(user);
          navigate("/Home");
        } else {
          console.log("Username or Password is not matching with our records");
          setErrMsg("Username or Password is not matching with our records");
        }
      } else {
        console.log("User not found");
        setErrMsg("User not found");
      }
    } catch (error) {
      console.log("Error:", error);
      setErrMsg("Error during login");
    }
    errRef.current.focus();
  };

  return (
    <div className="login">
      {success ? (
        <section>{navigate("/Home")}</section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>

          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            ></input>

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            ></input>

            <button>Sign In</button>
          </form>

          <p>
            Need an account?
            <br />
            <span className="line">
              <Link to="/SignUp">Sign Up</Link>
              &emsp;&emsp;&emsp;&emsp;&emsp;
              <Link to="/ForgotPassword" state={user}>
                ForgotPassword?
              </Link>
            </span>
          </p>
        </section>
      )}
    </div>
  );
};

export default Login;
