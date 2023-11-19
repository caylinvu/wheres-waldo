import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Header() {
  const [isPlaying, setIsPlaying] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/game')) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [location]);

  return (
    <div className="header">
      <Link to="/">
        <h1>Find the Things!</h1>
      </Link>
      {!isPlaying ? (
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
