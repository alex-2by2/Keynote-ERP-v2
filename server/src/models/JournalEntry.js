// server/src/models/JournalEntry.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const journalLineSchema = new Schema(
  {
    ledger: {
      type: Schema.Types.ObjectId,
      ref: "AccountLedger",
      required: true
    },

    debit: {
      type: Number,
      default: 0,
      min: 0
    },

    credit: {
      type: Number,
      default: 0,
      min: 0
    },

    narration: {
      type: String,
      trim: true,
      default: ""
    }
  },
  {
    _id: false
  }
);

const journalEntrySchema = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true
    },

    financialYear: {
      type: Schema.Types.ObjectId,
      ref: "FinancialYear",
      required: true,
      index: true
    },

    journalNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },

    journalDate: {
      type: Date,
      required: true
    },

    entries: {
      type: [journalLineSchema],
      default: []
    },

    totalDebit: {
      type: Number,
      default: 0
    },

    totalCredit: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: [
        "DRAFT",
        "POSTED",
        "REVERSED"
      ],
      default: "DRAFT",
      index: true
    },

    remarks: {
      type: String,
      trim: true,
      default: ""
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

journalEntrySchema.index(
  {
    company: 1,
    journalNumber: 1
  },
  {
    unique: true
  }
);

export default mongoose.model(
  "JournalEntry",
  journalEntrySchema
);
