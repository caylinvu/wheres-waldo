import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-page">
      <h2>Games</h2>
      <div className="game-container">
        <div>
          <div className="game-img">
            <img src="/the-crumbling-creek.png" alt="" />
          </div>
          <div className="game-text">
            <p>The Crumbling Creek</p>
            <Link to="/game/1">Start Game</Link>
          </div>
        </div>
        <div>
          <div className="game-img">
            <img src="/midnight-metropolis.png" alt="" />
          </div>
          <div className="game-text">
            <p>Midnight Metropolis</p>
            <Link to="/game/2">Start Game</Link>
          </div>
        </div>
        <div>
          <div className="game-img">
            <img src="/concrete-jungle.png" alt="" />
          </div>
          <div className="game-text">
            <p>Concrete Jungle</p>
            <Link to="/game/3">Start Game</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
