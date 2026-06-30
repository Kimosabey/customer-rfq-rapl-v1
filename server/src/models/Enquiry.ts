import { Schema, model } from "mongoose";

// 8 forward states + branches/terminals (canonical flow §B)
export const STATUS = [
  "Open",
  "In Engineering Review",
  "In CFT Review",
  "In SCM Sourcing",
  "In Estimation",
  "Pending Approval",
  "Quote Submitted",
  "Order Received",
  "Returned to BD",
  "Regretted",
  "Lost",
  "Closed / Hold",
] as const;

const EnquirySchema = new Schema(
  {
    rfqNumber: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    location: String,
    businessType: String,
    sow: String,
    noOfParts: Number,
    rfqReceivedDate: Date,
    customerDueDate: Date,
    fileAgoLink: String,
    status: { type: String, enum: STATUS, default: "Open" },
    owner: String,
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// Computed at read time (never stored) — per spec §4.2
EnquirySchema.virtual("totalDurationDays").get(function () {
  const start = this.rfqReceivedDate ? new Date(this.rfqReceivedDate).getTime() : Date.now();
  return Math.max(0, Math.round((Date.now() - start) / 86_400_000));
});

export const Enquiry = model("Enquiry", EnquirySchema);
