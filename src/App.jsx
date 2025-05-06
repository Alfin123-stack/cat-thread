import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/app.css';
import AppLayout from './components/AppLayout';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';
import AddThreadPage from './pages/AddThreadPage';
import ErrorPage from './pages/ErrorPage';
import NotFoundPage from './pages/NotFoundPage';
import DetailThreadPage from './pages/DetailThreadPage';
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/sign-in',
        element: <SignInPage />,
      },
      {
        path: '/sign-up',
        element: <SignUpPage />,
      },
      {
        path: '/thread/:id',
        element: <DetailThreadPage />,
      },
      {
        path: '/leaderboard',
        element: <LeaderboardPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/create-thread',
        element: <AddThreadPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
