import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddFavPlace from "./component/AddFavPlace";
import DisplayFavPlace from "./component/DisplayFavPlace";
import Test from "./component/Test";
import NavBar from "./component/NavBar";
import Home from "./component/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./component/Register";
import Login from "./component/Login";

import RequireAuth from "./component/RequireAuth";
import PersistLogin from "./component/PersistLogin";
import Unauthorized from "./component/Unauthorized";

const ROLES = {
  User: 2000,
  Admin: 5150,
};


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
       



        <Route path="/addfavplace" element={<AddFavPlace />} />
        <Route path="/displayfav" element={<DisplayFavPlace />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;