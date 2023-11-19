import { Link, useOutletContext, useNavigate } from 'react-router-dom';

function HomePage() {
  const { games } = useOutletContext();

  // maybe change link to button with useNavigate and set currentGame/isPlaying when click

  return (
    <div className="home-page">
      <h2>Games</h2>
      <div className="game-container">
        {games.map((game) => {
          return (
            <div key={game.key}>
              <div className="game-img">
                <img src={'http://localhost:3000/api/img/games/' + game._id} alt="" />
              </div>
              <div className="game-text">
                <p>{game.title}</p>
                <Link to={'/game/' + game.key} state={{ game: game }}>
                  Start Game
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
