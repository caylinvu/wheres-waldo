import './styles/App.css';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import { Outlet, useLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [lbEntries, setlbEntries] = useState([]);
  const [updateLeaderboard, setUpdateLeaderboard] = useState(false);
  const { games } = useLoaderData();
  const [lastlbKey, setLastlbKey] = useState(null);
  const [prevPath, setPrevPath] = useState(null);
  const [gameTimer, setGameTimer] = useState(0);

  useEffect(() => {
    const getlbData = async () => {
      try {
        const response = await fetch(
          'https://wheres-waldo-api-production.up.railway.app/api/entries',
        );
        if (!response.ok) {
          throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }
        const lbData = await response.json();
        setlbEntries(lbData);
      } catch (err) {
        setlbEntries([]);
        throw new Error('Failed to fetch leaderboard data');
      }
    };
    getlbData();
  }, [updateLeaderboard]);

  return (
    <>
      <ScrollToTop prevPath={prevPath} setPrevPath={setPrevPath} />
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
          prevPath,
          setPrevPath,
        }}
      />
    </>
  );
}

export default App;
