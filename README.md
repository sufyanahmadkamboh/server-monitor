# 🚀 Server Monitor Service

A structured and production-ready Node.js monitoring service for Ubuntu servers.

This service monitors:

* ✅ CPU usage
* ✅ RAM usage
* ✅ Disk usage ( `/` and `/data` )
* ✅ Nginx status (UP / DOWN)
* ✅ PM2 services (frontend, backend, chain, indexer, explorer, etc.)
* ✅ Service uptime in weeks

The API runs on **port 6250**.

---

# 📁 Project Structure

```
server-monitor/
│
├── src/
│   ├── index.js
│   │
│   ├── routes/
│   │   └── monitor.routes.js
│   │
│   ├── controllers/
│   │   └── monitor.controller.js
│   │
│   ├── services/
│   │   ├── system.service.js
│   │   ├── pm2.service.js
│   │   └── nginx.service.js
│   │
│   └── utils/
│       └── format.util.js
│
├── package.json
└── README.md
```

---

# ⚙️ Requirements

* Ubuntu Server
* Node.js 18+
* PM2 installed globally
* Nginx installed (if monitoring enabled)
* systemd enabled (for nginx status check)

---

# 📦 Installation

## 1️⃣ Clone the Repository

```
git clone <your-repository-url>
cd server-monitor
```

## 2️⃣ Install Dependencies

```
npm install
```

Dependencies used:

* express
* systeminformation
* pm2

---

# ▶️ Running the Service

## Run Normally

```
node src/index.js
```

## Run with PM2 (Recommended)

```
pm2 start src/index.js --name server-monitor
```

The API will start on:

```
http://localhost:6250
```

---

# 🌐 API Endpoint

## GET `/api/monitor`

### Example Request

```
GET http://your-server-ip:6250/api/monitor
```

---

# 📊 Example Response

```json
{
  "timestamp": "2026-03-26T14:00:00.000Z",
  "system": {
    "cpuUsagePercent": "38.45",
    "cpuCores": 4,
    "memory": {
      "totalGB": "15.61",
      "usedGB": "8.12",
      "freeGB": "7.49"
    },
    "disk": {
      "root": {
        "totalTB": "3.932",
        "usedTB": "2.806",
        "usagePercent": 71
      },
      "data": {
        "totalGB": "983",
        "usedGB": "20.9",
        "usagePercent": 2
      }
    }
  },
  "nginx": "UP",
  "services": [
    {
      "name": "backend",
      "status": "ONLINE",
      "cpuPercent": 1.2,
      "memoryMB": "82.14",
      "uptimeWeeks": "6.2"
    }
  ]
}
```

---

# 🔎 What Is Monitored

## 🖥 System

* CPU usage %
* CPU core count
* Total / Used / Free RAM
* Disk usage for `/`
* Disk usage for `/data`

## 🌐 Nginx

* Checks status using:

  ```
  systemctl is-active nginx
  ```
* Returns:

  * `UP`
  * `DOWN`

## ⚙️ PM2 Services

* Process name
* Status (ONLINE / STOPPED)
* CPU usage %
* Memory usage (MB)
* Uptime in weeks

---

# 🔐 Security Recommendations (Important)

⚠️ Do NOT expose this endpoint publicly without protection.

Recommended options:

* Add API key middleware
* Restrict via firewall / AWS Security Group
* Bind service to `127.0.0.1`
* Use reverse proxy with authentication
* Use private subnet (recommended for production)

Example simple API key middleware:

```js
app.use((req, res, next) => {
  if (req.headers["x-api-key"] !== "your-secret-key") {
    return res.status(401).send("Unauthorized");
  }
  next();
});
```

---

# 🧪 Testing

Test locally:

```
curl http://localhost:6250/api/monitor
```

---

# 🚀 Production Suggestions

You can extend this service with:

* `/health` endpoint for load balancers
* Telegram / Slack alerts
* Auto-restart nginx if DOWN
* Docker support
* Multi-server monitoring
* Real-time WebSocket dashboard
* Logging & rate limiting

---

# 📄 License

MIT License

---

# 👨‍💻 Author

Server Monitor Service
Lightweight, structured monitoring microservice for production servers.

---
