"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";

/** Parametric heart outline, normalised to roughly [-1,1]. */
function heartShape(scale = 1) {
  const pts: THREE.Vector2[] = [];
  const n = 120;
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    pts.push(new THREE.Vector2((x / 17) * scale, (y / 17) * scale));
  }
  return new THREE.Shape(pts);
}

function useHeartGeometry(scale: number, depth: number, bevel: number) {
  return useMemo(() => {
    const g = new THREE.ExtrudeGeometry(heartShape(scale), {
      depth,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 10,
      curveSegments: 72,
    });
    g.center();
    return g;
  }, [scale, depth, bevel]);
}

function Plates({ side }: { side: 1 | -1 }) {
  // Stacked plates echoing the barbell in the logo: graded sizes, brushed steel
  const plates = [
    { x: 1.95, r: 0.78, w: 0.2 },
    { x: 2.17, r: 0.72, w: 0.18 },
    { x: 2.37, r: 0.66, w: 0.16 },
    { x: 2.55, r: 0.6, w: 0.15 },
    { x: 2.71, r: 0.54, w: 0.14 },
  ];
  return (
    <group scale={[side, 1, 1]}>
      {plates.map((p, i) => (
        <mesh key={i} position={[p.x, 0.12, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[p.r, p.r, p.w, 64]} />
          <meshStandardMaterial color="#c9ced3" metalness={1} roughness={0.28} envMapIntensity={1.1} />
        </mesh>
      ))}
    </group>
  );
}

function Sculpture({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const outer = useHeartGeometry(1.5, 0.55, 0.14);
  const inner = useHeartGeometry(0.98, 0.5, 0.1);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const p = pointer.current ?? { x: 0, y: 0 };
    const t = state.clock.elapsedTime;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, p.x * 0.55 + Math.sin(t * 0.35) * 0.25, 3, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -p.y * 0.25, 3, dt);
  });

  return (
    <group ref={group}>
      <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.5}>
        {/* barbell bar passes behind the heart */}
        <mesh position={[0, 0.12, -0.05]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.045, 0.045, 5.6, 32]} />
          <meshStandardMaterial color="#aeb4ba" metalness={1} roughness={0.2} />
        </mesh>
        <Plates side={1} />
        <Plates side={-1} />

        {/* steel shell */}
        <mesh geometry={outer} position={[0, 0, 0]}>
          <meshPhysicalMaterial
            color="#e6e9ec"
            metalness={0.9}
            roughness={0.22}
            clearcoat={0.6}
            clearcoatRoughness={0.2}
            envMapIntensity={1.35}
          />
        </mesh>
        {/* red heart core */}
        <mesh geometry={inner} position={[0.02, -0.04, 0.34]}>
          <meshPhysicalMaterial
            color="#e51f2b"
            emissive="#a90f1b"
            emissiveIntensity={0.55}
            metalness={0.35}
            roughness={0.22}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
      </Float>
    </group>
  );
}

function Studio() {
  // Self-contained studio lighting: no external HDR download.
  return (
    <Environment resolution={256} frames={1}>
      <color attach="background" args={["#08090b"]} />
      <Lightformer form="rect" intensity={6} position={[-4, 3, 4]} scale={[10, 3, 1]} color="#ffffff" />
      <Lightformer form="rect" intensity={4} position={[0, 6, 2]} scale={[14, 3, 1]} color="#dfe3e7" />
      <Lightformer form="rect" intensity={3.5} position={[5, 0, 3]} scale={[2.5, 7, 1]} color="#e51f2b" />
      <Lightformer form="rect" intensity={3} position={[-6, -1, 2]} scale={[2, 8, 1]} color="#ffffff" />
      <Lightformer form="rect" intensity={2.4} position={[0, -4, 3]} scale={[12, 1.6, 1]} color="#aeb4ba" />
      <Lightformer form="ring" intensity={2} position={[0, 2, -4]} scale={5} color="#ffffff" />
    </Environment>
  );
}

export default function HeartScene({
  active,
  pointer,
}: {
  active: boolean;
  pointer: React.RefObject<{ x: number; y: number }>;
}) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 10.5], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[3.5, 1.5, 3]} intensity={18} color="#e51f2b" distance={14} />
      <spotLight position={[-5, 5, 5]} angle={0.4} penumbra={1} intensity={60} color="#ffffff" />
      <Studio />
      <Sculpture pointer={pointer} />
    </Canvas>
  );
}
