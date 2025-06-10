import { Paper, Grid, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
function Privacy() {
  return (
    <Paper
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "700px",
        padding: "20px",
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        border: "2px solid #2e7e0b",
        boxShadow: "0px 2px 15px 0px #2e7e0b",
      }}
    >
      <IconButton
        aria-label="close"
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "#fff",
        }}
        size="large"
      >
        <CloseIcon />
      </IconButton>
      <Grid container spacing={2} justifyContent="center" xs={10}>
        <Grid item>
          <Typography
            variant="h3"
            gutterBottom
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            Privacy Policy
          </Typography>
          <Typography variant="body1" marginBottom={"30px"}>
            Effective as of June 2025
          </Typography>
          <Typography
            variant="h5"
            paragraph
            fontWeight={"bold"}
            marginBottom={"8px"}
          >
            Data collection:
          </Typography>
          <Typography
            variant="body1"
            style={{ fontSize: "1.125rem" }}
            marginBottom={"20px"}
            paragraph
          >
            This app does not collect any personal data from users, does not use
            cookies, and does not track user activity.
          </Typography>
          <Typography
            variant="h5"
            paragraph
            fontWeight={"bold"}
            marginBottom={"8px"}
          >
            Affiliation:
          </Typography>
          <Typography
            variant="body1"
            style={{ fontSize: "1.125rem" }}
            marginBottom={"20px"}
            paragraph
          >
            This is a fan-made project and is not affiliated with Capcom or
            Geoguessr. We respect your privacy and are committed to protecting
            your personal information.
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Privacy;
