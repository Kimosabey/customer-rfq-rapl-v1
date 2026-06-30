import { api, type Enquiry, type DashboardSummary } from "./api";
import { MOCK_ENQUIRIES, MOCK_DASHBOARD, MOCK_USERS } from "./mock";
import type { Role } from "./auth";

// Mock-first. Flip via VITE_USE_MOCK=false (or here) to use the Express/Mongo API.
export const USE_MOCK = ((import.meta as any).env?.VITE_USE_MOCK ?? "true") !== "false";

const delay = <T>(value: T, ms = 350): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

export const getEnquiries = (): Promise<Enquiry[]> =>
  USE_MOCK ? delay(MOCK_ENQUIRIES) : api<Enquiry[]>("/enquiries");

export const getDashboardSummary = (): Promise<DashboardSummary> =>
  USE_MOCK ? delay(MOCK_DASHBOARD) : api<DashboardSummary>("/dashboard/summary");

export const getEnquiry = (id: string): Promise<Enquiry | undefined> =>
  USE_MOCK ? delay(MOCK_ENQUIRIES.find((e) => e._id === id)) : api<Enquiry>(`/enquiries/${id}`);

export const findMockUser = (email: string): { name: string; email: string; role: Role } | undefined =>
  MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
