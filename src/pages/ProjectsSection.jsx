import { motion } from 'framer-motion'
import { useState } from 'react'
import RoboticSectionTitle from '../components/RoboticSectionTitle'
import PDFPreviewModal from '../components/PDFPreviewModal'
import VideoPreviewModal from '../components/VideoPreviewModal'
import { Github, ExternalLink, FileText, Play } from 'lucide-react'
const netSentryXImg = 'https://res.cloudinary.com/dgthdmczs/image/upload/v1767947985/NetSentryX_image.jpg'
const cacheMemoryImg = 'https://res.cloudinary.com/dgthdmczs/image/upload/v1768112780/cache_Memory.png'
const adaptiveModulationImg = 'https://res.cloudinary.com/dgthdmczs/image/upload/v1768111890/Adaptive_Modulation_Simulation.jpg'
const animalRecognizerImg = 'https://res.cloudinary.com/dgthdmczs/image/upload/v1758527960/kdvukqbd7wuwjrgfs9ir.jpg'
const gymSyncImg = 'https://res.cloudinary.com/dgthdmczs/image/upload/v1758527966/somuuyhlbef1gaqlwmn5.jpg'
const zaveImg = 'https://res.cloudinary.com/dgthdmczs/image/upload/v1758527972/wcjr4d6lvz6jj1lv4kol.jpg'
const amReceiverImg = 'https://res.cloudinary.com/dgthdmczs/image/upload/v1768111577/AM_Receiver.jpg'
const landmineRobotImg = 'https://res.cloudinary.com/dgthdmczs/image/upload/v1758527969/xtenkluxsdvbt3k1uupy.jpg'
import PropTypes from 'prop-types'

const ProjectsSection = ({ theme }) => {
  const [pdfModal, setPdfModal] = useState({ isOpen: false, url: '', title: '' })
  const [videoModal, setVideoModal] = useState({ isOpen: false, url: '', title: '', projectName: '' })
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <section id="projects" className={`py-20 px-4 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'} transition-colors duration-300 relative overflow-hidden`}>
      {/* PDF Preview Modal */}
      <PDFPreviewModal
        isOpen={pdfModal.isOpen}
        onClose={() => setPdfModal({ isOpen: false, url: '', title: '' })}
        pdfUrl={pdfModal.url}
        title={pdfModal.title}
      />
      
      {/* Video Preview Modal */}
      <VideoPreviewModal
        isOpen={videoModal.isOpen}
        onClose={() => setVideoModal({ isOpen: false, url: '', title: '', projectName: '' })}
        videoUrl={videoModal.url}
        title={videoModal.title}
        projectName={videoModal.projectName}
      />
      
      {/* No hardware decorations for projects section */}
      <div className="container mx-auto relative z-10">
        <RoboticSectionTitle>
          My Projects
        </RoboticSectionTitle>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Project Cards - Reordered */}
          {/* 1. NetSentryX Project */}
          <motion.div
            variants={fadeInUp}
            whileHover={{
              scale: 1.02,
              boxShadow: theme === 'dark'
                ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
                : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
            }}
            className={`rounded-lg overflow-hidden shadow-lg transition-all ${
              theme === 'dark' ? 'bg-slate-800' : 'bg-white border border-slate-200'
            }`}
          >
            <div className="relative">
              <div className={`h-64 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'} flex items-center justify-center overflow-hidden`}>
                <motion.img
                  src={netSentryXImg}
                  alt="NetSentryX - Real-time Network Intrusion Detection System"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 w-full">
                  <div className="flex gap-2 justify-end">
                    <motion.button
                      onClick={() => setVideoModal({ 
                        isOpen: true, 
                        url: 'https://res.cloudinary.com/dgthdmczs/video/upload/v1767948418/NetSentryX_video.mp4',
                        title: 'NetSentryX - Demo Video',
                        projectName: 'NetSentryX'
                      })}
                      className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                      <Play size={16} className="text-white" />
                    </motion.button>
                    <motion.a
                      href="https://github.com/dilusha-c/NetSentryX"
                      target="_blank"
                      className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                      <Github size={16} className="text-white" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">NetSentryX - Real-time Network Intrusion Detection System</h3>
                <span className="text-sm text-gray-400">Oct - Dec 2025</span>
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                NetSentryX is an end-to-end real-time network intrusion detection system that captures live traffic, extracts lightweight flow features in 5-second windows, and classifies suspicious flows using a RandomForest model trained on CIC-IDS2017. The system provides an analyst-friendly React dashboard for monitoring attack trends, visualizing attack types, tracking top attacking countries, and responding with manual or automated blocking (TTL-based) backed by an audit trail.
              </p>
              <div className="mb-4">
                <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider text-cyan-400">Key Capabilities</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm mb-4">
                  <li>Real-time flow capture & lightweight feature extraction (Scapy + Python)</li>
                  <li>ML detection pipeline (RandomForest) with attack labels + confidence scores</li>
                  <li>Automated IP blocking with TTL, manual block/whitelist, and full audit logging</li>
                  <li>React (Vite + TypeScript) dashboard with Attack Trends, Attack Types, Top Attacking Countries, and Network Monitor panels</li>
                  <li>Production data collection, labeling workflow, and tools for retraining to continuously improve the model</li>
                  <li>Open-source codebase with demo/test scripts showing detection and blocking workflows</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Python</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>FastAPI</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Scapy</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>scikit-learn</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>MongoDB Atlas</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>React + TypeScript</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Recharts</span>
              </div>
              <div className="flex gap-4">
                <motion.button
                  onClick={() => setVideoModal({ 
                    isOpen: true, 
                    url: 'https://res.cloudinary.com/dgthdmczs/video/upload/v1767948418/NetSentryX_video.mp4',
                    title: 'NetSentryX - Demo Video',
                    projectName: 'NetSentryX'
                  })}
                  className={`text-sm ${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-500 hover:text-blue-700'} flex items-center gap-1`}
                  whileHover={{ x: 5 }}
                >
                  Watch Demo <Play size={14} />
                </motion.button>
                <motion.a
                  href="https://github.com/dilusha-c/NetSentryX"
                  target="_blank"
                  className={`text-sm ${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-500 hover:text-blue-700'} flex items-center gap-1`}
                  whileHover={{ x: 5 }}
                >
                  View on GitHub <Github size={14} />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* 2. Landmine Detection Project */}
          <motion.div
            variants={fadeInUp}
            whileHover={{
              scale: 1.02,
              boxShadow: theme === 'dark'
                ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
                : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
            }}
            className={`rounded-lg overflow-hidden shadow-lg transition-all ${
              theme === 'dark' ? 'bg-slate-800' : 'bg-white border border-slate-200'
            }`}
          >
            <div className="relative">
              <div className={`h-64 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'} flex items-center justify-center overflow-hidden`}>
                <motion.img
                  src={landmineRobotImg}
                  alt="Autonomous Landmine Detection Robot"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 w-full">
                  <div className="flex gap-2 justify-end">
                    <motion.button
                      onClick={() => setVideoModal({ 
                        isOpen: true, 
                        url: 'https://res.cloudinary.com/dgthdmczs/video/upload/v1768115248/DetX_video.mp4',
                        title: 'DetX - Autonomous Landmine Detection System Demo',
                        projectName: 'DetX'
                      })}
                      className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                      <Play size={16} className="text-white" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">DetX - Autonomous Landmine Detection System</h3>
                <span className="text-sm text-gray-400">Nov 2023 - Mar 2024</span>
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                DetX is a landmine detection system developed during Year 1, Semester 1 at SLIIT. The system leverages magnetic field sensing technology to identify metallic landmines with a 4WD Arduino-based robot equipped with a rotating sensor arm to maximize detection coverage. This hands-on project demonstrates how embedded systems, sensor integration, and web technologies can be combined to address critical humanitarian safety challenges in mine-affected regions.
              </p>
              <div className="mb-4">
                <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider text-cyan-400">Key Capabilities</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm mb-4">
                  <li>Magnetic field sensor integration for detecting metallic objects underground</li>
                  <li>4WD Arduino-based robot with servo-controlled rotating sensor arm</li>
                  <li>Custom navigation algorithms for systematic area coverage and pathfinding</li>
                  <li>Real-time sensor data processing with threshold-based detection logic</li>
                  <li>Visual and audible alert system for immediate threat indication</li>
                  <li>Web-based monitoring dashboard for remote supervision and data visualization</li>
                  <li>Data logging system to track detection coordinates and sensor readings</li>
                  <li>Battery-powered autonomous operation for field deployment</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Arduino</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>C/C++</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Robotics</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>IoT</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Magnetic Sensors</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Embedded Systems</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Web Development</span>
              </div>
              <div className="flex gap-4">
                <motion.button
                  onClick={() => setVideoModal({ 
                    isOpen: true, 
                    url: 'https://res.cloudinary.com/dgthdmczs/video/upload/v1768115248/DetX_video.mp4',
                    title: 'DetX - Autonomous Landmine Detection System Demo',
                    projectName: 'DetX'
                  })}
                  className={`text-sm ${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-500 hover:text-blue-700'} flex items-center gap-1`}
                  whileHover={{ x: 5 }}
                >
                  Watch Demo <Play size={14} />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* 3. GymSync Project */}
          <motion.div
            variants={fadeInUp}
            whileHover={{
              scale: 1.02,
              boxShadow: theme === 'dark'
                ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
                : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
            }}
            className={`rounded-lg overflow-hidden shadow-lg transition-all ${
              theme === 'dark' ? 'bg-slate-800' : 'bg-white border border-slate-200'
            }`}
          >
            <div className="relative">
              <div className={`h-64 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'} flex items-center justify-center overflow-hidden`}>
                <motion.img
                  src={gymSyncImg}
                  alt="GymSync Dashboard"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 w-full">
                  <div className="flex gap-2 justify-end">
                    <motion.button
                      onClick={() => setVideoModal({ 
                        isOpen: true, 
                        url: 'https://res.cloudinary.com/dgthdmczs/video/upload/v1768116156/GymSync_video.mp4',
                        title: 'GymSync - Demo Video',
                        projectName: 'GymSync'
                      })}
                      className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                      <Play size={16} className="text-white" />
                    </motion.button>
                    <motion.a
                      href="https://mansa-brown.vercel.app/"
                      target="_blank"
                      className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                      <ExternalLink size={16} className="text-white" />
                    </motion.a>
                    <motion.a
                      href="https://github.com/SLIIT-FacultyOfComputing/group-project-group-5"
                      target="_blank"
                      className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                      <Github size={16} className="text-white" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">GymSync</h3>
                <span className="text-sm text-gray-400">Feb - May 2025</span>
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                GymSync is an advanced Gym Management System developed as part of the SE2012 Object-Oriented Analysis & Design module at SLIIT (Y2S1 – 2025). The system empowers gyms to streamline operations through real-time tracking, booking systems, and smart equipment management. Built with a full-stack responsive architecture using React.js, Spring Boot, and MySQL with JPA/Hibernate.
              </p>
              <div className="mb-4">
                <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider text-cyan-400">Key Features Built</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm mb-4">
                  <li>Real-time equipment tracking & status management</li>
                  <li>Staff management with role-based access control</li>
                  <li>Appointment booking system for trainers & members</li>
                  <li>Exercise library with tutorial videos</li>
                  <li>Maintenance scheduling & ticket management</li>
                  <li>Session logging for workout tracking</li>
                  <li>QR code integration for quick access</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>React.js</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Vite</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Spring Boot</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Tailwind CSS</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>MySQL</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>JPA/Hibernate</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>RESTful APIs</span>
              </div>
              <div className="flex gap-4">
                <motion.button
                  onClick={() => setVideoModal({ 
                    isOpen: true, 
                    url: 'https://res.cloudinary.com/dgthdmczs/video/upload/v1768116156/GymSync_video.mp4',
                    title: 'GymSync - Demo Video',
                    projectName: 'GymSync'
                  })}
                  className={`text-sm ${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-500 hover:text-blue-700'} flex items-center gap-1`}
                  whileHover={{ x: 5 }}
                >
                  Watch Demo <Play size={14} />
                </motion.button>
                <motion.a
                  href="https://mansa-brown.vercel.app/"
                  target="_blank"
                  className={`text-sm ${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-500 hover:text-blue-700'} flex items-center gap-1`}
                  whileHover={{ x: 5 }}
                >
                  Live Demo <ExternalLink size={14} />
                </motion.a>
                <motion.a
                  href="https://github.com/SLIIT-FacultyOfComputing/group-project-group-5"
                  target="_blank"
                  className={`text-sm ${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-500 hover:text-blue-700'} flex items-center gap-1`}
                  whileHover={{ x: 5 }}
                >
                  GitHub Repository <Github size={14} />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* 4. Animal Recognizer Project */}
          <motion.div
            variants={fadeInUp}
            whileHover={{
              scale: 1.02,
              boxShadow: theme === 'dark'
                ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
                : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
            }}
            className={`rounded-lg overflow-hidden shadow-lg transition-all ${
              theme === 'dark' ? 'bg-slate-800' : 'bg-white border border-slate-200'
            }`}
          >
            <div className="relative">
              <div className={`h-64 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'} flex items-center justify-center overflow-hidden`}>
                <motion.img
                  src={animalRecognizerImg}
                  alt="Animal Recognizer Interface"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 w-full">
                  <div className="flex gap-2 justify-end">
                    <motion.a
                      href="https://github.com/it23782518/animal-recognizer"
                      target="_blank"
                      className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                      <Github size={16} className="text-white" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">Animal Recognizer</h3>
                <span className="text-sm text-gray-400">Jun 2025</span>
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                Animal Recognizer is a full-stack AI web application that allows users to upload images and instantly identify animals from 64 different animal species using a custom-trained Convolutional Neural Network (CNN) model. This project combines deep learning, TensorFlow deployment, and modern web technologies to deliver fast and accurate real-time predictions in the browser.
              </p><br />
              <div className="mb-4">
                <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider text-cyan-400">Key Features Built</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm mb-4">
                  <li>Real-time animal recognition for 64 animal species</li>
                  <li>Image upload with instant classification</li>
                  <li>Fast TensorFlow-based model inference with Python backend</li>
                  <li>Next.js (TypeScript) frontend with Tailwind CSS for responsive UI</li>
                  <li>Next.js API routes forwarding image data to Python inference server</li>
                  <li>Custom CNN model trained with Keras on curated animal image dataset</li>
                  <li>Seamless frontend-backend integration with reliable predictions</li>
                  <li>Google Colab-based model training and TensorFlow deployment</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>TensorFlow</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Next.js</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>TypeScript</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Python</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>CNN</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Keras</span>
              </div>
              <div className="flex gap-4">
                <motion.a
                  href="https://github.com/it23782518/animal-recognizer"
                  target="_blank"
                  className={`text-sm ${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-500 hover:text-blue-700'} flex items-center gap-1`}
                  whileHover={{ x: 5 }}
                >
                  GitHub Repository <Github size={14} />
                </motion.a>
                <motion.a
                  href="https://colab.research.google.com/drive/1Lxqs1Xpi1tqzfvkwWuF34jLmgaItbC2m?usp=sharing"
                  target="_blank"
                  className={`text-sm ${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-500 hover:text-blue-700'} flex items-center gap-1`}
                  whileHover={{ x: 5 }}
                >
                  Colab Notebook <ExternalLink size={14} />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* 5. Adaptive Modulation Project */}
          <motion.div
            variants={fadeInUp}
            whileHover={{
              scale: 1.02,
              boxShadow: theme === 'dark'
                ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
                : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
            }}
            className={`rounded-lg overflow-hidden shadow-lg transition-all ${
              theme === 'dark' ? 'bg-slate-800' : 'bg-white border border-slate-200'
            }`}
          >
            <div className="relative">
              <div className={`h-64 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'} flex items-center justify-center overflow-hidden`}>
                <motion.img
                  src={adaptiveModulationImg}
                  alt="Adaptive Modulation Simulation"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 w-full">
                  <div className="flex gap-2 justify-end">
                    <motion.a
                      href="https://https-github-com-malith-samaradiwak.vercel.app/"
                      target="_blank"
                      className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                      <ExternalLink size={16} className="text-white" />
                    </motion.a>
                    <motion.button
                      onClick={() => setPdfModal({ 
                        isOpen: true, 
                        url: 'https://drive.google.com/file/d/1h3vjujiZDh_uMSBpyJqog4qQTwcmVfo4/preview',
                        title: 'Adaptive Modulation Simulation - Full Report'
                      })}
                      className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                      <FileText size={16} className="text-white" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">Adaptive Modulation Simulation</h3>
                <span className="text-sm text-gray-400">Aug - Oct 2025</span>
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                This project focuses on designing and evaluating an adaptive modulation system for wireless communication, aiming to improve data reliability and spectral efficiency under varying channel conditions. Using MATLAB simulations, we analyzed the performance of BPSK, QPSK, and 16QAM across AWGN, Rayleigh, and Rician fading environments. Adaptive modulation successfully switched between schemes based on SNR, maintaining target BER ≤ 10⁻³ while maximizing throughput.
              </p><br/>
              <div className="mb-4">
                <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider text-cyan-400">Key Objectives & Achievements</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm mb-4">
                  <li>Model realistic wireless transmission scenarios</li>
                  <li>Compare fixed vs. adaptive modulation performance</li>
                  <li>Maintain target BER ≤ 10⁻³ while maximizing throughput</li>
                  <li>Evaluate spectral efficiency and constellation behavior</li>
                  <li>Successfully switched between BPSK → QPSK → 16QAM based on SNR</li>
                  <li>Achieved optimal trade-off between error rate and bandwidth usage</li>
                  <li>Demonstrated robustness under fading channel conditions</li>
                  <li>Interactive web-based visualization of simulation results</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>MATLAB</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Wireless Technologies</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Channel Modeling</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Digital Modulation</span>
              </div>
              <div className="flex gap-4">
                <motion.a
                  href="https://https-github-com-malith-samaradiwak.vercel.app/"
                  target="_blank"
                  className={`text-sm ${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-500 hover:text-blue-700'} flex items-center gap-1`}
                  whileHover={{ x: 5 }}
                >
                  Interactive Results <ExternalLink size={14} />
                </motion.a>
                <motion.button
                  onClick={() => setPdfModal({ 
                    isOpen: true, 
                    url: 'https://drive.google.com/file/d/1h3vjujiZDh_uMSBpyJqog4qQTwcmVfo4/preview',
                    title: 'Adaptive Modulation Simulation - Full Report'
                  })}
                  className={`text-sm ${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-500 hover:text-blue-700'} flex items-center gap-1`}
                  whileHover={{ x: 5 }}
                >
                  Full Report <FileText size={14} />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* 6. Cache Memory Systems Project */}
          <motion.div
            variants={fadeInUp}
            whileHover={{
              scale: 1.02,
              boxShadow: theme === 'dark'
                ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
                : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
            }}
            className={`rounded-lg overflow-hidden shadow-lg transition-all ${
              theme === 'dark' ? 'bg-slate-800' : 'bg-white border border-slate-200'
            }`}
          >
            <div className="relative">
              <div className={`h-64 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'} flex items-center justify-center overflow-hidden`}>
                <motion.img
                  src={cacheMemoryImg}
                  alt="Cache Memory Systems Performance Analysis"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 w-full">
                  <div className="flex gap-2 justify-end">
                    <motion.a
                      href="https://www.researchgate.net/publication/396741453_Performance_Analysis_and_Design_Strategies_for_Cache_Memory_Systems"
                      target="_blank"
                      className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                      <FileText size={16} className="text-white" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">Performance Analysis and Design Strategies for Cache Memory Systems</h3>
                <span className="text-sm text-gray-400">Aug - Oct 2025</span>
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                A collaborative research project by Dilusha Chamika, Ishan Dhanusanka, Malith Samaradiwakara, and Maneka Gunarathne focused on performance analysis and optimization of cache memory systems using simulation-based techniques. The study analyzes how cache design parameters influence system performance metrics such as hit ratio and Average Memory Access Time (AMAT). Findings highlight the effectiveness of multi-level cache architectures, moderate associativity, and LRU replacement policies.
              </p>
              <div className="mb-4">
                <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider text-cyan-400">Key Contributions</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm mb-4">
                  <li>Simulated single-level and multi-level cache hierarchies</li>
                  <li>Analyzed cache size, block size, and associativity trade-offs</li>
                  <li>Compared replacement policies including LRU, FIFO, LFU, and Random</li>
                  <li>Evaluated performance using hit ratio and AMAT</li>
                  <li>Proposed design recommendations for modern processors</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Python</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>MATLAB</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Computer Architecture</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Performance Analysis</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Technical Research</span>
              </div>
              <div className="flex gap-4">
                <motion.a
                  href="https://www.researchgate.net/publication/396741453_Performance_Analysis_and_Design_Strategies_for_Cache_Memory_Systems"
                  target="_blank"
                  className={`text-sm ${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-500 hover:text-blue-700'} flex items-center gap-1`}
                  whileHover={{ x: 5 }}
                >
                  ResearchGate Publication <FileText size={14} />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* 7. AM Receiver Audio Circuit Project */}
          <motion.div
            variants={fadeInUp}
            whileHover={{
              scale: 1.02,
              boxShadow: theme === 'dark'
                ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
                : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
            }}
            className={`rounded-lg overflow-hidden shadow-lg transition-all ${
              theme === 'dark' ? 'bg-slate-800' : 'bg-white border border-slate-200'
            }`}
          >
            <div className="relative">
              <div className={`h-64 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'} flex items-center justify-center overflow-hidden`}>
                <motion.img
                  src={amReceiverImg}
                  alt="AM Receiver Audio Circuit"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 w-full">
                  <div className="flex gap-2 justify-end">
                    <motion.button
                      onClick={() => setPdfModal({ 
                        isOpen: true, 
                        url: 'https://drive.google.com/file/d/1EZddvEM3_l_EF2q8TxVHwp2F7-FX0NgZ/preview',
                        title: 'AM Receiver Audio Circuit - Full Report'
                      })}
                      className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                      <FileText size={16} className="text-white" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">AM Receiver Audio Circuit</h3>
                <span className="text-sm text-gray-400">Sep - Oct 2025</span>
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                Designed and implemented a multi-stage analog circuit to recover and amplify the audio signal from an AM detector output. The system includes a band-pass filter, a buffer stage, and a common-emitter BJT amplifier, achieving an amplification of around 21× within the 1 kHz – 20 kHz audio range. Successfully demonstrated clean amplification of audio signals while avoiding distortion and preserving bandwidth. Completed as part of the Analog Electronics (IE2034) module at SLIIT.
              </p>
              <br />
              <div className="mb-4">
                <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider text-cyan-400">Project Highlights</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm mb-4">
                  <li>RC filter design and cutoff frequency calculations</li>
                  <li>Transistor biasing and Q-point stabilization</li>
                  <li>LTSpice simulation for frequency response analysis</li>
                  <li>Practical hardware implementation on a dot-board</li>
                  <li>Oscilloscope testing to validate amplification performance</li>
                  <li>Achieved ~21× voltage gain within audio frequency range</li>
                  <li>Clean amplification without distortion or bandwidth loss</li>
                </ul>
              </div>
              <br />
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Circuit Design</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Analog Electronics</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>LTSpice</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Hardware Debugging</span>
              </div>
              <div className="flex gap-4">
                <motion.button
                  onClick={() => setPdfModal({ 
                    isOpen: true, 
                    url: 'https://drive.google.com/file/d/1EZddvEM3_l_EF2q8TxVHwp2F7-FX0NgZ/preview',
                    title: 'AM Receiver Audio Circuit - Full Report'
                  })}
                  className={`text-sm ${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-500 hover:text-blue-700'} flex items-center gap-1`}
                  whileHover={{ x: 5 }}
                >
                  Full Project Report <FileText size={14} />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* 8. Zave Project */}
          <motion.div
            variants={fadeInUp}
            whileHover={{
              scale: 1.02,
              boxShadow: theme === 'dark'
                ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
                : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 0 15px 0 rgba(34, 211, 238, 0.3)'
            }}
            className={`rounded-lg overflow-hidden shadow-lg transition-all ${
              theme === 'dark' ? 'bg-slate-800' : 'bg-white border border-slate-200'
            }`}
          >
            <div className="relative">
              <div className={`h-64 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'} flex items-center justify-center overflow-hidden`}>
                <motion.img
                  src={zaveImg}
                  alt="Zave Financial Literacy App UI Design"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 w-full">
                  <div className="flex gap-2 justify-end">
                    <motion.a
                      href="https://www.figma.com/proto/elgBua5RuTE8fNkz6IZGh7/zave?node-id=0-1&t=uhsAeFJEduhZJXO6-1"
                      target="_blank"
                      className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                      <ExternalLink size={16} className="text-white" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">Zave - Financial Literacy App</h3>
                <span className="text-sm text-gray-400">Mar 2025</span>
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                Designed the UI for Zave, a gamified financial literacy app tailored for GenZ users. Built as a submission for the InterfaceX design competition, the app empowers young users to take control of their personal finances while engaging in fun, competitive learning. Features a youthful, vibrant interface with gamified UI elements designed for scalability and real-world deployment. Currently a semi-finalist in progress at InterfaceX 2025.
              </p>
              <div className="mb-4">
                <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider text-cyan-400">Key Features & Design Highlights</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm mb-4">
                  <li>Budget & Expense Manager – Categorized spending, savings goals, and analytics</li>
                  <li>Financial Quizzes – Interactive quiz modules to test financial knowledge</li>
                  <li>Leaderboards – Compete with friends and users globally in financial literacy</li>
                  <li>Goal Tracker – Visualize short- and long-term financial goals with progress tracking</li>
                  <li>Secure Onboarding – GenZ-friendly yet professional UI with clear UX flows</li>
                  <li>Youthful, vibrant interface appealing to GenZ aesthetic</li>
                  <li>Gamified UI elements to increase user engagement</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>UI/UX Design</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Figma</span>
                <span className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>Prototype</span>
              </div>
              <div className="flex gap-4">
                <motion.a
                  href="https://www.figma.com/proto/elgBua5RuTE8fNkz6IZGh7/zave?node-id=0-1&t=uhsAeFJEduhZJXO6-1"
                  target="_blank"
                  className={`text-sm ${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-500 hover:text-blue-700'} flex items-center gap-1`}
                  whileHover={{ x: 5 }}
                >
                  View Prototype <ExternalLink size={14} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

ProjectsSection.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
}

export default ProjectsSection