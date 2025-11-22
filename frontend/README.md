# AIAGENT Frontend

Modern React/Next.js frontend for the AIAGENT automotive AI assistant system.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Running AIAGENT backend

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws/state
```

### Backend Integration

The frontend expects these backend endpoints:

**WebSocket:**
- `ws://localhost:8000/ws/state` - Real-time agent state updates

**REST APIs:**
- `POST /api/voice/send` - Upload audio for voice processing
- `POST /api/command` - Send text commands
- `GET /api/status` - Get current agent status

### WebSocket Message Format

```json
{
  "ear": 0.21,
  "state": "warning",
  "active_agent": "HUDA",
  "timestamp": "2025-01-01T12:00:00Z"
}
```

## 🏗️ Architecture

### Components

- **CameraFeed** - Live camera stream with frame capture
- **AgentAvatar** - Animated HADI/HUDA avatar with speaking states
- **StateIndicator** - EAR visualization and driver state display
- **VoiceButton** - Voice recording and transcription
- **AlertBanner** - Drowsiness warning with audio/vibration

### State Management

Uses Zustand for global state:
- Agent state (EAR, driver state, active agent)
- Connection status
- Voice interaction state

### Services

- **wsClient** - WebSocket connection with auto-reconnect
- **apiClient** - REST API calls with error handling

## 🎨 Features

### Real-time Updates
- WebSocket connection with exponential backoff retry
- Live EAR value visualization
- Instant agent switching animations

### Voice Interaction
- Browser microphone access
- Audio recording and upload
- Real-time transcription display
- Speaking animations

### Safety Features
- Drowsiness alert banner with vibration
- Warning tone generation
- Color-coded state indicators
- Connection status monitoring

### Responsive Design
- Mobile-friendly layout
- Dark automotive theme
- Smooth animations with Framer Motion
- TailwindCSS styling

## 🔧 Development

### Project Structure

```
frontend/
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main dashboard
├── components/         # React components
│   ├── CameraFeed.tsx
│   ├── AgentAvatar.tsx
│   ├── StateIndicator.tsx
│   ├── VoiceButton.tsx
│   └── AlertBanner.tsx
├── services/           # API and WebSocket clients
│   ├── wsClient.ts
│   └── apiClient.ts
├── store/              # Zustand state management
│   └── agentStore.ts
├── types/              # TypeScript interfaces
│   └── index.ts
└── assets/             # Static assets
    ├── avatars/
    └── sounds/
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🚀 Deployment

### Production Build

```bash
npm run build
npm run start
```

### Environment Setup

For production, update `.env.local`:

```env
NEXT_PUBLIC_BACKEND_URL=https://your-backend-domain.com
NEXT_PUBLIC_WS_URL=wss://your-backend-domain.com/ws/state
```

## 🔍 Testing Integration

### Test WebSocket Connection

1. Start backend server
2. Start frontend: `npm run dev`
3. Check browser console for WebSocket connection logs
4. Verify real-time state updates in dashboard

### Test Voice Features

1. Click voice button to start recording
2. Speak into microphone
3. Check network tab for audio upload
4. Verify transcription and response display

### Test Camera Feed

1. Allow camera permissions in browser
2. Verify live video stream in dashboard
3. Check frame capture functionality (if enabled)

## 🛠️ Troubleshooting

### Common Issues

**WebSocket Connection Failed:**
- Check backend is running on correct port
- Verify WebSocket endpoint URL
- Check browser console for connection errors

**Camera Not Working:**
- Ensure HTTPS or localhost (required for camera access)
- Check browser permissions
- Verify camera is not used by other applications

**Voice Recording Issues:**
- Check microphone permissions
- Ensure HTTPS or localhost for audio access
- Verify backend audio endpoint is working

### Browser Compatibility

- Chrome 80+ (recommended)
- Firefox 75+
- Safari 13+
- Edge 80+

## 📱 Mobile Support

The dashboard is responsive and works on mobile devices, though camera and microphone access may require HTTPS in production.

## 🔒 Security Notes

- Camera and microphone access requires user permission
- Audio data is sent to backend for processing
- WebSocket connection should use WSS in production
- Consider implementing authentication for production use