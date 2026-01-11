import { motion, AnimatePresence } from 'framer-motion'
import { X, Share2, Check, Play, Pause, Volume2, VolumeX, Settings } from 'lucide-react'
import PropTypes from 'prop-types'
import { useState, useRef, useEffect } from 'react'

const VideoPreviewModal = ({ isOpen, onClose, videoUrl, title, projectName }) => {
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [showSpeedMenu, setShowSpeedMenu] = useState(false)
  const videoRef = useRef(null)

  // Generate shareable URL
  const generateShareUrl = () => {
    const baseUrl = window.location.origin
    const videoName = title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : 'video'
    const projectSlug = projectName ? projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : 'project'
    return `${baseUrl}/video/${projectSlug}/${videoName}`
  }

  const handleShare = async () => {
    const shareUrl = generateShareUrl()
    
    // Try native share API first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || 'Project Video',
          text: `Check out this project video: ${title}`,
          url: shareUrl
        })
        return
      } catch (err) {
        // Fall through to clipboard copy
        console.log('Share failed:', err)
      }
    }
    
    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Video control handlers
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
      setLoading(false)
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

  // Reset states when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(true)
      setCurrentTime(0)
      setShowSpeedMenu(false)
    }
  }, [isOpen])

  // Try to autoplay when modal opens. If browser blocks autoplay with sound,
  // fall back to muting the video and try again so shared links start playback.
  useEffect(() => {
    if (!isOpen) return

    const tryAutoplay = async () => {
      const v = videoRef.current
      if (!v) return
      const desiredVolume = volume || 1
      try {
        v.playbackRate = playbackSpeed
        v.volume = desiredVolume
        v.muted = false
        await v.play()
        setIsPlaying(true)
        setIsMuted(false)
      } catch (err) {
        // Autoplay with sound blocked. Mute and try again, then attempt to unmute.
        try {
          v.muted = true
          setIsMuted(true)
          v.volume = desiredVolume
          await v.play()
          setIsPlaying(true)

          // After playback starts muted, attempt to unmute once (may still be blocked).
          setTimeout(async () => {
            try {
              v.muted = false
              v.volume = desiredVolume
              setIsMuted(false)
            } catch (unmuteErr) {
              // If unmute is blocked by browser policy, keep muted.
              console.warn('Unmute attempt failed:', unmuteErr)
              v.muted = true
              setIsMuted(true)
            }
          }, 700)

        } catch (err2) {
          // If autoplay still fails, leave it paused and user can play manually
          console.warn('Autoplay failed:', err2)
          setIsPlaying(false)
        }
      }
    }

    // Small timeout to ensure media is loaded in some browsers
    const t = setTimeout(() => tryAutoplay(), 200)
    return () => clearTimeout(t)
  }, [isOpen, playbackSpeed, volume])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-6xl h-[80vh] bg-white rounded-xl shadow-2xl flex flex-col"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex flex-col border-b bg-gradient-to-r from-slate-50 to-slate-100 rounded-t-xl">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-100 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-600"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{title || 'Video'}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-gray-600 hover:text-gray-800 relative"
                  title={copied ? "Link copied!" : "Share video"}
                >
                  {copied ? <Check size={20} className="text-green-600" /> : <Share2 size={20} />}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-gray-600 hover:text-gray-800"
                  aria-label="Close preview"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Video Player */}
          <div className="flex-1 relative bg-black rounded-b-xl overflow-hidden">
            {/* Copy Success Toast */}
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
              >
                <Check size={16} />
                <span className="text-sm font-medium">Shareable link copied!</span>
              </motion.div>
            )}
            
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-white">Loading Video...</p>
                </div>
              </div>
            )}
            <video
              ref={videoRef}
              src={videoUrl}
              autoPlay
              className="w-full h-full"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              style={{ objectFit: 'contain', maxHeight: 'calc(100% - 100px)' }}
              onClick={togglePlayPause}
            >
              Your browser does not support the video tag.
            </video>

            {/* Custom Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent pt-12 pb-6 px-6 z-30">
              {/* Progress Bar */}
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

              {/* Controls Row */}
              <div className="flex items-center justify-between text-white gap-4 pb-2">
                {/* Left Controls */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlayPause}
                    className="hover:text-cyan-400 transition-colors p-1"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                  </button>

                  {/* Volume Control */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleMute}
                      className="hover:text-cyan-400 transition-colors p-1"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
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

                  {/* Time Display */}
                  <span className="text-sm font-medium whitespace-nowrap">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-2">
                  {/* Speed Control */}
                  <div className="relative">
                    <button
                      onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors border border-white/20"
                      title="Playback Speed"
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
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

VideoPreviewModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  videoUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
  projectName: PropTypes.string
}

export default VideoPreviewModal
