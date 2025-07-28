/**
 * React Router Configuration for Codigo Escrow Template
 * 
 * @author David James
 * @email ccrowndavid@gmail.com
 * @github https://www.github.com/David-CCrown
 * @description Defines all application routes including home, app layout, and nested routes
 */

import { createBrowserRouter } from 'react-router';

import Home from '@/routes/Home';
import Dashboard from '@/routes/app/Dashboard';
import CreateEscrow from '@/routes/app/CreateEscrow';
import Browse from '@/routes/app/Browse';
import EscrowDetail from '@/routes/app/EscrowDetail';
import History from '@/routes/app/History';
import Analytics from '@/routes/app/Analytics';
import Settings from '@/routes/app/Settings';
import NotFound from '@/routes/NotFound';
import AppLayout from '@/components/layouts/AppLayout';
import PageError from '@/components/PageError';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export const router = createBrowserRouter([
  {
    errorElement: <PageError />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/app',
        element: (
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: 'create',
            element: <CreateEscrow />,
          },
          {
            path: 'browse',
            element: <Browse />,
          },
          {
            path: 'escrow/:id',
            element: <EscrowDetail />,
          },
          {
            path: 'history',
            element: <History />,
          },
          {
            path: 'analytics',
            element: <Analytics />,
          },
          {
            path: 'settings',
            element: <Settings />,
          },
        ],
      },

      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
