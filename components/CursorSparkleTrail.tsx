"use client";
import * as THREE from "three";
import { useRef, useEffect } from "react";

export default function CursorSparkleTrail() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sparkleCount = 100;

  useEffect(() => {
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let sparkleSystem: THREE.Points;
    let sparklePositions: Float32Array;
    let sparkleOpacities: Float32Array;
    let sparkleLifetimes: number[] = Array(sparkleCount).fill(0);
    let clock = new THREE.Clock();

    const pointer = new THREE.Vector2();
    const sparkleIndex = { current: 0 };

    const init = () => {
      const container = mountRef.current!;
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 10;

      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);

      // ✨ Sparkle Geometry
      const geometry = new THREE.BufferGeometry();
      sparklePositions = new Float32Array(sparkleCount * 3);
      sparkleOpacities = new Float32Array(sparkleCount);

      geometry.setAttribute("position", new THREE.BufferAttribute(sparklePositions, 3));
      geometry.setAttribute("aOpacity", new THREE.BufferAttribute(sparkleOpacities, 1));

      // ✨ Load sparkle texture
      const textureLoader = new THREE.TextureLoader();
      const sparkleTexture = textureLoader.load("/sparkle.png");

      // ✨ Shader Material for glow effect
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

      sparkleSystem = new THREE.Points(geometry, material);
      scene.add(sparkleSystem);

      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("resize", handleResize);

      animate();
    };

    const onPointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      const vector = new THREE.Vector3(x, y, 0.5).unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      const i = sparkleIndex.current;
      sparklePositions[i * 3] = pos.x;
      sparklePositions[i * 3 + 1] = pos.y;
      sparklePositions[i * 3 + 2] = pos.z;

      sparkleOpacities[i] = 1.0;
      sparkleLifetimes[i] = 1.0;

      sparkleIndex.current = (sparkleIndex.current + 1) % sparkleCount;
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

      (sparkleSystem.geometry.attributes as any).aOpacity.needsUpdate = true;
      (sparkleSystem.geometry.attributes as any).position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    init();

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="pointer-events-none fixed inset-0 z-50" />;
}
