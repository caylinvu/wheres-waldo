const gameLoader = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/games');
    if (!response.ok) {
      throw new Error(`This is an HTTP error: The status is ${response.status}`);
    }
    const games = await response.json();
    console.log(games);
    return { games };
  } catch (err) {
    console.log(err);
  }
};

export default gameLoader;
