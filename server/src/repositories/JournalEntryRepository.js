// server/src/repositories/JournalEntryRepository.js

import JournalEntry from "../models/JournalEntry.js";

export default class JournalEntryRepository {
  static async create(payload) {
    return JournalEntry.create(payload);
  }

  static async findById(id) {
    return JournalEntry.findById(id)
      .populate("company", "code displayName")
      .populate("financialYear", "name startDate endDate")
      .populate("entries.ledger", "code name");
  }

  static async findByJournalNumber(
    companyId,
    journalNumber
  ) {
    return JournalEntry.findOne({
      company: companyId,
      journalNumber: journalNumber
        .trim()
        .toUpperCase()
    })
      .populate("company", "code displayName")
      .populate("financialYear", "name")
      .populate("entries.ledger", "code name");
  }

  static async existsByJournalNumber(
    companyId,
    journalNumber
  ) {
    return JournalEntry.exists({
      company: companyId,
      journalNumber: journalNumber
        .trim()
        .toUpperCase()
    });
  }

  static async list(filter = {}) {
    return JournalEntry.find(filter)
      .populate("company", "code displayName")
      .populate("financialYear", "name")
      .sort({
        journalDate: -1,
        createdAt: -1
      });
  }

  static async update(id, payload) {
    return JournalEntry.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("company", "code displayName")
      .populate("financialYear", "name")
      .populate("entries.ledger", "code name");
  }

  static async delete(id) {
    return JournalEntry.findByIdAndDelete(id);
  }
}
