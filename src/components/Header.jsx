import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Header({ currentGame, setCurrentGame }) {
  const removeCurrentGame = () => {
    setCurrentGame(null);
  };

  return (
    <div className="header">
      <Link to="/" onClick={removeCurrentGame}>
        <h1>Find the Things!</h1>
      </Link>
      {!currentGame ? (
        <div className="nav">
          <Link to="/leaderboard">
            <p>Leaderboard</p>
          </Link>
          <Link to="/about">
            <p>About</p>
          </Link>
        </div>
      ) : (
        <div className="items-to-find">
          {currentGame.items.map((item) => {
            return (
              <div key={item._id} className="item">
                <img src={'http://localhost:3000/api/img/items/' + item._id} alt="" />
                <p>{item.name}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

Header.propTypes = {
  currentGame: PropTypes.object,
  setCurrentGame: PropTypes.func,
};

export default Header;
