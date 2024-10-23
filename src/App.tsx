import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import router from './router';

import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

function App(): JSX.Element {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
