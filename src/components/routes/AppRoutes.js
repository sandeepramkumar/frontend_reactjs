import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../../components/auth/Login';
import Register from '../../components/auth/Register';
import MainLayout from '../common/MainLayout';
import ShipmentTable from '../common/ShipmentTables';
import Dashboard from '../common/Dashboard';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/*"
        element={
          <MainLayout>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/shipments" element={<ShipmentTable />} />
            </Routes>
          </MainLayout>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;