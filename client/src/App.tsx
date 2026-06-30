import { Routes, Route, Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "./lib/auth";
import { AppShell } from "./components/AppShell";
import { Login } from "./pages/Login";
import { EnquiriesList } from "./pages/EnquiriesList";
import { Dashboard } from "./pages/Dashboard";
import { EnquiryOverview } from "./pages/EnquiryOverview";
import { NewEnquiry } from "./pages/NewEnquiry";
import { NeedsAttention } from "./pages/NeedsAttention";
import { PartsBom } from "./pages/PartsBom";
import { ScmRmOs } from "./pages/ScmRmOs";
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
        <Route path="/enquiries/new" element={<NewEnquiry />} />
        <Route path="/enquiries/:id" element={<EnquiryOverview />} />
        <Route path="/enquiries/:id/parts" element={<PartsBom />} />
        <Route path="/enquiries/:id/rm-os" element={<ScmRmOs />} />
        <Route path="/enquiries/:id/feasibility" element={<Placeholder title="CFT Feasibility" />} />
        <Route path="/enquiries/:id/cost-sheet" element={<Placeholder title="Cost Sheet" />} />
        <Route path="/enquiries/:id/approval" element={<Placeholder title="Approval" />} />
        <Route path="/enquiries/:id/revision-log" element={<Placeholder title="Revision Log" />} />
        <Route path="/needs-attention" element={<NeedsAttention />} />
        <Route path="/admin/users" element={<Placeholder title="Users" />} />
        <Route path="/admin/settings" element={<Placeholder title="Cost Settings" />} />
        <Route path="*" element={<Placeholder title="Not found" />} />
      </Route>
    </Routes>
  );
}
