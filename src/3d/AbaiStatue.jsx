import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

export default function AbaiStatue({ isMobile }) {
  const groupRef = useRef();
  const scroll = useScroll();
  
  // Generating a stylized geometric representation of a monument for the fallback
  const fragments = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 40; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 2
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        scale: Math.random() * 0.5 + 0.2,
        explodeDir: new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        )
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    const offset = scroll.offset;
    
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, offset * 5, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, offset * Math.PI * 2, 0.1);

    const explosionFactor = Math.max(0, (offset - 0.15) * 4); 
    
    groupRef.current.children.forEach((child, i) => {
      const data = fragments[i];
      const targetX = data.position[0] + data.explodeDir.x * explosionFactor;
      const targetY = data.position[1] + data.explodeDir.y * explosionFactor;
      const targetZ = data.position[2] + data.explodeDir.z * explosionFactor;
      
      child.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.05);
      
      child.rotation.x += 0.002 * (i % 2 === 0 ? 1 : -1);
      child.rotation.y += 0.003;
    });
  });

  return (
    <group ref={groupRef} scale={isMobile ? 0.7 : 1} position={[0, -1, 0]}>
      {fragments.map((data, i) => (
        <mesh key={i} position={data.position} rotation={data.rotation} scale={data.scale} castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial 
            color={i % 3 === 0 ? "#D4AF37" : "#2a2a2a"} 
            metalness={0.8} 
            roughness={0.2} 
          />
        </mesh>
      ))}
    </group>
  );
}
