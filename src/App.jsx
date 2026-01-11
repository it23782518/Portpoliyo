import { useState, useEffect, useContext, useCallback, lazy, Suspense } from 'react'
import { motion, useScroll, useAnimation, AnimatePresence } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Sun, Moon, ArrowUp, Github, Linkedin, Mail, ExternalLink, Cpu, Youtube, X } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useParams } from 'react-router-dom'
import RoboticSectionTitle from './components/RoboticSectionTitle'
import BinaryMatrix from './components/BinaryMatrix'
import useScrollLock from './hooks/useScrollLock'

// Lazy load BootScreen since it's only shown once
const BootScreen = lazy(() => import('./components/BootScreen'))
import useIsMobile from './hooks/useIsMobile'

import './App.css'
import './components/FuturisticText.css'
import './components/keyframe-animations.css'
import './components/SectionDivider.css'
import './components/SkillsModal.css'
import './components/HardwareAnimations.css'
import './components/HonorsAwards.css'
import './components/Education.css'
import './components/overflow-fix.css'
import './components/z-index-fix.css'
import './components/mobile-menu-styles.css'
import { ThemeContext } from './contexts/ThemeContext'

import HeroSection from './pages/HeroSection'
import AboutSection from './pages/AboutSection'
import SkillsSection from './pages/SkillsSection'
import ProjectsSection from './pages/ProjectsSection'
import PublicationsSection from './pages/PublicationsSection'
import CertificatesSection from './pages/CertificatesSection'
import AwardsSection from './pages/AwardsSection'
import ContactSection from './pages/ContactSection'
import EducationSection from './pages/EducationSection'

// Import project images
const logoImg = 'https://res.cloudinary.com/dgthdmczs/image/upload/v1758527967/csqcbfb9uvdhfo0ruq1v.png'

// EmailJS configuration
// Replace these with your actual EmailJS values
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Initialize EmailJS - using a safer approach inside an effect hook instead of at the global level
// We'll do this in a useEffect hook inside the component

function App() {
  const { theme, roboticMode, toggleTheme, toggleRoboticMode } = useContext(ThemeContext)
  const [scrollY, setScrollY] = useState(0)
  const [showBootScreen, setShowBootScreen] = useState(false)
  const [portfolioVisible, setPortfolioVisible] = useState(false)
  const [showSkillsModal, setShowSkillsModal] = useState(false)
  const [imageModal, setImageModal] = useState({
    isOpen: false,
    images: [],
    title: '',
    currentIndex: 0
  })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const params = useParams()
  const isMobile = useIsMobile()
  const controls = useAnimation()
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  })
  
  // Function to handle escape key press to close modal
  const handleEscapeKey = useCallback((e) => {
    if (e.key === 'Escape') {
      closeImageModal();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  // Function to open image modal with enhanced scroll prevention
  const openImageModal = useCallback((images, title, currentIndex = 0) => {
    // Store the scroll position in a data attribute for potential use by other code
    const scrollY = window.scrollY;
    document.body.setAttribute('data-scroll-position', scrollY);
    
    setImageModal({
      isOpen: true,
      images: images,
      title: title,
      currentIndex: currentIndex
    });
    
    // Scroll lock is now handled by useScrollLock hook
    
    // Add event listeners for escape key and clicks to close modal
    document.addEventListener('keydown', handleEscapeKey);
    
    // Small delay to avoid immediate trigger of the click event
    setTimeout(() => {
      document.addEventListener('mousedown', handleModalOutsideClick);
      document.addEventListener('touchstart', handleModalOutsideClick);
    }, 10);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  // Function to navigate images in modal
  const navigateImage = (direction) => {
    if (!imageModal.isOpen || !imageModal.images.length) return

    const newIndex = direction === 'next'
      ? (imageModal.currentIndex + 1) % imageModal.images.length
      : (imageModal.currentIndex - 1 + imageModal.images.length) % imageModal.images.length

    setImageModal(prev => ({
      ...prev,
      currentIndex: newIndex
    }))
  }
  
  // Function to handle clicks outside the modal content
  const handleModalOutsideClick = useCallback((e) => {
    // Get the modal content element
    const modalContent = document.querySelector('.modal-content');
    const closeButton = document.querySelector('.close-button');
    
    // Check if the click was outside the modal content or on the overlay
    // We specifically check if it's not on the content and not on the close button
    if (modalContent && !modalContent.contains(e.target) || 
        (e.target.classList && e.target.classList.contains('modal-overlay'))) {
      closeImageModal();
    }
    
    // Also close if clicked directly on the close button
    if (closeButton && (closeButton === e.target || closeButton.contains(e.target))) {
      closeImageModal();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  // Function to close image modal
  const closeImageModal = useCallback(() => {
    setImageModal(prev => ({
      ...prev,
      isOpen: false
    }));
    
    // Scroll restore is now handled by useScrollLock hook
    
    // Remove event listeners
    document.removeEventListener('keydown', handleEscapeKey);
    document.removeEventListener('mousedown', handleModalOutsideClick);
    document.removeEventListener('touchstart', handleModalOutsideClick);
  }, [handleEscapeKey, handleModalOutsideClick]);
  
  // Always show boot screen on every page refresh, except for shareable video links
  useEffect(() => {
    // Skip boot screen if coming from a shareable video link
    if (params.projectName && params.videoName) {
      setShowBootScreen(false);
      setPortfolioVisible(true);
    } else {
      setShowBootScreen(true);
      // Portfolio will be shown after boot sequence completes
      // via the handleBootComplete callback
    }
  }, [params.projectName, params.videoName]);
  
  // (Removed duplicate wheel-based close handler — scroll-based handler below already closes the skills modal)

  // Detect scroll position for navbar transparency and progress tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      if (mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
      
      // Manual progress calculation as a fallback for scrollYProgress
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight
      if (windowHeight > 0) {
        // We don't need to set this manually if scrollYProgress from Framer Motion is working
        // This is just a fallback approach if needed
        
        // The progress is used by both left and right bars with origin-right and origin-left respectively
        // so they grow outward from the center
        
        // Track current visible section without changing URL
        const sections = ['home', 'about', 'skills', 'experience', 'projects', 'certificates', 'contact'];
        for (let section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Consider a section in view if it's top is in the top half of the screen
            if (rect.top <= window.innerHeight/2 && rect.bottom >= window.innerHeight/2) {
              sessionStorage.setItem('currentSection', section);
              break;
            }
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mobileMenuOpen])
  
  // Use custom hook for scroll lock when skills modal is open
  useScrollLock(showSkillsModal);
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    if (mobileMenuOpen) {
      const handleClickOutside = (event) => {
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileMenuButton = document.querySelector('.mobile-menu-button');
        
        if (
          mobileMenu && 
          !mobileMenu.contains(event.target) && 
          mobileMenuButton && 
          !mobileMenuButton.contains(event.target)
        ) {
          setMobileMenuOpen(false);
        }
      }
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    }
  }, [mobileMenuOpen])
  
  // URL management system - keep the base URL consistent
  useEffect(() => {
    // Handle initial URL hash if present, but then clean it
    const handleInitialURL = () => {
      // First try to get hash from URL
      const hash = window.location.hash.substring(1);
      
      // If hash exists in URL, use it
      if (hash) {
        // Store the hash as current section
        sessionStorage.setItem('currentSection', hash);
        
        // Scroll to the section without changing URL
        setTimeout(() => {
          const section = document.getElementById(hash);
          if (section) {
            const yPosition = section.getBoundingClientRect().top + window.pageYOffset;
            const headerOffset = 80;
            
            window.scrollTo({
              top: yPosition - headerOffset,
              behavior: 'smooth'
            });
          }
          
          // Clean the URL to base URL only
          window.history.replaceState(null, document.title, window.location.pathname);
        }, 100);
      } 
      // If no hash in URL, try to restore from session storage
      else {
        const savedSection = sessionStorage.getItem('currentSection');
        if (savedSection) {
          setTimeout(() => {
            const section = document.getElementById(savedSection);
            if (section) {
              const yPosition = section.getBoundingClientRect().top + window.pageYOffset;
              const headerOffset = 80;
              
              window.scrollTo({
                top: yPosition - headerOffset,
                behavior: 'auto' // Use 'auto' instead of 'smooth' to avoid visible scrolling on refresh
              });
            }
          }, 100);
        }
      }
    };
    
    // Handle browser back/forward buttons without changing URL
    const handlePopState = () => {
      // Don't allow URL changes with hash - redirect to base URL
      if (window.location.hash) {
        // Get the section from the hash before removing it
        const hash = window.location.hash.substring(1);
        if (hash) {
          sessionStorage.setItem('currentSection', hash);
        }
        
        // Clean the URL
        window.history.replaceState(null, document.title, window.location.pathname);
        
        // Scroll to the section if it exists
        if (hash) {
          const section = document.getElementById(hash);
          if (section) {
            const yPosition = section.getBoundingClientRect().top + window.pageYOffset;
            const headerOffset = 80;
            
            window.scrollTo({
              top: yPosition - headerOffset,
              behavior: 'smooth'
            });
          }
        }
      }
    };
    
    // Handle page refreshes and navigation
    window.onbeforeunload = () => {
      // We don't need to do anything special here since sessionStorage persists across refreshes
      // But this ensures we have a hook if needed later
    };
    
    // Set up event listeners
    window.addEventListener('popstate', handlePopState);
    
    // Execute initial URL handling
    handleInitialURL();
    
    // Clean up event listeners
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.onbeforeunload = null;
    };
  }, []);

  // Dynamic mobile menu height adjustment for zoom levels
  useEffect(() => {
    const adjustMenuHeight = () => {
      const mobileMenu = document.querySelector('.mobile-menu');
      if (mobileMenu && window.innerWidth < 1024) { // Only on mobile/tablet
        // Detect zoom level (rough estimation)
        const zoomLevel = Math.round((window.outerWidth / window.innerWidth) * 100);
        
        // Adjust height based on zoom level
        let heightPercentage = 45; // Base height
        
        if (zoomLevel >= 150) {
          heightPercentage = 35; // Very conservative at high zoom
        } else if (zoomLevel >= 125) {
          heightPercentage = 38; // Conservative at medium-high zoom
        } else if (zoomLevel >= 110) {
          heightPercentage = 40; // Moderate adjustment
        }
        
        // Apply the height using CSS custom property for better performance
        document.documentElement.style.setProperty('--mobile-menu-height', `${heightPercentage}vh`);
        mobileMenu.style.maxHeight = `var(--mobile-menu-height, 45vh)`;
        
        // Also ensure minimum height for usability
        const minHeight = Math.min(window.innerHeight * 0.25, 250); // At least 25% of screen or 250px
        mobileMenu.style.minHeight = `${minHeight}px`;
      }
    };

    // Initial adjustment
    adjustMenuHeight();

    // Adjust on resize (which includes zoom changes)
    window.addEventListener('resize', adjustMenuHeight);
    
    return () => {
      window.removeEventListener('resize', adjustMenuHeight);
    };
  }, []);

  // Animate skills when they come into view
  useEffect(() => {
    const animateSkills = async () => {
      await controls.start({ opacity: 1, y: 0 })
    }
    animateSkills()
  }, [controls])
  
  // Cleanup and navigation handling effect for modal
  useEffect(() => {
    // Function to handle browser back button while modal is open
    const handlePopState = () => {
      if (imageModal.isOpen) {
        closeImageModal();
      }
    };
    
    // Add popstate listener if modal is open
    if (imageModal.isOpen) {
      window.addEventListener('popstate', handlePopState);
    }
    
    return () => {
      // Remove popstate listener
      window.removeEventListener('popstate', handlePopState);
      
      // Ensure we clean up event listeners if component unmounts with modal open
      if (imageModal.isOpen) {
        document.removeEventListener('keydown', handleEscapeKey);
      }
    }
  }, [imageModal.isOpen, handleEscapeKey, closeImageModal]); // closeImageModal added to dependencies
  
  // Use custom hook for scroll lock when image modal is open
  useScrollLock(imageModal.isOpen);
  
  // Cross-browser scroll function that works reliably
  const smoothScrollToSection = (sectionId) => {
    // Add a small delay to ensure DOM is ready
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (!section) {
        console.warn(`Section with id "${sectionId}" not found`);
        return;
      }

      try {
        // Use requestAnimationFrame for better timing
        requestAnimationFrame(() => {
          // Get the element's position relative to the document
          const elementRect = section.getBoundingClientRect();
          const absoluteElementTop = elementRect.top + window.pageYOffset;

          // Account for fixed header height
          const headerOffset = 80;

          // Calculate final scroll position
          const offsetPosition = absoluteElementTop - headerOffset;

          // Ensure position is not negative
          const finalPosition = Math.max(0, offsetPosition);

          // Use native smooth scrolling with better error handling
          window.scrollTo({
            top: finalPosition,
            behavior: 'smooth'
          });

          // Store the current section in sessionStorage without changing URL
          sessionStorage.setItem('currentSection', sectionId);
        });

      } catch (error) {
        console.error('Error in smoothScrollToSection:', error);
        // Fallback for older browsers or when smooth scrolling fails
        try {
          const yPosition = section.offsetTop;
          const finalPosition = Math.max(0, yPosition - 80);
          window.scrollTo(0, finalPosition);
        } catch (fallbackError) {
          console.error('Fallback scroll also failed:', fallbackError);
        }
      }
    }, 100); // Small delay to ensure DOM is ready
  }  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  
  // Navigation implementation that doesn't change URL
  const scrollToSection = (sectionId) => {
    try {
      // Find the target section
      const targetSection = document.getElementById(sectionId);
      
      if (targetSection) {
        // Get the y-position of the section
        const yPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
        
        // Adjust for header height
        const headerOffset = 80;
        const finalPosition = yPosition - headerOffset;
        
        // Perform the scroll
        window.scrollTo({
          top: finalPosition,
          behavior: 'smooth'
        });
        
        // Store current section in sessionStorage instead of changing URL
        sessionStorage.setItem('currentSection', sectionId);
        
        return true;
      }
    } catch (error) {
      console.error("Error scrolling to section:", error);
    }
    return false;
  }

  // Contact form state
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });
  
// Defer non-critical initialization
useEffect(() => {
  // Use requestIdleCallback if available, otherwise setTimeout
  const deferInit = window.requestIdleCallback || 
    ((callback) => setTimeout(callback, 1));
  
  deferInit(() => {
    // Initialize EmailJS with lower priority
    try {
      emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY,
        limitRate: {
          throttle: 2000
        }
      });
      console.log('EmailJS initialized successfully');
    } catch (error) {
      console.error('Error initializing EmailJS:', error);
    }
  });
}, []);  // Add mobile class to body for mobile-specific styling with enhanced detection
  useEffect(() => {
    // Multiple checks for mobile detection
    const hasTouchScreen = (
      ('maxTouchPoints' in navigator && navigator.maxTouchPoints > 0) || 
      ('msMaxTouchPoints' in navigator && navigator.msMaxTouchPoints > 0) ||
      ('ontouchstart' in window)
    );
    
    const userAgentMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isSmallScreen = window.innerWidth < 768;
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    
    // Consider device mobile if ANY of these conditions are true
    const isActuallyMobile = hasTouchScreen || userAgentMobile || isSmallScreen || hasCoarsePointer || isMobile;
    
    if (isActuallyMobile) {
      document.body.classList.add('is-mobile-device');
      
      // Also add a data attribute for CSS targeting
      document.documentElement.setAttribute('data-mobile', 'true');
    } else {
      document.body.classList.remove('is-mobile-device');
      document.documentElement.removeAttribute('data-mobile');
    }
    
    return () => {
      document.body.classList.remove('is-mobile-device');
      document.documentElement.removeAttribute('data-mobile');
    };
  }, [isMobile]);

  // Handle contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!contactFormData.name || !contactFormData.email || !contactFormData.message) {
      setFormStatus({
        submitting: false,
        submitted: false,
        error: 'Please fill in all required fields.'
      });
      return;
    }
    
    // Set loading state
    setFormStatus({
      submitting: true,
      submitted: false,
      error: null
    });
    
    try {
      console.log('Starting email submission process...');
      console.log('EMAILJS_SERVICE_ID:', EMAILJS_SERVICE_ID);
      console.log('EMAILJS_TEMPLATE_ID:', EMAILJS_TEMPLATE_ID);
      console.log('EMAILJS_PUBLIC_KEY:', EMAILJS_PUBLIC_KEY);
      
      // Using Email.js to send emails
      const templateParams = {
        name: contactFormData.name,
        email: contactFormData.email,
        title: contactFormData.subject || 'Portfolio Contact Form',
        message: contactFormData.message,
        to_name: 'Portfolio Owner', // Add recipient name
        reply_to: contactFormData.email // Ensure replies go back to sender
      };
      
      console.log('Sending email with params:', templateParams);
      
      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );
      
      console.log('Email sent successfully!', response.status, response.text);
      
      // Success!
      setFormStatus({
        submitting: false,
        submitted: true,
        error: null
      });
      
      // Reset form
      setContactFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus({
          submitting: false,
          submitted: false,
          error: null
        });
      }, 5000);
      
    } catch (error) {
      console.error('Error sending email:', error);
      console.error('Error details:', {
        message: error.message,
        status: error.status,
        text: error.text
      });
      
      // Provide more specific error message based on the error type
      let errorMessage = 'Failed to send your message. Please try again later or contact me directly via email.';
      
      if (error.message) {
        console.log('Error message:', error.message);
        
        if (error.message.includes('Network Error')) {
          errorMessage = 'Network error. Please check your internet connection and try again.';
        } else if (error.message.includes('invalid service_id')) {
          errorMessage = 'Email service configuration error. Please contact me directly via email.';
          console.error('Invalid service ID being used');
        } else if (error.message.includes('invalid template_id')) {
          errorMessage = 'Email template configuration error. Please contact me directly via email.';
          console.error('Invalid template ID being used');
        } else if (error.message.includes('rate limit')) {
          errorMessage = 'Too many messages sent. Please try again in a few minutes.';
        }
      }
      
      if (error.status) {
        console.log('Error status:', error.status);
        if (error.status === 401 || error.status === 403) {
          errorMessage = 'Authentication error with email service. Please contact me directly via email.';
        } else if (error.status === 429) {
          errorMessage = 'Too many messages sent. Please try again in a few minutes.';
        }
      }
      
      setFormStatus({
        submitting: false,
        submitted: false,
        error: errorMessage
      });
    }
  };

  const handleBootComplete = () => {
    setShowBootScreen(false);
    setPortfolioVisible(true);
  };
  
  return (
    <>

      {/* Static gear icon instead of animated cursor */}
      {/* Removed static gear icon at bottom left corner */}
      
      {/* Boot screen for first-time visitors */}
      <AnimatePresence mode="wait">
        {showBootScreen && (
          <Suspense fallback={<div className="fixed inset-0 bg-slate-900 flex items-center justify-center z-50"><div className="text-cyan-400">Loading...</div></div>}>
            <BootScreen onComplete={handleBootComplete} />
          </Suspense>
        )}
      </AnimatePresence>
      
      {/* Skills Modal - Top level for maximum z-index */}
      <AnimatePresence>
        {showSkillsModal && (
          <>
            {/* Modal Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="!fixed inset-0 bg-black backdrop-blur-md flex items-center justify-center p-4 modal-overlay overflow-hidden touch-none !z-[2000000]"
              style={{ zIndex: 99999 }}
              onClick={() => setShowSkillsModal(false)}
              onTouchEnd={(e) => {
                // Only close if the touch ended on the overlay itself, not on modal content
                if (e.target === e.currentTarget) {
                  setShowSkillsModal(false);
                }
              }}
            >
              {/* Modal Content */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 10 }}
                transition={{ 
                  type: "spring", 
                  damping: 20, 
                  stiffness: 100 
                }}
                className={`skills-modal-content ${
                  theme === 'dark'
                    ? 'bg-slate-900 border border-cyan-900'
                    : 'bg-white border border-slate-200'
                } max-w-sm sm:max-w-2xl md:max-w-4xl w-full max-h-[80vh] overflow-y-auto rounded-lg shadow-2xl ${
                  roboticMode ? 'robot-border' : ''
                } mx-4 sm:mx-6 md:mx-auto pointer-events-auto !bg-opacity-100 !z-[2000000]`}
                onClick={e => e.stopPropagation()}
                onTouchEnd={e => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className={`p-4 border-b ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'} flex justify-between items-center`}>
                  <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'} flex items-center gap-2`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9"/>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                    </svg>
                    Technical Skills
                  </h3>
                  <button 
                    onClick={() => setShowSkillsModal(false)}
                    className={`rounded-full p-1 ${
                      theme === 'dark'
                        ? 'hover:bg-slate-700 text-slate-400 hover:text-white'
                        : 'hover:bg-slate-200 text-slate-600 hover:text-slate-900'
                    } transition-colors`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
                
                {/* Modal Body */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Skills Categories */}
                  
                  
                  <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'} p-4 rounded-lg`}>
                    <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-cyan-500' : 'text-blue-700'}`}>AI & Machine Learning</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Machine Learning</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Deep Learning</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Supervised Learning</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Unsupervised Learning</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Artificial Neural Networks</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>TensorFlow</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Algorithms & Data Structures</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Model Deployment</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'} p-4 rounded-lg`}>
                    <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-cyan-500' : 'text-blue-700'}`}>Development & Design</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>User Experience (UX)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>User Interface Design (UI)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Tailwind CSS</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>RESTful APIs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>MySQL</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Spring Boot</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Node.js</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>React.js</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'} p-4 rounded-lg`}>
                    <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-cyan-500' : 'text-blue-700'}`}>Programming Languages</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Java</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Python</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>C</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>JavaScript</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'} p-4 rounded-lg`}>
                    <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-cyan-500' : 'text-blue-700'}`}>Robotics & IoT</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Arduino Programming</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Sensor Integration</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Drone Technology</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Internet of Things (IoT)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Robotics</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'} p-4 rounded-lg`}>
                    <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-cyan-500' : 'text-blue-700'}`}>Cloud & Infrastructure</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Virtualization & Cloud Services</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Networking (Configuration, Troubleshooting, Security)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Computer Hardware (Setup, Troubleshooting)</span>
                      </li>
                    </ul>
                  </div>

                  <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'} p-4 rounded-lg`}>
                    <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-cyan-500' : 'text-blue-700'}`}>Tools & Frameworks</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Git & Version Control</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'}`}></span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-800 font-medium'}`}>Jupyter</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Modal Footer */}
                <div className={`p-4 border-t ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'} flex justify-end`}>
                  <motion.button
                    onClick={() => setShowSkillsModal(false)}
                    className={`px-5 py-2 rounded-md ${
                      theme === 'dark'
                        ? 'bg-slate-700 hover:bg-slate-600 text-white'
                        : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                    } font-medium transition-colors`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Close
                  </motion.button>
                </div>
                
                {/* Robotic Theme Decoration */}
                {roboticMode && (
                  <>
                    <div className="robot-corner robot-corner-tl"></div>
                    <div className="robot-corner robot-corner-tr"></div>
                    <div className="robot-corner robot-corner-bl"></div>
                    <div className="robot-corner robot-corner-br"></div>
                    <div className="binary-dots"></div>
                    <div className="absolute top-1 right-4 text-[10px] text-cyan-400 font-mono opacity-70">SYS.MODAL.V1.4</div>
                    <div className="absolute bottom-1 left-4 text-[10px] text-cyan-400 font-mono opacity-70">[SKILLS.DAT]</div>
                  </>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Image Modal - For displaying full award images */}
      <AnimatePresence>
        {imageModal.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="!fixed inset-0 bg-black backdrop-blur-md flex items-center justify-center p-4 modal-overlay overflow-hidden touch-none !z-[2000000]"
            style={{ zIndex: 99999 }}
            onClick={closeImageModal}
            onTouchEnd={(e) => {
              // Only close if the touch ended on the overlay itself, not on modal content
              if (e.target === e.currentTarget) {
                closeImageModal();
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 100
              }}
              className={`modal-content relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-lg touch-none pointer-events-auto ${
                theme === 'dark'
                  ? 'bg-slate-900 border border-cyan-900'
                  : 'bg-white border border-slate-200'
              } ${roboticMode ? 'robot-border' : ''} !z-[2000000]`}
              onClick={e => e.stopPropagation()}
              onTouchEnd={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`p-4 border-b ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'} flex justify-between items-center`}>
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'} flex items-center gap-2`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                  Award Image Gallery
                </h3>
                <button
                  onClick={closeImageModal}
                  className={`rounded-full p-1 ${
                    theme === 'dark'
                      ? 'hover:bg-slate-700 text-slate-400 hover:text-white'
                      : 'hover:bg-slate-200 text-slate-600 hover:text-slate-900'
                  } transition-colors`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              {/* Modal Body - Full Image Display */}
              <div className="p-4">
                <div className="flex flex-col items-center space-y-4">
                  {/* Main Image Display - Full Size */}
                  <div className="relative w-full">
                    <motion.img
                      key={imageModal.currentIndex}
                      src={imageModal.images[imageModal.currentIndex]}
                      alt={`${imageModal.title} - Image ${imageModal.currentIndex + 1}`}
                      className="w-full h-auto object-contain max-h-[70vh]"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      loading="lazy"
                    />

                    {/* Image Counter */}
                    {imageModal.images.length > 1 && (
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-medium">
                        {imageModal.currentIndex + 1} / {imageModal.images.length}
                      </div>
                    )}

                    {/* Navigation Arrows */}
                    {imageModal.images.length > 1 && (
                      <>
                        <motion.button
                          className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg z-20 ${
                            roboticMode
                              ? 'bg-cyan-500/90 hover:bg-cyan-400 text-white'
                              : 'bg-white/90 hover:bg-white text-gray-800'
                          } backdrop-blur-sm transition-all duration-300`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => navigateImage('prev')}
                          aria-label="Previous image"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m15 18-6-6 6-6"/>
                          </svg>
                        </motion.button>

                        <motion.button
                          className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg z-20 ${
                            roboticMode
                              ? 'bg-cyan-500/90 hover:bg-cyan-400 text-white'
                              : 'bg-white/90 hover:bg-white text-gray-800'
                          } backdrop-blur-sm transition-all duration-300`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => navigateImage('next')}
                          aria-label="Next image"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m9 18 6-6-6-6"/>
                          </svg>
                        </motion.button>
                      </>
                    )}
                  </div>

                  {/* Award Title */}
                  <div className="w-full px-2 pb-2">
                    <h4 className={`text-lg font-semibold text-center ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'}`}>
                      {imageModal.title}
                    </h4>
                    {imageModal.images.length > 1 && (
                      <p className={`text-center text-sm mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Image {imageModal.currentIndex + 1} of {imageModal.images.length}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className={`p-4 border-t ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'} flex justify-end`}>
                <motion.button
                  onClick={closeImageModal}
                  className={`px-5 py-2 rounded-md ${
                    theme === 'dark'
                      ? 'bg-slate-700 hover:bg-slate-600 text-white'
                      : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                  } font-medium transition-colors`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Close
                </motion.button>
              </div>

              {/* Robotic Theme Decoration */}
              {roboticMode && (
                <>
                  <div className="robot-corner robot-corner-tl"></div>
                  <div className="robot-corner robot-corner-tr"></div>
                  <div className="robot-corner robot-corner-bl"></div>
                  <div className="robot-corner robot-corner-br"></div>
                  <div className="binary-dots"></div>
                  <div className="absolute top-1 right-4 text-[10px] text-cyan-400 font-mono opacity-70">IMG.MODAL.V1.2</div>
                  <div className="absolute bottom-1 left-4 text-[10px] text-cyan-400 font-mono opacity-70">[AWARD.GALLERY]</div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Portfolio content */}
      <AnimatePresence>
        {portfolioVisible && (
          <motion.div 
            className={`${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'} min-h-screen transition-colors duration-300`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Binary Matrix Background - Applied globally when robotic mode is active */}
            {roboticMode && <BinaryMatrix />} {/* This is the global matrix effect */}
            {/* Progress bar - grows from middle to edges */}
            <div className="fixed top-0 z-50 h-1.5 overflow-hidden left-0 right-0">
              {/* Subtle gradient overlay for the whole progress bar area */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"></div>
              
              {/* Center connection point - no visible dot */}
              <div className="absolute left-1/2 right-1/2 top-0 bottom-0"></div>
              
              {/* Left side progress bar - full width */}
              <motion.div 
                className="absolute top-0 right-1/2 bottom-0 w-1/2 bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500 origin-right shadow-md shadow-blue-500/20 progress-bar-glow"
                style={{ 
                  scaleX: scrollYProgress,
                  right: "50%"  // Ensure it's anchored to the center
                }}
                initial={{ scaleX: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 30, restDelta: 0.001 }}
              />
              
              {/* Right side progress bar - full width */}
              <motion.div 
                className="absolute top-0 left-1/2 bottom-0 w-1/2 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 origin-left shadow-md shadow-blue-500/20 progress-bar-glow"
                style={{ 
                  scaleX: scrollYProgress,
                  left: "50%" // Ensure it's anchored to the center
                }}
                initial={{ scaleX: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 30, restDelta: 0.001 }}
              />
            </div>

            {/* Navigation */}
            <motion.nav 
              className={`fixed w-full z-40 transition-all duration-300 ${
                scrollY > 10 
                  ? theme === 'dark'
                    ? 'bg-slate-900/90 backdrop-blur-xl border-b border-cyan-800/50 shadow-lg shadow-cyan-900/20' 
                    : 'bg-white/90 backdrop-blur-xl border-b border-blue-200/50 shadow-lg shadow-blue-900/10'
                  : theme === 'dark'
                    ? 'bg-slate-900/70 backdrop-blur-md border-b border-cyan-800/30'
                    : 'bg-white/70 backdrop-blur-md border-b border-blue-200/30'
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="container mx-auto max-w-full px-4 sm:px-6 md:px-8 flex items-center justify-between py-4 sm:py-5">
                {/* Logo and Name - Left on all screens */}
                <button
                  onClick={() => scrollToSection('home')}
                  aria-label="Go to Home"
                  className="flex items-center flex-shrink-0 md:mr-3 focus:outline-none"
                >
                  <motion.img 
                    src={logoImg}
                    alt="Dilusha Chamika Logo" 
                    className="h-10 sm:h-12 lg:h-14 mr-0 ml-0"
                    style={{marginLeft: 0, marginRight: 0}}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.h1 
                    className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent ml-3"
                    whileHover={{ scale: 1.05 }}
                  >
                    Dilusha Chamika
                  </motion.h1>
                </button>
                
                {/* Mobile menu button - Right side on mobile/tablet */}
                <div className="block lg:hidden">
                  <motion.button 
                    className={`mobile-menu-button p-3 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white border-2 border-cyan-700' 
                        : 'bg-gradient-to-r from-blue-100 to-slate-100 text-slate-800 border-2 border-blue-300'
                    } focus:outline-none shadow-lg`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {!mobileMenuOpen ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </motion.button>
                </div>
                
                {/* Desktop navigation */}
                <div className={`hidden lg:flex justify-center mx-auto py-2 rounded-xl max-w-full overflow-hidden ${
                  theme === 'dark' 
                    ? roboticMode
                      ? 'bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-cyan-600/70 shadow-lg shadow-cyan-900/30' 
                      : 'bg-slate-800/90 border border-slate-700/80 shadow-lg shadow-slate-900/30' 
                    : roboticMode
                      ? 'bg-gradient-to-r from-white to-blue-50 border-2 border-blue-300/70 shadow-lg shadow-blue-900/20'
                      : 'bg-white/90 border border-slate-200/80 shadow-lg shadow-slate-300/30'
                }`}>
                    <div className="flex items-center justify-center flex-wrap gap-3 md:gap-4 lg:gap-5 xl:gap-6 px-2">
                  {['About', 'Publications', 'Contact'].map((item) => (
                    <motion.button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className={`px-3 md:px-4 lg:px-5 py-2.5 rounded-lg text-base ${
                        theme === 'dark' 
                          ? roboticMode
                            ? 'text-cyan-300 hover:text-cyan-100 hover:bg-cyan-800/50' 
                            : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-700/80' 
                          : roboticMode
                            ? 'text-blue-700 hover:text-blue-800 hover:bg-blue-100/80'
                            : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100/80'
                      } transition-all duration-200 font-medium whitespace-nowrap nav-button-hover`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item}
                    </motion.button>
                  ))}
                  </div>
                </div>
                
                {/* Divider between navigation and theme buttons */}
                <div className="hidden lg:block mx-3 lg:mx-4">
                  <div className={`h-8 w-0.5 ${theme === 'dark' ? 'bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent' : 'bg-gradient-to-b from-transparent via-blue-400/50 to-transparent'}`}></div>
                </div>
                
                {/* Desktop theme buttons - hidden on mobile */}
                <div className={`hidden lg:flex items-center space-x-5 md:space-x-6 lg:space-x-7 px-3 py-1.5 rounded-xl ${
                  theme === 'dark'
                    ? roboticMode 
                      ? 'bg-slate-800/80 border border-cyan-800/40' 
                      : 'bg-slate-800/60'
                    : roboticMode
                      ? 'bg-white/80 border border-blue-300/40' 
                      : 'bg-slate-100/60'
                }`}>
                  <motion.button
                    onClick={toggleRoboticMode}
                    className={`p-3 md:p-3.5 lg:p-4 rounded-full flex items-center justify-center ${
                      theme === 'dark' 
                        ? roboticMode ? 'bg-gradient-to-r from-cyan-700 to-blue-800 text-cyan-300 shadow-lg shadow-cyan-500/30' : 'bg-slate-800 text-gray-400' 
                        : roboticMode ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-200 text-gray-600'
                    } hover:scale-110 transition-all relative ${
                      roboticMode ? 'robot-border' : ''
                    }`}
                    whileHover={{ 
                      scale: 1.1, 
                      boxShadow: roboticMode ? '0 0 15px rgba(8, 145, 178, 0.5)' : '0 0 5px rgba(100, 116, 139, 0.3)' 
                    }}
                    whileTap={{ scale: 0.9 }}
                    title="Toggle Robotic Theme"
                  >
                    {roboticMode && (
                      <span className="absolute inset-0 robot-glow opacity-70 rounded-full -z-10"></span>
                    )}
                    <div className="relative">
                      <Cpu 
                        size={32} 
                        className={roboticMode ? 'animate-pulse' : ''}
                      />
                      {roboticMode && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
                      )}
                    </div>
                    {roboticMode && (
                      <motion.span 
                        className="absolute inset-0 border border-cyan-400/50 rounded-full"
                        animate={{ 
                          scale: [1, 1.2, 1], 
                          opacity: [0.7, 0.2, 0.7] 
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity
                        }}
                      />
                    )}
                  </motion.button>
                  
                  <motion.button
                    onClick={toggleTheme}
                    className={`p-3 md:p-3.5 lg:p-4 rounded-full flex items-center justify-center ${
                      theme === 'dark' 
                        ? 'bg-gradient-to-r from-cyan-700 to-blue-800 text-cyan-300 shadow-lg shadow-cyan-500/30' 
                        : 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg shadow-blue-500/20'
                    } hover:scale-110 transition-all relative ${theme === 'dark' ? 'theme-border-dark' : 'theme-border-light'}`}
                    whileHover={{ 
                      scale: 1.1, 
                      boxShadow: '0 0 15px rgba(8, 145, 178, 0.5)'
                    }}
                    whileTap={{ scale: 0.9 }}
                    title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  >
                    {theme === 'dark' && (
                      <span className="absolute inset-0 theme-glow opacity-70 rounded-full -z-10"></span>
                    )}
                    <div className="relative">
                      {theme === 'dark' ? 
                        <Sun size={32} className="text-cyan-300 animate-pulse" /> : 
                        <Moon size={32} />
                      }
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full">
                        <div className={`absolute -inset-1 ${theme === 'dark' ? 'bg-yellow-400/10' : 'bg-blue-400/10'} rounded-full blur-sm`}></div>
                      </div>
                    </div>
                    <motion.span 
                      className={`absolute inset-0 border rounded-full ${theme === 'dark' ? 'border-cyan-400/50' : 'border-blue-400/50'}`}
                      animate={{ 
                        scale: [1, 1.2, 1], 
                        opacity: [0.7, 0.2, 0.7] 
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity
                      }}
                    />
                  </motion.button>
                </div>
              </div>
              
              {/* Mobile menu */}
              <AnimatePresence>
                {mobileMenuOpen && (
                  <>
                    {/* Backdrop */}
                    <div 
                      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[2147483646] lg:hidden mobile-menu-backdrop"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{ isolation: 'isolate' }}
                    />
                    
                    {/* Menu */}
                    <div 
                      className={`mobile-menu lg:hidden fixed left-1/2 top-16 z-[2147483647] transform -translate-x-1/2 ${
                        theme === 'dark' 
                          ? 'bg-slate-900/95 backdrop-blur-lg text-white border-2 border-cyan-500' 
                          : 'bg-white/95 backdrop-blur-lg text-slate-900 border-2 border-blue-500'
                      } shadow-2xl menu-shadow-glow max-h-[45vh] w-[95%] sm:w-[92%] md:w-[95%] lg:w-[98%] xl:w-full max-w-6xl`}
                    >
                    <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-5 h-full overflow-y-auto">
                      <div className="flex flex-col space-y-2">
                        {['Home', 'About', 'Projects', 'Publications', 'Certificates', 'Awards', 'Contact'].map((item) => (
                          <motion.button
                            key={item}
                            onClick={() => {
                              scrollToSection(item.toLowerCase());
                              setMobileMenuOpen(false);
                            }}
                            className={`py-4 px-4 rounded-lg text-lg font-bold mb-2 ${
                              theme === 'dark' 
                                ? 'bg-slate-800 hover:bg-cyan-900 hover:text-cyan-300 text-white border-l-4 border-cyan-500 active:bg-cyan-800' 
                                : 'bg-slate-100 hover:bg-blue-100 hover:text-blue-700 text-slate-800 border-l-4 border-blue-500 active:bg-blue-200'
                            } transition-all duration-200 w-full text-left shadow-md min-h-[48px] flex items-center`}
                            whileTap={{ scale: 0.98 }}
                            aria-label={`Navigate to ${item} section`}
                          >
                            <div className="flex items-center">
                              <span className={`mr-3 ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'}`}>
                                {item === 'Home' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>}
                                {item === 'About' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"></circle><path d="M20 21a8 8 0 1 0-16 0"></path></svg>}
                                {item === 'Projects' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 19 9 12 16 5 9 12 2"></polygon><polyline points="19 15 19 22 5 22 5 15"></polyline></svg>}
                                {item === 'Publications' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>}
                                {item === 'Certificates' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"></rect><line x1="3" y1="10" x2="21" y2="10"></line></svg>}
                                {item === 'Awards' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>}
                                {item === 'Contact' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.908.339 1.85.574 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>}
                              </span>
                              {item}
                            </div>
                          </motion.button>
                        ))}
                        
                        <div className={`h-px w-full my-2 ${theme === 'dark' ? 'bg-cyan-500/50' : 'bg-blue-300/50'}`}></div>
                        
                        <div className="flex items-center justify-between py-3 px-4">
                          <span className={`font-medium ${theme === 'dark' ? 'text-cyan-300' : 'text-blue-700'}`}>Theme Settings</span>
                          <div className="flex items-center space-x-4">
                            <motion.button
                              onClick={toggleRoboticMode}
                              className={`p-3 rounded-full ${
                                theme === 'dark' 
                                  ? roboticMode ? 'bg-gradient-to-r from-cyan-700 to-blue-800 text-cyan-300' : 'bg-slate-800 text-gray-400' 
                                  : roboticMode ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white' : 'bg-slate-200 text-gray-600'
                              } relative ${roboticMode ? 'robot-border shadow-lg shadow-cyan-500/30' : ''} min-h-[48px] min-w-[48px] flex items-center justify-center`}
                              whileTap={{ scale: 0.9 }}
                              aria-label={roboticMode ? 'Disable robotic theme' : 'Enable robotic theme'}
                            >
                              <Cpu size={26} className={roboticMode ? '' : ''} />
                              {roboticMode && (
                                <>
                                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full"></div>
                                  <span 
                                    className="absolute inset-0 border border-cyan-400/50 rounded-full"
                                  />
                                </>
                              )}
                            </motion.button>
                            
                            <motion.button
                              onClick={toggleTheme}
                              className={`p-2 rounded-full ${
                                theme === 'dark' 
                                  ? 'bg-gradient-to-r from-cyan-700 to-blue-800 text-cyan-300 shadow-lg shadow-cyan-500/30' 
                                  : 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg shadow-blue-500/20'
                              } relative ${theme === 'dark' ? 'theme-border-dark' : 'theme-border-light'} min-h-[48px] min-w-[48px] flex items-center justify-center`}
                              whileTap={{ scale: 0.9 }}
                              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                            >
                              {theme === 'dark' && (
                                <span className="absolute inset-0 theme-glow opacity-70 rounded-full -z-10"></span>
                              )}
                              <div className="relative">
                                {theme === 'dark' ? <Sun size={20} className="text-cyan-300" /> : <Moon size={20} />}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full">
                                  <div className={`absolute -inset-1 ${theme === 'dark' ? 'bg-yellow-400/10' : 'bg-blue-400/10'} rounded-full blur-sm`}></div>
                                </div>
                              </div>
                              <span 
                                className={`absolute inset-0 border rounded-full ${theme === 'dark' ? 'border-cyan-400/50' : 'border-blue-400/50'}`}
                              />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {roboticMode && (
                      <>
                        <div className="absolute left-0 top-1/3 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                        <div className="absolute left-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                        <div className="absolute right-2 top-2 flex items-center">
                          <span className="text-xs font-mono text-cyan-400">MENU.SYS</span>
                        </div>
                      </>
                    )}
                    
                    {/* Menu glowing border in both themes */}
                    <div className={`absolute inset-0 pointer-events-none ${
                      theme === 'dark' ? 'shadow-[0_0_20px_rgba(6,182,212,0.3)]' : 'shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                    }`}></div>
                    </div>
                  </>
                )}
              </AnimatePresence>
            </motion.nav>

            {/* Hero Section */}
            <HeroSection theme={theme} roboticMode={roboticMode} toggleTheme={toggleTheme} toggleRoboticMode={toggleRoboticMode} smoothScrollToSection={smoothScrollToSection} scrollToSection={scrollToSection} />

            {/* About Section */}
            <AboutSection theme={theme} roboticMode={roboticMode} scrollToSection={scrollToSection} />
            
            <EducationSection theme={theme} roboticMode={roboticMode} />
            
            <SkillsSection theme={theme} roboticMode={roboticMode} setShowSkillsModal={setShowSkillsModal} />
            
            {/* Section Divider */}
            <div className={`w-full h-16 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'} relative overflow-hidden`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-3xl mx-auto px-4 flex items-center">
                  <div className={`h-0.5 flex-grow ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-cyan-500 to-transparent' : 'bg-gradient-to-r from-transparent via-blue-500 to-transparent'}`}></div>
                  <div className="mx-4">
                    {roboticMode ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'}`}>
                        <circle cx="12" cy="12" r="10"/>
                        <circle cx="12" cy="12" r="4"/>
                        <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/>
                        <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/>
                        <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/>
                        <line x1="14.83" y1="9.17" x2="18.36" y2="5.64"/>
                        <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'}`}>
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="8 12 12 16 16 12"/>
                        <line x1="12" y1="8" x2="12" y2="16"/>
                      </svg>
                    )}
                  </div>
                  <div className={`h-0.5 flex-grow ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-cyan-500 to-transparent' : 'bg-gradient-to-r from-transparent via-blue-500 to-transparent'}`}></div>
                </div>
              </div>
              {roboticMode && (
                <div className="absolute inset-0 opacity-10">
                </div>
              )}
            </div>
            
            <ProjectsSection theme={theme} roboticMode={roboticMode} />

            <PublicationsSection theme={theme} roboticMode={roboticMode} />
            
            <CertificatesSection theme={theme} roboticMode={roboticMode} />

            {/* Honors & Awards Section */}
            <AwardsSection theme={theme} roboticMode={roboticMode} openImageModal={openImageModal} />

            {/* Contact Section */}
            <ContactSection theme={theme} roboticMode={roboticMode} contactFormData={contactFormData} setContactFormData={setContactFormData} handleContactSubmit={handleContactSubmit} formStatus={formStatus} />

            {/* Footer */}
            <footer className={`${theme === 'dark' ? 'bg-slate-900 text-gray-400' : 'bg-white text-gray-600'} py-8 px-4 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'} transition-colors duration-300`}>
              <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                <motion.p 
                  className="mb-4 md:mb-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  © 2025 Dilusha Chamika. All rights reserved.
                </motion.p>
                <div className="flex space-x-6">
                  <motion.a 
                    href="https://github.com/dilusha-c" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`${theme === 'dark' ? 'hover:text-cyan-400' : 'hover:text-blue-500'} transition-colors`}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    <Github size={20} />
                  </motion.a>
                  <motion.a 
                    href="https://www.linkedin.com/in/dilusha-chamika/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`${theme === 'dark' ? 'hover:text-cyan-400' : 'hover:text-blue-500'} transition-colors`}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    <Linkedin size={20} />
                  </motion.a>
                  <motion.a 
                    href="https://x.com/DilushaChamika" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`${theme === 'dark' ? 'hover:text-cyan-400' : 'hover:text-blue-500'} transition-colors`}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    <X size={20} />
                  </motion.a>
                  <motion.a 
                    href="mailto:chamika@dilusha.live" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`${theme === 'dark' ? 'hover:text-cyan-400' : 'hover:text-blue-500'} transition-colors`}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    <Mail size={20} />
                  </motion.a>
                </div>
              </div>
            </footer>

            {/* Scroll to top button */}
            <motion.button
              onClick={scrollToTop}
              className={`fixed bottom-5 right-5 p-3 rounded-full ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} shadow-lg z-40 border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: scrollY > 300 ? 1 : 0,
                scale: scrollY > 300 ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
            >
              <ArrowUp size={20} className={theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      <Analytics />
      <SpeedInsights />
    </>
  )
}

export default App

