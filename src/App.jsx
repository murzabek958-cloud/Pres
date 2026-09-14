import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import Scene from './components/3d/Scene';
import OverlayUI from './components/ui/OverlayUI';

export default function App() {
  return (
    <div className="w-screen h-screen">
      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={['#050507']} />
        {/* Fog creates the museum/steppe depth */}
        <fog attach="fog" args={['#050507', 5, 20]} />
        
        <Suspense fallback={null}>
          {/* ScrollControls manages the cinematic timeline. pages={6} means 6 screen heights */}
          <ScrollControls pages={6} damping={0.25}>
            <Scene />
            <OverlayUI />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
