import PropTypes from 'prop-types';
import EntryForm from './EntryForm';

function EndPopup({ game, gameTimer }) {
  return (
    <div className="popup-container">
      <div className="blocker"></div>
      <div className="end-container">
        <div className="end-popup">
          <p className="timer-text">{'You finished in ' + gameTimer + 's!'}</p>
          <p>Submit your score to the leaderboard</p>
          <EntryForm game={game} gameTimer={gameTimer} />
        </div>
      </div>
    </div>
  );
}

EndPopup.propTypes = {
  game: PropTypes.object,
  gameTimer: PropTypes.number,
};

export default EndPopup;
