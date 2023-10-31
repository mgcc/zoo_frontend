import React from 'react';
import ReactDOM from 'react-dom/client';
import * as reactRouterDom from 'react-router-dom';

// css
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// pages
import Home from './pages/Home';
import AddPage from './pages/AddPage';
import DetailPage from './pages/DetailPage';

// custom components
import Header from './components/Header';
import Alerts from './components/Alerts';

// Provider
import { AlertProvider } from './utility/AlertContext';

// create routing for Web app
const router = reactRouterDom.createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/add-animal', element: <AddPage /> },
  { path: '/animal/:id', element: <DetailPage /> }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AlertProvider>
    <Header />
    <reactRouterDom.RouterProvider router={router} />
    <Alerts />
  </AlertProvider>
);

