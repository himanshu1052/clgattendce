import express from "express";
import { submitForm, getAllSubmissions, updateSubmissionStatus } from "../Controller/submissionController.js"

const router = express.Router();

// Route to submit the form
router.post("/submit", submitForm);

// Route to get all form submissions (For Admin)
router.get("/submissions", getAllSubmissions);

// Route to approve/reject a submission (Admin)
router.put("/submissions/:id", updateSubmissionStatus);

export default router;
