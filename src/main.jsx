import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react';
import './index.css'
import './styles/roboticTheme.css'
import App from './App.jsx'
import VideoPage from './pages/VideoPage.jsx'
import ThemeProvider from './components/ThemeProvider.jsx'

// Quick mobile check before rendering to prevent cursor issues
const detectMobile = () => {
  if (typeof window !== 'undefined') {
    return (
      ('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) || 
      (navigator.msMaxTouchPoints > 0) ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth < 768 ||
      window.matchMedia('(pointer: coarse)').matches
    );
  }
  return false;
};

// Apply mobile class immediately if needed
if (detectMobile()) {
  document.body.classList.add('is-mobile-device');
  document.documentElement.setAttribute('data-mobile', 'true');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/video/:projectName/:videoName" element={<VideoPage />} />
        </Routes>
      </BrowserRouter>
      <SpeedInsights />
      <Analytics />
    </ThemeProvider>
  </StrictMode>,
)
