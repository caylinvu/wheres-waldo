import { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import GameImage from '../components/GameImage';
import TargetBox from '../components/TargetBox';
import GameItems from '../components/GameItems';
import EndPopup from '../components/EndPopup';

function GamePage() {
  const { games, gameTimer, setGameTimer } = useOutletContext();
  const { gameKey } = useParams();
  const game = games.find((obj) => obj.key == gameKey);
  const [targetBox, setTargetBox] = useState(null);
  const [dropdown, setDropdown] = useState(null);
  const [currentX, setCurrentX] = useState(null);
  const [currentY, setCurrentY] = useState(null);
  const [remainingItems, setRemainingItems] = useState(5);
  const [message, setMessage] = useState('');
  const [alertClass, setAlertClass] = useState('');
  const [alertTimeUp, setAlertTimeUp] = useState(true);
  const [alertTimer, setAlertTimer] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [coordRange, setCoordRange] = useState(0);

  // Start/stop game timer
  useEffect(() => {
    const interval = setInterval(() => {
      setGameTimer(gameTimer + 1);
    }, 1000);

    if (isGameOver) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [gameTimer, setGameTimer, isGameOver]);

  // Assign target box and dropdown to state variables so they can be manipulated on clicks
  useEffect(() => {
    setTargetBox(document.getElementById('target-box'));
    setDropdown(document.getElementById('dropdown'));
  }, []);

  // Convert coord to placement in natural image
  const convertToNat = (coord, dimension, natDimension) => {
    return Math.round((coord / dimension) * natDimension);
  };

  // Handle click on image
  const handleClick = (e) => {
    if (targetBox.style.display === 'none' || targetBox.style.display === '') {
      // Display the target box
      targetBox.style.display = 'block';
      targetBox.style.position = 'absolute';
      targetBox.style.left = e.pageX - 40 + 'px';
      targetBox.style.top = e.pageY - 40 + 'px';

      // Display the dropdown box
      dropdown.style.display = 'block';
      dropdown.style.position = 'absolute';

      // Convert the current x coord to placement in the natural image
      let natX = convertToNat(e.pageX - e.target.offsetLeft, e.target.width, e.target.naturalWidth);
      setCurrentX(natX);

      // If the coord is on the right half of the screen, flip the placement of the dropdown box
      if (natX > e.target.naturalWidth / 2) {
        dropdown.style.left = e.pageX - 155 + 'px';
      } else {
        dropdown.style.left = e.pageX + 10 + 'px';
      }

      // Convert the current y coord to placement in the natural image
      let natY = convertToNat(
        e.pageY - e.target.offsetTop,
        e.target.height,
        e.target.naturalHeight,
      );
      setCurrentY(natY);

      // Convert coord range of 40 to natural image equivalent
      let range = convertToNat(35, e.target.width, e.target.naturalWidth);
      setCoordRange(range);

      // Shift placement of dropdown list depending on # of remaining items and location on screen
      switch (remainingItems) {
        case 5:
          if (
            e.target.height < 680 &&
            natY > e.target.naturalHeight * 0.38 &&
            natY < e.target.naturalHeight * 0.61
          ) {
            dropdown.style.top = e.pageY - 160 + 'px';
          } else if (
            e.target.height < 680 &&
            natY > e.target.naturalHeight * 0.21 &&
            natY <= e.target.naturalHeight * 0.38
          ) {
            dropdown.style.top = e.pageY - 60 + 'px';
          } else if (
            e.target.height < 680 &&
            natY >= e.target.naturalHeight * 0.61 &&
            natY < e.target.naturalHeight * 0.76
          ) {
            dropdown.style.top = e.pageY - 260 + 'px';
          } else if (natY > e.target.naturalHeight / 2) {
            dropdown.style.top = e.pageY - 325 + 'px';
          } else {
            dropdown.style.top = e.pageY + 10 + 'px';
          }
          break;
        case 4:
          if (
            e.target.height < 680 &&
            natY > e.target.naturalHeight * 0.38 &&
            natY < e.target.naturalHeight * 0.61
          ) {
            dropdown.style.top = e.pageY - 160 + 32 + 'px';
          } else if (natY > e.target.naturalHeight / 2) {
            dropdown.style.top = e.pageY - 325 + 64 + 'px';
          } else {
            dropdown.style.top = e.pageY + 10 + 'px';
          }
          break;
        case 3:
          if (natY > e.target.naturalHeight / 2) {
            dropdown.style.top = e.pageY - 325 + 64 + 64 + 'px';
          } else {
            dropdown.style.top = e.pageY + 10 + 'px';
          }
          break;
        case 2:
          if (natY > e.target.naturalHeight / 2) {
            dropdown.style.top = e.pageY - 325 + 64 + 64 + 64 + 'px';
          } else {
            dropdown.style.top = e.pageY + 10 + 'px';
          }
          break;
        case 1:
          if (natY > e.target.naturalHeight / 2) {
            dropdown.style.top = e.pageY - 325 + 64 + 64 + 64 + 64 + 'px';
          } else {
            dropdown.style.top = e.pageY + 10 + 'px';
          }
          break;
      }
    } else {
      // Hide target box and dropdown if already displayed when clicking
      hideTargetBox();
    }
  };

  // Hide target box and dropdown
  const hideTargetBox = () => {
    targetBox.style.display = 'none';
    dropdown.style.display = 'none';
  };

  // Hide targetbox and dropdown on window resize
  useEffect(() => {
    window.addEventListener('resize', hideTargetBox);

    return () => {
      window.removeEventListener('resize', hideTargetBox);
    };
  });

  // Handle selecting a game item from the dropdown list
  const handleSelectItem = (item) => {
    if (
      currentX > item.coords.x - coordRange &&
      currentX < item.coords.x + coordRange &&
      currentY > item.coords.y - coordRange &&
      currentY < item.coords.y + coordRange
    ) {
      const element = document.getElementById('item' + item._id);
      element.classList.add('found');
      const dropdownElement = document.getElementById('dropdown-item' + item._id);
      dropdownElement.classList.add('hidden');
      setRemainingItems(remainingItems - 1);
      hideTargetBox();
      setMessage(`You found ${item.name}!`);
      setAlertClass('alert-success');
    } else {
      hideTargetBox();
      setMessage('Try again');
      setAlertClass('alert-fail');
    }

    // Handle alert
    if (alertTimeUp === true) {
      // Display alert if no alert is currently shown
      setAlertTimeUp(false);
      startAlertTimer();
    } else {
      // If alert is already displayed, reset it and show new alert
      resetAlertTimer();
      resetAnimation();
    }
  };

  // Start the alert timer
  const startAlertTimer = () => {
    setAlertTimer(
      setTimeout(() => {
        setAlertTimeUp(true);
      }, 3000),
    );
  };

  // Clear the alert timer and start a new one
  function resetAlertTimer() {
    clearTimeout(alertTimer);
    startAlertTimer();
  }

  // Reset the animation for the alert notification
  const resetAnimation = () => {
    const element = document.querySelector('.alert');
    element.style.animation = 'none';
    element.offsetHeight;
    element.style.animation = null;
  };

  // Check if game is over
  useEffect(() => {
    if (remainingItems < 1) {
      setIsGameOver(true);
    }
  }, [remainingItems]);

  return (
    <div className="game-page">
      <GameImage game={game} imgClass="main-img" handleClick={handleClick} />
      {alertTimeUp ? null : <div className={'alert ' + alertClass}>{message}</div>}
      <TargetBox hideTargetBox={hideTargetBox} />
      <GameItems
        items={game.items}
        type="dropdown"
        itemClass="dropdown-item"
        handleSelectItem={handleSelectItem}
      />
      {isGameOver && <EndPopup game={game} gameTimer={gameTimer} />}
    </div>
  );
}

export default GamePage;
