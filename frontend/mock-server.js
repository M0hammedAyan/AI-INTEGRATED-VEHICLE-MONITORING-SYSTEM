const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8000 });

console.log('Mock WebSocket server running on ws://localhost:8000');

wss.on('connection', function connection(ws) {
  console.log('Client connected');
  
  // Send initial state
  ws.send(JSON.stringify({
    ear: 0.25,
    state: 'awake',
    active_agent: 'HUDA',
    timestamp: new Date().toISOString()
  }));

  // Simulate state changes every 3 seconds
  const interval = setInterval(() => {
    const states = ['awake', 'warning', 'drowsy'];
    const agents = ['HUDA', 'HADI'];
    const randomState = states[Math.floor(Math.random() * states.length)];
    const randomAgent = randomState === 'drowsy' ? 'HADI' : agents[Math.floor(Math.random() * agents.length)];
    
    ws.send(JSON.stringify({
      ear: Math.random() * 0.4 + 0.1,
      state: randomState,
      active_agent: randomAgent,
      timestamp: new Date().toISOString()
    }));
  }, 3000);

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\nShutting down mock server...');
  wss.close();
  process.exit(0);
});