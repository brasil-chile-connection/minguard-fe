import { useEffect } from 'react';
import './AdminLayout.scoped.css';
import { Outlet, useNavigate } from 'react-router-dom';

import LoadingOverlay from '@achmadk/react-loading-overlay';

import { useSelector } from 'react-redux';
import { State } from '@/store';

import { toast } from 'react-toastify';
import Auth from '@services/auth';

import Navbar from './components/Navbar/Navbar';

function AdminLayout(): JSX.Element {
  const navigate = useNavigate();
  const isLoading = useSelector((state: State) => state.isLoading);

  useEffect(() => {
    document.body.style.overflowY = isLoading ? 'hidden' : 'auto';
  }, [isLoading]);

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
    <LoadingOverlay
      active={isLoading}
      spinner
      text="Carregando..."
      styles={{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        overlay: base => ({
          ...base,
          zIndex: 99999,
          height: '100vh',
          position: 'fixed',
        }),
      }}
    >
      <div style={{ height: '100%' }}>
        <Navbar />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </LoadingOverlay>
  );
}

export default AdminLayout;
