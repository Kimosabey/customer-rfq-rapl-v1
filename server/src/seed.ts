import "dotenv/config";
import { connectDb } from "./db";
import { User } from "./models/User";
import { Enquiry } from "./models/Enquiry";

const users = [
  { name: "Harshan Aiyappa", email: "harshan.aiyappa@lingotran.com", role: "BD" },
  { name: "Niranjan", email: "niranjan@rangsons.test", role: "Engineering" },
  { name: "Kimo", email: "kimo@rangsons.test", role: "Engineering" },
  { name: "Dhanya", email: "dhanya@rangsons.test", role: "SCM" },
  { name: "Kaushik", email: "kaushik@rangsons.test", role: "Estimation" },
  { name: "Raghav", email: "raghav@rangsons.test", role: "CEO_COO" },
  { name: "Kishan", email: "kishan@rangsons.test", role: "Admin" },
];

const enquiries = [
  { rfqNumber: "RA-2026-0142", customerName: "Boeing", businessType: "New", noOfParts: 12, status: "In SCM Sourcing", owner: "Dhanya", rfqReceivedDate: new Date("2026-06-22"), customerDueDate: new Date("2026-07-15"), fileAgoLink: "https://fileago.example/ra-0142" },
  { rfqNumber: "RA-2026-0139", customerName: "HAL", businessType: "Repeat", noOfParts: 6, status: "Order Received", owner: "Harshan Aiyappa", rfqReceivedDate: new Date("2026-06-09"), customerDueDate: new Date("2026-07-01") },
  { rfqNumber: "RA-2026-0150", customerName: "BEL", businessType: "New", noOfParts: 9, status: "In Engineering Review", owner: "Niranjan", rfqReceivedDate: new Date("2026-06-27"), customerDueDate: new Date("2026-07-20") },
  { rfqNumber: "RA-2026-0151", customerName: "Safran", businessType: "New", noOfParts: 4, status: "Pending Approval", owner: "Kaushik", rfqReceivedDate: new Date("2026-06-16"), customerDueDate: new Date("2026-07-10") },
  { rfqNumber: "RA-2026-0133", customerName: "GE Aviation", businessType: "New", noOfParts: 18, status: "Returned to BD", owner: "Harshan Aiyappa", rfqReceivedDate: new Date("2026-06-25"), customerDueDate: new Date("2026-07-18") },
  { rfqNumber: "RA-2026-0128", customerName: "HAL", businessType: "Repeat", noOfParts: 7, status: "Lost", owner: "Harshan Aiyappa", rfqReceivedDate: new Date("2026-06-04"), customerDueDate: new Date("2026-06-30") },
];

async function run() {
  await connectDb(process.env.MONGO_URI || "mongodb://localhost:27017/rapl_rfq");
  await User.deleteMany({});
  await Enquiry.deleteMany({});
  await User.insertMany(users);
  await Enquiry.insertMany(enquiries);
  console.log(`✓ Seeded ${users.length} users and ${enquiries.length} enquiries`);
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
