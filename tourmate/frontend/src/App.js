import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddFavPlace from "./component/AddFavPlace";
import DisplayFavPlace from "./component/DisplayFavPlace";
import Test from "./component/Test";
import NavBar from "./component/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/addfavplace" element={<AddFavPlace />} />
        <Route path="/displayfav" element={<DisplayFavPlace />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;