import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function GameContainer({ page, games, lbGame, setlbGame }) {
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
            onClick={page === 'leaderboard' ? () => setlbGame(game) : null}
          >
            <div className="game-img">
              <img
                src={'http://localhost:3000/api/img/games/' + game._id}
                alt=""
                draggable={false}
              />
            </div>
            <div className="game-text">
              <p>{game.title}</p>
              {page === 'home' ? (
                <Link to={'/game/' + game.key} state={{ game: game }}>
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
  setlbGame: PropTypes.func,
};

export default GameContainer;
