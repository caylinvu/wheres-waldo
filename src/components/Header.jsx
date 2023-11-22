import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  return (
    <div className="header">
      <Link to="/">
        <h1>Find the Things!</h1>
      </Link>
      {!location.pathname.includes('/game') ? (
        <div className="nav">
          <Link to="/leaderboard">
            <p>Leaderboard</p>
          </Link>
          <Link to="/about">
            <p>About</p>
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export default Header;
