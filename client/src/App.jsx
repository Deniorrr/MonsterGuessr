import PositionSelector from "./containers/PositionSelector";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./containers/Navbar";

function App() {
  return (
    <>
      <div>
        <h1>Monster guessr</h1>

        <BrowserRouter>
          <Routes>
            <Route index element={<Navbar />} />
            <Route path="about" element={<p>About</p>} />
            <Route path="Game" element={<PositionSelector />} />
            <Route path="*" element={<p>error 404</p>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
