import PropTypes from 'prop-types';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useState } from 'react';

function EntryForm({ game, gameTimer, setGameTimer }) {
  const [name, setName] = useState('');
  const { updateLeaderboard, setUpdateLeaderboard, setLastlbKey } = useOutletContext();
  const navigate = useNavigate();

  // Handle submitting the leaderboard entry form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/games/' + game._id + '/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          seconds: gameTimer,
        }),
      });
      if (response.status === 200) {
        setName('');
        setGameTimer(0);
        setUpdateLeaderboard(!updateLeaderboard);
        navigate('/leaderboard/' + game.key);
        // setLastlbKey(game.key);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
  );
}

EntryForm.propTypes = {
  game: PropTypes.object,
  gameTimer: PropTypes.number,
  setGameTimer: PropTypes.func,
};

export default EntryForm;
