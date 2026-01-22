import { motion, AnimatePresence } from 'framer-motion'
import { X, Share2, Check } from 'lucide-react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import VideoPlayer from './VideoPlayer'

const VideoPreviewModal = ({ isOpen, onClose, videoUrl, title, projectName }) => {
  const [copied, setCopied] = useState(false)

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
            
            {/* Use VideoPlayer Component */}
            <VideoPlayer videoUrl={videoUrl} autoplay={true} />
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
