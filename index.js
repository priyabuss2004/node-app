const express = require("express");
const path = require("path");
const os = require('os');

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get('/path', (req, res) => {
  const hostname = os.hostname();
  const networkInterfaces = os.networkInterfaces();
  let ipAddress = 'Not found';

  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];
    for (const iface of interfaces) {
      if (iface.family === 'IPv4' && !iface.internal) {
        ipAddress = iface.address;
        break;
      }
    }
  }
  res.send(`Hostname: ${hostname}, IP Address: ${ipAddress}`);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
