// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'logo.png', 'images/logo-112.png'],
      workbox: {
        // Enable SPA navigation fallback for client-side routing
        navigateFallback: '/index.html'
      },
      manifest: {
        name: 'Dilusha Chamika Portfolio',
        short_name: 'Dilusha',
        description: 'Portfolio of Dilusha Chamika',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        icons: [
          {
            src: './images/logo-112.png',
            sizes: '112x112',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: './logo.png',
            sizes: '500x500',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
          'emailjs': ['@emailjs/browser'],
          'lucide-icons': ['lucide-react'],
          'type-animation': ['react-type-animation'],
          'vercel-analytics': ['@vercel/analytics/react', '@vercel/speed-insights/react'],

          // UI library chunks
          'ui-components': [
            './src/components/BinaryMatrix',
            './src/components/CircuitPaths',
            './src/components/FlyingDroneSimplified',
            './src/components/HumanoidRobotSimplified',
            './src/components/LeftRobotDecoration',
            './src/components/RobotTextDisplay',
            './src/components/RoboticSectionTitle'
          ],

          // Animation chunks
          'animations': [
            './src/components/BootScreen'
          ]
        }
      }
    }
  }
})