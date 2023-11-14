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

// make pop up target not show outside of game image

// handle selecting an item

// figure out coordinates of items in images

// create backend to store images/coordinates

// validate coordinates

// implement selecting, validating, and returning appropriate message

// add timer to game

// display time and request name in pop up

// show leaderboard

// credit image artist!!!

// make responsive!!!

// does targetBox and dropdown need to be in state???
