import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
  const { state } = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setGameTimer(gameTimer + 1);
    }, 1000);

    if (isGameOver) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [gameTimer, isGameOver]);

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

  const convertToNatXCoord = (e) => {
    const x = e.pageX - e.target.offsetLeft;
    const natX = Math.round((x / e.target.width) * e.target.naturalWidth);
    return natX;
  };

  const convertToNatYCoord = (e) => {
    const y = e.pageY - e.target.offsetTop;
    const natY = Math.round((y / e.target.height) * e.target.naturalHeight);
    return natY;
  };

  const handleClick = (e) => {
    if (targetBox.style.display === 'none' || targetBox.style.display === '') {
      targetBox.style.display = 'block';
      targetBox.style.position = 'absolute';
      targetBox.style.left = e.pageX - 40 + 'px';
      targetBox.style.top = e.pageY - 40 + 'px';

      dropdown.style.display = 'block';
      dropdown.style.position = 'absolute';

      let natX = convertToNatXCoord(e);
      setCurrentX(natX);

      if (natX > e.target.naturalWidth / 2) {
        dropdown.style.left = e.pageX - 155 + 'px';
      } else {
        dropdown.style.left = e.pageX + 10 + 'px';
      }

      let natY = convertToNatYCoord(e);
      setCurrentY(natY);

      if (
        e.target.height < 680 &&
        natY > e.target.naturalHeight * 0.38 &&
        natY < e.target.naturalHeight * 0.61
      ) {
        switch (remainingItems) {
          case 5:
            dropdown.style.top = e.pageY - 160 + 'px';
            break;
          case 4:
            dropdown.style.top = e.pageY - 160 + 32 + 'px';
            break;
          case 3:
            dropdown.style.top = e.pageY - 160 + 32 + 32 + 'px';
            break;
          case 2:
            dropdown.style.top = e.pageY - 160 + 32 + 32 + 32 + 'px';
            break;
          case 1:
            dropdown.style.top = e.pageY - 160 + 32 + 32 + 32 + 32 + 'px';
            break;
        }
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
        switch (remainingItems) {
          case 5:
            dropdown.style.top = e.pageY - 260 + 'px';
            break;
          case 4:
            dropdown.style.top = e.pageY - 260 + 64 + 'px';
            break;
          case 3:
            dropdown.style.top = e.pageY - 260 + 64 + 64 + 'px';
            break;
          case 2:
            dropdown.style.top = e.pageY - 260 + 64 + 64 + 64 + 'px';
            break;
          case 1:
            dropdown.style.top = e.pageY - 260 + 64 + 64 + 64 + 64 + 'px';
            break;
        }
      } else if (natY > e.target.naturalHeight / 2) {
        switch (remainingItems) {
          case 5:
            dropdown.style.top = e.pageY - 325 + 'px';
            break;
          case 4:
            dropdown.style.top = e.pageY - 325 + 64 + 'px';
            break;
          case 3:
            dropdown.style.top = e.pageY - 325 + 64 + 64 + 'px';
            break;
          case 2:
            dropdown.style.top = e.pageY - 325 + 64 + 64 + 64 + 'px';
            break;
          case 1:
            dropdown.style.top = e.pageY - 325 + 64 + 64 + 64 + 64 + 'px';
            break;
        }
      } else {
        dropdown.style.top = e.pageY + 10 + 'px';
      }
    } else {
      hideTargetBox();
    }

    // showCoords(e);
  };

  const hideTargetBox = () => {
    targetBox.style.display = 'none';
    dropdown.style.display = 'none';
  };

  useEffect(() => {
    window.addEventListener('resize', hideTargetBox);

    return () => {
      window.removeEventListener('resize', hideTargetBox);
    };
  });

  // if clicked coord (converted to nat) is greater than or equal to item coord - 40 AND less than or equal to item coord + 40
  // on x AND y axis
  // then success
  const handleSelectItem = (item) => {
    if (
      currentX > item.coords.x - 50 &&
      currentX < item.coords.x + 50 &&
      currentY > item.coords.y - 50 &&
      currentY < item.coords.y + 50
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
    if (alertTimeUp === true) {
      setAlertTimeUp(false);
      startAlertTimer();
    } else {
      resetAlertTimer();
      resetAnimation();
    }
  };

  const startAlertTimer = () => {
    setAlertTimer(
      setTimeout(() => {
        setAlertTimeUp(true);
      }, 3000),
    );
  };

  function resetAlertTimer() {
    clearTimeout(alertTimer);
    startAlertTimer();
  }

  const resetAnimation = () => {
    const element = document.querySelector('.alert');
    element.style.animation = 'none';
    element.offsetHeight;
    element.style.animation = null;
  };

  useEffect(() => {
    if (remainingItems < 1) {
      setIsGameOver(true);
      console.log('YOU WINNNNN GAME OVER!!!!');
    }
  }, [remainingItems]);

  return (
    <div className="game-page">
      <img
        onClick={handleClick}
        className="main-img"
        src={'http://localhost:3000/api/img/games/' + state.game._id}
        alt=""
      />
      {alertTimeUp ? null : <div className={'alert ' + alertClass}>{message}</div>}
      <div onClick={hideTargetBox} id="target-box">
        •
      </div>
      <div id="dropdown">
        {state.game.items.map((item) => {
          return (
            <div
              className="dropdown-item"
              key={item.name}
              id={'dropdown-item' + item._id}
              onClick={() => handleSelectItem(item)}
            >
              <img src={'http://localhost:3000/api/img/items/' + item._id} alt="" />
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
      <div className="game-timer">{new Date(gameTimer * 1000).toISOString().slice(11, 19)}</div>
      <div className="items-to-find">
        {state.game.items.map((item) => {
          return (
            <div key={item._id} className="item" id={'item' + item._id}>
              <img src={'http://localhost:3000/api/img/items/' + item._id} alt="" />
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GamePage;
