import style from './style/viewer.module.scss';
import React, { useState, Suspense } from 'react';
import { useGesture } from '@use-gesture/react'
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { useSpring, a } from "@react-spring/three"
import * as THREE from "three"
import img from './example1.png'

function Viewer() {
  const [OBJPos, setOBJPos] = useState({
    a: [0, 0, 0]
  });

  function update(OBJ, x, y) {
    const value = {...OBJPos};
    value[OBJ] = [x, y*-1, 0];
    setOBJPos(value);
  }

  function Bg() {
    return (
      <mesh
        position={[0, 0, -10]}
        scale={10000}>
  
        <planeBufferGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color="#404040" toneMapped={false} />
      </mesh>
    )
  }

  function Image() {
    const { size, viewport } = useThree()
    const aspect = size.width / viewport.width
    const [spring, set] = useSpring(() => ({ scale: [10, 10, 10], position: [0, 0, 0], config: { friction: 15 } }))
    const bind = useGesture({
      onDrag: ({ offset: [x, y] }) => {
        set({ position: [x / aspect, -y / aspect, 0] });
        update('a', x, y);
        console.log("a");
      }
    })
    const texture = useLoader(THREE.TextureLoader, img);
  
    return (
      <a.mesh {...spring} {...bind()}>
        <planeBufferGeometry attach="geometry" />
        <meshBasicMaterial attach="material" map={texture} />
      </a.mesh>
    )
  }

  return (
    <div className={style.viewer}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={null}>
          <Bg />
          <Image />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Viewer;