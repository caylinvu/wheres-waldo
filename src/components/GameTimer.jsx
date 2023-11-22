import PropTypes from 'prop-types';

function GameTimer({ gameTimer }) {
  return <div className="game-timer">{new Date(gameTimer * 1000).toISOString().slice(11, 19)}</div>;
}

GameTimer.propTypes = {
  gameTimer: PropTypes.number,
};

export default GameTimer;
