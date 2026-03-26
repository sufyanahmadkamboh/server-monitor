const express = require("express");
const dotenv = require("dotenv");
const monitorRoutes = require("./routes/monitor.routes");
const apiKeyMiddleware = require("./middleware/apiKey.middleware");

dotenv.config();

const app = express();

app.use(express.json());

// ✅ Protect all routes with API key
app.use(apiKeyMiddleware);

app.use("/api", monitorRoutes);

const PORT = process.env.PORT || 6250;

app.listen(PORT, () => {
  console.log(`🚀 Server Monitor running on port ${PORT}`);
});