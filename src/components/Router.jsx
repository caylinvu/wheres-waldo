import App from '../App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './HomePage';
import GamePage from './GamePage';
import LeaderboardPage from './LeaderboardPage';
import AboutPage from './AboutPage';

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/game/:gameKey', element: <GamePage /> },
        { path: '/leaderboard', element: <LeaderboardPage /> },
        { path: '/about', element: <AboutPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Router;
