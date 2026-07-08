import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import styled, { useTheme as useStyledTheme } from 'styled-components';
import type { Theme } from 'react-n-design';

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: ${(p) => p.theme.colors.background};
  transition: background 0.3s ease;
  z-index: 1;
`;

interface ShapeConfig {
  type: 'box' | 'sphere' | 'torus';
  position: [number, number, number];
  scale: number;
  speed: number;
  rotSpeed: number;
  colorIndex: number;
}

const shapes: ShapeConfig[] = [
  { type: 'box', position: [-3.2, 1.2, -5], scale: 0.9, speed: 0.8, rotSpeed: 0.3, colorIndex: 0 },
  { type: 'sphere', position: [3.2, -1.2, -5.5], scale: 0.7, speed: 1.2, rotSpeed: 0.2, colorIndex: 1 },
  { type: 'torus', position: [0, 2.2, -6.5], scale: 0.85, speed: 0.6, rotSpeed: 0.4, colorIndex: 2 },
  { type: 'box', position: [2.8, 1.8, -7.5], scale: 0.6, speed: 1.0, rotSpeed: 0.35, colorIndex: 1 },
  { type: 'sphere', position: [-2.4, -2, -5.5], scale: 0.55, speed: 1.4, rotSpeed: 0.25, colorIndex: 3 },
  { type: 'torus', position: [0, -1.6, -5], scale: 0.65, speed: 0.9, rotSpeed: 0.3, colorIndex: 0 },
];

function FloatingShape({ config, colors }: { config: ShapeConfig; colors: string[] }) {
  const groupRef = useRef<THREE.Group>(null);
  const initialY = config.position[1];

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = initialY + Math.sin(t * config.speed) * 0.4;
    groupRef.current.rotation.x = t * config.rotSpeed * 0.5;
    groupRef.current.rotation.y = t * config.rotSpeed;
  });

  const color = colors[config.colorIndex % colors.length];

  return (
    <group ref={groupRef} position={config.position} scale={config.scale}>
      {config.type === 'box' && (
        <RoundedBox args={[1, 1, 1]} radius={0.15} smoothness={4}>
          <meshStandardMaterial color={color} roughness={0.25} metalness={0.15} />
        </RoundedBox>
      )}
      {config.type === 'sphere' && (
        <mesh>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial color={color} roughness={0.25} metalness={0.15} />
        </mesh>
      )}
      {config.type === 'torus' && (
        <mesh>
          <torusGeometry args={[0.5, 0.18, 16, 48]} />
          <meshStandardMaterial color={color} roughness={0.25} metalness={0.15} />
        </mesh>
      )}
    </group>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const theme = useStyledTheme() as Theme;

  const colors = useMemo(() => {
    return theme.mode === 'dark'
      ? ['#7b6efc', '#a78bfa', '#c4b5fd', '#8b5cf6']
      : ['#f0f2f5', '#ffffff', '#d1d9e6', '#e0e5ec'];
  }, [theme.mode]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.current.y * 0.08,
      0.04
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.current.x * 0.08,
      0.04
    );
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={0.9} />
      <pointLight position={[-5, -5, -5]} intensity={0.4} color={colors[1]} />
      {shapes.map((shape, i) => (
        <FloatingShape key={i} config={shape} colors={colors} />
      ))}
    </group>
  );
}

const Hero3D: React.FC = () => {
  return (
    <HeroContainer>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </HeroContainer>
  );
};

export default Hero3D;
