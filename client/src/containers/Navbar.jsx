import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <button>Home</button>
          </Link>
        </li>
        <li>
          <Link to="/about">
            <button>About</button>
          </Link>
        </li>
        <li>
          <Link to="/Game">
            <button>Game</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
