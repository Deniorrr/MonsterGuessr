import { Box, Typography, Backdrop, Grid, Paper, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGame } from "../contexts/GameContext";

function GameScore() {
  const { score, QUESTION_AMOUNT, questionIndex, isGameOver } = useGame();

  const [isScoreboardOpen, setIsScoreboardOpen] = useState(false);

  const handleBackdropClick = () => {
    if (isGameOver) return;
    setIsScoreboardOpen(false);
  };

  const handleNextGameClick = () => {
    window.location.reload();
  };

  const renderGameOverScreen = () => {
    return (
      <Box marginBottom={5}>
        <Typography variant="h4" textAlign={"center"} marginBottom={2}>
          Your final score:
        </Typography>
        <Typography variant="h4" textAlign={"center"} marginBottom={2}>
          <span style={{ fontWeight: "bold", color: "#2e7e0b" }}>
            {score.reduce((acc, curr) => acc + curr, 0)}{" "}
          </span>
          / {score.length * 500}
        </Typography>
        <Button
          onClick={handleNextGameClick}
          variant="contained"
          style={{ margin: "5px" }}
        >
          Next Game
        </Button>
        <Button
          component={Link}
          to="/"
          variant="contained"
          style={{ margin: "5px" }}
        >
          Go to menu
        </Button>
      </Box>
    );
  };

  useEffect(() => {
    if (isGameOver) {
      setIsScoreboardOpen(true);
    }
  }, [isGameOver]);

  return (
    <>
      <Box className="game-score-wrapper">
        <Box className="game-score" display={"flex"} alignItems={"center"}>
          <Box className="game-score-item">
            <Typography variant="h6">Question</Typography>
            <Typography variant="h5">
              {questionIndex + 1} / {QUESTION_AMOUNT}
            </Typography>
          </Box>
          <Box className="game-score-item">
            <Typography variant="h6">Score</Typography>
            <Typography variant="h5">
              {score.reduce((acc, curr) => acc + curr, 0)} /{" "}
              {score.length * 500}
            </Typography>
          </Box>
          <Box
            className="game-score-item"
            display={"flex"}
            justifyContent={"center"}
          >
            <Box>
              <Button
                variant="contained"
                onClick={() => setIsScoreboardOpen(true)}
                style={{ margin: "5px" }}
              >
                Details
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Backdrop
        style={{
          cursor: "pointer",
        }}
        sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })}
        open={isScoreboardOpen}
        onClick={handleBackdropClick}
        className="game-score-backdrop"
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
          {isGameOver ? (
            renderGameOverScreen()
          ) : (
            <Typography variant="h4" textAlign={"center"} marginBottom={2}>
              Scoreboard
            </Typography>
          )}
          <Grid container>
            <Grid
              item
              xs={6}
              style={{
                borderBottom: "1px solid #2e7e0b",
              }}
            >
              <Typography variant="h6" textAlign={"center"} color="#bbbbbb">
                Round
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              style={{
                borderBottom: "1px solid #2e7e0b",
              }}
            >
              <Typography variant="h6" textAlign={"center"} color="#bbbbbb">
                Score
              </Typography>
            </Grid>
          </Grid>
          {score.map((scoreItem, index) => {
            return (
              <Grid container key={index}>
                <Grid
                  item
                  xs={6}
                  style={{
                    borderTop: "1px solid #2e7e0b",
                  }}
                >
                  <Typography variant="h6" textAlign={"center"}>
                    {index + 1}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{
                    borderTop: "1px solid #2e7e0b",
                  }}
                >
                  <Typography variant="h6" textAlign={"center"}>
                    {scoreItem}
                  </Typography>
                </Grid>
              </Grid>
            );
          })}
          <Grid
            container
            style={{
              paddingTop: "16px",
            }}
            display={isGameOver ? "none" : "flex"}
          >
            <Grid item xs={6}>
              <Typography variant="h5" textAlign={"center"}>
                TOTAL
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" textAlign={"center"} fontWeight={"bold"}>
                {score.reduce((acc, curr) => acc + curr, 0)}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Backdrop>
    </>
  );
}

export default GameScore;
