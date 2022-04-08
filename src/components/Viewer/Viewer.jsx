import style from './Viewer.module.scss';
import React, { useEffect, useState, Suspense } from 'react';
import { useGesture } from '@use-gesture/react'
import { useSpring, a } from "@react-spring/three"
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import * as THREE from "three"
import useStore from '../../store'
import img from './example1.png'

export default function Viewer() {
  const [objValue, setobjValue] = useState({
    example1: {x: 10, y: 10}
  });

  const {ViewerMouse} = useStore();

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
    const { size, viewport } = useThree();
    const aspect = size.width / viewport.width;

    const [spring, set] = useSpring(() => ({
      scale: [10, 10, 10],
      position: [
        objValue["example1"].x / aspect,
        objValue["example1"].y / aspect,
        0
      ]
    }));

    const bind = useGesture({
      onDrag: ({ down, offset: [x, y] }) => {
        set({
          immediate: true,
          position: [
            (x + objValue["example1"].x) / aspect,
            (-y + objValue["example1"].y) / aspect,
            0
          ]
        });
      },
      onDragEnd: ({ offset: [x, y] }) => {
        setobjValue({...objValue, "example1": {
          x: x + objValue["example1"].x,
          y: -y + objValue["example1"].y
        }});
      }
    });

    const texture = useLoader(THREE.TextureLoader, img);
  
    return (
      <a.mesh {...spring} {...bind()}>
        <planeBufferGeometry attach="geometry" />
        <meshBasicMaterial attach="material" map={texture} />
      </a.mesh>
    )
  }

  return (
    <div
      className={style.viewer}
      onMouseMove={(e) => {
        useStore.setState({ViewerMouse: {
          PosX: e.clientX-25,
          PosY: e.clientY-25,
          onEnter: true
        }})
      }}
      onMouseLeave={() => {
        useStore.setState({ViewerMouse: {...ViewerMouse, onEnter: false}})
      }}
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={null}>
          <Bg />
          <Image />
        </Suspense>
      </Canvas>
    </div>
  );
}