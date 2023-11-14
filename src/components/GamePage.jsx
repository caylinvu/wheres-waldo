function GamePage() {
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

  const handleClick = (e) => {
    let targetBox = document.getElementById('target-box');
    targetBox.style.display = 'block';
    targetBox.style.position = 'absolute';
    targetBox.style.left = e.pageX - 40 + 'px';
    targetBox.style.top = e.pageY - 40 + 'px';
  };

  return (
    <div className="game-page">
      <img onClick={handleClick} className="main-img" src="/the-crumbling-creek.png" alt="" />
      <div id="target-box">•</div>
    </div>
  );
}

export default GamePage;
