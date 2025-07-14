import image404 from "../assets/404.png";
import { Box, Button, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";

function NotFound404() {
  return (
    <>
      <div
        style={{
          height: "100vh",
          backgroundImage: `url(${image404})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Box
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "30vh",
          }}
        >
          <Link
            to="/"
            style={{ textDecoration: "none", color: "#2e7e0b" }}
            component="button"
            variant="contained"
            color="primary"
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{
                fontSize: "1.5rem",
              }}
            >
              Go back home
            </Button>
          </Link>
        </Box>
      </div>
      <Box
        component={"footer"}
        textAlign={"center"}
        padding={2}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          borderTop: "2px solid #2e7e0b",
          boxShadow: "0px -2px 15px 0px #2e7e0b",
          position: "fixed",
          width: "100%",
          left: 0,
          bottom: 0,
        }}
      >
        <Typography variant={"body2"} fontWeight={"bold"}>
          © 2025 MH Guessr
        </Typography>
        <a
          href="https://github.com/Deniorrr"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "absolute",
            right: 24,
            top: "50%",
            transform: "translateY(-50%)",
            color: "white",
            textDecoration: "none",
          }}
          aria-label="GitHub repository"
        >
          <GitHubIcon fontSize="large" />
        </a>
      </Box>
    </>
  );
}

export default NotFound404;
