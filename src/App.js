import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import ForgotPassword from "./components/ForgotPassword";
import Leaves from "./components/Leaves";
import Signout from "./components/Signout";
import MyAccount from "./components/MyAccount";
import ApplyLeave from "./components/ApplyLeave";
import MyLeaves from "./components/MyLeaves";
import CalendarView from "./components/CalendarView";
import TeamsCalenderView from "./components/TeamsCalenderView";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/SignUp" element={<SignUp />}></Route>
          <Route exact path="/LogIn" element={<Login />}></Route>
          <Route exact path="/Home" element={<Home />}></Route>
          <Route
            exact
            path="/ForgotPassword"
            element={<ForgotPassword />}
          ></Route>
          <Route exact path="/Leaves" element={<Leaves />}></Route>
          <Route exact path="/Signout" element={<Signout />}></Route>
          <Route exact path="/MyAccount" element={<MyAccount />}></Route>
          <Route exact path="/ApplyLeave" element={<ApplyLeave />}></Route>
          <Route exact path="/MyLeaves" element={<MyLeaves />}></Route>
          <Route exact path="/CalendarView" element={<CalendarView />}></Route>
          <Route
            exact
            path="/TeamsCalenderView"
            element={<TeamsCalenderView />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
