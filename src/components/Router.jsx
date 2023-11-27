import App from '../App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import gameLoader from '../loaders/gameLoader';
import HomePage from '../routes/HomePage';
import GamePage from '../routes/GamePage';
import LeaderboardPage from '../routes/LeaderboardPage';
import AboutPage from '../routes/AboutPage';

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      loader: gameLoader,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/game/:gameKey', element: <GamePage /> },
        { path: '/leaderboard/:lbKey', element: <LeaderboardPage /> },
        { path: '/about', element: <AboutPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Router;
