import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Share2, Check, Play, Pause, Volume2, VolumeX, Settings, Github, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

const netSentryXImg = 'https://res.cloudinary.com/dgthdmczs/image/upload/v1767947985/NetSentryX_image.jpg'
const gymSyncImg = 'https://res.cloudinary.com/dgthdmczs/image/upload/v1758527966/somuuyhlbef1gaqlwmn5.jpg'
const landmineRobotImg = 'https://res.cloudinary.com/dgthdmczs/image/upload/v1758527969/xtenkluxsdvbt3k1uupy.jpg'

const VideoPage = () => {
  const params = useParams()
  const navigate = useNavigate()
  const videoRef = useRef(null)
  
  const [copied, setCopied] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [showSpeedMenu, setShowSpeedMenu] = useState(false)

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

  const project = videoDatabase[params.projectName]
  const videoData = project?.[params.videoName]

  // Redirect if invalid URL
  useEffect(() => {
    if (!videoData) {
      navigate('/', { replace: true })
    }
  }, [videoData, navigate])

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

  // Autoplay with fallback
  useEffect(() => {
    const tryAutoplay = async () => {
      const v = videoRef.current
      if (!v) return
      try {
        v.playbackRate = playbackSpeed
        v.volume = volume
        v.muted = false
        await v.play()
        setIsPlaying(true)
        setIsMuted(false)
      } catch (err) {
        try {
          v.muted = true
          setIsMuted(true)
          await v.play()
          setIsPlaying(true)
          setTimeout(() => {
            try {
              v.muted = false
              v.volume = volume
              setIsMuted(false)
            } catch (unmuteErr) {
              console.warn('Unmute failed:', unmuteErr)
            }
          }, 700)
        } catch (err2) {
          console.warn('Autoplay failed:', err2)
          setIsPlaying(false)
        }
      }
    }
    setTimeout(() => tryAutoplay(), 200)
  }, [playbackSpeed, volume])

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

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleProgressClick = (e) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const pos = (e.clientX - rect.left) / rect.width
      videoRef.current.currentTime = pos * duration
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setIsMuted(newVolume === 0)
    }
  }

  const changePlaybackSpeed = (speed) => {
    setPlaybackSpeed(speed)
    if (videoRef.current) {
      videoRef.current.playbackRate = speed
    }
    setShowSpeedMenu(false)
  }

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!videoData) return null

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
          
          <div className="relative bg-black rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <video
              ref={videoRef}
              src={videoData.url}
              className="w-full h-full"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onClick={togglePlayPause}
              style={{ objectFit: 'contain' }}
            >
              Your browser does not support the video tag.
            </video>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent pt-12 pb-6 px-6 z-30">
              <div 
                className="w-full h-2 bg-gray-600/50 rounded-full cursor-pointer mb-6 group"
                onClick={handleProgressClick}
              >
                <div 
                  className="h-full bg-cyan-400 rounded-full relative transition-all group-hover:h-2.5"
                  style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                >
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg"></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-white gap-4 pb-2">
                <div className="flex items-center gap-4">
                  <button onClick={togglePlayPause} className="hover:text-cyan-400 transition-colors p-1">
                    {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                  </button>

                  <div className="flex items-center gap-2">
                    <button onClick={toggleMute} className="hover:text-cyan-400 transition-colors p-1">
                      {isMuted || volume === 0 ? <VolumeX size={22} /> : <Volume2 size={22} />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #22d3ee 0%, #22d3ee ${(isMuted ? 0 : volume) * 100}%, #4b5563 ${(isMuted ? 0 : volume) * 100}%, #4b5563 100%)`
                      }}
                    />
                  </div>

                  <span className="text-sm font-medium whitespace-nowrap">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors border border-white/20"
                  >
                    <Settings size={18} />
                    <span className="text-sm font-medium">{playbackSpeed}x</span>
                  </button>
                  
                  {showSpeedMenu && (
                    <div className="absolute bottom-full right-0 mb-3 bg-slate-900 rounded-lg shadow-2xl overflow-hidden border border-white/10 min-w-[120px]">
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                        <button
                          key={speed}
                          onClick={() => changePlaybackSpeed(speed)}
                          className={`block w-full px-4 py-2.5 text-left text-sm hover:bg-cyan-400/20 transition-colors ${
                            playbackSpeed === speed ? 'bg-cyan-400/30 text-cyan-400 font-semibold' : 'text-white'
                          }`}
                        >
                          {speed}x {speed === 1 && '(Normal)'}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

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
