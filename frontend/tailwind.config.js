/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Automotive Theme Colors
        'carbon': '#05080D',
        'carbon-light': '#0A0F1A',
        
        // Agent Colors
        'hadi': '#00A3FF',
        'huda': '#FF7A3D',
        
        // State Colors
        'awake': '#10FF88',
        'warning': '#FFD54A',
        'drowsy': '#FF3B3B',
        
        // Legacy colors for compatibility
        'hadi-blue': '#00A3FF',
        'huda-warm': '#FF7A3D',
        'car-dark': '#05080D',
        'car-gray': '#1a1a1a',
        'car-panel': '#111111',
        'car-border': '#333333',
        'neon-blue': '#00A3FF',
        'neon-green': '#10FF88',
        'neon-orange': '#FF7A3D',
        'neon-red': '#FF3B3B',
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite',
        'bounce-gentle': 'bounce 1s ease-in-out infinite',
        'vibrate': 'vibrate 0.5s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 3s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'rotate-slow': 'spin 3s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        vibrate: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%': { transform: 'translateX(-2px)' },
          '20%': { transform: 'translateX(2px)' },
          '30%': { transform: 'translateX(-2px)' },
          '40%': { transform: 'translateX(2px)' },
          '50%': { transform: 'translateX(-2px)' },
          '60%': { transform: 'translateX(2px)' },
          '70%': { transform: 'translateX(-2px)' },
          '80%': { transform: 'translateX(2px)' },
          '90%': { transform: 'translateX(-2px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px currentColor' },
          '100%': { boxShadow: '0 0 30px currentColor, 0 0 40px currentColor' },
        },
        'pulse-ring': {
          '0%': {
            transform: 'scale(0.33)',
            opacity: '1',
          },
          '80%, 100%': {
            transform: 'scale(2.33)',
            opacity: '0',
          },
        },
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Consolas', 'monospace'],
        'tech': ['Orbitron', 'sans-serif'],
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'neon': '0 0 20px currentColor',
        'neon-lg': '0 0 30px currentColor, 0 0 40px currentColor',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}