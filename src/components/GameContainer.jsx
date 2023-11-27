import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import PropTypes from 'prop-types';
import GameImage from './GameImage';

function GameContainer({ page, games, lbGame }) {
  const { setGameTimer } = useOutletContext();
  const navigate = useNavigate();

  return (
    <div className="game-container">
      {games.map((game) => {
        return (
          <div
            key={game.key}
            className={
              page === 'leaderboard'
                ? lbGame._id === game._id
                  ? 'lb-games selected'
                  : 'lb-games'
                : ''
            }
            onClick={page === 'leaderboard' ? () => navigate('/leaderboard/' + game.key) : null}
          >
            <div className="game-img">
              <GameImage game={game} />
            </div>
            <div className="game-text">
              <p>{game.title}</p>
              {page === 'home' ? (
                <Link to={'/game/' + game.key} onClick={() => setGameTimer(0)}>
                  Start Game
                </Link>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

GameContainer.propTypes = {
  page: PropTypes.string,
  games: PropTypes.array,
  lbGame: PropTypes.object,
};

export default GameContainer;
