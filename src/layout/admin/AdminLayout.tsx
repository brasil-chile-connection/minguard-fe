import './AdminLayout.scoped.css';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';

function AdminLayout(): JSX.Element {
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
