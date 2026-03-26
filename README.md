# 🚀 Server Monitor Service

A lightweight Node.js monitoring service for Ubuntu servers that provides:

* ✅ CPU usage monitoring
* ✅ RAM usage monitoring
* ✅ Disk usage monitoring
* ✅ Nginx status check (up / down)
* ✅ PM2 process monitoring (frontend & backend)
* ✅ Single JSON API endpoint for complete server health

---

# 📦 Features

* Real-time system metrics
* PM2 process health monitoring
* Nginx service status detection
* Clean structured JSON response
* Easy to integrate with dashboards or alert systems
* Production-ready architecture

---

# 🏗 Project Structure

```
server-monitor/
 ├── index.js
 ├── services/
 │     ├── system.js
 │     ├── nginx.js
 │     └── pm2.js
 └── package.json
```

---

# ⚙️ Installation

## 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd server-monitor
```

## 2️⃣ Install Dependencies

```bash
npm install
```

Dependencies used:

* express
* pm2
* systeminformation

---

# ▶️ Run the Service

```bash
node index.js
```

Or with PM2:

```bash
pm2 start index.js --name server-monitor
```

Service will run on:

```
http://localhost:4000
```

---

# 🌐 API Endpoint

## GET `/monitor`

Returns full server health status.

### Example Request

```
GET http://your-server:4000/monitor
```

### Example Response

```json
{
  "timestamp": "2026-03-26T14:00:00.000Z",
  "system": {
    "cpu": {
      "usagePercent": "12.54",
      "cores": 2
    },
    "memory": {
      "totalGB": "4.00",
      "usedGB": "2.10",
      "freeGB": "1.90"
    },
    "disk": [
      {
        "filesystem": "/",
        "sizeGB": "40.00",
        "usedGB": "15.00",
        "usagePercent": 37
      }
    ]
  },
  "nginx": "up",
  "pm2": [
    {
      "name": "frontend",
      "status": "online",
      "cpu": 0,
      "memoryMB": "45.21"
    },
    {
      "name": "backend",
      "status": "online",
      "cpu": 1.2,
      "memoryMB": "80.12"
    }
  ]
}
```

---

# 🔐 Security Recommendations

⚠️ Do NOT expose this API publicly without protection.

Recommended options:

* Add API key authentication
* Use Basic Auth
* Restrict access via firewall or security group
* Run inside private subnet
* Bind to `localhost` and access via reverse proxy

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

# 📊 What Is Monitored

### System

* CPU usage %
* Total / Used / Free RAM
* Disk usage
* Core count

### Nginx

* Uses `systemctl is-active nginx`
* Returns: `up` or `down`

### PM2

* Process name
* Status (online / stopped)
* CPU usage
* Memory usage (MB)

---

# 🚀 Production Recommendations

For production environments, consider:

* Adding `/health` endpoint for load balancers
* Integrating alerting (Telegram / Email)
* Auto-restart Nginx if down
* Logging errors to file
* Dockerizing the monitor
* Adding rate limiting

---

# 🧪 Testing

You can test locally using:

```bash
curl http://localhost:4000/monitor
```

---

# 🛠 Requirements

* Ubuntu server
* Node.js 18+
* PM2 installed globally
* Nginx installed (if monitoring required)

---

# 📄 License

MIT License

---

# 👨‍💻 Author

Server Monitor Service
Lightweight production-ready monitoring tool for Node.js servers.

---
