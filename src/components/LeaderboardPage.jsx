import { useOutletContext, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import GameContainer from './GameContainer';
import LeaderboardEntries from './LeaderboardEntries';

function LeaderboardPage() {
  const { games, lbGame, setlbGame, lbEntries } = useOutletContext();
  // const [gameEntries, setGameEntries] = useState([]);
  const { state } = useLocation();

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
      {lbGame && <LeaderboardEntries lbEntries={lbEntries} lbGame={lbGame} />}
    </div>
  );
}

export default LeaderboardPage;
