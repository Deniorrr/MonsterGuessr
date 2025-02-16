import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PositionSubmitSelector from "./containers/PositionSubmitSelector";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2e7e0b",
      light: "#57973b",
      dark: "#205807",
    },
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
            <Route path="submit" element={<PositionSubmitSelector />} />
            <Route path="*" element={<p>error 404</p>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;

//TODO:
// show better info after guessing: distance, correct location and layer
