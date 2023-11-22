import './styles/App.css';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [games, setGames] = useState([]);
  const [lbEntries, setlbEntries] = useState([]);
  const [lbGame, setlbGame] = useState(null);
  const [updateLeaderboard, setUpdateLeaderboard] = useState(false);

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

  useEffect(() => {
    const getlbData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/entries');
        if (!response.ok) {
          throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }
        const lbData = await response.json();
        setlbEntries(lbData);
      } catch (err) {
        setlbEntries([]);
        console.log(err);
      }
    };
    getlbData();
  }, [updateLeaderboard]);

  return (
    <>
      <Header />
      <Outlet
        context={{ games, lbGame, setlbGame, updateLeaderboard, setUpdateLeaderboard, lbEntries }}
      />
    </>
  );
}

export default App;

// update display name on form requirements

// make things not selectable
// -- make text inside of target and dropdown untargetable
// -- full image not highlightable

// rearrange header stuff
// -- add timer and game items to header (access through params - key of game)

// access leaderboard pages through params too???

// credit image artist!!!

// make scroll to top when change route

// make responsive!!!

// does targetBox and dropdown need to be in state???

// add footer????

// REFACTOR CODE!!!!!!
