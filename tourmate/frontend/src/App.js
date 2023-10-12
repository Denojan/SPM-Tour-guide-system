import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import SearchPlaces from "./component/wishlistManagement/SearchPlaces";
import WishList from "./component/wishlistManagement/WishList";
import UpdateNote from "./component/wishlistManagement/UpdateNote";

import NavBar from "./component/NavBar";
import Home from "./component/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./component/Register";
import Login from "./component/Login";

import Footer from "./component/Footer";

import Profile from "./component/Profile";




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
       
       {/* wishlist routes */}
        <Route path="/searchPlaces" element={<SearchPlaces />} />
        <Route path="/wishList" element={<WishList />} />
        <Route path="/updateNote/:placeName" element={<UpdateNote/>}/>
       

        <Route path="/profile" element={<Profile />} />
      

      </Routes>
      <Footer />
      <Routes>
        
      </Routes>
    </Router>
  );
}

export default App;