import { useOutletContext } from 'react-router-dom';
import GameContainer from './GameContainer';

function HomePage() {
  const { games } = useOutletContext();

  return (
    <div className="home-page">
      <h2>Games</h2>
      <GameContainer page="home" games={games} />
    </div>
  );
}

export default HomePage;
