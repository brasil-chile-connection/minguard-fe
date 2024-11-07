import Dashboard from '@views/worker/Dashboard/Dashboard';
import { IncidentForm, IncidentView } from '@views/worker/Incident';

const workerRoutes = [
  { path: 'dashboard', element: <Dashboard /> },
  {
    path: 'incidentes/novo',
    element: <IncidentForm />,
  },
  {
    path: 'incidentes/:incidentId',
    element: <IncidentView />,
  },
];

export default workerRoutes;
