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
  const [remainingItems, setRemainingItems] = useState(game.items);
  const [showTargetBox, setShowTargetBox] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [targetBoxLeft, setTargetBoxLeft] = useState(null);
  const [targetBoxTop, setTargetBoxTop] = useState(null);
  const [dropdownLeft, setDropdownLeft] = useState(null);
  const [dropdownTop, setDropdownTop] = useState(null);
  const [currentX, setCurrentX] = useState(null);
  const [currentY, setCurrentY] = useState(null);
  const [message, setMessage] = useState('');
  const [alertClass, setAlertClass] = useState('');
  const [showAlert, setShowAlert] = useState(false);
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

  // Convert coord to placement in natural image
  const convertToNat = (coord, dimension, natDimension) => {
    return Math.round((coord / dimension) * natDimension);
  };

  // Handle click on image
  const handleClick = (e) => {
    if (!showTargetBox) {
      // Display the target box
      setShowTargetBox(true);
      setTargetBoxLeft(e.pageX - 40 + 'px');
      setTargetBoxTop(e.pageY - 40 + 'px');

      // Display the dropdown box
      setShowDropdown(true);

      // Convert the current x coord to placement in the natural image
      let natX = convertToNat(e.pageX - e.target.offsetLeft, e.target.width, e.target.naturalWidth);
      setCurrentX(natX);

      // If the coord is on the right half of the screen, flip the placement of the dropdown box
      if (natX > e.target.naturalWidth / 2) {
        setDropdownLeft(e.pageX - 155 + 'px');
      } else {
        setDropdownLeft(e.pageX + 10 + 'px');
      }

      // Convert the current y coord to placement in the natural image
      let natY = convertToNat(
        e.pageY - e.target.offsetTop,
        e.target.height,
        e.target.naturalHeight,
      );
      setCurrentY(natY);

      // Convert coord range of 35 to natural image equivalent
      let range = convertToNat(35, e.target.width, e.target.naturalWidth);
      setCoordRange(range);

      // Shift placement of dropdown list depending on # of remaining items and location on screen
      switch (remainingItems.length) {
        case 5:
          if (
            e.target.height < 680 &&
            natY > e.target.naturalHeight * 0.38 &&
            natY < e.target.naturalHeight * 0.61
          ) {
            setDropdownTop(e.pageY - 160 + 'px');
          } else if (
            e.target.height < 680 &&
            natY > e.target.naturalHeight * 0.21 &&
            natY <= e.target.naturalHeight * 0.38
          ) {
            setDropdownTop(e.pageY - 60 + 'px');
          } else if (
            e.target.height < 680 &&
            natY >= e.target.naturalHeight * 0.61 &&
            natY < e.target.naturalHeight * 0.76
          ) {
            setDropdownTop(e.pageY - 260 + 'px');
          } else if (natY > e.target.naturalHeight / 2) {
            setDropdownTop(e.pageY - 325 + 'px');
          } else {
            setDropdownTop(e.pageY + 10 + 'px');
          }
          break;
        case 4:
          if (
            e.target.height < 680 &&
            natY > e.target.naturalHeight * 0.38 &&
            natY < e.target.naturalHeight * 0.61
          ) {
            setDropdownTop(e.pageY - 160 + 32 + 'px');
          } else if (natY > e.target.naturalHeight / 2) {
            setDropdownTop(e.pageY - 325 + 64 + 'px');
          } else {
            setDropdownTop(e.pageY + 10 + 'px');
          }
          break;
        case 3:
          if (natY > e.target.naturalHeight / 2) {
            setDropdownTop(e.pageY - 325 + 64 + 64 + 'px');
          } else {
            setDropdownTop(e.pageY + 10 + 'px');
          }
          break;
        case 2:
          if (natY > e.target.naturalHeight / 2) {
            setDropdownTop(e.pageY - 325 + 64 + 64 + 64 + 'px');
          } else {
            setDropdownTop(e.pageY + 10 + 'px');
          }
          break;
        case 1:
          if (natY > e.target.naturalHeight / 2) {
            setDropdownTop(e.pageY - 325 + 64 + 64 + 64 + 64 + 'px');
          } else {
            setDropdownTop(e.pageY + 10 + 'px');
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
    setShowTargetBox(false);
    setShowDropdown(false);
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
      // Mark game item in header as found (to update style)
      const element = document.getElementById('item' + item._id);
      element.classList.add('found');

      // Remove found item from remaining items to find
      const items = remainingItems.filter((obj) => obj._id != item._id);
      setRemainingItems(items);

      hideTargetBox();
      setMessage(`You found ${item.name}!`);
      setAlertClass('alert-success');
    } else {
      hideTargetBox();
      setMessage('Try again');
      setAlertClass('alert-fail');
    }

    // Handle alert
    if (showAlert === false) {
      // Display alert if no alert is currently shown
      setShowAlert(true);
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
        setShowAlert(false);
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
    if (remainingItems.length < 1) {
      setIsGameOver(true);
    }
  }, [remainingItems]);

  return (
    <div className="game-page">
      <GameImage game={game} imgClass="main-img" handleClick={handleClick} />
      {showAlert && <div className={'alert ' + alertClass}>{message}</div>}
      {showTargetBox && (
        <TargetBox
          hideTargetBox={hideTargetBox}
          targetBoxLeft={targetBoxLeft}
          targetBoxTop={targetBoxTop}
        />
      )}
      {showDropdown && (
        <GameItems
          items={remainingItems}
          type="dropdown"
          itemClass="dropdown-item"
          handleSelectItem={handleSelectItem}
          dropdownLeft={dropdownLeft}
          dropdownTop={dropdownTop}
        />
      )}
      {isGameOver && <EndPopup game={game} gameTimer={gameTimer} />}
    </div>
  );
}

export default GamePage;
