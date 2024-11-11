import Dashboard from '@views/admin/Dashboard/Dashboard';
import { UserForm, UserList, UserEdit, UserView } from '@views/admin/User';

import { IncidentList, IncidentView } from '@views/admin/Incident';

const adminRoutes = [
  { path: 'dashboard', element: <Dashboard /> },

  /* Users CRUD Routes */
  { path: 'usuarios/novo', element: <UserForm /> },
  { path: 'usuarios/:userId', element: <UserView /> },
  { path: 'usuarios/:userId/editar', element: <UserEdit /> },
  { path: 'equipe', element: <UserList /> },

  /* Incidents Routes */
  { path: 'incidentes/:incidentId', element: <IncidentView /> },
  { path: 'incidentes', element: <IncidentList /> },
];

export default adminRoutes;
