import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="about" element={<p>About</p>} />
          <Route path="game" element={<GamePage />} />
          <Route path="*" element={<p>error 404</p>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
