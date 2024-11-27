import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider as StateProvider } from 'react-redux';

import router from './router';
import store from './store';

import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

function App(): JSX.Element {
  return (
    <StateProvider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </StateProvider>
  );
}

export default App;
