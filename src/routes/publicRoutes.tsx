import { Navigate } from 'react-router-dom';

import Login from '@views/public/Login/Login';
import { TicketReview } from '@/views/public/ThirdPartyUsers';

const publicRoutes = [
  { path: '/', element: <Navigate to="/login" /> },
  { path: '/login', element: <Login /> },
  {
    path: '/third-party-access/tickets/:ticketUUID',
    element: <TicketReview />,
  },
];

export default publicRoutes;
