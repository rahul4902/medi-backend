// app.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const userRoutes = require("./routes/user");
const departmentRoutes = require("./routes/DepartmentRoute");
const testRoutes = require("./routes/TestRoutes");
// Middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

const sequelize = require("./config/connection");

async function syncModels() {
  try {
    await sequelize.sync({ force: false, alter: true });
    console.log("Models synced successfully");
  } catch (error) {
    console.error("Error syncing models:", error);
  }
}
// syncModels();
app.use("/admin/department", departmentRoutes);
app.use("/admin/test", testRoutes);

app.use("/user", userRoutes);
app.use("/test", testRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
