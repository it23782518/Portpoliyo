import { motion } from 'framer-motion'
import RoboticSectionTitle from '../components/RoboticSectionTitle'
import RobotDecorator from '../components/RobotDecorator'
import PropTypes from 'prop-types'

const PublicationsSection = ({ theme, roboticMode }) => {
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
    <section id="publications" className={`py-20 px-4 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'} transition-colors duration-300 relative`}>
      {roboticMode && <RobotDecorator type="digital-rain" />}
      <div className="container mx-auto relative z-10">
        <RoboticSectionTitle>
          My Publications
        </RoboticSectionTitle>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Publication Items */}
          {[
            {
              title: "Advancing Agriculture: A Review of UAV Technologies and Their Impact on Sustainable Farming",
              desc: "This publication presents a comprehensive review of Unmanned Aerial Vehicle (UAV) technologies and their transformative impact on sustainable agriculture. The study explores applications in precision farming and evaluates UAV platforms, sensor integrations, and data analysis techniques.",
              journal: "2025 International Research Conference on Smart Computing and Systems Engineering (SCSE)",
              link: "https://ieeexplore.ieee.org/document/11031065"
            },
            {
              title: "Architecture of AI Accelerators                                                        ",
              
              desc: "This article reviews the state of the art in AI accelerator architectures, focusing on core components like TPUs, GPUs, FPGAs, and custom ASICs. It explores architectural principles, challenges, and emerging technologies like neuromorphic computing.",
              journal: "Researchgate, January 2025",
              link: "https://www.researchgate.net/publication/388498081_Architecture_of_AI_Accelerators"
            }
          ].map((pub, index) => (
            <motion.div 
              key={index}
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.02,
                boxShadow: theme === 'dark' 
                  ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1)'
                  : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
              }}
              className={`p-6 rounded-lg shadow-md relative ${
                theme === 'dark' ? 'bg-slate-900' : 'bg-white'
              } ${roboticMode ? 'pulse-animation academic-glow border border-blue-500' : ''}`}
            >
              {roboticMode && (
                <>
                  <div className="citation-top-left"></div>
                  <div className="citation-top-right"></div>
                  <div className="citation-bottom-left"></div>
                  <div className="citation-bottom-right"></div>
                  <div className="pulse-effect"></div>
                  <div className="highlight-line"></div>
                  <div className="citation-markers"></div>
                  <div className="citation-indicator">
                    <span className="dot"></span>
                    <span>ANALYZING RESEARCH</span>
                  </div>
                </>
              )}
              <h3 className={`text-xl font-bold mb-3 ${
                theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'
              }`}>
                {pub.title}
              </h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                {pub.desc}
              </p>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {pub.journal}
                </span>
                <motion.a 
                  href={pub.link} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm ${
                    theme === 'dark' 
                      ? 'text-cyan-400 hover:text-cyan-300' 
                      : 'text-blue-500 hover:text-blue-700'
                  } flex items-center gap-1`}
                  whileHover={{ x: 5 }}
                >
                  Read Paper
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

PublicationsSection.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
  roboticMode: PropTypes.bool.isRequired,
}

export default PublicationsSection