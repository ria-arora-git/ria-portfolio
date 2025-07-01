"use client";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Rocket from "./Rocket";

const socials = [
  {
    icon: <SiGmail size={36} />,
    url: "mailto:rubycode.dev@gmail.com",
    label: "Email",
  },
  {
    icon: <FaGithub size={36} />,
    url: "https://github.com/ria-arora-git",
    label: "GitHub",
  },
  {
    icon: <FaLinkedin size={36} />,
    url: "https://linkedin.com/in/ria-arora2005",
    label: "LinkedIn",
  },
];

export default function ContactSection() {
  const [show, setShow] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <footer
      ref={ref}
      className="relative bg-gradient-to-b from-black to-[#111827] text-white py-14 overflow-hidden flex items-center justify-center"
    >
      {/* Rocket Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [1, 5, 10], fov: 45 }}>
          <ambientLight intensity={0.9} />
          <Rocket
            onLaunchComplete={() => setShow(true)}
            shouldAnimate={inView}
          />
        </Canvas>
      </div>

      {/* Three Left-Aligned Sections */}
      <div className="relative z-10 max-w-6xl flex flex-col md:flex-row flex-1">
        {/* 1. Quote Section */}
        <motion.div
          className="w-full md:w-1/3 mr-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <blockquote className="italic text-gray-300 border-l-4 border-cyan-500 pl-4 text-lg w-80">
            “Programming isn’t about what you know; it’s about what you can
            figure out.”
          </blockquote>
        </motion.div>

        {/* 3. Quick Links Section */}
        <motion.div
          className="w-full md:w-1/3 flex flex-col items-center space-y-2 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <h3 className="text-2xl font-semibold text-gray-200">Quick Links</h3>
          <ul className="text-gray-400 space-y-2 flex flex-col items-center">
            {["Projects", "Competitions", "Coding Profiles", "Contact"].map(
              (sec) => (
                <li key={sec} className="hover:text-white transition-colors">
                  <a href={`#${sec.toLowerCase().replace(/\s/g, "")}`}>{sec}</a>
                </li>
              )
            )}
          </ul>
        </motion.div>

        {/* 3. Connect Section */}
        <motion.div
          className="w-full md:w-1/3 flex flex-col space-y-4 text-right align-right items-end"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={show ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold text-cyan-400 text-center items-center align-center pb-3">
            Connect with me ✨
          </h3>
          <div className="flex gap-8">
            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.url}
                target="_blank"
                className="bg-[#22272e]/70 backdrop-blur-md p-4 rounded-full shadow-lg"
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                title={s.label}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
