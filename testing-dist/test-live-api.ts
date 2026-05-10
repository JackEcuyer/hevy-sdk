import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

import { HevyClient } from "../dist/esm/HevyClient.js";
import type { HevyClientConfig } from "../dist/esm/HevyClient.js";

async function main() {
  const apiKey = process.env.HEVY_API_KEY;
  if (!apiKey) {
    throw new Error("HEVY_API_KEY is not set in environment variables.");
  }

  const config: HevyClientConfig = { apiKey };
  const client = new HevyClient(config);

  // Example: Fetch current user info
  try {
    const userInfo = await client.users.getUserInfo();
    console.log("User info:", userInfo);
  } catch (err) {
    console.error("Failed to fetch user info:", err);
  }

  // Example: List workouts
  try {
    const workouts = await client.workouts.listWorkouts(1, 5);
    console.log("Workouts:", workouts);
  } catch (err) {
    console.error("Failed to fetch workouts:", err);
  }
}

main();
