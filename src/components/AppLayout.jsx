import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { selectCurrentUser } from '../state/auth/authSelectors';
import Navbar from './Navbar';

function AppLayout() {
  const location = useLocation();
  const currentUser = useSelector(selectCurrentUser);

  const hideNavbar = location.pathname === '/sign-in' || location.pathname === '/sign-up';

  if (currentUser === null && !hideNavbar) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <main className="h-screen bg-gray-900 text-white flex">
      {/* Loading bar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <LoadingBar style={{ backgroundColor: '#3B82F6', height: '4px' }} />
      </div>

      {/* Main layout */}
      {!hideNavbar && <Navbar />}
      <section className="overflow-y-scroll w-full">
        <Outlet />
      </section>
    </main>
  );
}

export default AppLayout;
