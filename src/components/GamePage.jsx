import { useParams } from 'react-router-dom';

function GamePage() {
  const { gameId } = useParams();

  return (
    <div className="game-page">
      <div>GAME PAGE {gameId}</div>
    </div>
  );
}

export default GamePage;
