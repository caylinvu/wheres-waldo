import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import Dropdown from './Dropdown';

function GamePage() {
  const [targetBox, setTargetBox] = useState(null);
  const [dropdown, setDropdown] = useState(null);
  const [currentX, setCurrentX] = useState(null);
  const [currentY, setCurrentY] = useState(null);
  const [remainingItems, setRemainingItems] = useState(5);
  const [message, setMessage] = useState('');
  const [alertClass, setAlertClass] = useState('');
  const [alertTimeUp, setAlertTimeUp] = useState(true);
  const [alertTimer, setAlertTimer] = useState(null);
  const [gameTimer, setGameTimer] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [name, setName] = useState('');
  const { state } = useLocation();
  const navigate = useNavigate();
  const { updateLeaderboard, setUpdateLeaderboard } = useOutletContext();
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
  }, [gameTimer, isGameOver]);

  // Assign target box and dropdown to state variables so they can be manipulated on clicks
  useEffect(() => {
    setTargetBox(document.getElementById('target-box'));
    setDropdown(document.getElementById('dropdown'));
  }, []);

  // const showCoords = (e) => {
  //   const x = e.pageX - e.target.offsetLeft;
  //   const y = e.pageY - e.target.offsetTop;
  //   const actualX = Math.round((x / e.target.width) * e.target.naturalWidth);
  //   const actualY = Math.round((y / e.target.height) * e.target.naturalHeight);

  //   console.log('img coords: ' + x + ', ' + y);
  //   console.log('img: ' + e.target.width + ', ' + e.target.height);
  //   console.log('actual coords: ' + actualX + ', ' + actualY);
  //   console.log('natural: ' + e.target.naturalWidth + ', ' + e.target.naturalHeight);
  // };

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

    // showCoords(e);
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

  // Handle submitting the leaderboard entry form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'http://localhost:3000/api/games/' + state.game._id + '/entries',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name,
            seconds: gameTimer,
          }),
        },
      );
      if (response.status === 200) {
        setName('');
        setGameTimer(0);
        setUpdateLeaderboard(!updateLeaderboard);
        navigate('/leaderboard', { state: state.game });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="game-page">
      <img
        onClick={handleClick}
        className="main-img"
        src={'http://localhost:3000/api/img/games/' + state.game._id}
        alt=""
        draggable={false}
      />
      {alertTimeUp ? null : <div className={'alert ' + alertClass}>{message}</div>}
      <div onClick={hideTargetBox} id="target-box">
        •
      </div>
      <Dropdown items={state.game.items} handleSelectItem={handleSelectItem} />
      <div className="game-timer">{new Date(gameTimer * 1000).toISOString().slice(11, 19)}</div>
      <div className="items-to-find">
        {state.game.items.map((item) => {
          return (
            <div key={item._id} className="item" id={'item' + item._id}>
              <img
                src={'http://localhost:3000/api/img/items/' + item._id}
                alt=""
                draggable={false}
              />
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
      {isGameOver && (
        <div className="popup-container">
          <div className="blocker"></div>
          <div className="end-container">
            <div className="end-popup">
              <p className="timer-text">{'You finished in ' + gameTimer + 's!'}</p>
              <p>Submit your score to the leaderboard</p>
              <form onSubmit={handleSubmit} className="entry-form">
                <div className="form-group">
                  <label htmlFor="name">
                    Display name <span>(numbers & letters only)</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    pattern="[a-zA-Z0-9]+"
                    maxLength={30}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <input type="hidden" name="seconds" value={gameTimer} />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GamePage;
