import './styles/App.css';
import Header from './components/Header';
import { Outlet, useLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [lbEntries, setlbEntries] = useState([]);
  const [updateLeaderboard, setUpdateLeaderboard] = useState(false);
  const { games } = useLoaderData();
  const [lastlbKey, setLastlbKey] = useState(null);

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
      <Header lastlbKey={lastlbKey} />
      <Outlet
        context={{ games, updateLeaderboard, setUpdateLeaderboard, lbEntries, setLastlbKey }}
      />
    </>
  );
}

export default App;

// move item/timer components to header and pull info from path

// add error page to router

// Target box/dropdown - break out into functions to show/hide (set to state) MAYBE
// do target box and dropdown need to be in state??

// reformat time in endpopup

// credit image artist!!!

// make scroll to top when change route

// add footer????

// make responsive!!!
