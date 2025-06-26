"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  FaReact,
  FaNodeJs,
  FaJs,
  FaCss3Alt,
  FaHtml5,
  FaCube,
} from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss } from "react-icons/si";
import Link from "next/link";
import { motion } from "framer-motion";

import ProjectCard from "../components/ProjectCard";
import { techStacks } from "../lib/constants";

const Sphere = () => {
  const meshRef = useRef<any>();
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} scale={[1.5, 1.5, 1.5]}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial color="#00bcd4" wireframe />
    </mesh>
  );
};

export default function HomePage() {
  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://api.github.com/users/ria-arora-git/repos")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data
          .filter((repo: any) =>
            [
              "ytmp3-frontend",
              "CBS-Confession",
              "truth-and-dare",
              "video-conferencing",
              "notes-app-django",
              "Scoop-Schools",
              "RentoAI",
              "To-do-App",
              "Travel-booking-website",
              "Space-Exploration",
              "Summarize-Text",
              "Advice-Generator",
              "Weather-App"
            ].includes(repo.name)
          )

          .sort(
            (a: any, b: any) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
          );
        setRepos(filtered);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0f29] to-black text-white font-sans">
      <header className="w-full px-6 py-4 flex justify-between items-center border-b border-gray-700">
        <h1 className="text-xl font-bold">Ria Arora</h1>
        <nav className="space-x-6">
          <Link href="#projects">Projects</Link>
          <Link href="#competitions">Competitions</Link>
          <Link href="#contact">Contact</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center">
        <Canvas
          className="absolute top-0 left-0 z-0"
          style={{ width: "700px", height: "1000px" }}
        >
          <ambientLight intensity={0.7} />
          <pointLight position={[5, 5, 5]} />
          <Sphere />
          <OrbitControls enableZoom={false} />
        </Canvas>

        <motion.div
          className="z-10 text-center pr-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Hi, I'm Ria 👋
          </h2>
          <p className="text-xl md:text-2xl mb-6">
            Full Stack Developer | React, Next.js & AI Enthusiast
          </p>
          <motion.div
            className="flex flex-wrap justify-center gap-4 text-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <FaHtml5 title="HTML5" />
            <FaCss3Alt title="CSS3" />
            <FaJs title="JavaScript" />
            <SiTypescript title="TypeScript" />
            <FaReact title="React" />
            <SiNextdotjs title="Next.js" />
            <SiTailwindcss title="Tailwind CSS" />
            <FaCube title="Three.js" />
            <FaNodeJs title="Node.js" />
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Section */}
      {/* Projects Section */}
<section id="projects" className="px-6 py-16 overflow-hidden">
  <h2 className="text-3xl font-semibold mb-10 text-center">Projects</h2>
  
  <motion.div
    className="flex gap-6 w-max"
    animate={{ x: ["0%", "-50%"] }}
    transition={{
      repeat: Infinity,
      repeatType: "loop",
      duration: 30,
      ease: "linear",
    }}
  >
    {[...repos, ...repos].map((repo, index) => (
      <div key={`${repo.id}-${index}`} className="min-w-[300px]">
        <ProjectCard repo={repo} techStack={techStacks[repo.name] || []} />
      </div>
    ))}
  </motion.div>
</section>


      {/* Competitions Section */}
      <section id="competitions" className="px-6 py-16 bg-[#0a0f29]">
        <h2 className="text-3xl font-semibold mb-10 text-center">
          Competitions & Achievements
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            className="bg-[#111827] p-6 rounded-lg shadow"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold">Achievements</h3>
            <ul className="list-disc ml-6 mt-2 text-gray-300">
              <li>Rechersion’24 (Rank 12) – NITK Surathkal – Dec 2024</li>
              <li>CryptAI (Top 20) – DTU, New Delhi – Feb 2025</li>
            </ul>
          </motion.div>
          <motion.div
            className="bg-[#111827] p-6 rounded-lg shadow"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold">Participation</h3>
            <ul className="list-disc ml-6 mt-2 text-gray-300">
              <li>Code Kshetra 2.0 – JIMS</li>
              <li>Empower Hackathon – IIMA x Ashoka</li>
              <li>Hack&Chill2.0 – GDGC ADIPS</li>
              <li>Error 404 – DTU, New Delhi</li>
              <li>Tom Riddle's Trials – IIIT Naya Raipur</li>
              <li>Excelerate: FIC Edition – Kirori Mal College</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-16">
        <h2 className="text-3xl font-semibold mb-10 text-center">Contact Me</h2>
        <div className="text-center">
          <p className="text-gray-300 mb-4">
            Email:{" "}
            <a href="mailto:ria.arora@example.com" className="underline">
              rubycode.dev@gmail.com
            </a>
          </p>
          <p className="text-gray-300">
            GitHub:{" "}
            <a href="https://github.com/ria-arora-git" className="underline">
              ria-arora-git
            </a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 text-center border-t border-gray-700 text-gray-400">
        © 2025 Ria Arora. All rights reserved.
      </footer>
    </div>
  );
}
