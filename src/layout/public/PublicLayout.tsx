import { useEffect } from 'react';
import './PublicLayout.scoped.css';
import { Outlet } from 'react-router-dom';

import LoadingOverlay from '@achmadk/react-loading-overlay';

import { useSelector } from 'react-redux';
import { State } from '@/store';

/*
 * import Navbar from "./components/Navbar/Navbar";
 * import Footer from "./components/Footer/Footer";
 */

function PublicLayout(): JSX.Element {
  const isLoading = useSelector((state: State) => state.isLoading);

  useEffect(() => {
    document.body.style.overflowY = isLoading ? 'hidden' : 'auto';
  }, [isLoading]);
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
        {/* <NavBar /> */}
        <div className="page-content">
          <Outlet />
        </div>
        {/* <Footer /> */}
      </div>
    </LoadingOverlay>
  );
}

export default PublicLayout;
