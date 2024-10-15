import { Container, Grid, Box, Typography, Paper } from "@mui/material";
import Navbar from "../containers/Navbar";
import BackgroundImage from "../assets/background.jpg";
import { styled } from "@mui/material/styles";

function Home() {
  const DarkPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: "center",
  }));

  return (
    <Box
      className="container-wrapper"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container
        fixed
        maxWidth="xl"
        style={{
          height: "100vh",
        }}
      >
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
    </Box>
  );
}

export default Home;
