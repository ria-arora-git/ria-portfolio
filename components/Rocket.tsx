"use client";

import { useRef, useMemo, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Rocket({
  onLaunchComplete,
  shouldAnimate,
}: {
  onLaunchComplete: () => void;
  shouldAnimate: boolean;
}) {
  const rocketRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/rocket.glb");
  const rocketY = useRef(-2);
  const launched = useRef(false);

  const smokeParticles = useMemo(() => {
    const group = new THREE.Group();
    const texture = new THREE.TextureLoader().load("/smoke.webp");

    for (let i = 0; i < 60; i++) {
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(0.6, 0.6, 0.6);
      sprite.userData.age = 0;
      group.add(sprite);
    }

    return group;
  }, []);

  let smokeIndex = 0;

  useEffect(() => {
    if (shouldAnimate) {
      rocketY.current = -2;
      launched.current = false;

      smokeParticles.children.forEach((child) => {
        const sprite = child as THREE.Sprite;
        sprite.position.set(0, 0, 0);
        sprite.scale.set(0.6, 0.6, 0.6);
        (sprite.material as THREE.SpriteMaterial).opacity = 0;
        sprite.userData.age = 0;
      });
    }
  }, [shouldAnimate]);

  useFrame(() => {
    if (!shouldAnimate || !rocketRef.current) return;

    rocketY.current += 0.12;
    rocketRef.current.position.y = rocketY.current;
    rocketRef.current.rotation.y += 0.015;

    const smoke = smokeParticles.children[smokeIndex] as THREE.Sprite;
    smoke.position.set(0, rocketY.current - 1, 0);
    (smoke.material as THREE.SpriteMaterial).opacity = 0.6;
    smoke.scale.set(1, 1, 1);
    smoke.userData.age = 0;
    smokeIndex = (smokeIndex + 1) % smokeParticles.children.length;

    smokeParticles.children.forEach((sprite) => {
      const s = sprite as THREE.Sprite;
      s.userData.age += 1;
      s.position.y += 0.01;
      (s.material as THREE.SpriteMaterial).opacity *= 0.84;
      s.scale.multiplyScalar(1.01);
    });

    if (rocketY.current > 4 && !launched.current) {
      launched.current = true;
      onLaunchComplete();
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 5]} intensity={1} />
      <primitive object={scene} ref={rocketRef} scale={1.2} position={[0, rocketY.current, 0]} />
      <primitive object={smokeParticles} />
    </>
  );
}
