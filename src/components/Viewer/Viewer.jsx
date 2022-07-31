import style from './Viewer.module.scss';
import React, { useEffect, useRef, useState, Suspense } from 'react';
import { useGesture } from '@use-gesture/react'
import { useSpring, a } from "@react-spring/three"
import { Canvas, useLoader, useThree, useFrame } from '@react-three/fiber';
import * as THREE from "three"
import useStore from '../../store'
import img from './example1.png'

export default function Viewer() {
  const [objValue, setobjValue] = useState({
    example1: {x: 0, y: 0}
  });

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
      rotation: [-(Math.PI/2), 0, 0],
      scale: [10, 10, 10],
      position: [
        objValue["example1"].x / aspect,
        -0.01,
        objValue["example1"].y / -aspect
      ]
    }));

    const OBJbind = useGesture({
      onDrag: ({ down, offset: [x, y] }) => {
        if(toolState === 1) {
          set({
            immediate: true,
            position: [
              (x + objValue["example1"].x) / aspect,
              -0.01,
              (-y + objValue["example1"].y) / -aspect
            ]
          });
        }
      },
      onDragEnd: ({ offset: [x, y] }) => {
        if(toolState === 1) {
          setobjValue({...objValue, "example1": {
            x: x + objValue["example1"].x,
            y: -y + objValue["example1"].y
          }});
        }
      }
    });

    const ref = useRef()

    useFrame(() => {
      ref.current.shift = 10
      // ref.current.rotation.x = 0
    })

    const [texture] = useLoader(THREE.TextureLoader, [img]);
    
    //vertexShader
    const VS = `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`

    //fragmentShader
    const FS = `
    uniform sampler2D uTexture;

    varying vec2 vUv;

    void main() {
      vec3 texture = texture2D(uTexture, vUv).rgb;
      gl_FragColor = vec4(texture.r, texture.g, texture.b, 1.0);
    }`

    return (
      <a.mesh
        {...spring}
        {...OBJbind()}
        >

        <planeBufferGeometry attach="geometry" />
        <meshBasicMaterial
          ref={ref}
          attach="material"
          map={texture}
          />
          
        {/* <shaderMaterial
          uniforms={{
            uTexture: texture
          }}
          fragmentShader={FS}
          vertexShader={VS}
          /> */}
      </a.mesh>
    )
  }

  const { toolState } = useStore();

  return (
    <div className={style.viewer}
      onMouseEnter={() => {
        useStore.setState({mouseIsEnterViewer: true, ...useStore})
      }}
      onMouseLeave={() => {
        useStore.setState({mouseIsEnterViewer: false, ...useStore})
      }}
      >

      <Canvas camera={{ position: [0, 5, 0] }}>
        <Suspense fallback={null}>
          <Image />
          <gridHelper args={[100, 4, `white`, `gray`]} />
          <Bg />
        </Suspense>
      </Canvas>
    </div>
  );
}