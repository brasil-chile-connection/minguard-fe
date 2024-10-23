import Dashboard from '@views/admin/Dashboard/Dashboard';
import { UserForm } from '@views/admin/User';

const adminRoutes = [
  { path: 'dashboard', element: <Dashboard /> },

  /* Users CRUD */
  { path: 'novo-usuario', element: <UserForm /> },
];

export default adminRoutes;
