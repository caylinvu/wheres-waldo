import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <Link to="/">
        <h1>Find the Things!</h1>
      </Link>
      <div className="nav">
        <Link to="/leaderboard">
          <p>Leaderboard</p>
        </Link>
        <Link to="/about">
          <p>About</p>
        </Link>
      </div>
    </div>
  );
}

export default Header;
