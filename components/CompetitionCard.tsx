"use client";
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaCertificate } from "react-icons/fa";
import ModalImage from "./ModalImage";
import { Competition } from "../lib/competitionsData";

export default function CompetitionCard({
  comp,
  index,
}: {
  comp: Competition;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const hasCert = !!comp?.certificateThumb;

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <>
      <motion.div
        ref={ref}
        className="relative cursor-pointer rounded-2xl p-6"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.6,
              delay: index * 0.1, 
              ease: "easeOut",
            },
          },
        }}
        style={{ perspective: 800 }}
        whileHover="hover"
        onClick={() => hasCert && setOpen(true)}
      >
        <motion.div
          variants={{
            hover: {
              boxShadow: "0 0 25px rgba(255,255,255,0.9)",
            },
          }}
          className="absolute inset-0 bg-blue-300/30 rounded-2xl pointer-events-none"
        />

        <motion.div
          className="relative bg-[#111827] rounded-2xl shadow-lg p-6"
          variants={{
            hover: { scale: 1.05, y: 5 },
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <h3 className="text-2xl font-bold text-white mb-2">{comp.name}</h3>
          <p className="text-gray-300 mb-1">{comp.institution}</p>
          {comp.date && (
            <p className="text-sm text-cyan-400 mb-3">{comp.date}</p>
          )}
          {hasCert && (
            <motion.div
              initial={{ y: 0 }}
              whileHover={{ y: -2 }}
              className="inline-flex items-center text-sm bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-2 rounded-full"
            >
              <FaCertificate className="mr-2" />
              View Certificate
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {hasCert && (
        <ModalImage
          src={comp.certificateThumb!}
          alt={`${comp.name} certificate`}
          isOpen={open}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
