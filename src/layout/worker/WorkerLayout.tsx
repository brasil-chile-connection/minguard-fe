import { useEffect } from 'react';
import './WorkerLayout.scoped.css';
import { Outlet, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import Auth from '@services/auth';
import Navbar from './components/Navbar/Navbar';

function WorkerLayout(): JSX.Element {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = async (): Promise<void> => {
      const isAuthenticated = await Auth.isAuthenticated();
      if (!isAuthenticated) {
        navigate('/');
        toast.error('Sessão expirada. Faça login novamente.', {
          position: 'bottom-center',
        });
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

export default WorkerLayout;
