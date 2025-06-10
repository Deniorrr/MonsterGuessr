import { Container, Grid, Box, Typography, Paper } from "@mui/material";
import { List, ListItem, Backdrop } from "@mui/material";
import { Link } from "react-router-dom";
import BackgroundImage from "../assets/background_dark.jpg";
import { useState } from "react";

import logo from "../assets/logo.png";
import Privacy from "../containers/Privacy";

function Home() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const pages = {
    game: "Normal Game",
    easy: "Easy Mode",
    submit: "Submit Location",
    HowToPlay: "How to Play",
    privacy: "Privacy",
  };

  const generateNavItems = () => {
    return Object.keys(pages).map((page, index) => {
      const delay = `${index * 0.1}s`;
      if (page === "privacy") {
        return (
          <ListItem
            key={page}
            style={{
              opacity: 0,
              animation: `fadeInLeft 0.4s forwards ${delay}`,
            }}
          >
            <span
              className="serif_font navItem"
              style={{ cursor: "pointer" }}
              onClick={() => setIsPrivacyOpen(true)}
            >
              {pages[page]}
            </span>
          </ListItem>
        );
      }
      return (
        <ListItem
          key={page}
          style={{ opacity: 0, animation: `fadeInLeft 0.4s forwards ${delay}` }}
        >
          <Link to={`/${page}`} className="serif_font">
            {pages[page]}
          </Link>
        </ListItem>
      );
    });
  };

  return (
    <Box
      className="container-wrapper"
      style={{
        height: "100vh",
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      display={"grid"}
      gridTemplateRows={"1fr auto"}
    >
      <Container fixed maxWidth="xl">
        <Grid container style={{ height: "100%" }}>
          <Grid item xs={6} display={"flex"} alignItems={"center"}>
            <nav>
              <List dense={"dense"}>{generateNavItems()}</List>
            </nav>
          </Grid>

          <Grid item xs={6} display={"flex"} alignItems={"center"}>
            <Box
              component="header"
              width={"100%"}
              style={{ opacity: 0, animation: `fadeInTop 0.5s forwards` }}
            >
              <Paper
                style={{
                  padding: "1rem",
                  textAlign: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "2px solid #2e7e0b",
                  boxShadow: "0px 2px 15px 0px #2e7e0b",
                }}
              >
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <h3 className="title">Monster Hunter Guessr</h3>
                  <figure className="logo-wrapper">
                    <img src={logo} alt="logo" className="logo"></img>
                  </figure>
                </Box>
                <Typography variant={"body1"} padding={3} paddingTop={0}>
                  Welcome to Monster Hunter Guessr! Test your knowledge of
                  <span style={{ fontWeight: "bold" }}>
                    &nbsp;Monster Hunter World&nbsp;
                  </span>
                  by guessing the location of the screenshot. The closer your
                  guess, the more points you earn. Good luck!
                </Typography>
                <Typography variant={"body1"} padding={3} paddingTop={0}>
                  This is a fan made project and is not affiliated with Capcom
                  nor Geoguessr.
                </Typography>
                <Typography variant={"body1"} padding={3} paddingTop={0}>
                  Project created by: Deniorr
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box
        component={"footer"}
        textAlign={"center"}
        padding={2}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          borderTop: "2px solid #2e7e0b",
          boxShadow: "0px -2px 15px 0px #2e7e0b",
        }}
      >
        <Typography variant={"body2"} fontWeight={"bold"}>
          © 2024 MH Guessr
        </Typography>
      </Box>
      {/* Privacy backdrop */}
      <Backdrop
        style={{
          cursor: "pointer",
          backgroundColor: "rgba(0, 0, 0, 0.80)",
        }}
        open={isPrivacyOpen}
        onClick={() => setIsPrivacyOpen(false)}
      >
        <Privacy />
      </Backdrop>
    </Box>
  );
}

export default Home;
