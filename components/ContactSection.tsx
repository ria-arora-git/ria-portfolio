"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Rocket from "./Rocket";
import { FaGithub, FaLinkedin, FaHackerrank } from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";

const socials = [
  {
    icon: <FaGithub size={28} />,
    label: "GitHub",
    url: "https://github.com/ria-arora-git",
  },
  {
    icon: <FaLinkedin size={28} />,
    label: "LinkedIn",
    url: "https://linkedin.com/in/ria-arora-git",
  },
  {
    icon: <FaHackerrank size={28} />,
    label: "HackerRank",
    url: "https://www.hackerrank.com/rubycode_dev",
  },
  {
    icon: <SiLeetcode size={28} />,
    label: "LeetCode",
    url: "https://leetcode.com/ria-arora-git",
  },
  {
    icon: <SiGeeksforgeeks size={28} />,
    label: "GeeksforGeeks",
    url: "https://auth.geeksforgeeks.org/user/ria-arora-git",
  },
];

export default function ContactSection() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    // Starfield
    const starGeo = new THREE.BufferGeometry();
    const starCount = 1000;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 2000;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      stars.rotation.y += 0.0008;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section id="contact" className="relative h-screen w-full overflow-hidden text-white">
      {/* Star background */}
      <div ref={mountRef} className="absolute top-0 left-0 w-full h-full z-0" />

      {/* Rocket launch */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} className="absolute bottom-0 left-0 w-full h-full z-10">
  <Rocket onLaunchComplete={() => setShowInfo(true)} />
</Canvas>

      </div>

      {/* Contact content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={showInfo ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative z-10 h-full flex flex-col justify-center items-center px-6"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-cyan-400 drop-shadow-lg">
          Let’s Connect 🚀
        </h2>
        <p className="text-lg mb-10 text-gray-200">Reach out to collaborate, code, or chat.</p>
        <p className="text-gray-300 mb-8 text-center">
          Email:{" "}
          <a
            href="mailto:rubycode.dev@gmail.com"
            className="text-cyan-400 underline hover:text-cyan-300"
          >
            rubycode.dev@gmail.com
          </a>
        </p>

        {/* Floating Social Icons */}
        <div className="flex gap-6 flex-wrap justify-center">
          {socials.map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#111827]/80 backdrop-blur-md rounded-full p-4 text-white hover:scale-110 transition-all hover:text-cyan-300 shadow-lg"
              initial={{ y: 0 }}
              animate={{ y: [0, -5, 0] }}
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
        </div>
      </motion.div>
    </section>
  );
}
