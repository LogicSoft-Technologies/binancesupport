import dotenv from "dotenv";

dotenv.config();

if (!process.env.EMAIL_FROM || !process.env.EMAIL_PASS) {
  throw new Error(
    "EMAIL_FROM or EMAIL_PASS is missing. Check your .env file."
  );
}
