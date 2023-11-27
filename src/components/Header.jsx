import { Link, useParams } from 'react-router-dom';

function Header() {
  const { gameKey } = useParams();

  return (
    <div className="header">
      <Link to="/">
        <h1>Find the Things!</h1>
      </Link>
      {!gameKey ? (
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
