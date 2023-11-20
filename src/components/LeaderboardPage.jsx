import { useOutletContext, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function LeaderboardPage() {
  const { games, lbGame, setlbGame, lbEntries } = useOutletContext();
  const [gameEntries, setGameEntries] = useState([]);
  const { state } = useLocation();
  let placeCounter = 1;
  console.log(lbGame);

  // maybe set up params on leaderboard so that info can be retrieved more easily

  return (
    <div className="leaderboard-page">
      <h2 className="lb-title">Leaderboard</h2>
      <div className="game-container">
        {games.map((game) => {
          return (
            <div
              key={game.key}
              className={lbGame._id === game._id ? 'lb-games selected' : 'lb-games'}
              onClick={() => setlbGame(game)}
            >
              <div className="game-img">
                <img src={'http://localhost:3000/api/img/games/' + game._id} alt="" />
              </div>
              <div className="game-text">
                <p>{game.title}</p>
              </div>
            </div>
          );
        })}
      </div>
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
                    <p>{new Date(entry.seconds * 1000).toISOString().slice(14, 19)}</p>
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
