import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PositionSubmitSelector from "./pages/PositionSubmitSelector";
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
            <Route path="easy" element={<GamePage easyMode />} />
            <Route path="submit" element={<PositionSubmitSelector />} />
            <Route path="*" element={<p>error 404</p>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;

//MY KANBAN BOARD:

//TODO:
// show better info after guessing: distance, correct location and layer
// change map to correct location after guessing
// create around 10 actual locations on ancient forest and wildspire waste
// test that thing
// create GameContext for storing everything
// animations: after guessing

//DONE:
