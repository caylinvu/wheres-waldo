import { Link, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GameTimer from './GameTimer';
import GameItems from './GameItems';

function Header({ games, lastlbKey, gameTimer }) {
  const { gameKey } = useParams();
  const game = games.find((obj) => obj.key == gameKey);
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setShowMenu(false);
    });

    return () => {
      window.removeEventListener('resize', () => {
        setShowMenu(false);
      });
    };
  });

  useEffect(() => {
    setShowMenu(false);
  }, [location]);

  return (
    <div className="header">
      <Link to="/">
        <h1>Find the Things!</h1>
      </Link>
      {!gameKey ? (
        <>
          <div className={showMenu ? 'nav show' : 'nav'}>
            <Link to={lastlbKey ? '/leaderboard/' + lastlbKey : '/leaderboard/1'}>
              <p>Leaderboard</p>
            </Link>
            <Link to="/about">
              <p>About</p>
            </Link>
          </div>
          <button className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
            <img src="/menu.svg" alt="" />
          </button>
        </>
      ) : (
        <>
          <GameTimer gameTimer={gameTimer} />
          <GameItems items={game.items} type="items-to-find" itemClass="item" />
        </>
      )}
    </div>
  );
}

Header.propTypes = {
  games: PropTypes.array,
  lastlbKey: PropTypes.string,
  gameTimer: PropTypes.number,
};

export default Header;
