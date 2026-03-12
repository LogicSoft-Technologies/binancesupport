import dotenv from "dotenv";

dotenv.config();

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is missing. Check your .env file.");
}