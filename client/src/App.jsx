import "./styles/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SubmitPosition from "./pages/SubmitPosition";
import NotFound404 from "./pages/NotFound404";
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
            <Route path="game" element={<GamePage />} />
            <Route path="easy" element={<GamePage easyMode />} />
            <Route path="submit" element={<SubmitPosition />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;

//MY KANBAN BOARD :)

//NEXT:

//TODO:
// separate css
// divide backend

//DONE:
// add loading screen to question image
// add github link to footer
// add favicon
// test that thing
// fix routing
// secure the submit location page on backend!!!!!!!!!!
// add actual codes for admins
// display the image of the location while submitting
// can drag image to submit location
// dont change the map after submitting a location
// create around 10 actual locations on ancient forest and wildspire waste
// store the first 2 letters of userID in db : add column to db
// preload all images on start to RAM
// checked XSS, CSRF, CORS and SQL injection
// hide submit location for normal users
// proper scoring system
// show result after guessing as a table selected location vs correct location
// create GameContext for storing everything
// show better info after guessing: distance, correct location and layer
// change map to correct location after guessing

//MAYBE:
// animations: after guessing
