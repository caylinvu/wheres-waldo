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

// set up home page view of 3 games to choose from

// create functionality to pop the targeting box and dropdown menu when clicking

// remove target when click away or select item

// figure out coordinates of items in images

// create backend to store images/coordinates

// validate coordinates

// implement selecting, validating, and returning appropriate message

// add timer to game

// display time and request name in pop up

// show leaderboard

// credit image artist!!!
