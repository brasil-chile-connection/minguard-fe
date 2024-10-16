import { createBrowserRouter } from 'react-router-dom';

import FallbackView from '@views/Fallback';

import PublicLayout from '@layout/public/PublicLayout';
import AdminLayout from '@layout/admin/AdminLayout';

import publicRoutes from './routes/publicRoutes';
import adminRoutes from './routes/adminRoutes';

const router = createBrowserRouter([
  {
    errorElement: <FallbackView />,
    children: [
      {
        path: '/',
        element: <PublicLayout />,
        children: publicRoutes,
      },
      {
        path: '/admin',
        element: <AdminLayout />,
        children: adminRoutes,
      },
    ],
  },
]);

export default router;
