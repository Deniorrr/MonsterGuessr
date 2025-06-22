import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PositionSubmitSelector from "./pages/SubmitPosition";
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
            <Route path="privacy" element={<p>PRIVACY</p>} />
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

//MY KANBAN BOARD :)

//NEXT:
// secure the submit location page on backend!!!!!!!!!!

//TODO:
// add actual codes for admins
//
// store the first 2 letters of userID in db : add column to db
// check overall security of the app, check XSS, CSRF, CORS, SQL injection, etc.
// create around 10 actual locations on ancient forest and wildspire waste
// test that thing
// animations: after guessing

//DONE:
// checked XSS, CSRF, CORS and SQL injection
// hide submit location for normal users
// proper scoring system
// show result after guessing as a table selected location vs correct location
// create GameContext for storing everything
// show better info after guessing: distance, correct location and layer
// change map to correct location after guessing
