import Home from '@views/public/Home/Home';
import Login from '@views/public/Login/Login';

const publicRoutes = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
];

export default publicRoutes;
