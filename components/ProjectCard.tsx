"use client";
import { motion } from "framer-motion";
import { projectMeta } from "../lib/projectMeta";

type ProjectCardProps = {
  repo: any;
  techStack?: string[];
};

export default function ProjectCard({ repo, techStack = [] }: ProjectCardProps) {
  const meta = projectMeta[repo.name];
  const screenshot = meta?.image;

  return (
    <motion.div
      className="group bg-[#0d152b] p-4 rounded-xl shadow-xl hover:shadow-2xl transition transform hover:scale-[1.02] flex flex-col w-[320px] h-[420px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {screenshot && (
        <img
          src={screenshot}
          alt={`${repo.name} preview`}
          className="w-full h-40 object-cover rounded mb-4"
        />
      )}

      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition mb-2 truncate">
        {repo.name}
      </h3>

      <p className="text-gray-300 text-sm mb-4 overflow-hidden line-clamp-3">
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
