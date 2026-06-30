import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDb } from "./db";
import { Enquiry } from "./models/Enquiry";
import { User } from "./models/User";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Auth (dev stub — resolves role server-side from the user record)
app.post("/api/auth/login", async (req, res) => {
  const { email } = req.body ?? {};
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  res.json({ token: "dev-token", user });
});

// Enquiries register
app.get("/api/enquiries", async (_req, res) => {
  const list = await Enquiry.find().sort({ updatedAt: -1 });
  res.json(list);
});

app.get("/api/enquiries/:id", async (req, res) => {
  const e = await Enquiry.findById(req.params.id);
  if (!e) return res.status(404).json({ error: "Not found" });
  res.json(e);
});

// Dashboard aggregates
app.get("/api/dashboard/summary", async (_req, res) => {
  const all = await Enquiry.find();
  const byStage: Record<string, number> = {};
  for (const e of all) byStage[e.status] = (byStage[e.status] || 0) + 1;
  const won = all.filter((e) => e.status === "Order Received").length;
  const lost = all.filter((e) => e.status === "Lost").length;
  res.json({
    active: all.length,
    pendingApproval: all.filter((e) => e.status === "Pending Approval").length,
    winRate: won + lost ? Math.round((won / (won + lost)) * 100) : 0,
    won,
    lost,
    byStage,
  });
});

const PORT = Number(process.env.PORT || 4000);
connectDb(process.env.MONGO_URI || "mongodb://localhost:27017/rapl_rfq")
  .then(() => app.listen(PORT, () => console.log(`✓ API on http://localhost:${PORT}`)))
  .catch((e) => {
    console.error("DB connection failed:", e.message);
    process.exit(1);
  });
