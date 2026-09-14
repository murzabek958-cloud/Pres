import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Text } from '@react-three/drei';
import * as THREE from 'three';

function Page({ position, text, rotation }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    const targetScale = hovered ? 1.2 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    meshRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(meshRef.current.material.emissiveIntensity, hovered ? 0.5 : 0, 0.1);
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => console.log('Open UI for:', text)}
    >
      <planeGeometry args={[1.5, 2]} />
      <meshStandardMaterial color="#f4f4f4" emissive="#D4AF37" emissiveIntensity={0} side={THREE.DoubleSide} />
      <Text position={[0, 0, 0.01]} fontSize={0.2} color="#111" maxWidth={1.2} textAlign="center" anchorX="center" anchorY="middle">
        {text}
      </Text>
    </mesh>
  );
}

export default function FloatingPages() {
  const groupRef = useRef();
  const scroll = useScroll();

  useFrame(() => {
    const offset = scroll.offset;
    const targetZ = offset > 0.5 && offset < 0.8 ? 2 : -10;
    const targetY = offset > 0.5 && offset < 0.8 ? 0 : -20;
    
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
  });

  return (
    <group ref={groupRef} position={[0, -20, -10]}>
      <Page position={[-2.5, 1, 0]} rotation={[0, 0.2, -0.1]} text="Бірінші сөз" />
      <Page position={[0, 0, 1]} rotation={[0, 0, 0]} text="Жетінші сөз" />
      <Page position={[2.5, -1, 0]} rotation={[0, -0.2, 0.1]} text="Отыз бірінші сөз" />
    </group>
  );
}
