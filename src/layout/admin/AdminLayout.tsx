import { useEffect } from 'react';
import './AdminLayout.scoped.css';
import { Outlet, useNavigate } from 'react-router-dom';

import Auth from '@services/auth';
import Navbar from './components/Navbar/Navbar';

function AdminLayout(): JSX.Element {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = async (): Promise<void> => {
      const isAuthenticated = await Auth.isAuthenticated();
      if (!isAuthenticated) {
        navigate('/');
      }
    };

    void auth();
  }, []);
  return (
    <div style={{ height: '100%' }}>
      <Navbar />
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
