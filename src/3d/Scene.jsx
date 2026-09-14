import { Environment, Float, Sparkles } from '@react-three/drei';
import AbaiStatue from './AbaiStatue';
import FloatingPages from './FloatingPages';
import { useThree } from '@react-three/fiber';

export default function Scene() {
  const { viewport } = useThree();
  const isMobile = viewport.width < 4; // Responsive check

  return (
    <>
      {/* Cinematic Lighting */}
      <ambientLight intensity={0.2} />
      <spotLight 
        position={[0, 5, 5]} 
        angle={0.4} 
        penumbra={1} 
        intensity={2} 
        castShadow 
        color="#D4AF37" 
      />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#ffffff" />
      
      {/* Subtle reflections */}
      <Environment preset="city" environmentIntensity={0.1} />

      {/* Atmospheric Particles (Kazakh Steppe dust/Museum dust) */}
      <Sparkles 
        count={isMobile ? 100 : 300} 
        scale={12} 
        size={isMobile ? 1 : 2} 
        speed={0.2} 
        opacity={0.3} 
        color="#D4AF37" 
      />

      {/* Main 3D Elements */}
      <AbaiStatue isMobile={isMobile} />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <FloatingPages />
      </Float>
    </>
  );
}
