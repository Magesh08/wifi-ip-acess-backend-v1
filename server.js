const express = require("express");
const cors = require("cors");
const os = require("os");

const app = express();

app.use(cors());
app.set("trust proxy", true);

app.get("/local-ip", (req, res) => {
  const networkInterfaces = os.networkInterfaces();
  let wifiIPAddress;

  // Loop through network interfaces to find the Wi-Fi interface
  Object.keys(networkInterfaces).forEach((iface) => {
    if (iface.toLowerCase().includes("wi-fi") || iface.toLowerCase().includes("wifi")) {
      const wifiInterface = networkInterfaces[iface].find(
        (details) => details.family === "IPv4" && !details.internal
      );

      if (wifiInterface) {
        wifiIPAddress = wifiInterface.address;
      }
    }
  });

  if (wifiIPAddress) {
    res.json({ wifiIPAddress });
    console.log("Wi-Fi IP Address:", wifiIPAddress);
  } else {
    res.status(500).json({ error: "Wi-Fi IP address not found" });
    console.error("Error fetching Wi-Fi IP address");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
