'use client';

import { motion } from 'framer-motion';
import { Navigation, Music, Wrench, Bot, Settings } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { id: 'nav', icon: Navigation, label: 'NAV', color: '#00A3FF' },
  { id: 'music', icon: Music, label: 'MUSIC', color: '#10FF88' },
  { id: 'diagnostics', icon: Wrench, label: 'DIAGNOSTICS', color: '#FFD54A' },
  { id: 'agent', icon: Bot, label: 'AGENT', color: '#FF7A3D' },
  { id: 'settings', icon: Settings, label: 'SETTINGS', color: '#9333EA' },
];

export default function BottomNavBar() {
  const [activeItem, setActiveItem] = useState('agent');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full"
    >
      <div className="h-full bg-black/40 backdrop-blur-[15px] border border-white/20 rounded-2xl px-6 flex items-center justify-between">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className="relative flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-xl blur-lg opacity-60"
                  style={{ backgroundColor: item.color }}
                  layoutId="navGlow"
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              )}
              
              <motion.div
                className="absolute inset-0 rounded-xl border"
                style={{
                  backgroundColor: isActive ? `${item.color}20` : 'transparent',
                  borderColor: isActive ? item.color : 'rgba(255,255,255,0.1)',
                }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative z-10 flex flex-col items-center gap-1">
                <Icon 
                  className="w-6 h-6 transition-colors duration-300"
                  style={{ color: isActive ? item.color : 'rgba(255,255,255,0.6)' }}
                />
                <span 
                  className="text-xs font-mono font-bold tracking-wider transition-colors duration-300"
                  style={{ color: isActive ? item.color : 'rgba(255,255,255,0.6)' }}
                >
                  {item.label}
                </span>
              </div>
              
              {isActive && (
                <motion.div
                  className="absolute -bottom-1 left-1/2 w-8 h-1 rounded-full"
                  style={{ backgroundColor: item.color }}
                  layoutId="activeIndicator"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}