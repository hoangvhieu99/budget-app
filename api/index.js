import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import useRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import transactionsRoutes from "./routes/transactions.route.js";
import cors from "cors";
// import expenseRoutes from "./routes/expense.route.js";
// import incomeRoutes from "./routes/income.route.js";
import cookieParser from "cookie-parser";
dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server listening on port 3000!");
});
app.use("/api/user", useRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionsRoutes);
// app.use("/api/income", incomeRoutes);
// app.use("/api/expense", expenseRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    error: message,
    statusCode,
  });
});
