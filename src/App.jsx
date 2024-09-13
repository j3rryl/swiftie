import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import Particles from "./Particles";
import { useEffect, useRef, useState } from "react";
import Number from "./Number";

function App() {
  const [hovered, setHover] = useState(false);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const mouse = useRef([0, 0]);
  useEffect(() => {
    document.body.style.cursor = hovered
      ? "pointer"
      : "url('https://raw.githubusercontent.com/chenglou/react-motion/master/demos/demo8-draggable-list/cursor.png') 39 39, auto";
  }, [hovered]);
  return (
    <Canvas
      linear
      dpr={[1, 2]}
      camera={{ fov: 100, position: [0, 0, 30] }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.Uncharted2ToneMapping;
        gl.setClearColor(new THREE.Color("#020207"));
      }}
    >
      <fog attach="fog" color="#CEA059" near={1} far={10} />
      {/* <fog attach="fog" args={['white', 50, 190]} /> */}

      <pointLight distance={100} intensity={4} color="white" />

      <Particles count={isMobile ? 5000 : 1_000} mouse={mouse} />
    </Canvas>
  );
}

export default App;
