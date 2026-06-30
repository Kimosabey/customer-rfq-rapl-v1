import { Routes, Route, Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "./lib/auth";
import { AppShell } from "./components/AppShell";
import { Login } from "./pages/Login";
import { EnquiriesList } from "./pages/EnquiriesList";
import { Dashboard } from "./pages/Dashboard";
import { EnquiryOverview } from "./pages/EnquiryOverview";
import { Placeholder } from "./pages/Placeholder";

function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <RequireAuth>
            <AppShell />
          </RequireAuth>
        }
      >
        <Route path="/" element={<Navigate to="/enquiries" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/enquiries" element={<EnquiriesList />} />
        <Route path="/enquiries/new" element={<Placeholder title="New Enquiry" />} />
        <Route path="/enquiries/:id" element={<EnquiryOverview />} />
        <Route path="/needs-attention" element={<Placeholder title="Needs attention" />} />
        <Route path="/admin/users" element={<Placeholder title="Users" />} />
        <Route path="/admin/settings" element={<Placeholder title="Cost Settings" />} />
        <Route path="*" element={<Placeholder title="Not found" />} />
      </Route>
    </Routes>
  );
}
