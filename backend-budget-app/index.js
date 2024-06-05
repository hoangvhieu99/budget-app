const express = require("express");
const app = express();
const dbConnect = require("./config/dbConnect");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoute");
const incomeRouter = require("./routes/incomeRoute");
const expenseRouter = require("./routes/expenseRoute");

const morgan = require("morgan");
dbConnect();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/income", incomeRouter);
app.use("/api/expense", expenseRouter);
app.listen(PORT, () => {
  console.log(`Server is running at localhost: ${PORT}`);
});
