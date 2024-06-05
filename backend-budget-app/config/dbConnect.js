const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGO);
    console.log("database connect successfully");
  } catch (error) {
    // throw new Error(error)
    console.log("database connect error");
  }
};
module.exports = dbConnect;
