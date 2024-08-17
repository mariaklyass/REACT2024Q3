import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';

import MainPage from './pages/MainPage';
import HookForm from './pages/HookForm';
import UncontrolledForm from './pages/UncontrolledForm';

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
    <RouterProvider router={router} />
  </StrictMode>
);
