"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Torus, Icosahedron, Octahedron } from "@react-three/drei";
import * as THREE from "three";

// Sparse particles — very subtle, soft tones
function Particles({ count = 60 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 28;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 4;
    }
    return pos;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      dummy.position.set(
        positions[i * 3] + Math.sin(t * 0.12 + i * 0.8) * 0.06,
        positions[i * 3 + 1] + Math.cos(t * 0.1 + i * 0.5) * 0.08,
        positions[i * 3 + 2]
      );
      dummy.scale.setScalar(0.02 + Math.sin(t * 0.4 + i) * 0.006);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color="#CBD1E8" transparent opacity={0.4} />
    </instancedMesh>
  );
}

// Thin orbiting rings — soft periwinkle/sage tones
function OrbitRing({ radius, speed, color, tilt = 0, z = 0 }: {
  radius: number; speed: number; color: string; tilt?: number; z?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = clock.getElapsedTime() * speed;
  });
  return (
    <Torus args={[radius, 0.006, 8, 100]} rotation={[tilt, 0, 0]} position={[0, 0, z]}>
      <meshBasicMaterial color={color} transparent opacity={0.1} />
    </Torus>
  );
}

// Small floating accent objects — frosted/ceramic materials
function FloatingAccents() {
  const items = useMemo(() => [
    { pos: [5, 2, -3] as [number,number,number], color: "#CBD1E8", type: "ico", size: 0.16, speed: 0.3 },
    { pos: [-5.5, 1.5, -3] as [number,number,number], color: "#E2E7D5", type: "oct", size: 0.14, speed: 0.25 },
    { pos: [4.5, -2.5, -4] as [number,number,number], color: "#D67E5F", type: "ico", size: 0.12, speed: 0.4 },
    { pos: [-4, -2, -3.5] as [number,number,number], color: "#E7EFFE", type: "oct", size: 0.13, speed: 0.3 },
    { pos: [6.5, 0, -5] as [number,number,number], color: "#E4E7EB", type: "ico", size: 0.1, speed: 0.2 },
    { pos: [-6, 0.5, -5] as [number,number,number], color: "#CBD1E8", type: "oct", size: 0.09, speed: 0.22 },
  ], []);

  return (
    <>
      {items.map((item, i) => (
        <Float key={i} speed={item.speed * 2.5} floatIntensity={0.5} rotationIntensity={0.3}>
          <group position={item.pos}>
            {item.type === "ico" ? (
              <Icosahedron args={[item.size, 0]}>
                <meshStandardMaterial
                  color={item.color}
                  emissive={item.color}
                  emissiveIntensity={0.1}
                  metalness={0.1}
                  roughness={0.8}
                  wireframe={i % 2 === 0}
                />
              </Icosahedron>
            ) : (
              <Octahedron args={[item.size, 0]}>
                <meshStandardMaterial
                  color={item.color}
                  emissive={item.color}
                  emissiveIntensity={0.1}
                  metalness={0.1}
                  roughness={0.8}
                />
              </Octahedron>
            )}
          </group>
        </Float>
      ))}
    </>
  );
}

// Camera subtly follows mouse
function CameraRig() {
  useFrame(({ camera: cam, mouse }) => {
    cam.position.x += (mouse.x * 0.8 - cam.position.x) * 0.02;
    cam.position.y += (mouse.y * 0.5 - cam.position.y) * 0.02;
    cam.lookAt(0, 0, 0);
  });
  return null;
}

export function BuildersUniverse() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 52 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        aria-hidden="true"
      >
        {/* Soft, warm ambient lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[8, 6, 4]} intensity={0.5} color="#E7EFFE" />
        <pointLight position={[-6, -4, -2]} intensity={0.3} color="#E2E7D5" />

        <Suspense fallback={null}>
          <CameraRig />
          {/* Rings — subtle periwinkle/sage tones */}
          <OrbitRing radius={2.2} speed={0.15} color="#CBD1E8" tilt={0.4} z={-3} />
          <OrbitRing radius={3.2} speed={-0.08} color="#E2E7D5" tilt={1.3} z={-4} />
          <OrbitRing radius={4.1} speed={0.05} color="#E4E7EB" tilt={0.8} z={-5} />
          <FloatingAccents />
          <Particles count={50} />
        </Suspense>
      </Canvas>
    </div>
  );
}
