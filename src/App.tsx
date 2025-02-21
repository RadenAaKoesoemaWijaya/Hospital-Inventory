import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import routes from "tempo-routes";
import DashboardLayout from "./components/layout/dashboard-layout";
import Dashboard from "./pages/dashboard";
import Inventory from "./pages/inventory";
import Requests from "./pages/requests";
import Distribution from "./pages/distribution";
import Reports from "./pages/reports";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      <Routes>
        <Route
          path="/"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/inventory"
          element={
            <DashboardLayout>
              <Inventory />
            </DashboardLayout>
          }
        />
        <Route
          path="/requests"
          element={
            <DashboardLayout>
              <Requests />
            </DashboardLayout>
          }
        />
        <Route
          path="/distribution"
          element={
            <DashboardLayout>
              <Distribution />
            </DashboardLayout>
          }
        />
        <Route
          path="/reports"
          element={
            <DashboardLayout>
              <Reports />
            </DashboardLayout>
          }
        />
        {import.meta.env.VITE_TEMPO === "true" && <Route path="/tempobook/*" />}
      </Routes>
    </Suspense>
  );
}

export default App;
