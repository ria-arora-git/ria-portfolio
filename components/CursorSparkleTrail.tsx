"use client";
import * as THREE from "three";
import { useRef, useEffect } from "react";

export default function CursorSparkleTrail() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sparkleCount = 100;

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    container.appendChild(renderer.domElement);

    const sparklePositions = new Float32Array(sparkleCount * 3);
    const sparkleOpacities = new Float32Array(sparkleCount);
    const sparkleLifetimes = new Array<number>(sparkleCount).fill(0);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(sparklePositions, 3)
    );
    geometry.setAttribute(
      "aOpacity",
      new THREE.BufferAttribute(sparkleOpacities, 1)
    );

    const textureLoader = new THREE.TextureLoader();
    const sparkleTexture = textureLoader.load("/sparkle.webp");

    const material = new THREE.ShaderMaterial({
      uniforms: {
        pointTexture: { value: sparkleTexture },
      },
      vertexShader: `
        attribute float aOpacity;
        varying float vOpacity;
        void main() {
          vOpacity = aOpacity;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 128.0 * (1.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D pointTexture;
        varying float vOpacity;
        void main() {
          gl_FragColor = vec4(1.0, 1.0, 1.0, vOpacity) * texture2D(pointTexture, gl_PointCoord);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
    });

    const sparkleSystem = new THREE.Points(geometry, material);
    scene.add(sparkleSystem);

    const clock = new THREE.Clock();
    let sparkleIndex = 0;

    const onPointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      const vector = new THREE.Vector3(x, y, 0.5).unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      sparklePositions[sparkleIndex * 3] = pos.x;
      sparklePositions[sparkleIndex * 3 + 1] = pos.y;
      sparklePositions[sparkleIndex * 3 + 2] = pos.z;

      sparkleOpacities[sparkleIndex] = 1.0;
      sparkleLifetimes[sparkleIndex] = 1.0;

      sparkleIndex = (sparkleIndex + 1) % sparkleCount;
    };

    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();

      for (let i = 0; i < sparkleCount; i++) {
        if (sparkleLifetimes[i] > 0) {
          sparkleLifetimes[i] -= delta * 1.5;
          sparkleOpacities[i] = Math.max(sparkleLifetimes[i], 0);
        }
      }

      (sparkleSystem.geometry.attributes.aOpacity as THREE.BufferAttribute).needsUpdate = true;
      (sparkleSystem.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", handleResize);

      sparkleSystem.geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [sparkleCount]);

  return <div ref={mountRef} className="pointer-events-none fixed inset-0 z-50" />;
}
