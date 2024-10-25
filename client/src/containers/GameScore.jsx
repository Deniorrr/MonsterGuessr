import PropTypes from "prop-types";
import { Box, Typography, Backdrop, Grid, Paper } from "@mui/material";
import { useState } from "react";

GameScore.propTypes = {
  score: PropTypes.array.isRequired,
  questionAmount: PropTypes.number.isRequired,
  questionIndex: PropTypes.number.isRequired,
};

function GameScore(props) {
  const score = props.score;
  const questionAmount = props.questionAmount;
  const questionIndex = props.questionIndex;

  const [isScoreboardOpen, setIsScoreboardOpen] = useState(false);

  const handleBackdropClick = () => {
    console.log("clicked");
    setIsScoreboardOpen(false);
  };

  return (
    <>
      <Box className="game-score" onClick={() => setIsScoreboardOpen(true)}>
        <Typography variant="h6">
          Question: {questionIndex + 1} / {questionAmount}
        </Typography>
        <Typography variant="h6">
          Score: {score.reduce((acc, curr) => acc + curr, 0)} /{" "}
          {score.length * 500}
        </Typography>
      </Box>
      <Backdrop
        style={{
          cursor: "pointer",
        }}
        sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })}
        open={isScoreboardOpen}
        onClick={handleBackdropClick}
      >
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "30px",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            border: "2px solid #2e7e0b",
            boxShadow: "0px 2px 15px 0px #2e7e0b",
          }}
        >
          <Typography variant="h4" textAlign={"center"} marginBottom={2}>
            Scoreboard
          </Typography>
          <Grid
            container
            style={{
              borderBottom: "1px solid #2e7e0b",
            }}
          >
            <Grid item xs={6}>
              <Typography variant="h6" textAlign={"center"}>
                Round
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" textAlign={"center"}>
                Score
              </Typography>
            </Grid>
          </Grid>
          {score.map((scoreItem, index) => {
            return (
              <Grid
                container
                key={index}
                style={{
                  borderTop: "1px solid #2e7e0b",
                }}
              >
                <Grid item xs={6}>
                  <Typography variant="h6" textAlign={"center"}>
                    {index + 1}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" textAlign={"center"}>
                    {scoreItem.toFixed(3)}
                  </Typography>
                </Grid>
              </Grid>
            );
          })}
          <Grid
            container
            style={{
              borderTop: "1px solid #2e7e0b",
            }}
          >
            <Grid item xs={6}>
              <Typography variant="h6" textAlign={"center"}>
                TOTAL
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" textAlign={"center"}>
                {score.reduce((acc, curr) => acc + curr, 0).toFixed(3)}
              </Typography>
            </Grid>
          </Grid>
          {/* Total Score: {score.reduce((acc, curr) => acc + curr, 0)} /{" "}
            {score.length * 500}
          <ul>
            {score.map((score, index) => {
              return <li key={index}>{score}</li>;
            })}
          </ul> */}
        </Paper>
      </Backdrop>
    </>
  );
}

export default GameScore;
