"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Rocket from "./Rocket";

const socials = [
  {
    icon: <SiGmail size={40} />,
    label: "Email",
    url: "mailto:rubycode.dev@gmail.com",
  },
  {
    icon: <FaGithub size={40} />,
    label: "GitHub",
    url: "https://github.com/ria-arora-git",
  },
  {
    icon: <FaLinkedin size={40} />,
    label: "LinkedIn",
    url: "https://linkedin.com/in/ria-arora2005",
  },
];

export default function ContactSection() {
  const { ref, inView } = useInView({ threshold: 0.6, triggerOnce: false });
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (inView) setTrigger(true);
    else setTrigger(false);
  }, [inView]);

  return (
    <section
      ref={ref}
      id="contact"
      className="relative h-[60vh] w-full text-white overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <Rocket onLaunchComplete={() => {}} shouldAnimate={inView} />
        </Canvas>
      </div>

      {/* Overlay content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={trigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-cyan-400 drop-shadow-lg"
        >
          Connect with me ✨
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={trigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg mb-10 text-gray-200 text-center max-w-xl"
        >
          Reach out to collaborate, code, or inquire.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={trigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
