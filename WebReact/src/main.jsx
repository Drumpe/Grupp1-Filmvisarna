import "./sass/main.scss";  // Imports sass in main
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Imports App and 'Views'
import App from './App.jsx';
import StartView from './views/StartView';
import AboutView from './views/AboutView';
import AccountView  from "./views/AccountView";
import CancelView from "./views/CancelView";
import ConfirmedView from './views/ConfirmedView';
import LoginView from "./views/LoginView"
import MovieView from './views/MovieView'
import RegisterView from "./views/RegisterView";
import TheaterView from "./views/TheaterView";
import AdminView from "./views/AdminView";

/// Is commonly referred to as 'pages' -- should we rename?
/// paths are not following naming convention either!
/// used by react-router
/// 'path' and 'element' needed by react-router
/// 'path' and 'label' needed by the menu system
export const views = [
  {path: '/', label: 'Visas nu', element: <StartView />},
  {path: '/StartView', label: 'Visas nu', element: <StartView />},
  {path: '/AboutView', label: 'Om oss', element: <AboutView /> },
  {path: '/AccountView', label: 'Mitt konto', element: <AccountView />},
  {path: '/CancelView', label: 'Avboka', element: <CancelView />},
  {path: '/ConfirmedView/:bookingNumber', label: 'Bokningsbekräftelse', element: <ConfirmedView />},
  {path: '/LoginView', label: 'Logga in', element: <LoginView />},
  {path: '/MovieView/:movieId', label: 'Filmbeskrivning', element: <MovieView />},
  {path: '/RegisterView', label: 'Bli medlem', element: <RegisterView /> },
  {path: '/TheaterView/:screeningId', label: 'Skapa bokning', element: <TheaterView />},
  {path: '/AdminView', label: 'Admin', element: <AdminView /> },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: views
  }
])


ReactDOM.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
