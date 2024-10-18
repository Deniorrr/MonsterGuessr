import { Container, Grid, Box, Typography, Paper } from "@mui/material";
import Navbar from "../containers/Navbar";
import BackgroundImage from "../assets/background_dark.jpg";

import logo from "../assets/logo.png";

function Home() {
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
            <Navbar />
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
                <h3>Monster Hunter Guessr</h3>
                <figure className="logo-wrapper">
                  <img src={logo} alt="logo" className="logo"></img>
                </figure>
                <Typography variant={"body1"} padding={3} paddingTop={0}>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit
                  laudantium nulla molestias ab quibusdam voluptate voluptatem
                  corporis ipsa quaerat sequi? Vel, doloribus architecto? Dolor
                  unde neque quo soluta, consequuntur autem fugiat odit
                  molestiae saepe beatae eos ut? Ex, ratione sunt deserunt dicta
                  reprehenderit voluptatum odit provident, adipisci, sed sint a
                  autem quas? Sed inventore ex, soluta provident consequatur
                  explicabo totam qui impedit! Odit obcaecati corrupti minima
                  hic aspernatur! Rerum exercitationem minus magni, nobis
                  impedit dolorum dignissimos consequuntur sapiente officia
                  dolore rem? Temporibus harum, voluptatibus repudiandae,
                  aliquam sint doloremque perferendis tempora, inventore
                  repellendus quaerat nemo blanditiis reiciendis earum
                  cupiditate numquam maxime!
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
    </Box>
  );
}

export default Home;
