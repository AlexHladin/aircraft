import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import AircraftDashboardPage from './pages/aircraft/AircraftDashboardPage.tsx';
import CreateAircraft from './pages/aircraft/CreateAircraft.tsx';
import EditAircraft from './pages/aircraft/EditAircraft.tsx';
import MaintenanceCompanyDashboardPage from './pages/maintenance-company/MaintenanceCompanyDashboardPage.tsx';
import CreateMaintenanceCompany from './pages/maintenance-company/CreateMaintenanceCompany.tsx';
import EditMaintenanceCompany from './pages/maintenance-company/EditMaintenanceCompany.tsx';
import ServiceRequestDashboardPage from './pages/service-request/ServiceRequestDashboardPage.tsx';
import CreateServiceRequest from './pages/service-request/CreateServiceRequest.tsx';
import EditServiceRequest from './pages/service-request/EditServiceRequest.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to='/aircraft' />,
  },
  {
    path: "/aircraft",
    element: <AircraftDashboardPage />,
  },
  {
    path: "/aircraft/create",
    element: <CreateAircraft />,
  },
  {
    path: "/aircraft/:id/edit",
    element: <EditAircraft />,
  },
  {
    path: "maintenance-company",
    element: <MaintenanceCompanyDashboardPage />,
  },
  {
    path: "maintenance-company/create",
    element: <CreateMaintenanceCompany />,
  },
  {
    path: "maintenance-company/:id/edit",
    element: <EditMaintenanceCompany />,
  },
  {
    path: "service-request",
    element: <ServiceRequestDashboardPage />,
  },
  {
    path: "service-request/create",
    element: <CreateServiceRequest />,
  },
  {
    path: "service-request/:id/edit",
    element: <EditServiceRequest />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
