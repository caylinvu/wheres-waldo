import './styles/App.css';
import Header from './components/Header';
import { Outlet, useLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  // const [games, setGames] = useState([]);
  const [lbEntries, setlbEntries] = useState([]);
  const [lbGame, setlbGame] = useState(null);
  const [updateLeaderboard, setUpdateLeaderboard] = useState(false);
  const { games } = useLoaderData();

  // useEffect(() => {
  //   const getGameData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3000/api/games');
  //       if (!response.ok) {
  //         throw new Error(`This is an HTTP error: The status is ${response.status}`);
  //       }
  //       const gameData = await response.json();
  //       // console.log(gameData);
  //       setGames(gameData);
  //       setlbGame(gameData[0]);
  //     } catch (err) {
  //       setGames([]);
  //       setlbGame(null);
  //       console.log(err);
  //     }
  //   };
  //   getGameData();
  // }, []);

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

// make leaderboard data based off of params also
// move item/timer components to header and pull info from path

// add error page to router

// Target box/dropdown - break out into functions to show/hide (set to state) MAYBE
// do target box and dropdown need to be in state??

// reformat time in endpopup

// credit image artist!!!

// make scroll to top when change route

// add footer????

// make responsive!!!
