const Server = require("./server");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 8080;
const https = require("https");
const fs = require("fs");
let httpsServer;
let server;
if(process.env.NODE_ENV === "production") {
  const privateKey = fs.readFileSync(process.env.SSL_KEY_LOCATION, "utf8");
  const certificate = fs.readFileSync(
    process.env.SSL_CERTIFICATE_LOCATION,
    "utf8"
  );
  const ca = fs.readFileSync(process.env.SSL_CHAIN_LOCATION, "utf8");
  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  };
  httpsServer = https.createServer(credentials, Server);
}

const { connectDb } = require("./config/db");
dotenv.config();

connectDb();

Server.use((req, res, next) => {
  console.log(req.body);
  next();
});

if(process.env.NODE_ENV === "production") {
  server = httpsServer.listen(PORT, () => {
    console.log(`Secure server started at localhost:${PORT}`);
  });
} else {
  server = Server.listen(PORT, () => {
    console.log(`server started at localhost:${PORT}`);
  });
}


process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
