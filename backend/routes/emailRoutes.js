import express from "express";
import { sendCompanyEmail } from "../services/emailService.js";

const router = express.Router();

router.post("/send", sendCompanyEmail);

export default router;
