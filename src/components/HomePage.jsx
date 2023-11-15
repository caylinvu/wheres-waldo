import { Link } from 'react-router-dom';

const items1 = [
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
];

const items2 = [
  {
    name: 'Baker',
    image: '/2-baker.png',
    coordinates: {
      x: 97,
      y: 1812,
    },
  },
  {
    name: 'Splatter',
    image: '/2-splatter.png',
    coordinates: {
      x: 1040,
      y: 2531,
    },
  },
  {
    name: 'Scaredy Cat',
    image: '/2-cat.png',
    coordinates: {
      x: 266,
      y: 1127,
    },
  },
  {
    name: 'Goldfish Guy',
    image: '/2-goldfishguy.png',
    coordinates: {
      x: 1553,
      y: 967,
    },
  },
  {
    name: 'Dragon',
    image: '/2-dragon.png',
    coordinates: {
      x: 1012,
      y: 606,
    },
  },
];

const items3 = [
  {
    name: 'Lil monkey',
    image: '/3-monkey.png',
    coordinates: {
      x: 1510,
      y: 1591,
    },
  },
  {
    name: 'Squid guy',
    image: '/3-squidguy.png',
    coordinates: {
      x: 485,
      y: 644,
    },
  },
  {
    name: 'Box of lemons',
    image: '/3-lemons.png',
    coordinates: {
      x: 637,
      y: 3238,
    },
  },
  {
    name: 'Spilled coffee',
    image: '/3-coffee.png',
    coordinates: {
      x: 2935,
      y: 3248,
    },
  },
  {
    name: 'Shiba',
    image: '/3-shiba.png',
    coordinates: {
      x: 2254,
      y: 1497,
    },
  },
];

function HomePage() {
  return (
    <div className="home-page">
      <h2>Games</h2>
      <div className="game-container">
        <div>
          <div className="game-img">
            <img src="/the-crumbling-creek.png" alt="" />
          </div>
          <div className="game-text">
            <p>The Crumbling Creek</p>
            <Link to="/game/1" state={{ imgURL: '/the-crumbling-creek.png', items: items1 }}>
              Start Game
            </Link>
          </div>
        </div>
        <div>
          <div className="game-img">
            <img src="/midnight-metropolis.png" alt="" />
          </div>
          <div className="game-text">
            <p>Midnight Metropolis</p>
            <Link to="/game/2" state={{ imgURL: '/midnight-metropolis.png', items: items2 }}>
              Start Game
            </Link>
          </div>
        </div>
        <div>
          <div className="game-img">
            <img src="/concrete-jungle.png" alt="" />
          </div>
          <div className="game-text">
            <p>Concrete Jungle</p>
            <Link to="/game/1" state={{ imgURL: '/concrete-jungle.png', items: items3 }}>
              Start Game
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
