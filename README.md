# 🚀 Server Monitor Service

A structured, production-ready Node.js monitoring microservice for Ubuntu servers.

This service provides real-time monitoring for:

* ✅ CPU usage
* ✅ RAM usage
* ✅ Disk usage (`/` and `/data`)
* ✅ Nginx status (UP / DOWN)
* ✅ PM2 services (frontend, backend, chain, indexer, explorer, etc.)
* ✅ Service uptime (in weeks)

The API runs securely on **port 6250** and is protected using an **API Key**.

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
│   ├── middleware/
│   │   └── apiKey.middleware.js
│   │
│   └── utils/
│       └── format.util.js
│
├── .env
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
* dotenv

---

# 🔐 Environment Configuration

Create a `.env` file in the root directory:

```
PORT=6250
API_KEY=your-super-secret-key
```

⚠️ Important:

* Never commit `.env` to Git.
* Add `.env` to `.gitignore`.

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

The API will run on:

```
http://localhost:6250
```

---

# 🔐 Authentication (API Key Required)

All endpoints are protected using an API key.

You must send the API key in the request header:

```
x-api-key: your-super-secret-key
```

If:

* ❌ No API key → `401 Unauthorized`
* ❌ Wrong API key → `403 Forbidden`
* ✅ Correct API key → `200 OK`

---

# 🌐 API Endpoint

## GET `/api/monitor`

### Example Request

```
curl -H "x-api-key: your-super-secret-key" \
http://your-server-ip:6250/api/monitor
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

## 🖥 System Metrics

* CPU usage %
* CPU core count
* Total / Used / Free RAM
* Disk usage for `/`
* Disk usage for `/data`

## 🌐 Nginx

Checks using:

```
systemctl is-active nginx
```

Returns:

* `UP`
* `DOWN`

## ⚙️ PM2 Services

* Process name
* Status (ONLINE / STOPPED)
* CPU usage %
* Memory usage (MB)
* Uptime in weeks

---

# 🛡 Security Recommendations

For production environments:

* Bind Node to `127.0.0.1`
* Use Nginx as reverse proxy with HTTPS
* Close port 6250 in firewall
* Restrict access via AWS Security Group
* Keep API key private
* Rotate API key periodically

---

# 🚀 Optional Enhancements

You can extend this service with:

* `/health` endpoint for load balancers
* Rate limiting
* IP whitelisting
* Telegram / Slack alerts
* Auto-restart services if DOWN
* Docker support
* Multi-server monitoring dashboard

---

# 📄 License

MIT License

---

# 👨‍💻 Author

Server Monitor Service
Lightweight structured monitoring microservice for production servers.
