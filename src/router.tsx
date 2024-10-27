import { createBrowserRouter } from 'react-router-dom';

import FallbackView from '@views/Fallback';

import PublicLayout from '@layout/public/PublicLayout';
import AdminLayout from '@layout/admin/AdminLayout';
import WorkerLayout from '@layout/worker/WorkerLayout';

import publicRoutes from './routes/publicRoutes';
import adminRoutes from './routes/adminRoutes';
import workerRoutes from './routes/workerRoutes';

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
      {
        path: '/worker',
        element: <WorkerLayout />,
        children: workerRoutes,
      },
    ],
  },
]);

export default router;
