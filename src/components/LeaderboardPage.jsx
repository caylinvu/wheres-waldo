import { useOutletContext, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function LeaderboardPage() {
  const { games, lbGame, setlbGame } = useOutletContext();
  const { state } = useLocation();
  console.log(lbGame);

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
      <h2 className="lb-game-title">{lbGame.title}</h2>
      <div className="leaderboard-container"></div>
    </div>
  );
}

export default LeaderboardPage;
