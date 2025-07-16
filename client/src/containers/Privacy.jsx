import { Paper, Grid, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
function Privacy() {
  return (
    <Paper className="menu-backdrop-tab">
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
      <Grid container item xs={10}>
        <Grid item>
          <Typography variant="h3">Privacy Policy</Typography>

          <Typography variant="h5">Data collection:</Typography>
          <Typography variant="body1">
            This app does not collect any personal data from users, does not use
            cookies, and does not track user activity.
          </Typography>
          <Typography variant="h5">Affiliation:</Typography>
          <Typography variant="body1">
            This is a fan-made project and is not affiliated with Capcom or
            Geoguessr. We respect your privacy and are committed to protecting
            your personal information.
          </Typography>

          <Typography variant="body2" style={{ fontSize: "1rem" }} color="#ccc">
            Effective as of June 2025
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Privacy;
