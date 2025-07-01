"use client";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

function RocketModel({ onLaunchComplete }: { onLaunchComplete: () => void }) {
  const ref = useRef<THREE.Object3D>(null);
  const { scene } = useGLTF("/rocket.glb");

  const smokeParticles = useRef<THREE.Points | null>(null);
  const smokeGeometry = new THREE.BufferGeometry();
  const smokeCount = 200;
  const smokePositions = new Float32Array(smokeCount * 3);

  for (let i = 0; i < smokeCount * 3; i++) {
    smokePositions[i] = (Math.random() - 0.5) * 0.2;
  }

  smokeGeometry.setAttribute("position", new THREE.BufferAttribute(smokePositions, 3));

  const smokeMaterial = new THREE.PointsMaterial({
    color: 0x888888,
    size: 0.2,
    transparent: true,
    opacity: 0.5,
  });

  const [startTime] = useState(() => Date.now());
  const [launched, setLaunched] = useState(false);

  useFrame(() => {
    if (ref.current) {
      const elapsed = (Date.now() - startTime) / 1000;

      // Move the rocket
      ref.current.position.y += 0.03;
      ref.current.rotation.y += 0.01;

      // Smoke follows rocket
      if (smokeParticles.current) {
        smokeParticles.current.position.y = ref.current.position.y - 1.5;
      }

      // Trigger contact appearance
      if (elapsed > 5 && !launched) {
        setLaunched(true);
        onLaunchComplete();
      }
    }
  });

  return (
    <>
      <primitive ref={ref} object={scene} scale={0.5} position={[0, -3, 0]} />
      <points ref={smokeParticles} geometry={smokeGeometry} material={smokeMaterial} />
    </>
  );
}

export default function RocketWithSmoke({
  onLaunchComplete,
}: {
  onLaunchComplete: () => void;
}) {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <ambientLight />
      <directionalLight position={[0, 10, 5]} intensity={2} />
      <RocketModel onLaunchComplete={onLaunchComplete} />
    </Canvas>
  );
}
