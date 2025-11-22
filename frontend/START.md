# 🚀 Quick Start Guide

## Option 1: With Mock Server (Recommended for Testing)

```bash
# Install dependencies
npm install

# Start both frontend and mock WebSocket server
npm run dev:full
```

This will start:
- Frontend at `http://localhost:3000`
- Mock WebSocket server at `ws://localhost:8000`

## Option 2: Frontend Only

```bash
# Install dependencies  
npm install

# Start frontend only
npm run dev
```

Frontend will show "Disconnected" status until you start your backend.

## Option 3: With Your Backend

1. Start your AIAGENT backend server with WebSocket endpoint at `ws://localhost:8000/ws/state`
2. Start frontend:
```bash
npm run dev
```

## Testing the Integration

The mock server simulates:
- Real-time EAR values (0.1 - 0.5)
- State changes: awake → warning → drowsy
- Agent switching: HUDA ↔ HADI
- Automatic HADI activation on drowsy state

## WebSocket Message Format

Your backend should send messages like:
```json
{
  "ear": 0.21,
  "state": "warning",
  "active_agent": "HUDA", 
  "timestamp": "2025-01-01T12:00:00Z"
}
```

## Troubleshooting

- **Connection Failed**: Backend not running on port 8000
- **Hydration Errors**: Clear browser cache and restart
- **Camera Issues**: Allow camera permissions in browser