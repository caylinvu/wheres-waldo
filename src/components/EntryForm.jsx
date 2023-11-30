import PropTypes from 'prop-types';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useState } from 'react';

function EntryForm({ game, gameTimer }) {
  const [name, setName] = useState('');
  const { updateLeaderboard, setUpdateLeaderboard } = useOutletContext();
  const navigate = useNavigate();

  // Handle submitting the leaderboard entry form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'https://wheres-waldo-api-production.up.railway.app/api/games/' + game._id + '/entries',
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
        setUpdateLeaderboard(!updateLeaderboard);
        navigate('/leaderboard/' + game.key);
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
};

export default EntryForm;
