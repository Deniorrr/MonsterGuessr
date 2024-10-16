import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="about" element={<p>About</p>} />
            <Route path="game" element={<GamePage />} />
            <Route path="*" element={<p>error 404</p>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
