import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Settings, Maximize, Minimize } from 'lucide-react'
import PropTypes from 'prop-types'

const VideoPlayer = ({ videoUrl, className = '', autoplay = false }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [showSpeedMenu, setShowSpeedMenu] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoRef = useRef(null)
  const hideControlsTimeout = useRef(null)
  const containerRef = useRef(null)
  const autoplayAttempted = useRef(false)

  // Handle mouse movement to show/hide controls
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = () => {
      setShowControls(true)
      
      // Clear existing timeout
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current)
      }
      
      // Hide controls after 1.5 seconds of inactivity
      hideControlsTimeout.current = setTimeout(() => {
        setShowControls(false)
      }, 1500)
    }

    const handleMouseLeave = () => {
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current)
      }
      hideControlsTimeout.current = setTimeout(() => {
        setShowControls(false)
      }, 1500)
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current)
      }
    }
  }, [])

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay || autoplayAttempted.current || !videoRef.current) return

    const tryAutoplay = async () => {
      const v = videoRef.current
      if (!v) return
      autoplayAttempted.current = true
      
      try {
        v.volume = volume
        v.muted = false
        await v.play()
        setIsPlaying(true)
        setIsMuted(false)
      } catch (err) {
        // Autoplay with sound blocked, try muted
        try {
          v.muted = true
          await v.play()
          setIsPlaying(true)
          setIsMuted(true)
        } catch (err2) {
          console.warn('Autoplay failed:', err2)
          setIsPlaying(false)
        }
      }
    }

    const timer = setTimeout(() => tryAutoplay(), 200)
    return () => clearTimeout(timer)
  }, [autoplay, volume])

  // Show controls when play/pause state changes, then hide after 1.5 seconds
  useEffect(() => {
    setShowControls(true)
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current)
    }
    // Hide controls after 1.5 seconds
    hideControlsTimeout.current = setTimeout(() => {
      setShowControls(false)
    }, 1500)
  }, [isPlaying])

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // Close speed menu when clicking outside
  useEffect(() => {
    if (!showSpeedMenu) return
    
    const handleClickOutside = () => {
      setShowSpeedMenu(false)
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [showSpeedMenu])

  // Keyboard controls (spacebar for play/pause)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON') {
        e.preventDefault()
        togglePlayPause()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [])

  // Mouse wheel for volume control
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e) => {
      e.preventDefault()
      const delta = e.deltaY > 0 ? -0.05 : 0.05
      const newVolume = Math.max(0, Math.min(1, volume + delta))
      setVolume(newVolume)
      if (videoRef.current) {
        videoRef.current.volume = newVolume
        setIsMuted(newVolume === 0)
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [volume])

  const togglePlayPause = async () => {
    if (videoRef.current) {
      try {
        if (videoRef.current.paused) {
          await videoRef.current.play()
        } else {
          videoRef.current.pause()
        }
      } catch (err) {
        console.warn('Play/pause error:', err)
      }
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
      const newMuted = !videoRef.current.muted
      videoRef.current.muted = newMuted
      setIsMuted(newMuted)
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

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await containerRef.current?.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (err) {
      console.warn('Fullscreen error:', err)
    }
  }

  return (
    <div ref={containerRef} className={`relative ${className} group`}>
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full cursor-pointer"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClick={togglePlayPause}
        onDoubleClick={toggleFullscreen}
        style={{ objectFit: 'contain' }}
      >
        Your browser does not support the video tag.
      </video>

      {/* Custom Video Controls */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent pt-12 pb-6 px-6 z-30 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onMouseEnter={() => {
          setShowControls(true)
          if (hideControlsTimeout.current) {
            clearTimeout(hideControlsTimeout.current)
          }
        }}
        onMouseMove={() => {
          setShowControls(true)
          if (hideControlsTimeout.current) {
            clearTimeout(hideControlsTimeout.current)
          }
        }}
      >
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
              onClick={(e) => {
                e.stopPropagation()
                togglePlayPause()
              }}
              className="hover:text-cyan-400 transition-colors p-1"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleMute()
                }}
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
                onClick={(e) => {
                  e.stopPropagation()
                  setShowSpeedMenu(!showSpeedMenu)
                }}
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
                      onClick={(e) => {
                        e.stopPropagation()
                        changePlaybackSpeed(speed)
                      }}
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

            {/* Fullscreen Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleFullscreen()
              }}
              className="hover:text-cyan-400 transition-colors p-1"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  className: PropTypes.string,
  autoplay: PropTypes.bool
}

export default VideoPlayer
