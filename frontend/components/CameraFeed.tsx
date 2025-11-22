'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAgentStore } from '@/store/agentStore';

export default function CameraFeed() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreamActive, setIsStreamActive] = useState(false);
  const { state } = useAgentStore();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 640, height: 480 } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsStreamActive(true);
        }
      } catch (error) {
        console.error('Camera access denied:', error);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const getGlowColor = () => {
    switch (state) {
      case 'drowsy': return '#FF3B3B';
      case 'warning': return '#FFD54A';
      case 'awake': return '#10FF88';
      default: return '#00A3FF';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed top-4 left-4 w-48 h-36 z-30"
    >
      <div 
        className="w-full h-full rounded-2xl overflow-hidden border-2 relative"
        style={{
          borderColor: getGlowColor(),
          boxShadow: `0 0 20px ${getGlowColor()}40`,
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        
        <div className="absolute bottom-2 right-2">
          <div 
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: isStreamActive ? '#10FF88' : '#FF3B3B' }}
          />
        </div>
      </div>
    </motion.div>
  );
}