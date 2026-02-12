import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Cloud, Sky } from '@react-three/drei';

const Clouds = () => {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta / 20;
  });
  return (
    <group ref={ref}>
      <Cloud position={[-4, -2, -25]} speed={0.2} opacity={1} />
      <Cloud position={[4, 2, -15]} speed={0.2} opacity={0.5} />
      <Cloud position={[-4, 2, -10]} speed={0.2} opacity={1} />
      <Cloud position={[4, -2, -5]} speed={0.2} opacity={0.5} />
      <Cloud position={[4, 2, 0]} speed={0.2} opacity={0.75} />
    </group>
  );
};

const Background3D = () => {
    return (
        <div className="fixed inset-0 -z-10 bg-[#5c94fc]">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <Sky sunPosition={[100, 20, 100]} turbidity={0.1} rayleigh={0.5} mieCoefficient={0.005} mieDirectionalG={0.8} />
                <ambientLight intensity={0.8} />
                <pointLight position={[100, 100, 100]} intensity={1} />
                <Clouds />
            </Canvas>
        </div>
    );
};

export default Background3D;
