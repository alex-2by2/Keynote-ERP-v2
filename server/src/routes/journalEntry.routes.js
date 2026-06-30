// server/src/routes/journalEntry.routes.js

import { Router } from "express";

import {
  createJournalEntry,
  getJournalEntry,
  listJournalEntries,
  updateJournalEntry,
  deleteJournalEntry
} from "../controllers/JournalEntryController.js";

import authenticate from "../middleware/authenticate.js";
import currentUser from "../middleware/currentUser.js";
import authorize from "../middleware/authorize.js";
import validateObjectId from "../middleware/validateObjectId.js";

const router = Router();

router.use(authenticate);
router.use(currentUser);

router
  .route("/")
  .get(
    authorize("admin", "manager", "accountant"),
    listJournalEntries
  )
  .post(
    authorize("admin", "accountant"),
    createJournalEntry
  );

router
  .route("/:id")
  .get(
    validateObjectId(),
    authorize("admin", "manager", "accountant"),
    getJournalEntry
  )
  .put(
    validateObjectId(),
    authorize("admin", "accountant"),
    updateJournalEntry
  )
  .delete(
    validateObjectId(),
    authorize("admin"),
    deleteJournalEntry
  );

export default router;
