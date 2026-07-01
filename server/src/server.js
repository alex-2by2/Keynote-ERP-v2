import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDatabase } from "./config/database.js";

const PORT = Number(process.env.PORT || 5000);

async function bootstrap() {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Application startup failed.");
    console.error(error);
    process.exit(1);
  }
}

bootstrap();
