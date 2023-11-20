import './styles/App.css';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [games, setGames] = useState([]);
  const [lbGame, setlbGame] = useState(null);

  useEffect(() => {
    const getGameData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/games');
        if (!response.ok) {
          throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }
        const gameData = await response.json();
        setGames(gameData);
        setlbGame(gameData[0]);
      } catch (err) {
        setGames([]);
        setlbGame(null);
        console.log(err);
      }
    };
    getGameData();
  }, []);

  return (
    <>
      <Header />
      <Outlet context={{ games, lbGame, setlbGame }} />
    </>
  );
}

export default App;

// add popup to add name to leaderboard when game is over

// display time and request name in pop up

// add leaderboard

// edit dropdown to adjust placement based on # of items remaining (only Y axis lower half)
// RESTRUCTURE whole dropdown system so that it is based on a big switch statement

// if smaller screen add larger hit range
// -- maybe change to add +/- 40-50 to the actual coordinates and then convert to natural
// convert 50 local coords to nat and use in handleSelectItem

// make things not selectable
// -- make text inside of target and dropdown untargetable
// -- full image not highlightable

// rearrange header stuff

// credit image artist!!!

// make scroll to top when change route

// make responsive!!!

// does targetBox and dropdown need to be in state???

// add footer????
