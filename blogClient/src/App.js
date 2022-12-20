import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Login from "./components/Login";

import "./App.css"
import Signup from "./components/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={<Login/>}/>
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </Router>
  );
}

export default App;
