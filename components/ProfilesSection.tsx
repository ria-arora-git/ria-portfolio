"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const profileCards = [
  {
    title: "HackerRank",
    color: "text-cyan-400",
    hoverShadow: "hover:shadow-cyan-500/40",
    link: "https://www.hackerrank.com/ria232014",
    img: "/badges.webp",
    description: "Check out my HackerRank profile",
  },
  {
    title: "LeetCode",
    color: "text-yellow-400",
    hoverShadow: "hover:shadow-yellow-500/40",
    link: "https://leetcode.com/ria-arora",
    img: "https://leetcard.jacoblin.cool/ria-arora?theme=dark&font=Baloo+2",
    description: "My LeetCode problem stats",
  },
  {
    title: "GitHub",
    color: "text-white",
    hoverShadow: "hover:shadow-white/40",
    link: "https://github.com/ria-arora-git",
    img: "https://github-readme-stats.vercel.app/api?username=ria-arora-git&show_icons=true&theme=radical&hide_title=true&count_private=true",
    description: "View my GitHub contributions",
  },
];

export default function ProfilesSection() {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.3 });

  return (
    <section id="profiles" className="px-6 py-16 text-white" ref={ref}>
      <h2 className="text-3xl font-semibold mb-14 text-center text-cyan-400">
        Coding Profiles 🧠
      </h2>

      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center"
      >
        {profileCards.map((card) => (
          <div
            key={card.title}
            className={`bg-[#111827] p-6 rounded-xl shadow-md ${card.hoverShadow} transition-all hover:scale-105`}
          >
            <h3 className={`text-xl font-bold mb-4 ${card.color}`}>
              {card.title}
            </h3>
            <a href={card.link} target="_blank" rel="noopener noreferrer">
              <img
                src={card.img}
                alt={`${card.title} Stats`}
                className="w-full h-32 object-contain mx-auto mb-3 rounded"
              />
              <p className="text-sm text-gray-300">{card.description}</p>
            </a>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
