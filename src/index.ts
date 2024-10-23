import app from "./server";
import { config } from "./config";
import dotenv from "dotenv";
// Load environment variables from .env file in non-production environments
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

app.listen(config.port, () => {
  console.log(
    `Server running in ${config.nodeEnv} mode on port ${config.port}`
  );
});
