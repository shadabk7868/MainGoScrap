import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './auth/Login'
import Dashboard from './pages/Dashboard'
import AddVehicle from './pages/AddVehicle'
import VehicleDetails from './pages/VehicleDetails'
import VehicleList from './pages/VehicleList'
import EditVehicle from "./pages/EditVehicle";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vehicles"
          element={
            <ProtectedRoute>
              <VehicleList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vehicle/:id"
          element={
            <ProtectedRoute>
              <VehicleDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-vehicle"
          element={
            <ProtectedRoute>
              <AddVehicle />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-vehicle/:id"
          element={
            <ProtectedRoute>
              <EditVehicle />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App;
