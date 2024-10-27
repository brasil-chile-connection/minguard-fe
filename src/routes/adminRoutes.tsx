import Dashboard from '@views/admin/Dashboard/Dashboard';
import { UserForm, UserList, UserEdit } from '@views/admin/User';

const adminRoutes = [
  { path: 'dashboard', element: <Dashboard /> },

  /* Users CRUD */
  { path: 'usuarios/novo', element: <UserForm /> },
  { path: 'usuarios/:userId/editar', element: <UserEdit /> },
  { path: 'equipe', element: <UserList /> },
];

export default adminRoutes;
