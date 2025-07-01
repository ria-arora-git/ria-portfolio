"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks, SiGmail } from "react-icons/si";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Rocket from "./Rocket";

const socials = [
  {
    icon: <SiGmail size={28} />,
    label: "Email",
    url: "mailto:rubycode.dev@gmail.com",
  },
  {
    icon: <FaGithub size={28} />,
    label: "GitHub",
    url: "https://github.com/ria-arora-git",
  },
  {
    icon: <FaLinkedin size={28} />,
    label: "LinkedIn",
    url: "https://linkedin.com/in/ria-arora2005",
  },
];

export default function ContactSection() {
  const [showInfo, setShowInfo] = useState(false);

  // Detect if section is in view
  const { ref, inView } = useInView({ threshold: 0.8, triggerOnce: false });

  return (
    <section
      ref={ref}
      id="contact"
      className="relative h-[60vh] w-full text-white overflow-hidden"
    >
      {/* Background Stars and Rocket */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <Rocket onLaunchComplete={() => setShowInfo(true)} shouldAnimate={inView} />
        </Canvas>
      </div>

      {/* Main Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={showInfo ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-cyan-400 drop-shadow-lg"
        >
          Let’s Connect 🚀
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={showInfo ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg mb-10 text-gray-200 text-center max-w-xl"
        >
          Reach out to collaborate, code, or inquire.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showInfo ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex gap-6 flex-wrap justify-center"
        >
          {socials.map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#111827]/80 backdrop-blur-md rounded-full p-4 text-white hover:scale-110 transition-all hover:text-cyan-300 shadow-lg"
              initial={{ y: 0 }}
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
              title={social.label}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
