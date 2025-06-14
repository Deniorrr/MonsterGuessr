import { Paper, Grid, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

function Privacy() {
  return (
    <Paper className="menu-backdrop-tab">
      <IconButton className="close-button" aria-label="close" size="large">
        <CloseIcon />
      </IconButton>
      <Grid container xs={10}>
        <Grid item>
          <Typography variant="h3">How to Play</Typography>
          <Typography variant="h5">Goal of the game:</Typography>
          <Typography variant="body1">
            The goal of the game is to guess the location of a screenshot from
            Monster Hunter World. The closer your guess is to the actual
            location, the more points you earn. The game ends after 5 rounds,
            after which your total score is displayed.
          </Typography>
          <Typography variant="h5">How to play:</Typography>
          <ol>
            <li>Inspect the screenshot</li>
            <li>
              Select the map and layer where you think the screenshot was taken
            </li>
            <li>Select a point on the map that you think is the location</li>
            <li>
              If you are satisfied with your choice, click the{" "}
              <span style={{ fontWeight: "bold", color: "#4fac27" }}>
                Guess
              </span>{" "}
              button
            </li>
          </ol>
          <Typography variant="h5">Scoring system</Typography>
          <Typography variant="body1">
            The scoring is based on the distance between your guess and the
            correct location. The closer your guess is, the more points you
            earn.
          </Typography>
          <Typography variant="body1">
            The maximum score for each round is 500 points. After guessing the
            wrong layer by 1 or 2, the score is reduced by 50% and 75%
            respectively. Guessing the wrong map results in 0 points.
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Privacy;
