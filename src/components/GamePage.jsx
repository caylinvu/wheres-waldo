import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function GamePage() {
  const [targetBox, setTargetBox] = useState(null);
  const [dropdown, setDropdown] = useState(null);
  const [currentX, setCurrentX] = useState(null);
  const [currentY, setCurrentY] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setTargetBox(document.getElementById('target-box'));
    setDropdown(document.getElementById('dropdown'));
  }, []);

  const showCoords = (e) => {
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;
    const actualX = Math.round((x / e.target.width) * e.target.naturalWidth);
    const actualY = Math.round((y / e.target.height) * e.target.naturalHeight);

    console.log('img coords: ' + x + ', ' + y);
    console.log('img: ' + e.target.width + ', ' + e.target.height);
    console.log('actual coords: ' + actualX + ', ' + actualY);
    console.log('natural: ' + e.target.naturalWidth + ', ' + e.target.naturalHeight);
  };

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

      let remainingItems = location.state.items.filter((obj) => !obj.found);

      if (
        e.target.height < 680 &&
        natY > e.target.naturalHeight * 0.38 &&
        natY < e.target.naturalHeight * 0.61
      ) {
        switch (remainingItems.length) {
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
        switch (remainingItems.length) {
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
        switch (remainingItems.length) {
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
      currentX > item.coordinates.x - 50 &&
      currentX < item.coordinates.x + 50 &&
      currentY > item.coordinates.y - 50 &&
      currentY < item.coordinates.y + 50
    ) {
      item.found = true;
      hideTargetBox();
      checkWin();
      console.log('success!!!');
    } else {
      hideTargetBox();
      console.log('try again!!!');
    }
  };

  const checkWin = () => {
    let remainingItems = location.state.items.filter((obj) => !obj.found);
    if (remainingItems.length < 1) {
      console.log('YOU WINNNNN GAME OVER!!!!');
    }
  };

  return (
    <div className="game-page">
      <img onClick={handleClick} className="main-img" src={location.state.imgURL} alt="" />
      <div onClick={hideTargetBox} id="target-box">
        •
      </div>
      <div id="dropdown">
        {location.state.items
          .filter((obj) => !obj.found)
          .map((obj) => {
            return (
              <div className="dropdown-item" key={obj.name} onClick={() => handleSelectItem(obj)}>
                <img src={obj.image} alt="" />
                <p>{obj.name}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default GamePage;
