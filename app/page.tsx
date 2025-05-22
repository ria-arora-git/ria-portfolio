'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiHackerrank, SiLeetcode } from 'react-icons/si';
// import { AiFillStar, AiOutlineStar } from 'react-icons/ai'; 

export default function PortfolioLanding() {
  return (
    <main className="bg-gray-50 min-h-screen text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight cursor-pointer hover:text-blue-600 transition">
            Ria Arora
          </h1>
          <div className="flex space-x-8 text-gray-700 font-medium">
            <Link href="#about" className="hover:text-blue-600 transition">
              About
            </Link>
            <Link href="#projects" className="hover:text-blue-600 transition">
              Projects
            </Link>
            <Link href="#contact" className="hover:text-blue-600 transition">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="flex flex-col items-center justify-center min-h-screen px-6 pt-28 text-center bg-white"
      >
        <h2 className="text-5xl sm:text-6xl font-extrabold leading-tight max-w-4xl mb-6">
          Full Stack Developer <br /> Crafting Engaging Web Experiences
        </h2>
        <p className="text-gray-600 max-w-xl mb-8 text-lg sm:text-xl">
          I build beautiful, fast, and responsive websites using React, Next.js,
          and Tailwind CSS.
        </p>
        <Link
          href="#projects"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-semibold shadow-lg hover:bg-blue-700 transition"
        >
          View My Work
        </Link>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="max-w-5xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-10"
      >
        <div className="flex-shrink-0 w-48 h-48 rounded-full overflow-hidden shadow-lg">
          <Image
            src="/ria-linkedin.jpeg"
            alt="Profile Picture"
            width={192}
            height={192}
            className="object-cover"
          />
        </div>
        <div className="p-6 pl-16 max-w-xl">
          <h3 className="text-3xl font-bold mb-4">About Me</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            Hi, I’m Ria Arora, a passionate frontend developer focused on creating
            performant and accessible websites. With a strong foundation in React
            and modern CSS frameworks, I love turning ideas into digital realities.
            When I’m not coding, I enjoy photography and hiking.
          </p>

          {/* Social Links with Star Ratings
          <div className="space-y-4">
            {[{
              name: 'GitHub',
              icon: <FaGithub className="inline text-2xl mr-2" />,
              url: 'https://github.com/ria-arora-git',
              rating: 4,
            }, {
              name: 'LeetCode',
              icon: <SiLeetcode className="inline text-2xl mr-2" />,
              url: 'https://leetcode.com/yourusername', 
              rating: 3,
            }, {
              name: 'HackerRank',
              icon: <SiHackerrank className="inline text-2xl mr-2" />,
              url: 'https://www.hackerrank.com/yourusername',
              rating: 4,
            }].map(({ name, icon, url, rating }) => (
              <div key={name} className="flex items-center">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-700 hover:text-blue-600 transition font-semibold mr-6"
                >
                  {icon}
                  {name}
                </a>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) =>
                    i < rating ? (
                      <AiFillStar key={i} className="text-yellow-400" />
                    ) : (
                      <AiOutlineStar key={i} className="text-gray-300" />
                    )
                  )}
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-white py-20 px-6">
  <div className="max-w-7xl mx-auto">
    <h3 className="text-3xl font-bold mb-12 text-center">My Projects</h3>
    <div className="grid gap-10 md:grid-cols-3">
      {[
        {
          title: "Video Conferencing",
          description: "A real-time video conferencing app built with WebRTC and React.",
          techStack: "React, WebRTC, Node.js, Socket.io",
          repoUrl: "https://github.com/ria-arora-git/video-conferencing",
          liveUrl: "https://video-conferencing-demo-url.com",
          imageUrl: "/projects/video-conferencing.png", 
        },
        {
          title: "YouTube to MP3 Converter",
          description: "Convert YouTube videos to MP3 format with a clean UI.",
          techStack: "React, Node.js, Express, yt-dlp",
          repoUrl: "https://github.com/ria-arora-git/ytmp3",
          liveUrl: "https://ytmp3.ria.acmsscbs.in",
          imageUrl: "/projects/ytmp3.png",
        },
        {
          title: "RentoAI",
          description: "AI-powered rental platform for smart property management.",
          techStack: "React, Next.js, Python, AI/ML",
          repoUrl: "https://github.com/ria-arora-git/RentoAI",
          liveUrl: "https://rentoai-demo-url.com",
          imageUrl: "/projects/rentoai.png",
        },
        {
          title: "BOND-SERVER",
          description: "Backend server with REST APIs for social networking app.",
          techStack: "Node.js, Express, Prisma, PostgreSQL",
          repoUrl: "https://github.com/ria-arora-git/BOND-SERVER",
          liveUrl: null,
          imageUrl: "/projects/bond-server.png",
        },
        {
          title: "CBS Confession App",
          description: "Anonymous confession app with reactions and reports feature.",
          techStack: "Next.js, Prisma, Clerk, PostgreSQL",
          repoUrl: "https://github.com/ria-arora-git/CBS-Confession",
          liveUrl: "https://cbs-confession-demo-url.com",
          imageUrl: "/projects/cbs-confession.png",
        },
        {
          title: "Notes App (Django)",
          description: "Simple notes app with authentication and CRUD operations.",
          techStack: "Python, Django, SQLite",
          repoUrl: "https://github.com/ria-arora-git/notes-app-django",
          liveUrl: null,
          imageUrl: "/projects/notes-app.png",
        },
      ].map(({ title, description, techStack, repoUrl, liveUrl, imageUrl }, index) => (
        <div
          key={index}
          className="rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer flex flex-col"
        >
          {/* Project Image Placeholder */}
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <Image
              src={imageUrl}
              alt={title}
              width={400}
              height={200}
              className="object-cover w-full h-full"
            />

          </div>

          <div className="p-6 flex-grow flex flex-col justify-between">
            <div>
              <h4 className="text-xl font-semibold mb-2">{title}</h4>
              <p className="text-gray-600 mb-2">{description}</p>
              <p className="text-sm font-medium text-blue-600 mb-4">Tech Stack: {techStack}</p>
            </div>
            <div className="flex space-x-6">
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold hover:underline"
              >
                View Repo
              </a>
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 font-semibold hover:underline"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>



      {/* Contact Section */}
      <section
        id="contact"
        className="max-w-4xl mx-auto px-6 py-20 text-center"
      >
        <h3 className="text-3xl font-bold mb-8">Get In Touch</h3>
        <p className="mb-8 text-gray-700 max-w-xl mx-auto">
          Interested in working together or want to say hello? Feel free to
          reach out via email or social media.
        </p>
        <a
          href="mailto:rubycodes.dev@gmail.com"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-semibold shadow-lg hover:bg-blue-700 transition mb-8"
        >
          Email Me
        </a>
        <div className="flex justify-center space-x-8 text-3xl text-gray-600 hover:text-blue-600 transition">
          <a
            href="https://www.linkedin.com/in/ria-arora-9a91a6317/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-blue-700"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/ria-arora-git"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-gray-900"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.hackerrank.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="HackerRank"
            className="hover:text-green-600"
          >
            <SiHackerrank />
          </a>
          <a
            href="https://leetcode.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LeetCode"
            className="hover:text-yellow-600"
          >
            <SiLeetcode />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 text-center text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} Ria Arora. All rights reserved.
      </footer>
    </main>
  );
}
