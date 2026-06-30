export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error || res.statusText);
  }
  return res.json() as Promise<T>;
}

export interface Enquiry {
  _id: string;
  rfqNumber: string;
  customerName: string;
  location?: string;
  businessType?: string;
  noOfParts?: number;
  status: string;
  owner?: string;
  rfqReceivedDate?: string;
  customerDueDate?: string;
  totalDurationDays?: number;
}

export interface DashboardSummary {
  active: number;
  pendingApproval: number;
  winRate: number;
  won: number;
  lost: number;
  byStage: Record<string, number>;
}
