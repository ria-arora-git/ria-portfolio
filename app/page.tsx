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
import { motion, useAnimation } from "framer-motion";

import ProjectCard from "../components/ProjectCard";
import { techStacks } from "../lib/constants";
import CarouselMotionWrapper from "@/components/CarouselMotionWrapper";

import { competitions } from "../lib/competitionsData";
import CompetitionCard from "@/components/CompetitionCard";
import ContactSection from "@/components/ContactSection";
import ProfilesSection from "@/components/ProfilesSection";

import { Mesh } from "three";

const Sphere = () => {
  const meshRef = useRef<Mesh | null>(null);
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

type Repo = {
  id: number;
  name: string;
  fork: boolean;
  updated_at: string;
  html_url: string;
  description?: string;
  homepage?: string;
};

export default function HomePage() {
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    fetch("https://api.github.com/users/ria-arora-git/repos?per_page=100")
      .then((res) => res.json())
      .then((data) => {
        const blacklist = [
          "ria-portfolio",
          "AI-Planet-Hackathon",
          "ria-arora-git",
          "AI-agent",
          "cars-dataset-jupiter-notebook",
          "errorm",
          "car-showcase",
          "threads-app",
          "ytmp3",
          "Youtube-Audio-Downloader",
          "MemoraAI",
          "BOND-SERVER",
          "Airbnb-website",
          "pinterest-next-app",
          "AI-room-design",
          "prisma",
          "Hospital-Locator",
          "Promptopia",
          "ACM-PYTHON-KSS",
          "Summarize-Text",
          "17oct",
          "ACM-Project-1",
          "github-acm",
          "github-session",
        ];
        const filtered = (data as Repo[])
          .filter((repo) => !repo.fork && !blacklist.includes(repo.name))
          .sort(
            (a, b) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
          );
        setRepos(filtered);
      })
      .catch((err) => {
        console.error("GitHub fetch failed:", err);
      });
  }, []);

  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 30,
        ease: "linear",
      },
    });
  }, [controls]);

  return (
    <div className="min-h-screen  text-white font-sans">
      <header className="text-xs md:text-md lg:text-lg w-full px-6 py-4 flex justify-between items-center border-b border-gray-700">
        <h1 className="lg:text-xl md:text-lg font-bold text-xs">Ria Arora</h1>
        <nav className="space-x-6">
          <Link href="#projects">Projects</Link>
          <Link href="#competitions">Competitions</Link>
          <Link href="#profiles">Profiles</Link>
          <Link href="#contact">Connect</Link>
        </nav>
      </header>

      {/* Hero Section */}
    <section className="relative h-[90vh] flex items-center justify-center px-4 sm:px-6">
  {/* 3D Canvas – hidden on small screens */}
  <Canvas
    className="absolute top-0 left-0 z-0 hidden sm:block"
    style={{
      width: "700px",
      height: "1000px",
    }}
  >
    <ambientLight intensity={0.9} />
    <pointLight position={[5, 5, 5]} />
    <Sphere />
    <OrbitControls enableZoom={false} />
  </Canvas>

  {/* Intro content */}
  <motion.div
    className="relative z-10 flex flex-col items-center text-center"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
      Hi, I&apos;m Ria 👋🏻
    </h2>
    <p className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6">
      Full‑Stack Developer | React, Next.js & AI‑ML Enthusiast
    </p>
    <motion.div
      className="flex flex-wrap justify-center gap-4 text-2xl sm:text-3xl"
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
      <section id="projects" className="px-6 py-16 overflow-hidden">
        <h2 className="text-3xl font-semibold mb-10 text-center">Projects</h2>

        <CarouselMotionWrapper>
          {[...repos, ...repos].map((repo, index) => (
            <div key={`${repo.id}-${index}`} className="min-w-[300px] px-2">
              <ProjectCard
                repo={repo}
                techStack={techStacks[repo.name] || []}
              />
            </div>
          ))}
        </CarouselMotionWrapper>
      </section>

      {/* 🏆 Competitions & Certificates Section */}
      <section id="competitions" className="px-6 py-16 ">
        <h2 className="text-3xl font-semibold mb-10 text-center">
          Competitions & Certificates
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {competitions.map((comp, i) => (
            <CompetitionCard key={i} comp={comp} index={i} />
          ))}
        </div>
      </section>

      {/* Coding Profiles Section */}
      <ProfilesSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="w-full py-6 text-center border-t border-gray-700 text-gray-400">
         Made with lots of love and three.js 💖
      </footer>
    </div>
  );
}
