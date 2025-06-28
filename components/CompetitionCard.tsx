
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaCertificate } from "react-icons/fa";
import ModalImage from "./ModalImage";
import { Competition } from "../lib/competitionsData";

export default function CompetitionCard({ comp, index }: { comp: Competition; index: number }) {
  const [open, setOpen] = useState(false);
  const hasCert = !!comp?.certificateThumb;

  return (
    <>
      <motion.div
        className="relative cursor-pointer rounded-2xl p-6"
        initial={false}
        whileHover="hover"
        style={{ perspective: 800 }}
        onClick={() => hasCert && setOpen(true)}
      >
        <motion.div
          variants={{ hover: { boxShadow: "0 0 20px rgba(0,255,255,0.5)" }, initial: {} }}
          className="absolute inset-0 bg-cyan-400/10 rounded-2xl pointer-events-none"
        />
        <motion.div
          className="relative bg-[#111827] rounded-2xl shadow-lg p-6"
          variants={{
            hover: { scale: 1.05, y: -8, rotateZ: comp.name.length % 2 ? 2 : -2 },
            initial: {},
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <h3 className="text-2xl font-bold text-white mb-2">{comp.name}</h3>
          <p className="text-gray-300 mb-1">{comp.institution}</p>
          {comp.date && <p className="text-sm text-cyan-400 mb-3">{comp.date}</p>}
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
