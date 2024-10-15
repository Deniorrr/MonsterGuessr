import { Link } from "react-router-dom";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

function Navbar() {
  const pages = {
    game: "Normal Game",
    easy: "Easy Mode",
    settings: "Settings",
    privacy: "Privacy",
    about: "About",
  };

  const generateListItems = () => {
    return Object.keys(pages).map((page, index) => {
      const delay = `${index * 0.1}s`;
      return (
        <ListItem
          key={page}
          style={{ opacity: 0, animation: `fadeIn 0.4s forwards ${delay}` }}
        >
          <Link to={`/${page}`} className="serif_font">
            {pages[page]}
          </Link>
        </ListItem>
      );
    });
  };

  return (
    <nav>
      <List dense={"dense"}>
        {generateListItems()}
        {/* <ListItem>
          <Link to="/game">
            <Typography>Normal Game</Typography>
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/game">
            <Typography>Easy Mode</Typography>
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/settings">
            <Typography>Settings</Typography>
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/privacy">
            <Typography>Privacy</Typography>
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/about">
            <Typography>About</Typography>
          </Link>
        </ListItem> */}
      </List>
    </nav>
  );
}

export default Navbar;
