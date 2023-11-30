const gameLoader = async () => {
  try {
    const response = await fetch('https://wheres-waldo-api-production.up.railway.app/api/games');
    if (!response.ok) {
      throw new Error(`This is an HTTP error: The status is ${response.status}`);
    }
    const games = await response.json();
    return { games };
  } catch (err) {
    throw new Error('Failed to fetch game data');
  }
};

export default gameLoader;
