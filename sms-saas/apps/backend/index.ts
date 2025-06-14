import express from "express";
import { SerialPort } from "serialport";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const portName = "COM3"; // Adjust to your COM port
const modem = new SerialPort({
  path: portName,
  baudRate: 9600,
  autoOpen: false,
});

SerialPort.list().then((ports) => {
  ports.forEach((port) => {
    console.log(`🔌 ${port.path} | ${port.manufacturer}`);
  });
});

function sendCommand(command: string) {
  return new Promise<string>((resolve, reject) => {
    modem.write(command + "\r", (err) => {
      if (err) return reject(err);
      modem.drain(() => {
        let data = "";
        modem.once("data", (chunk) => {
          data += chunk.toString();
          resolve(data);
        });
      });
    });
  });
}

modem.open((err) => {
  if (err) return console.error("❌ Failed to open port:", err.message);
  console.log(`✅ Port ${portName} opened`);
});

app.post("/api/send-sms", async (req, res) => {
  const { number, message } = req.body;

  try {
    await sendCommand("AT"); // Check modem
    await sendCommand("AT+CMGF=1"); // Text mode
    await sendCommand(`AT+CMGS="${number}"`);
    await sendCommand(message + String.fromCharCode(26)); // Ctrl+Z
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: String(err) });
  }
});

app.listen(5000, () => {
  console.log("🚀 SMS Backend running on http://localhost:5000");
});
//sms system with nodejs and serialport
// This code sets up a simple SMS sending service using Node.js and the serialport library.