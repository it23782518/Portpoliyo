import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, ExternalLink } from 'lucide-react'
import PropTypes from 'prop-types'
import { useState } from 'react'

const VideoPreviewModal = ({ isOpen, onClose, videoUrl, title }) => {
  const [loading, setLoading] = useState(true)

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
          className="relative w-full max-w-6xl h-[80vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-slate-50 to-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-600"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{title || 'Video'}</h3>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={videoUrl}
                download
                className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-gray-600 hover:text-gray-800"
                title="Download Video"
              >
                <Download size={20} />
              </a>
              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-gray-600 hover:text-gray-800"
                title="Open in new tab"
              >
                <ExternalLink size={20} />
              </a>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-gray-600 hover:text-gray-800"
                aria-label="Close preview"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Video Player */}
          <div className="flex-1 relative bg-black">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-white">Loading Video...</p>
                </div>
              </div>
            )}
            <video
              src={videoUrl}
              controls
              autoPlay
              className="w-full h-full"
              onLoadedData={() => setLoading(false)}
              style={{ objectFit: 'contain' }}
            >
              Your browser does not support the video tag.
            </video>
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
  title: PropTypes.string
}

export default VideoPreviewModal
