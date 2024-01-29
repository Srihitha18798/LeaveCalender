import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import "../components/Home.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const JSON_SERVER_URL = "http://localhost:5000/users";

const Home = () => {
  const { user } = useContext(UserContext);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  console.log(user);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get(`${JSON_SERVER_URL}?username=${user}`);

        console.log(response.data);

        if (response.data.length === 1) {
          const userData = response.data[0];
          setRole(userData.role);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchUserRole();
  }, [user]);

  return (
    <>
      <Header title={`Welcome ${user}`} />
      <div className="home">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {role === "admin" ? (
              <div className="admin-section">
                <div className="cards">
                  <div className="card">
                    <h2 style={{ color: "black" }}>My Leaves</h2>
                    <button
                      onClick={() => {
                        navigate("/MyLeaves");
                      }}
                    >
                      View Leaves
                    </button>
                  </div>
                  <div className="card">
                    <h2 style={{ color: "black" }}>Team Leaves</h2>
                    <button
                      onClick={() => {
                        navigate("/Leaves");
                      }}
                    >
                      View Leaves
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="user-section">
                <div className="cards">
                  <div className="card">
                    <h2 style={{ color: "black" }}>My Leaves</h2>
                    <button
                      onClick={() => {
                        navigate("/MyLeaves");
                      }}
                    >
                      View Leaves
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
