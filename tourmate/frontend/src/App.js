import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import SearchPlaces from "./component/wishlistManagement/SearchPlaces";
import WishList from "./component/wishlistManagement/WishList";
import UpdateNote from "./component/wishlistManagement/UpdateNote";

import AddFavPlace from "./component/placesManagement/AddFavPlace";
import DisplayFavPlace from "./component/placesManagement/DisplayFavPlace";
import Experience from "./component/Experience";
import CreateExperience from "./component/CreateExperience";
import UpdateExperience from "./component/UpdateExperience";


import Map from "./component/placesManagement/Map";
import NavBar from "./component/NavBar";
import Home from "./component/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./component/Register";
import Login from "./component/Login";

import Footer from "./component/Footer";

import Profile from "./component/Profile";


import DisplayHiddenSpecific from "./component/placesManagement/DisplayHiddenSpecific";

import DisplayAllHidden from "./component/placesManagement/DisplayAllHidden";
import UpdatePlace from "./component/placesManagement/UpdatePlace";


import RequireAuth from "./component/RequireAuth";
import PersistLogin from "./component/PersistLogin";
import Unauthorized from "./component/Unauthorized";
import Analytics from "./component/placesManagement/Analytics";

const ROLES = {
  User: 2000,
  Admin: 5150,
};


function App() {
  return (
    <Router>
      <NavBar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
       
       {/* wishlist routes */}
        <Route path="/searchPlaces" element={<SearchPlaces />} />
        <Route path="/wishList" element={<WishList />} />
        <Route path="/updateNote/:placeName" element={<UpdateNote/>}/>
       

        <Route path="/profile" element={<Profile />} />
      


        <Route path="/addfavplace" element={<AddFavPlace />} />
        <Route path="/displayfav" element={<DisplayFavPlace />} />

        <Route path="/Exp" element={<Experience />} />
        <Route path="/addExp" element={<CreateExperience />} />
        <Route path="/updateExp/:id" element={<UpdateExperience />} />


        <Route path="/displayhidden" element={<DisplayHiddenSpecific />} />
        <Route path="/displayallhidden" element={<DisplayAllHidden />} />
        <Route path="/map" element={<Map />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/updateplace/:id" element={<UpdatePlace />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
      <Footer />
      <Routes>
        
      </Routes>
    </Router>
  );
}

export default App;