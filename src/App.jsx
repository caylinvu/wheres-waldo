import './styles/App.css';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;

// create backend to store images/coordinates

// maybe edit item photos to be zoomed in (crop smaller)

// handle selecting an item

// validate coordinates

// implement selecting, validating, and returning appropriate message

// pass parameters depending on game

// adjust dropdown based on screen size (maybe change to only 3 items per game)

// make text inside of target and dropdown untargetable

// add timer to game

// display time and request name in pop up

// show leaderboard

// credit image artist!!!

// make responsive!!!

// does targetBox and dropdown need to be in state???
