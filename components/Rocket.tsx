"use client";
import { useRef, useMemo } from "react";
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
  const rocketX = useRef(-12);
  const launched = useRef(false);

  const smokeParticles = useMemo(() => {
    const group = new THREE.Group();
    const texture = new THREE.TextureLoader().load("/smoke.web");

    for (let i = 0; i < 40; i++) {
      const mat = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0, depthWrite: false });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.set(0.8, 0.8, 0.8);
      sprite.userData.age = 0;
      group.add(sprite);
    }
    return group;
  }, []);

  let smokeIndex = 0;

  useFrame(() => {
    if (!shouldAnimate) return;

    if (rocketRef.current) {
      rocketX.current += 0.2;
      rocketRef.current.position.x = rocketX.current;
      rocketRef.current.rotation.z += 0.01;

      const smoke = smokeParticles.children[smokeIndex] as THREE.Sprite;
      smoke.position.set(rocketX.current - 0.5, rocketRef.current.position.y, 0);
      smoke.material.opacity = 0.4;
      smoke.userData.age = 0;
      smokeIndex = (smokeIndex + 1) % smokeParticles.children.length;

      smokeParticles.children.forEach((sprite) => {
        (sprite as THREE.Sprite).userData.age += 1;
        sprite.position.x -= 0.01;
        (sprite.material as THREE.SpriteMaterial).opacity *= 0.9;
      });

      if (rocketX.current > 0.9 && !launched.current) {
        launched.current = true;
        onLaunchComplete();
      }
    }
  });

  return (
  <>
    <ambientLight intensity={0.5} />
    <directionalLight position={[5,5,5]} intensity={1} />
    <group rotation={[0, -Math.PI / 4, 0]}>
      <primitive object={scene} ref={rocketRef} scale={1} position={[rocketX.current, 0, 0]} />
    </group>
    <primitive object={smokeParticles} />
  </>
);

}
