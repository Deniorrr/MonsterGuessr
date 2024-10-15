import { Container, Grid, Box, Typography, Paper } from "@mui/material";
import Navbar from "../containers/Navbar";
import BackgroundImage from "../assets/background_dark.jpg";
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function Home() {
  const DarkPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: "center",
  }));

  return (
    <ThemeProvider theme={darkTheme}>
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

            <Grid item xs={6} display={"flex"} marginTop={10}>
              <Box component="header" width={"100%"}>
                <DarkPaper>
                  <Typography variant="h3" style={{ textAlign: "center" }}>
                    MH Guessr
                  </Typography>
                </DarkPaper>
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
    </ThemeProvider>
  );
}

export default Home;
