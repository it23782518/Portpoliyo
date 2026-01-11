import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import RobotDecorator from '../components/RobotDecorator'
import RobotBackgroundDecoration from '../components/RobotBackgroundDecoration'
import HumanRobotDecoration from '../components/HumanRobotDecoration'
import RoboticSectionTitle from '../components/RoboticSectionTitle'
const profileImg = 'https://res.cloudinary.com/dgthdmczs/image/upload/v1768111317/profile_pic.jpg'
const cvPdf = '/Dilusha_Chamika_CV.pdf'

const AboutSection = ({ theme, roboticMode, scrollToSection }) => {
  return (
    <section id="about" className={`py-20 px-4 ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'} transition-colors duration-300 relative overflow-hidden`}>
      {/* Circuit pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div className="circuit-bg" style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 10% 20%, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(2, 132, 199, 0.15)'} 2px, transparent 2px),
            radial-gradient(circle at 50% 70%, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(2, 132, 199, 0.15)'} 3px, transparent 3px),
            radial-gradient(circle at 80% 40%, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(2, 132, 199, 0.15)'} 2px, transparent 2px)
          `,
          backgroundSize: '40px 40px, 60px 60px, 70px 70px'
        }}></div>
        <div className="cpu-lines" style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(90deg, transparent 98%, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(2, 132, 199, 0.15)'} 98%),
            linear-gradient(0deg, transparent 98%, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(2, 132, 199, 0.15)'} 98%)
          `,
          backgroundSize: '50px 50px'
        }}></div>
        {/* CPU paths */}
        <div className="absolute left-0 right-0 h-[2px] top-1/3"
          style={{background: `linear-gradient(to right, transparent, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(2, 132, 199, 0.2)'}, transparent)`}}>
        </div>
        <div className="absolute left-0 right-0 h-[2px] top-2/3"
          style={{background: `linear-gradient(to right, transparent, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(2, 132, 199, 0.2)'}, transparent)`}}>
        </div>
        <div className="absolute top-0 bottom-0 w-[2px] left-1/4"
          style={{background: `linear-gradient(to bottom, transparent, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(2, 132, 199, 0.2)'}, transparent)`}}>
        </div>
        <div className="absolute top-0 bottom-0 w-[2px] left-3/4"
          style={{background: `linear-gradient(to bottom, transparent, ${theme === 'dark' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(2, 132, 199, 0.2)'}, transparent)`}}>
        </div>
      </div>
      {roboticMode && <RobotDecorator type="circuit" />}
      {roboticMode && <RobotBackgroundDecoration theme={theme} />}
      {roboticMode && <HumanRobotDecoration theme={theme} />}
      <div className="container mx-auto relative z-10">
        <RoboticSectionTitle>
          About Me
        </RoboticSectionTitle>
        <div className="flex flex-col md:flex-row items-center gap-10">
          <motion.div
            className="md:w-1/3"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div
              className={`relative rounded-full w-64 h-64 mx-auto overflow-hidden border-4 ${theme === 'dark' ? 'border-cyan-500/30' : 'border-blue-500/30'} p-1`}
            >
              <img
                src={profileImg}
                alt="Dilusha Chamika Profile Photo"
                className="w-full h-full object-cover rounded-full"
                width="256"
                height="256"
                fetchPriority="high"
                loading="eager"
              />

              {roboticMode && (
                <>
                  {/* Static gradient effect instead of animated scanning */}
                  <div
                    className="absolute inset-0 opacity-70"
                    style={{
                      background: 'linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.2), transparent)'
                    }}
                  />

                  {/* Robot targeting elements */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-8 h-8">
                      <div className="w-4 h-[1px] bg-cyan-400"></div>
                      <div className="w-[1px] h-4 bg-cyan-400"></div>
                    </div>
                    <div className="absolute top-0 right-0 w-8 h-8 flex justify-end">
                      <div className="w-4 h-[1px] bg-cyan-400"></div>
                      <div className="w-[1px] h-4 bg-cyan-400 ml-3"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 flex items-end">
                      <div className="w-4 h-[1px] bg-cyan-400"></div>
                      <div className="w-[1px] h-4 bg-cyan-400 -mb-3"></div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 flex items-end justify-end">
                      <div className="w-4 h-[1px] bg-cyan-400"></div>
                      <div className="w-[1px] h-4 bg-cyan-400 ml-3 -mb-3"></div>
                    </div>
                  </div>

                  {/* Static border instead of animated scanning */}
                  <div
                    className="absolute inset-0 border-2 border-cyan-400/30 rounded-full"
                  />
                </>
              )}
            </div>

            {roboticMode && (
              <div className="mt-4 text-center">
                <div className="inline-block terminal-typing text-xs">
                  HUMAN.ID:DC_01010
                </div>
              </div>
            )}
          </motion.div>
          <motion.div
            className="md:w-2/3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.p
              className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-4 text-lg`}
            >
              I&apos;m Dilusha Chamika, a Computer Systems Engineering undergraduate at SLIIT with a passion for AI, robotics, and full-stack development.
            </motion.p>

            <motion.p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
              I&apos;ve built several innovative projects connecting theory with practice, including:
            </motion.p>

            <ul className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-4 list-disc pl-6`}>
              <li className="mb-2">
                <strong>Animal Recognizer:</strong> An AI-powered image classification system that identifies 64 different animal species
              </li>
              <li className="mb-2">
                <strong>GymSync:</strong> A comprehensive gym management system with real-time equipment tracking and scheduling
              </li>
            </ul>

            <motion.p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
              With certifications from Stanford/DeepLearning.AI in Machine Learning and Cisco in Endpoint Security, plus published research on UAV technologies and AI accelerators, I&apos;m committed to creating impactful solutions that make a real difference.
            </motion.p>

            <div className="flex flex-wrap gap-4">
              <motion.a
                href={cvPdf}
                download="Dilusha_Chamika_CV.pdf"
                className={`border-2 ${theme === 'dark' ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400' : 'border-blue-500 text-blue-500 hover:bg-blue-500'} hover:text-slate-900 font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2`}
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(34, 211, 238, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download CV
              </motion.a>
              <motion.button
                onClick={() => scrollToSection('contact')}
                className={`${theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'} text-inherit font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                Contact Me
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

AboutSection.propTypes = {
  theme: PropTypes.string.isRequired,
  roboticMode: PropTypes.bool.isRequired,
  scrollToSection: PropTypes.func.isRequired
}

export default AboutSection