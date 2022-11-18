import style from './Viewport.module.scss';
import React, { useEffect, useRef, useState, Suspense } from 'react';
import { useGesture } from '@use-gesture/react'
import { useSpring, a } from "@react-spring/three"
import { Canvas, useLoader, useThree, useFrame } from '@react-three/fiber';
import * as THREE from "three"
import { useBoundStore } from '../../store'
import img from './example1.png'

export default function Viewer() {
  const {playerState, isGrid, toolState, setMouseIsEnterViewer} = useBoundStore();
  
  // const [isStart, setIsStart] = useState(false);
  // const [isGrid, setIsGrid] = useState(false);
  const [objValue, setobjValue] = useState({
    example1: {x: 0, y: 0}
  });

  function Image() {
    const { size, viewport } = useThree();
    const aspect = size.width / viewport.width;

    const [spring, setSpring] = useSpring(() => ({
      rotation: [-(Math.PI/2), 0, 0],
      scale: [7.96, 4.95, 10],
      position: [
        objValue["example1"].x / aspect,
        -0.01,
        objValue["example1"].y / -aspect
      ]
    }));

    const OBJbind = useGesture({
      onDrag: ({ down, offset: [x, y] }) => {
        if(toolState === 1 && playerState!=3) {
          setSpring({
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
        if(toolState === 1 && playerState!=3) {
          setobjValue({...objValue, "example1": {
            x: x + objValue["example1"].x,
            y: -y + objValue["example1"].y
          }});
        }
      }
    });
    
    function useTexture(img: any) {
      return useLoader(THREE.TextureLoader, [img])[0];
    };

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
          attach="material"
          map={useTexture(img)}
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

  return (
    <div className={style.viewer}
      onMouseEnter={() => {
        setMouseIsEnterViewer(true);
      }}
      onMouseLeave={() => {
        setMouseIsEnterViewer(false);
      }}
      >

      <Canvas
        camera={{ position: [0, 5, 0] }}
        gl={{ toneMapping: THREE.NoToneMapping }}
        className={`${style.canvas} ${playerState==3 ? style.start : style.edit}`}
      >
        <Suspense fallback={null}>
          <Image />
          {isGrid &&
            <gridHelper args={[14, 8, `white`, `gray`]} />
          }
        </Suspense>
      </Canvas>
    </div>
  );
}