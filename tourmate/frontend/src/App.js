import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddFavPlace from "./component/AddFavPlace";
import DisplayFavPlace from "./component/DisplayFavPlace";
import DisplayPackageDetails from "./component/DisplayPackageDetails";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/addfavplace" element={<AddFavPlace />} />
        <Route path="/displayfav" element={<DisplayFavPlace />} />
        <Route path="/displayPackage" element={<DisplayPackageDetails />} />
     
      </Routes>
    </Router>
  );
}

export default App;