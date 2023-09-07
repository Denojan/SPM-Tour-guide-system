import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddFavPlace from "./component/AddFavPlace";
import DisplayFavPlace from "./component/DisplayFavPlace";
import Map from "./component/Map";
import NavBar from "./component/NavBar";
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
        <Route path="/addfavplace" element={<AddFavPlace />} />
        <Route path="/displayfav" element={<DisplayFavPlace />} />
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