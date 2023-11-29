import { Link, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GameTimer from './GameTimer';
import GameItems from './GameItems';

function Header({ games, lastlbKey, gameTimer }) {
  const { gameKey } = useParams();
  const game = games.find((obj) => obj.key == gameKey);
  const [showMenu, setShowMenu] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const location = useLocation();

  // Close menus if window is resized
  useEffect(() => {
    window.addEventListener('resize', () => {
      setShowMenu(false);
      setShowItems(false);
    });

    return () => {
      window.removeEventListener('resize', () => {
        setShowMenu(false);
        setShowItems(false);
      });
    };
  });

  // Close menus if route changes
  useEffect(() => {
    setShowMenu(false);
    setShowItems(false);
  }, [location]);

  // Close menus when clicking on page outside of menu
  const handleCloseDropdown = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setShowMenu(false);
      setShowItems(false);
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <h1>Find the Things!</h1>
      </Link>
      {!gameKey ? (
        <div onBlur={(e) => handleCloseDropdown(e)}>
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
        </div>
      ) : (
        <>
          <GameTimer gameTimer={gameTimer} />
          <div onBlur={(e) => handleCloseDropdown(e)}>
            <GameItems
              items={game.items}
              type="items-to-find"
              divClass={showItems ? 'show' : null}
              itemClass="item"
            />
            <div id="item-count" onClick={() => setShowItems(!showItems)} tabIndex={0}></div>
          </div>
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
