import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import RoboticSectionTitle from '../components/RoboticSectionTitle'
import { Award, Trophy, Star, X, Eye } from 'lucide-react'

const awards = [
  {
    title: "CodeRally 6.0 – Final 24 Hour Hackathon (Intermediate Tier – 4th Place)",
    organization: "IEEE Computer Society Student Branch Chapter of IIT",
    year: "Sep 2025",
    description: "Team Enigma, consisting of Hesara Perera, Sandil Helitha Perera, Senal Galagedara and Hasith Kaushal, participated in the Final 24 Hour Hackathon of CodeRally 6.0 organized by the IEEE Computer Society Student Branch Chapter of IIT. After an intense 24 hours of coding, problem solving and teamwork, we proudly secured fourth place in the Intermediate Tier. It was a memorable experience that enhanced our creativity, collaboration and technical problem-solving skills.",
    icon: Trophy,
    color: "text-yellow-500",
    images: ["https://res.cloudinary.com/dgthdmczs/image/upload/v1767949140/CodeRally_image_1.jpg", "https://res.cloudinary.com/dgthdmczs/image/upload/v1767949183/CodeRally_image_2.jpg", "https://res.cloudinary.com/dgthdmczs/image/upload/v1767949196/CodeRally_image_3.jpg"]
  },
  {
    title: "Merit Award – Algothon Contest (Tertiary Category)",
    organization: "SLIIT CODEFEST 2025 – Faculty of Computing, Sri Lanka Institute of Information Technology",
    year: "Sep 2025",
    description: "As part of Team Engiam (members: Dilusha Chamika, Hesara Perera, Sandil Perera), received a Merit Award at the Algothon Contest under the Tertiary Category of SLIIT CODEFEST 2025, organized by the Faculty of Computing, SLIIT. Recognized for algorithmic problem-solving and teamwork.",
    icon: Trophy,
    color: "text-yellow-500",
    images: ["https://res.cloudinary.com/dgthdmczs/image/upload/v1758527652/certificates/rjpqrt1q84h8igynptbv.jpg", "https://res.cloudinary.com/dgthdmczs/image/upload/v1758527657/certificates/tkvpccbczkpti9y3aj3x.jpg"]
  },
  {
    title: "Finalist at CODEFEST 2024 – Algothon!",
    organization: "Sri Lanka Institute of Information Technology",
    year: "Jan 2025",
    description: "Excited to share that Team ENIGMA—comprising Sandil Perera, Hesara Perera, and myself—emerged as Finalists in the Algothon under the Tertiary Category at CODEFEST 2024, organized by SLIIT, Faculty of Computing. It was an incredible experience tackling complex algorithmic challenges, collaborating as a team, and pushing our problem-solving skills to the next level.",
    icon: Trophy,
    color: "text-yellow-500",
    images: ["https://res.cloudinary.com/dgthdmczs/image/upload/v1758527651/certificates/brwjacazfypkkdgmyvyj.jpg"]
  },
  {
    title: "Dean's List - Year 01 Semester 01 (3.7)",
    organization: "SLIIT",
    year: "Oct 2024",
    description: "I am pleased to announce that I have been named to the Dean's List for Semester 1, achieving a GPA of 3.7 in my Computer Science program at SLIIT. This recognition reflects my commitment to academic rigor and pursuit of excellence.",
    icon: Star,
    color: "text-yellow-500",
    images: ["https://res.cloudinary.com/dgthdmczs/image/upload/v1758527659/certificates/ecjfesadba2k8njjlfl9.jpg", "https://res.cloudinary.com/dgthdmczs/image/upload/v1758527660/certificates/wcdwwjbd7gowfn8eeris.jpg"]
  },
  {
    title: "5th Place - SliitXtreme 3.0",
    organization: "IEEE Computer Society of SLIIT",
    year: "2024",
    description: "As part of Team ENIGMA, I contributed to securing the 5th position at SLIITXtreme 3.0. This collaborative effort highlighted our team's ability to work together and solve complex coding challenges.",
    icon: Award,
    color: "text-orange-500",
    images: ["https://res.cloudinary.com/dgthdmczs/image/upload/v1758527662/certificates/pj6h4z0eyy0f09stj6bb.jpg", "https://res.cloudinary.com/dgthdmczs/image/upload/v1758527663/certificates/vpezhjyx2xt1kkphysb0.jpg", "https://res.cloudinary.com/dgthdmczs/image/upload/v1758527661/certificates/tazhyj6lmxbuql0eqsb7.jpg"]
  }
]

const AwardsSection = ({ theme, roboticMode, openImageModal }) => {
  const [currentImageIndices, setCurrentImageIndices] = useState({});
  const [currentAwardIndex, setCurrentAwardIndex] = useState(awards.length * 2); // Start in the middle for infinite scroll
  const movingRef = useRef(null)
  const [stepWidth, setStepWidth] = useState(320 + 24) // fallback: card width (320) + gap (24)
  const scrollIntervalRef = useRef(null) // Track scroll interval for resetting
  
  // Animation variants
  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Create duplicated awards for infinite scroll effect (more duplicates for smoother infinite scrolling)
  const duplicatedAwards = [...awards, ...awards, ...awards, ...awards, ...awards];

  // Initialize current image indices
  useEffect(() => {
    const initialIndices = {}
    awards.forEach((award, index) => {
      initialIndices[index] = 0
    })
    setCurrentImageIndices(initialIndices)
  }, [])

  // Auto-cycle images for awards with multiple images (slower)
  useEffect(() => {
    const intervals = {}

    awards.forEach((award, awardIndex) => {
      if (award.images.length > 1) {
        intervals[awardIndex] = setInterval(() => {
          setCurrentImageIndices(prev => ({
            ...prev,
            [awardIndex]: (prev[awardIndex] + 1) % award.images.length
          }))
        }, 3000) // Change image every 3 seconds (slower)
      }
    })

    return () => {
      Object.values(intervals).forEach(clearInterval)
    }
  }, [])

  // Auto-scroll awards in infinite circular motion (forward only) - slowed down
  useEffect(() => {
    const startAutoScroll = () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current)
      }
      scrollIntervalRef.current = setInterval(() => {
        setCurrentAwardIndex(prevIndex => {
          const nextIndex = prevIndex + 1
          // When reaching near the end of the duplicated array, reset to the middle for seamless infinite loop
          if (nextIndex >= awards.length * 4) {
            return awards.length * 2
          }
          return nextIndex
        })
      }, 7000) // Change awards every 7 seconds (slower)
    }

    startAutoScroll()
    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current)
      }
    }
  }, [])

  // Function to reset auto-scroll timer
  const resetAutoScroll = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current)
    }
    scrollIntervalRef.current = setInterval(() => {
      setCurrentAwardIndex(prevIndex => {
        const nextIndex = prevIndex + 1
        if (nextIndex >= awards.length * 4) {
          return awards.length * 2
        }
        return nextIndex
      })
    }, 7000)
  }

  // Compute step width (card width + gap) so translations align perfectly
  useEffect(() => {
    const computeStep = () => {
      try {
        const movingEl = movingRef.current
        if (!movingEl) return
        const firstChild = movingEl.querySelector(':scope > *')
        if (!firstChild) return
        const childWidth = firstChild.getBoundingClientRect().width
        // read gap from computed style (may be like '24px')
        const style = getComputedStyle(movingEl)
        const gapVal = style.gap || style.getPropertyValue('gap') || '24px'
        const gap = parseFloat(gapVal) || 24
        setStepWidth(Math.round(childWidth + gap))
      } catch (e) {
        // ignore and keep fallback
      }
    }

    computeStep()
    window.addEventListener('resize', computeStep)
    return () => window.removeEventListener('resize', computeStep)
  }, [duplicatedAwards.length])

  const handleOpenImageModal = (images, awardTitle, awardIndex) => {
    openImageModal(images, awardTitle, currentImageIndices[awardIndex] || 0)
  }

  return (
    <section id="awards" className={`py-20 px-4 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'} transition-colors duration-300 relative`}>
      <div className="container mx-auto relative z-10">
        <RoboticSectionTitle>
          Honors & Awards
        </RoboticSectionTitle>

        <div className="relative mt-10 px-4">
          {/* Left Arrow */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-gray-800/50 hover:bg-gray-800/70 text-white p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300"
            onClick={() => {
              resetAutoScroll()
              setCurrentAwardIndex(prev => {
                const newIndex = prev - 1
                if (newIndex < awards.length) {
                  return awards.length * 4 - 1 // Go to the last item in the duplicated array
                }
                return newIndex
              })
            }}
            aria-label="Previous award"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>

          {/* Right Arrow */}
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-gray-800/50 hover:bg-gray-800/70 text-white p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300"
            onClick={() => {
              resetAutoScroll()
              setCurrentAwardIndex(prev => {
                const newIndex = prev + 1
                if (newIndex >= awards.length * 4) {
                  return awards.length * 2 // Reset to middle for seamless infinite loop
                }
                return newIndex
              })
            }}
            aria-label="Next award"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>

          {/* Cards Container */}
          <motion.div
            id="awards-container"
            className="flex gap-6 overflow-hidden"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              ref={movingRef}
              className="flex gap-6"
              animate={{ x: -currentAwardIndex * stepWidth }}
              transition={{
                duration: 1.2,
                ease: "linear",
                type: "tween"
              }}
            >
              {duplicatedAwards.map((award, awardIndex) => {
                const originalIndex = awardIndex % awards.length
                const IconComponent = award.icon
                return (
                  <motion.div
                    key={`${originalIndex}-${Math.floor(awardIndex / awards.length)}`}
                    variants={fadeInUp}
                    className={`${theme === 'dark' ? 'bg-slate-700' : 'bg-white'} rounded-xl shadow-lg overflow-hidden ${roboticMode ? 'robotic-card' : ''} flex flex-col min-h-[500px] flex-shrink-0 w-80`}
                    whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)' }}
                  >
                  {/* Award Image */}
                  {award.images && award.images.length > 0 && (
                    <div className="relative h-48 overflow-hidden group flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                      <motion.img
                        key={currentImageIndices[originalIndex] || 0}
                        src={award.images[currentImageIndices[originalIndex] || 0]}
                        alt={award.title}
                        className="max-w-full max-h-full object-contain"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleOpenImageModal(award.images, award.title, originalIndex)}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>

                      {/* Image indicators for multiple images */}
                      {award.images.length > 1 && (
                        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 flex space-x-1 z-10">
                          {award.images.map((_, imgIndex) => (
                            <motion.div
                              key={imgIndex}
                              className={`w-2 h-2 rounded-full ${
                                (currentImageIndices[originalIndex] || 0) === imgIndex
                                  ? roboticMode
                                    ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50'
                                    : 'bg-white shadow-lg'
                                  : 'bg-white/50'
                              }`}
                              animate={{
                                scale: (currentImageIndices[originalIndex] || 0) === imgIndex ? 1.2 : 1,
                                opacity: (currentImageIndices[originalIndex] || 0) === imgIndex ? 1 : 0.6
                              }}
                              transition={{ duration: 0.3 }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Hover overlay with award title */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-10"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.h4
                          className={`text-sm font-semibold ${roboticMode ? 'text-cyan-300' : 'text-white'} mb-1`}
                          initial={{ y: 10, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {award.title.split(' - ')[0]}
                        </motion.h4>
                        <motion.p
                          className="text-xs text-gray-300"
                          initial={{ y: 10, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          {award.organization}
                        </motion.p>
                      </motion.div>
                    </div>
                  )}

                  <div className="p-6 flex flex-col h-full">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <span className={`text-2xl mr-2 ${award.color}`}>🏆</span>
                        <h3 className={`font-bold text-xl ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{award.title}</h3>
                      </div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                        Issued by {award.organization} · {award.year}
                      </p>
                      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-4 text-sm`}>
                        {award.description}
                      </p>
                    </div>

                    {/* View Image Button - Aligned at bottom */}
                    {award.images && award.images.length > 0 && (
                      <div className="mt-auto">
                        <motion.button
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 w-full justify-center ${
                            roboticMode
                              ? 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400/50'
                              : 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 border border-blue-500/20 hover:border-blue-400/40'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleOpenImageModal(award.images, award.title, originalIndex)}
                        >
                          <Eye size={16} />
                          View Images ({award.images.length})
                        </motion.button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
            </motion.div>
          </motion.div>

          {/* Award Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {awards.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentAwardIndex(index + awards.length * 2)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  (currentAwardIndex % awards.length) === index
                    ? roboticMode
                      ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50'
                      : 'bg-blue-500 shadow-lg shadow-blue-500/50'
                    : theme === 'dark'
                      ? 'bg-gray-600 hover:bg-gray-500'
                      : 'bg-gray-300 hover:bg-gray-400'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={(currentAwardIndex % awards.length) === index ? { scale: 1.1 } : { scale: 1 }}
                aria-label={`Go to award ${index + 1} of ${awards.length}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

AwardsSection.propTypes = {
  theme: PropTypes.string.isRequired,
  roboticMode: PropTypes.bool.isRequired,
  openImageModal: PropTypes.func.isRequired
}

export default AwardsSection