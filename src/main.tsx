import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.scss';

import MainPage from './pages/MainPage';
import HookForm from './pages/HookForm';
import UncontrolledForm from './pages/UncontrolledForm';
import { Provider } from 'react-redux';
import store from './store/store';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/hook-form" element={<HookForm />}></Route>
      <Route path="/uncontrolled-form" element={<UncontrolledForm />}></Route>
    </>
  )
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
