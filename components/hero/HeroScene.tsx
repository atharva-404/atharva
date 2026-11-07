"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { heroPointer } from "./pointer";

const ORANGE = "#ff6b35";
const LIME = "#b6f36b";

/** Faceted metallic core wrapped in a neural-network style wireframe. */
function Core() {
  const group = useRef<THREE.Group>(null!);
  const shell = useMemo(() => new THREE.IcosahedronGeometry(1.34, 1), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(shell), [shell]);

  useEffect(() => () => {
    shell.dispose();
    edges.dispose();
  }, [shell, edges]);

  useFrame((state, delta) => {
    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.18;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[0.96, 2]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.75} roughness={0.32} flatShading />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.16} />
      </lineSegments>
      <points geometry={shell}>
        <pointsMaterial color={ORANGE} size={0.05} sizeAttenuation transparent opacity={0.95} />
      </points>
    </group>
  );
}

interface OrbitProps {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  color: string;
  trail: number;
}

/** Thin orbital ring with a moving light trail and a satellite at its head. */
function Orbit({ radius, tilt, speed, color, trail }: OrbitProps) {
  const spinner = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    spinner.current.rotation.z += delta * speed;
  });

  return (
    <group rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.004, 6, 180]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.12} />
      </mesh>
      <group ref={spinner}>
        <mesh>
          <torusGeometry args={[radius, 0.011, 6, 72, trail]} />
          <meshBasicMaterial color={color} transparent opacity={0.75} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh position={[Math.cos(trail) * radius, Math.sin(trail) * radius, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>
    </group>
  );
}

function Particles({ count = 420 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const geometry = useMemo(() => {
    // Deterministic pseudo-random spread so every load looks the same.
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.1 + rand() * 1.8;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    ref.current.rotation.y -= delta * 0.02;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial color="#ffffff" size={0.014} sizeAttenuation transparent opacity={0.45} depthWrite={false} />
    </points>
  );
}

/** Eases the whole composition toward the pointer for a gentle parallax. */
function Rig({ children }: { children: ReactNode }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    const k = 1 - Math.exp(-delta * 2.5);
    ref.current.rotation.y += (heroPointer.x * 0.35 - ref.current.rotation.y) * k;
    ref.current.rotation.x += (-heroPointer.y * 0.22 - ref.current.rotation.x) * k;
  });
  return (
    <group ref={ref} position={[0.72, 0.62, 0]}>
      {children}
    </group>
  );
}

export default function HeroScene({ onReady }: { onReady?: () => void }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Stop rendering while the hero is off screen.
  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapper} className="absolute inset-0">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 7.5], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        frameloop={visible ? "always" : "never"}
        onCreated={() => onReady?.()}
        aria-hidden="true"
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[-3, 2, 4]} intensity={2.4} color={ORANGE} />
        <pointLight position={[3, 3, 3]} intensity={28} color="#ffffff" />
        <directionalLight position={[2, -2, -3]} intensity={1.4} color={LIME} />
        <Rig>
          <Core />
          <Orbit radius={1.5} tilt={[1.15, 0.2, 0]} speed={0.45} color={ORANGE} trail={1.1} />
          <Orbit radius={1.8} tilt={[1.35, -0.45, 0.4]} speed={-0.3} color={LIME} trail={0.7} />
          <Orbit radius={2.05} tilt={[0.95, 0.6, -0.3]} speed={0.18} color={ORANGE} trail={0.5} />
          <Particles />
        </Rig>
      </Canvas>
    </div>
  );
}
