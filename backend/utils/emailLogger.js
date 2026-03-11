import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

const logFile = path.resolve("email-logs.json");

export const logEmail = ({ to, subject, status }) => {
  const log = {
    id: uuid(),
    to,
    subject,
    status,
    time: new Date().toISOString(),
  };

  let logs = [];
  if (fs.existsSync(logFile)) {
    try {
      logs = JSON.parse(fs.readFileSync(logFile, "utf-8"));
    } catch (err) {
      console.error("Failed to read logs, creating new file.", err);
      logs = [];
    }
  }

  logs.push(log);

  fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));
};
