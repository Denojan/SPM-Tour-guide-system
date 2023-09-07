import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddFavPlace from "./component/AddFavPlace";
import DisplayFavPlace from "./component/DisplayFavPlace";
import Experience from "./component/Experience";
import CreateExperience from "./component/CreateExperience";
import UpdateExperience from "./component/UpdateExperience";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/addfavplace" element={<AddFavPlace />} />
        <Route path="/displayfav" element={<DisplayFavPlace />} />
        <Route path="/Exp" element={<Experience />} />
        <Route path="/addExp" element={<CreateExperience />} />
        <Route path="/updateExp/:id" element={<UpdateExperience />} />



      </Routes>
    </Router>
  );
}

export default App;