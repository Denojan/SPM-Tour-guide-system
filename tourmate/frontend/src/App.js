import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddFavPlace from "./component/AddFavPlace";
import DisplayFavPlace from "./component/DisplayFavPlace";

import SearchPlaces from "./component/SearchPlaces";
import WishList from "./component/WishList";
import UpdateNote from "./component/UpdateNote";
import Map from "./component/Map";
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

import Footer from "./component/Footer";
import DisplayHiddenSpecific from "./component/DisplayHiddenSpecific";
import Profile from "./component/Profile";
import DisplayAllHidden from "./component/DisplayAllHidden";
import UpdatePlace from "./component/UpdatePlace";




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

        <Route path="/searchPlaces" element={<SearchPlaces />} />
        <Route path="/wishList" element={<WishList />} />
        <Route path="/navbar"  element={<NavBar/>}/>
        <Route path="/updateNote" element={<UpdateNote/>}/>
       
     
        <Route path="/displayhidden" element={<DisplayHiddenSpecific />} />
        <Route path="/displayallhidden" element={<DisplayAllHidden />} />
        <Route path="/map" element={<Map />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/updateplace/:id" element={<UpdatePlace />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;