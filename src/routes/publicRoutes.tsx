import { Navigate } from 'react-router-dom';

import Login from '@views/public/Login/Login';

const publicRoutes = [
  { path: '/', element: <Navigate to="/login" /> },
  { path: '/login', element: <Login /> },
];

export default publicRoutes;
