import { useOutletContext, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import GameContainer from './GameContainer';

function LeaderboardPage() {
  const { games, lbGame, setlbGame, lbEntries } = useOutletContext();
  // const [gameEntries, setGameEntries] = useState([]);
  const { state } = useLocation();
  let placeCounter = 1;

  useEffect(() => {
    if (state) {
      setlbGame(state);
    }
  }, [state]);

  // maybe set up params on leaderboard so that info can be retrieved more easily

  return (
    <div className="leaderboard-page">
      <h2 className="lb-title">Leaderboard</h2>
      <GameContainer page="leaderboard" games={games} lbGame={lbGame} setlbGame={setlbGame} />
      {lbGame && (
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
      )}
    </div>
  );
}

export default LeaderboardPage;
