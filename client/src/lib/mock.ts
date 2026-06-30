import type { Enquiry, DashboardSummary } from "./api";
import type { Role } from "./auth";

/* Mock data (matches design/07-references/DUMMY-DATA.md). Used while USE_MOCK is on;
   later we migrate to the Express/Mongo API by flipping the flag in data.ts. */

export const MOCK_USERS: { name: string; email: string; role: Role }[] = [
  { name: "Harshan Aiyappa", email: "harshan.aiyappa@lingotran.com", role: "BD" },
  { name: "Niranjan", email: "niranjan@rangsons.test", role: "Engineering" },
  { name: "Kimo", email: "kimo@rangsons.test", role: "Engineering" },
  { name: "Dhanya", email: "dhanya@rangsons.test", role: "SCM" },
  { name: "Kaushik", email: "kaushik@rangsons.test", role: "Estimation" },
  { name: "Raghav", email: "raghav@rangsons.test", role: "CEO_COO" },
  { name: "Kishan", email: "kishan@rangsons.test", role: "Admin" },
];

export const MOCK_ENQUIRIES: Enquiry[] = [
  { _id: "e1", rfqNumber: "RA-2026-0142", customerName: "Boeing", businessType: "New", noOfParts: 12, status: "In SCM Sourcing", owner: "Dhanya", totalDurationDays: 8, customerDueDate: "2026-07-15" },
  { _id: "e2", rfqNumber: "RA-2026-0139", customerName: "HAL", businessType: "Repeat", noOfParts: 6, status: "Order Received", owner: "Harshan Aiyappa", totalDurationDays: 21, customerDueDate: "2026-07-01" },
  { _id: "e3", rfqNumber: "RA-2026-0150", customerName: "BEL", businessType: "New", noOfParts: 9, status: "In Engineering Review", owner: "Niranjan", totalDurationDays: 3, customerDueDate: "2026-07-20" },
  { _id: "e4", rfqNumber: "RA-2026-0151", customerName: "Safran", businessType: "New", noOfParts: 4, status: "Pending Approval", owner: "Kaushik", totalDurationDays: 14, customerDueDate: "2026-07-10" },
  { _id: "e5", rfqNumber: "RA-2026-0133", customerName: "GE Aviation", businessType: "New", noOfParts: 18, status: "Returned to BD", owner: "Harshan Aiyappa", totalDurationDays: 5, customerDueDate: "2026-07-18" },
  { _id: "e6", rfqNumber: "RA-2026-0128", customerName: "HAL", businessType: "Repeat", noOfParts: 7, status: "Lost", owner: "Harshan Aiyappa", totalDurationDays: 26, customerDueDate: "2026-06-30" },
];

export const MOCK_DASHBOARD: DashboardSummary = {
  active: 42,
  pendingApproval: 6,
  winRate: 62,
  won: 8,
  lost: 5,
  byStage: {
    "In Engineering Review": 7,
    "In CFT Review": 4,
    "In SCM Sourcing": 17,
    "In Estimation": 5,
    "Pending Approval": 6,
    "Order Received": 8,
  },
};
