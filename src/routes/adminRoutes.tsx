import Dashboard from '@views/admin/Dashboard/Dashboard';
import { UserForm, UserList } from '@views/admin/User';

const adminRoutes = [
  { path: 'dashboard', element: <Dashboard /> },

  /* Users CRUD */
  { path: 'novo-usuario', element: <UserForm /> },
  { path: 'equipe', element: <UserList /> },
];

export default adminRoutes;
