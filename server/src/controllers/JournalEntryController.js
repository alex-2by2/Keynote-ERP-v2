// server/src/controllers/JournalEntryController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import JournalEntryService from "../services/JournalEntryService.js";

export const createJournalEntry = asyncHandler(async (req, res) => {
  const journalEntry =
    await JournalEntryService.create(req.body);

  return success(
    res,
    journalEntry,
    "Journal entry created successfully.",
    201
  );
});

export const getJournalEntry = asyncHandler(async (req, res) => {
  const journalEntry =
    await JournalEntryService.getById(
      req.params.id
    );

  return success(res, journalEntry);
});

export const listJournalEntries = asyncHandler(async (req, res) => {
  const journalEntries =
    await JournalEntryService.list(
      req.query.company || null
    );

  return success(res, journalEntries);
});

export const updateJournalEntry = asyncHandler(async (req, res) => {
  const journalEntry =
    await JournalEntryService.update(
      req.params.id,
      req.body
    );

  return success(
    res,
    journalEntry,
    "Journal entry updated successfully."
  );
});

export const deleteJournalEntry = asyncHandler(async (req, res) => {
  await JournalEntryService.delete(
    req.params.id
  );

  return success(
    res,
    null,
    "Journal entry deleted successfully."
  );
});
