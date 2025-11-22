'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Send } from 'lucide-react';
import { useAgentStore } from '@/store/agentStore';
import { ApiClient } from '@/services/apiClient';

export default function VoiceButton() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  const { setListening, setVoiceResponse, lastVoiceResponse } = useAgentStore();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        await sendAudioToBackend(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setListening(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setListening(false);
      setIsProcessing(true);
    }
  };

  const sendAudioToBackend = async (audioBlob: Blob) => {
    try {
      const response = await ApiClient.sendVoiceData(audioBlob);
      setVoiceResponse(response);
    } catch (error) {
      console.error('Failed to send audio:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="bg-car-dark rounded-lg p-6 border-2 border-car-gray">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white mb-4">Voice Assistant</h3>
        
        {/* Voice Button */}
        <motion.button
          onClick={handleClick}
          disabled={isProcessing}
          className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
            isRecording 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-blue-600 hover:bg-blue-700'
          } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: isRecording 
              ? ['0 0 0 0 rgba(239, 68, 68, 0.7)', '0 0 0 20px rgba(239, 68, 68, 0)', '0 0 0 0 rgba(239, 68, 68, 0)']
              : '0 0 0 0 rgba(239, 68, 68, 0)'
          }}
          transition={{
            duration: 1.5,
            repeat: isRecording ? Infinity : 0,
          }}
        >
          {isProcessing ? (
            <Send className="w-8 h-8 text-white animate-pulse" />
          ) : isRecording ? (
            <MicOff className="w-8 h-8 text-white" />
          ) : (
            <Mic className="w-8 h-8 text-white" />
          )}
        </motion.button>

        {/* Status Text */}
        <p className="mt-4 text-sm text-gray-400">
          {isProcessing 
            ? 'Processing...' 
            : isRecording 
              ? 'Recording... Click to stop' 
              : 'Click to start recording'
          }
        </p>

        {/* Voice Response Display */}
        {lastVoiceResponse && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-car-gray rounded-lg text-left"
          >
            <div className="mb-2">
              <span className="text-xs text-gray-500">You said:</span>
              <p className="text-sm text-gray-300 italic">
                "{lastVoiceResponse.transcription}"
              </p>
            </div>
            
            <div>
              <span className="text-xs text-gray-500">
                {lastVoiceResponse.agent} responded:
              </span>
              <p className="text-sm text-white">
                {lastVoiceResponse.response}
              </p>
            </div>
          </motion.div>
        )}

        {/* Recording Visualization */}
        {isRecording && (
          <motion.div
            className="mt-4 flex justify-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-red-400 rounded-full"
                animate={{
                  height: [4, 20, 4],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}