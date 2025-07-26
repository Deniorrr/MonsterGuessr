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
