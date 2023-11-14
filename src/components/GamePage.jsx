import { useState } from 'react';

function GamePage() {
  const [fakeList, setFakeList] = useState([
    {
      name: 'Item 1',
    },
    {
      name: 'Item 2',
    },
    {
      name: 'Item 3',
    },
  ]);

  const showCoords = (e) => {
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;
    const actualX = Math.round((x / e.target.width) * e.target.naturalWidth);
    const actualY = Math.round((y / e.target.height) * e.target.naturalHeight);

    console.log('img coords: ' + x + ', ' + y);
    console.log('img: ' + e.target.width + ', ' + e.target.height);
    console.log('actual coords: ' + actualX + ', ' + actualY);
    console.log('natural: ' + e.target.naturalWidth + ', ' + e.target.naturalHeight);
    // console.log(e);
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
    let targetBox = document.getElementById('target-box');
    targetBox.style.display = 'block';
    targetBox.style.position = 'absolute';
    targetBox.style.left = e.pageX - 40 + 'px';
    targetBox.style.top = e.pageY - 40 + 'px';

    let dropdown = document.getElementById('dropdown');
    dropdown.style.display = 'block';
    dropdown.style.position = 'absolute';

    let natX = convertToNatXCoord(e);

    if (natX > 2378) {
      dropdown.style.left = e.pageX - 105 + 'px';
    } else {
      dropdown.style.left = e.pageX + 10 + 'px';
    }

    let natY = convertToNatYCoord(e);

    if (natY > 3529) {
      dropdown.style.top = e.pageY - 120 + 'px';
    } else {
      dropdown.style.top = e.pageY + 10 + 'px';
    }
  };

  return (
    <div className="game-page">
      <img onClick={handleClick} className="main-img" src="/the-crumbling-creek.png" alt="" />
      <div id="target-box">•</div>
      <div id="dropdown">
        {fakeList.map((obj) => {
          return (
            <p className="dropdown-item" key={obj.name}>
              {obj.name}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default GamePage;
