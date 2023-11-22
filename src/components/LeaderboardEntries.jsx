import PropTypes from 'prop-types';

function LeaderboardEntries({ lbEntries, lbGame }) {
  let placeCounter = 1;

  return (
    <>
      <h2 className="lb-game-title">{lbGame.title}</h2>
      <div className="leaderboard-container">
        <div className="lb-entry labels">
          <p>Place</p>
          <p>Name</p>
          <p>Time</p>
          <p>Date</p>
        </div>
        {lbEntries
          .filter((entry) => entry.game === lbGame._id)
          .map((entry) => {
            return (
              <div key={entry._id} className="lb-entry">
                <p>{placeCounter++}</p>
                <p>{entry.name}</p>
                <p>
                  {entry.seconds < 3600
                    ? new Date(entry.seconds * 1000).toISOString().slice(14, 19)
                    : new Date(entry.seconds * 1000).toISOString().slice(11, 19)}
                </p>
                <p>{new Date(entry.timestamp).toLocaleDateString()}</p>
              </div>
            );
          })}
      </div>
    </>
  );
}

LeaderboardEntries.propTypes = {
  lbEntries: PropTypes.array,
  lbGame: PropTypes.object,
};

export default LeaderboardEntries;
