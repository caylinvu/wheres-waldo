import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

function Header({ lastlbKey }) {
  const { gameKey } = useParams();

  return (
    <div className="header">
      <Link to="/">
        <h1>Find the Things!</h1>
      </Link>
      {!gameKey ? (
        <div className="nav">
          <Link to={lastlbKey ? '/leaderboard/' + lastlbKey : '/leaderboard/1'}>
            <p>Leaderboard</p>
          </Link>
          <Link to="/about">
            <p>About</p>
          </Link>
        </div>
      ) : null}
    </div>
  );
}

Header.propTypes = {
  lastlbKey: PropTypes.string,
};

export default Header;
