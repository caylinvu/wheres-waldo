import { useState, useEffect } from 'react';

function GamePage() {
  const [targetBox, setTargetBox] = useState(null);
  const [dropdown, setDropdown] = useState(null);
  const [currentX, setCurrentX] = useState(null);
  const [currentY, setCurrentY] = useState(null);
  const [items, setItems] = useState([
    {
      name: 'Monkey',
      image: '/1-monkey.png',
      coordinates: {
        x: 1486,
        y: 1859,
      },
    },
    {
      name: 'Cat',
      image: '/1-cat.png',
      coordinates: {
        x: 2355,
        y: 3696,
      },
    },
    {
      name: 'Dwarf',
      image: '/1-dwarf.png',
      coordinates: {
        x: 72,
        y: 2858,
      },
    },
    {
      name: 'Witch',
      image: '/1-witch.png',
      coordinates: {
        x: 2375,
        y: 1925,
      },
    },
    {
      name: 'Fish man',
      image: '/1-fishman.png',
      coordinates: {
        x: 873,
        y: 1256,
      },
    },
  ]);

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

      if (natX > 2378) {
        dropdown.style.left = e.pageX - 105 + 'px';
      } else {
        dropdown.style.left = e.pageX + 10 + 'px';
      }

      let natY = convertToNatYCoord(e);
      setCurrentY(natY);

      if (natY > 3529) {
        dropdown.style.top = e.pageY - 120 + 'px';
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
      currentX >= item.coordinates.x - 50 &&
      currentX < item.coordinates.x + 50 &&
      currentY >= item.coordinates.y - 50 &&
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
    let remainingItems = items.filter((obj) => !obj.found);
    console.log(remainingItems);
    if (remainingItems.length < 1) {
      console.log('YOU WINNNNN GAME OVER!!!!');
    }
  };

  // otherwise fail

  return (
    <div className="game-page">
      <img onClick={handleClick} className="main-img" src="/the-crumbling-creek.png" alt="" />
      <div onClick={hideTargetBox} id="target-box">
        •
      </div>
      <div id="dropdown">
        {items
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
