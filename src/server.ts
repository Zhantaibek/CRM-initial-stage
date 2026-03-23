import express from "express";
import userRoutes from "./routes/userRoutes";
import clientRoutes from "./routes/clientRoutes";
import taskRoutes from "./routes/taskRoutes";
import dealRoutes from "./routes/dealRoutes";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/clients", clientRoutes);
app.use("/tasks", taskRoutes);
app.use("/deals", dealRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
