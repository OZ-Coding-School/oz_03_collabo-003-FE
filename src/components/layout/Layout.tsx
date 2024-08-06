import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
  return (
    <div className='w-screen'>
      <NavBar />
      <div className='w-screen'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
