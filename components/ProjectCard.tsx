"use client";
import { motion } from "framer-motion";

type ProjectCardProps = {
  repo: any;
  techStack?: string[];
};

const getScreenshot = (url: string) =>
  `https://image.thum.io/get/width/800/crop/768/noanimate/${url}`;

export default function ProjectCard({ repo, techStack = [] }: ProjectCardProps) {
  return (
    <motion.div
      className="group bg-[#0d152b] p-4 rounded-xl shadow-xl hover:shadow-2xl transition transform hover:scale-[1.02] flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {repo.homepage && (
        <img
          src={getScreenshot(repo.homepage)}
          alt="Live preview"
          className="w-full h-40 object-cover rounded mb-4"
        />
      )}
      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition mb-2">
        {repo.name}
      </h3>
      <p className="text-gray-300 text-sm mb-4 h-[60px] overflow-hidden">
        {repo.description || "No description available."}
      </p>
      <div className="flex flex-wrap gap-2 text-xs text-cyan-300 mb-4">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="bg-[#1e293b] px-2 py-1 rounded-full border border-cyan-700"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-auto space-x-3">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded-md"
        >
          GitHub
        </a>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1 rounded-md"
          >
            Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
}
