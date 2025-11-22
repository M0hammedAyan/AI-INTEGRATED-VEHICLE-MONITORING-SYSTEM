# 🔗 Backend Integration Guide

## Overview

This frontend is designed to integrate seamlessly with your existing AIAGENT backend. Here's how to connect everything together.

## 🔌 Required Backend Endpoints

### WebSocket Endpoint
```
ws://localhost:8000/ws/state
```

**Expected Message Format:**
```json
{
  "ear": 0.21,
  "state": "warning",
  "active_agent": "HUDA", 
  "timestamp": "2025-01-01T12:00:00Z"
}
```

### REST API Endpoints

**1. Voice Upload**
```http
POST /api/voice/send
Content-Type: multipart/form-data

Form Data:
- audio: [audio file blob]
```

**Response:**
```json
{
  "transcription": "Hey HADI, check engine status",
  "response": "Engine diagnostics show all systems normal",
  "agent": "HADI"
}
```

**2. Command Endpoint (Optional)**
```http
POST /api/command
Content-Type: application/json

{
  "command": "switch to HADI"
}
```

**3. Status Endpoint (Optional)**
```http
GET /api/status
```

**Response:**
```json
{
  "active_agent": "HUDA",
  "state": "awake",
  "ear": 0.25,
  "connected_clients": 1
}
```

## 🚀 Setup Instructions

### 1. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment

Update `.env.local`:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws/state
```

### 3. Start Development Server

```bash
npm run dev
```

Frontend will be available at `http://localhost:3000`

## 🔄 Integration Flow

### 1. WebSocket Connection
- Frontend connects to WebSocket on page load
- Auto-reconnect with exponential backoff
- Real-time state updates trigger UI changes

### 2. Voice Interaction
- User clicks voice button → starts recording
- Audio blob sent to `/api/voice/send`
- Response displayed in UI
- Agent avatar animates during speaking

### 3. Drowsiness Detection
- Backend sends state updates via WebSocket
- `state: "drowsy"` triggers alert banner
- Automatic agent switch to HADI
- Warning tone and vibration (if supported)

## 🧪 Testing Integration

### Test WebSocket Connection

1. Start your backend server
2. Start frontend: `npm run dev`
3. Open browser console
4. Look for: `"WebSocket connected"`
5. Send test message from backend to verify UI updates

### Test Voice Upload

1. Click voice button in UI
2. Record audio message
3. Check network tab for POST to `/api/voice/send`
4. Verify response appears in UI

### Test Drowsiness Alerts

Send WebSocket message with `state: "drowsy"`:
```json
{
  "ear": 0.15,
  "state": "drowsy", 
  "active_agent": "HADI",
  "timestamp": "2025-01-01T12:00:00Z"
}
```

Should trigger:
- Red alert banner
- Warning tone
- Agent switch to HADI
- Vibration (mobile)

## 🔧 Backend Modifications Needed

### 1. CORS Configuration

Add CORS headers for frontend domain:
```python
# Example for FastAPI
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 2. WebSocket State Broadcasting

Ensure your backend broadcasts state changes:
```python
# Example WebSocket broadcast
async def broadcast_state(state_data):
    message = {
        "ear": current_ear_value,
        "state": current_state,  # "awake", "warning", "drowsy"
        "active_agent": current_agent,  # "HADI" or "HUDA"
        "timestamp": datetime.now().isoformat()
    }
    await websocket_manager.broadcast(json.dumps(message))
```

### 3. Voice Endpoint

Handle multipart audio upload:
```python
@app.post("/api/voice/send")
async def handle_voice(audio: UploadFile = File(...)):
    # Process audio with your existing voice pipeline
    transcription = await transcribe_audio(audio)
    response = await generate_response(transcription)
    
    return {
        "transcription": transcription,
        "response": response,
        "agent": current_active_agent
    }
```

## 📱 Mobile Considerations

### HTTPS Requirement
- Camera and microphone require HTTPS in production
- Use `https://` for production backend URLs
- WebSocket should use `wss://` in production

### Responsive Design
- UI adapts to mobile screens
- Touch-friendly voice button
- Optimized for landscape orientation in cars

## 🔒 Security Notes

### Production Deployment
- Use HTTPS/WSS in production
- Implement authentication if needed
- Consider rate limiting for voice uploads
- Validate audio file types and sizes

### Privacy
- Audio data is sent to backend for processing
- Consider implementing client-side audio processing if privacy is critical
- Camera feed stays local (not sent to backend by default)

## 🐛 Troubleshooting

### WebSocket Issues
- Check backend WebSocket server is running
- Verify CORS configuration
- Check browser console for connection errors
- Test WebSocket endpoint with tools like wscat

### Voice Upload Issues
- Verify multipart/form-data handling in backend
- Check file size limits
- Ensure proper audio format support
- Test with curl or Postman first

### Camera Issues
- Requires HTTPS or localhost
- Check browser permissions
- Verify camera not in use by other apps

## 📊 Performance Optimization

### WebSocket
- Implement message throttling if needed
- Consider compression for large messages
- Handle connection pooling for multiple clients

### Voice Processing
- Implement audio compression before upload
- Add progress indicators for long processing
- Consider streaming audio for real-time processing

### Camera Feed
- Frame capture is optional (disabled by default)
- Implement frame rate limiting if enabled
- Consider WebRTC for real-time video streaming

## 🔄 State Synchronization

The frontend maintains state synchronization with your backend through:

1. **WebSocket** - Real-time state updates
2. **REST APIs** - Command execution and responses  
3. **Local State** - UI state management with Zustand

This ensures the frontend always reflects the current backend state while providing smooth user interactions.