import App from '../App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './HomePage';
import GamePage from './GamePage';
import LeaderboardPage from './LeaderboardPage';

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/game/:gameId', element: <GamePage /> },
        { path: '/leaderboard', element: <LeaderboardPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Router;
