const Server = require("./server");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 8080;
const { connectDb } = require("./config/db");
dotenv.config({ path: "./src/config/config.env" });

connectDb();

Server.use((req, res, next) => {
  console.log(req.body);
  next();
});

const server = Server.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
