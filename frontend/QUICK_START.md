# 🚀 Quick Start Guide

## Immediate Setup (2 minutes)

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment
Create `.env.local`:
```bash
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws/state
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

### 3. Start Dashboard
```bash
# Option A: Dashboard only
npm run dev

# Option B: Dashboard + Mock Backend
npm run dev:full
```

### 4. Open Browser
Navigate to: `http://localhost:3000`

## 🎯 What You'll See

✅ **Complete automotive dashboard** with all components
✅ **Live camera feed** in rounded trapezoid frame  
✅ **Agent avatar cluster** with speedometer styling
✅ **Voice wheel** with Tesla-style controls
✅ **State bar** showing EAR values and drowsiness
✅ **Conversation strip** for message history
✅ **Bottom navigation** with infotainment styling

## 🔌 Connect Your Backend

Replace the mock server with your actual backend:

1. **Update WebSocket endpoint** in `.env.local`
2. **Implement required API routes** (see DASHBOARD_INTEGRATION.md)
3. **Test WebSocket connection** - dashboard will show "ONLINE" when connected

## 🎨 Styling Preview

The dashboard uses:
- **Carbon black background** (#05080D)
- **Frosted glass panels** with 15px blur
- **Neon glows** that change with agent state
- **Automotive gauge styling** throughout
- **Smooth animations** (0.3s curves)

## 📱 Responsive Layout

- **Desktop**: Full dashboard layout
- **Mobile**: Stacked components, optimized for touch

## 🚨 Drowsiness Demo

To test the drowsiness alert:
1. Send WebSocket message: `{"state": "drowsy"}`
2. Watch the red alert banner appear
3. Agent auto-switches to HADI
4. Alert auto-hides after 5 seconds

## ✨ Ready to Go!

Your premium automotive dashboard is now running. Connect your backend APIs and WebSocket to see real-time data flowing through the interface.