import { Link } from "react-router-dom";
import { List, ListItem } from "@mui/material";

function Navbar() {
  const pages = {
    game: "Normal Game",
    easy: "Easy Mode",
    submit: "Submit Location",
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
          style={{ opacity: 0, animation: `fadeInLeft 0.4s forwards ${delay}` }}
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
      <List dense={"dense"}>{generateListItems()}</List>
    </nav>
  );
}

export default Navbar;
