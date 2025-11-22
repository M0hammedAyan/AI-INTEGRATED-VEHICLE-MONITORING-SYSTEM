# 🚗 Car Dashboard UI - Integration Guide

## 🎯 Overview

This is a complete automotive dashboard UI for your AIAGENT project. The frontend is fully implemented and ready to integrate with your backend APIs and WebSocket streams.

## 🏗️ Architecture

### Components Built
- **CameraFeed**: Rounded trapezoid video feed with neon glow and EAR overlay
- **AgentAvatarCluster**: Circular speedometer-style agent display with animations
- **StateBar**: Automotive gauge strip showing EAR values and drowsiness state
- **VoiceWheel**: Tesla-style voice control with pulse rings and waveform
- **ConversationStrip**: Floating glass panel showing last 3 messages
- **BottomNavBar**: Infotainment-style navigation with neon hover effects
- **AlertBanner**: Full-width HUD alert for drowsiness warnings

### Layout Structure
```
┌─────────────────────────────────────────────────────────────┐
│  [Camera Feed - 65%]        │  [Agent Avatar Cluster - 35%]  │
├─────────────────────────────────────────────────────────────┤
│  [EAR & Drowsiness State Bar - Full Width]                  │
├─────────────────────────────────────────────────────────────┤
│  [Voice Wheel - 30%]  │  [Conversation Strip - 70%]        │
├─────────────────────────────────────────────────────────────┤
│  [Bottom Navigation - NAV|MUSIC|DIAGNOSTICS|AGENT|SETTINGS] │
└─────────────────────────────────────────────────────────────┘
```

## 🔌 Backend Integration

### 1. WebSocket Connection

**Endpoint**: `ws://your-backend-url/ws/state`

**Expected JSON Format**:
```json
{
  "ear": 0.21,
  "state": "warning",
  "active_agent": "HUDA",
  "timestamp": "2025-01-01T12:00:00Z"
}
```

**Configuration**:
```bash
# Set in .env.local
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws/state
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

### 2. REST API Endpoints

The dashboard expects these backend routes:

#### Voice Commands
```bash
POST /api/voice/send
Content-Type: multipart/form-data
Body: audio file (Blob)

Response:
{
  "success": true,
  "agent": "HADI",
  "response": "I understand you want to navigate to the mall."
}
```

#### Text Commands
```bash
POST /api/text/send
Content-Type: application/json
Body: { "text": "Navigate to the nearest gas station" }

Response:
{
  "success": true,
  "agent": "HUDA", 
  "response": "Finding the nearest gas station for you."
}
```

#### Navigation
```bash
POST /api/navigation/start
Content-Type: application/json
Body: { "destination": "123 Main St" }

Response:
{
  "success": true,
  "route_found": true,
  "eta": "15 minutes"
}
```

#### Tool Calls
```bash
POST /api/tools/{toolName}
Content-Type: application/json
Body: { ...tool-specific-params }

Response:
{
  "success": true,
  "result": { ...tool-result }
}
```

## 🎨 Visual Theme

### Color Scheme
- **Background**: Carbon Black (#05080D) with gradient
- **HADI Agent**: Electric Blue (#00A3FF)
- **HUDA Agent**: Sunset Orange (#FF7A3D)
- **Awake State**: Neon Green (#10FF88)
- **Warning State**: Amber Yellow (#FFD54A)
- **Drowsy State**: Emergency Red (#FF3B3B)

### Effects
- Frosted glass panels with 15px blur
- Neon edge glows that change with state
- Smooth 0.3s curve animations
- Automotive gauge styling
- Speedometer-like circular displays

## 🚀 Running the Dashboard

### Development
```bash
cd frontend
npm install
npm run dev
```

### With Mock Backend
```bash
npm run dev:full  # Starts both mock server and frontend
```

### Production Build
```bash
npm run build
npm start
```

## 🔧 Customization

### Changing Agent Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  'hadi': '#YOUR_BLUE_COLOR',
  'huda': '#YOUR_ORANGE_COLOR',
}
```

### Adjusting Layout Proportions
Edit `app/page.tsx`:
```javascript
// Camera feed width (currently 65%)
<div className="flex-[0.65]">

// Agent avatar width (currently 35%)  
<div className="flex-[0.35]">
```

### Adding New Navigation Items
Edit `components/BottomNavBar.tsx`:
```javascript
const navItems = [
  { id: 'your-item', icon: YourIcon, label: 'YOUR LABEL', color: '#COLOR' },
  // ... existing items
];
```

## 📱 Responsive Design

The dashboard is fully responsive:
- **Desktop**: Full layout with all components
- **Tablet**: Stacked layout with adjusted proportions
- **Mobile**: Simplified single-column layout

## 🎯 Key Features

### Real-time Updates
- WebSocket connection with auto-reconnect
- Live EAR value display
- Dynamic state color changes
- Agent switching animations

### Voice Interaction
- Voice recording with visual feedback
- Waveform animations during speech
- Pulse rings during listening
- Processing state indicators

### Safety Features
- Automatic drowsiness alerts
- Auto-switch to HADI when drowsy
- Vibration effects for critical alerts
- 5-second auto-hide for alerts

### Conversation History
- Last 3 messages display
- Animated message transitions
- Agent-specific styling
- Timestamp display

## 🔍 Troubleshooting

### WebSocket Connection Issues
1. Check backend is running on correct port
2. Verify CORS settings allow WebSocket connections
3. Check browser console for connection errors

### Camera Access Problems
1. Ensure HTTPS in production (required for camera)
2. Check browser permissions
3. Verify camera is not in use by other apps

### Styling Issues
1. Run `npm run build` to regenerate Tailwind classes
2. Check browser dev tools for CSS conflicts
3. Verify all custom CSS classes are defined

## 📋 Integration Checklist

- [ ] Backend WebSocket endpoint implemented
- [ ] REST API endpoints created
- [ ] Environment variables configured
- [ ] Camera permissions granted
- [ ] WebSocket CORS configured
- [ ] Audio recording permissions set
- [ ] Production HTTPS configured (if needed)

## 🎉 Ready to Use!

Your automotive dashboard UI is complete and ready for integration. The interface provides a premium, futuristic experience that matches modern car infotainment systems while maintaining full functionality with your AI agents.

The dashboard will automatically connect to your backend and start displaying real-time data as soon as the WebSocket connection is established.