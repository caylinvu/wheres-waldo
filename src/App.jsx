import './styles/App.css';
import Header from './components/Header';
import { Outlet, useLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [lbEntries, setlbEntries] = useState([]);
  const [updateLeaderboard, setUpdateLeaderboard] = useState(false);
  const { games } = useLoaderData();
  const [lastlbKey, setLastlbKey] = useState(null);
  const [gameTimer, setGameTimer] = useState(0);

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
      <Header games={games} lastlbKey={lastlbKey} gameTimer={gameTimer} />
      <Outlet
        context={{
          games,
          updateLeaderboard,
          setUpdateLeaderboard,
          lbEntries,
          setLastlbKey,
          gameTimer,
          setGameTimer,
        }}
      />
    </>
  );
}

export default App;

// credit image artist!!!

// make scroll to top when change route

// add error page to router

// add footer????

// make responsive!!!
// --mostly header

// publish backend

// publish frontend
