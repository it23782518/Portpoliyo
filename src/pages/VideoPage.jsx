import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Share2, Check, Github, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import VideoPlayer from '../components/VideoPlayer'

const netSentryXImg = 'https://res.cloudinary.com/dgthdmczs/image/upload/v1767947985/NetSentryX_image.jpg'
const gymSyncImg = 'https://res.cloudinary.com/dgthdmczs/image/upload/v1758527966/somuuyhlbef1gaqlwmn5.jpg'
const landmineRobotImg = 'https://res.cloudinary.com/dgthdmczs/image/upload/v1758527969/xtenkluxsdvbt3k1uupy.jpg'

const VideoPage = () => {
  const params = useParams()
  const navigate = useNavigate()
  
  const [copied, setCopied] = useState(false)

  // Video database with full project details
  const videoDatabase = {
    'netsentryx': {
      'netsentryx-demo-video': {
        url: 'https://res.cloudinary.com/dgthdmczs/video/upload/v1767948418/NetSentryX_video.mp4',
        title: 'NetSentryX - Demo Video',
        projectName: 'NetSentryX',
        thumbnail: netSentryXImg,
        description: 'Real-time Network Intrusion Detection System with ML-powered threat detection and automated blocking',
        fullDescription: 'NetSentryX is an end-to-end real-time network intrusion detection system that captures live traffic, extracts lightweight flow features in 5-second windows, and classifies suspicious flows using a RandomForest model trained on CIC-IDS2017. The system provides an analyst-friendly React dashboard for monitoring attack trends, visualizing attack types, tracking top attacking countries, and responding with manual or automated blocking (TTL-based) backed by an audit trail.',
        period: 'Oct - Dec 2025',
        capabilities: [
          'Real-time flow capture & lightweight feature extraction (Scapy + Python)',
          'ML detection pipeline (RandomForest) with attack labels + confidence scores',
          'Automated IP blocking with TTL, manual block/whitelist, and full audit logging',
          'React (Vite + TypeScript) dashboard with Attack Trends, Attack Types, Top Attacking Countries, and Network Monitor panels',
          'Production data collection, labeling workflow, and tools for retraining to continuously improve the model',
          'Open-source codebase with demo/test scripts showing detection and blocking workflows'
        ],
        technologies: ['Python', 'FastAPI', 'Scapy', 'scikit-learn', 'MongoDB Atlas', 'React + TypeScript', 'Recharts'],
        github: 'https://github.com/dilusha-c/NetSentryX'
      }
    },
    'detx': {
      'detx-autonomous-landmine-detection-system-demo': {
        url: 'https://res.cloudinary.com/dgthdmczs/video/upload/v1768115248/DetX_video.mp4',
        title: 'DetX - Autonomous Landmine Detection System Demo',
        projectName: 'DetX',
        thumbnail: landmineRobotImg,
        description: 'Autonomous robot with magnetic field sensing for detecting metallic landmines',
        fullDescription: 'DetX is a landmine detection system developed during Year 1, Semester 1 at SLIIT. The system leverages magnetic field sensing technology to identify metallic landmines with a 4WD Arduino-based robot equipped with a rotating sensor arm to maximize detection coverage. This hands-on project demonstrates how embedded systems, sensor integration, and web technologies can be combined to address critical humanitarian safety challenges in mine-affected regions.',
        period: 'Nov 2023 - Mar 2024',
        capabilities: [
          'Magnetic field sensor integration for detecting metallic objects underground',
          '4WD Arduino-based robot with servo-controlled rotating sensor arm',
          'Custom navigation algorithms for systematic area coverage and pathfinding',
          'Real-time sensor data processing with threshold-based detection logic',
          'Visual and audible alert system for immediate threat indication',
          'Web-based monitoring dashboard for remote supervision and data visualization',
          'Data logging system to track detection coordinates and sensor readings',
          'Battery-powered autonomous operation for field deployment'
        ],
        technologies: ['Arduino', 'C/C++', 'Robotics', 'IoT', 'Magnetic Sensors', 'Embedded Systems', 'Web Development']
      }
    },
    'gymsync': {
      'gymsync-demo-video': {
        url: 'https://res.cloudinary.com/dgthdmczs/video/upload/v1768116156/GymSync_video.mp4',
        title: 'GymSync - Demo Video',
        projectName: 'GymSync',
        thumbnail: gymSyncImg,
        description: 'Comprehensive gym management system with member tracking and workout management',
        fullDescription: 'GymSync is an advanced Gym Management System developed as part of the SE2012 Object-Oriented Analysis & Design module at SLIIT (Y2S1 – 2025). The system empowers gyms to streamline operations through real-time tracking, booking systems, and smart equipment management. Built with a full-stack responsive architecture using React.js, Spring Boot, and MySQL with JPA/Hibernate.',
        period: 'Feb - May 2025',
        capabilities: [
          'Real-time equipment tracking & status management',
          'Staff management with role-based access control',
          'Appointment booking system for trainers & members',
          'Exercise library with tutorial videos',
          'Maintenance scheduling & ticket management',
          'Session logging for workout tracking',
          'QR code integration for quick access'
        ],
        technologies: ['React.js', 'Vite', 'Spring Boot', 'Tailwind CSS', 'MySQL', 'JPA/Hibernate', 'RESTful APIs'],
        github: 'https://github.com/SLIIT-FacultyOfComputing/group-project-group-5',
        liveDemo: 'https://mansa-brown.vercel.app/'
      }
    }
  }

  const hasParams = Boolean(params.projectName && params.videoName)
  const projectSlug = hasParams ? params.projectName.toLowerCase() : null
  const videoSlug = hasParams ? params.videoName.toLowerCase() : null
  const project = projectSlug ? videoDatabase[projectSlug] : undefined
  const videoData = project && videoSlug ? project[videoSlug] : undefined

  // Update meta tags
  useEffect(() => {
    if (videoData) {
      document.title = `${videoData.title} | Dilusha Chamika`
      
      const updateMetaTag = (property, content) => {
        let tag = document.querySelector(`meta[property="${property}"]`)
        if (!tag) {
          tag = document.querySelector(`meta[name="${property}"]`)
        }
        if (tag) {
          tag.setAttribute('content', content)
        }
      }
      
      updateMetaTag('og:title', `${videoData.title} | Dilusha Chamika`)
      updateMetaTag('og:description', videoData.description)
      updateMetaTag('og:url', window.location.href)
      updateMetaTag('og:type', 'video.other')
      updateMetaTag('og:image', videoData.thumbnail)
      updateMetaTag('twitter:title', `${videoData.title} | Dilusha Chamika`)
      updateMetaTag('twitter:description', videoData.description)
      updateMetaTag('twitter:image', videoData.thumbnail)
      updateMetaTag('description', videoData.description)
    }

    return () => {
      document.title = 'Dilusha Chamika | Portfolio'
    }
  }, [videoData])

  const handleShare = async () => {
    const shareUrl = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({
          title: videoData.title,
          text: `Check out this project video: ${videoData.title}`,
          url: shareUrl
        })
        return
      } catch (err) {
        console.log('Share failed:', err)
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (!hasParams) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="max-w-lg text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-cyan-400 border-r-transparent"></div>
          <p className="mt-4 text-gray-400">Preparing video...</p>
        </div>
      </div>
    )
  }

  if (!videoData) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="max-w-lg text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Video Not Found</h1>
          <p className="text-gray-400 mb-6">
            The video link you tried to open does not match any published project. Please verify the URL or return to the main portfolio to browse available projects.
          </p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back to Portfolio</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Portfolio</span>
            </button>
          </div>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
          >
            {copied ? <Check size={18} /> : <Share2 size={18} />}
            <span>{copied ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Video Container */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-6xl">
          <h1 className="text-3xl font-bold text-white mb-6">{videoData.title}</h1>
          
          {/* Use VideoPlayer Component */}
          <VideoPlayer 
            videoUrl={videoData.url}
            className="bg-black rounded-xl overflow-hidden"
            style={{ aspectRatio: '16/9' }}
          />

          {/* Project Details Section */}
          <div className="mt-8 space-y-6">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">About This Project</h2>
              <p className="text-gray-300 text-lg leading-relaxed">{videoData.fullDescription}</p>
              {videoData.period && (
                <p className="text-cyan-400 text-sm mt-2 font-medium">{videoData.period}</p>
              )}
            </div>

            {/* Key Capabilities */}
            {videoData.capabilities && videoData.capabilities.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Key Capabilities</h3>
                <ul className="space-y-2">
                  {videoData.capabilities.map((capability, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 text-gray-300"
                    >
                      <span className="text-cyan-400 mt-1">▹</span>
                      <span>{capability}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            {videoData.technologies && videoData.technologies.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {videoData.technologies.map((tech, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="px-4 py-2 bg-slate-800 text-cyan-400 rounded-lg text-sm font-medium border border-cyan-400/20 hover:border-cyan-400/50 transition-colors"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            {(videoData.github || videoData.liveDemo) && (
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Project Links</h3>
                <div className="flex flex-wrap gap-4">
                  {videoData.github && (
                    <motion.a
                      href={videoData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700"
                    >
                      <Github size={20} />
                      <span>View on GitHub</span>
                    </motion.a>
                  )}
                  {videoData.liveDemo && (
                    <motion.a
                      href={videoData.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
                    >
                      <ExternalLink size={20} />
                      <span>Live Demo</span>
                    </motion.a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPage
