import PropTypes from 'prop-types';

function GameImage({ game, imgClass, handleClick }) {
  return (
    <img
      onClick={handleClick ? handleClick : null}
      className={imgClass ? imgClass : null}
      src={'http://localhost:3000/api/img/games/' + game._id}
      alt=""
      draggable={false}
    />
  );
}

GameImage.propTypes = {
  game: PropTypes.object,
  imgClass: PropTypes.string,
  handleClick: PropTypes.func,
};

export default GameImage;
