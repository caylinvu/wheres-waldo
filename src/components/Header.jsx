import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import GameTimer from './GameTimer';
import GameItems from './GameItems';

function Header({ games, lastlbKey, gameTimer }) {
  const { gameKey } = useParams();
  const game = games.find((obj) => obj.key == gameKey);

  return (
    <div className="header">
      <Link to="/">
        <h1>Find the Things!</h1>
      </Link>
      {!gameKey ? (
        <div className="nav">
          <Link to={lastlbKey ? '/leaderboard/' + lastlbKey : '/leaderboard/1'}>
            <p>Leaderboard</p>
          </Link>
          <Link to="/about">
            <p>About</p>
          </Link>
        </div>
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
