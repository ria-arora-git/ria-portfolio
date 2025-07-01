// components/Rocket.tsx
"use client";

import { useRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Rocket({ onLaunchComplete }: { onLaunchComplete: () => void }) {
  const rocketRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/rocket.glb");
  const rocketY = useRef(-4);
  const launched = useRef(false);

  const smokeParticles = useMemo(() => {
    const group = new THREE.Group();
    const texture = new THREE.TextureLoader().load("/smoke.png");

    for (let i = 0; i < 60; i++) {
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(0.8, 0.8, 0.8);
      sprite.userData.age = 0;
      group.add(sprite);
    }
    return group;
  }, []);

  let smokeIndex = 0;

  useFrame(() => {
    if (rocketRef.current) {
      rocketY.current += 0.15;
      rocketRef.current.position.y = rocketY.current;
      rocketRef.current.rotation.y += 0.02;

      const smoke = smokeParticles.children[smokeIndex] as THREE.Sprite;
      smoke.position.set(0, rocketY.current - 1, 0);
      smoke.material.opacity = 0.6;
      smoke.scale.set(1, 1, 1);
      smoke.userData.age = 0;
      smokeIndex = (smokeIndex + 1) % smokeParticles.children.length;

      smokeParticles.children.forEach((sprite) => {
        sprite.userData.age += 1;
        sprite.position.y += 0.01;
        sprite.material.opacity *= 0.95;
        sprite.scale.multiplyScalar(1.01);
      });

      if (rocketY.current > 12 && !launched.current) {
        launched.current = true;
        onLaunchComplete();
      }
    }
  });

  return (
    <>
      <primitive object={scene} ref={rocketRef} scale={0.6} position={[0, rocketY.current, 0]} />
      <primitive object={smokeParticles} />
    </>
  );
}