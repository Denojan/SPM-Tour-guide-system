import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddFavPlace from "./component/AddFavPlace";
import DisplayFavPlace from "./component/DisplayFavPlace";
import SearchPlaces from "./component/SearchPlaces";
import WishList from "./component/WishList";
import NavBar from "./component/NavBar";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/addfavplace" element={<AddFavPlace />} />
        <Route path="/displayfav" element={<DisplayFavPlace />} />
        <Route path="/searchPlaces" element={<SearchPlaces />} />
        <Route path="/wishList" element={<WishList />} />
        <Route path="/navbar"  element={<NavBar/>}/>
       
     
      </Routes>
    </Router>
  );
}

export default App;