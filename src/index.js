const express = require("express");
const monitorRoutes = require("./routes/monitor.routes");

const app = express();

app.use(express.json());
app.use("/api", monitorRoutes);

const PORT = 6250;
app.listen(PORT, () => {
  console.log(`🚀 Server Monitor running on port ${PORT}`);
});