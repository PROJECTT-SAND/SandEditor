import style from './style/viewer.module.scss';
import React, { useEffect, useState, Suspense, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from "three"
import img from './example1.png'

function Viewer() {
  function Image() {
    const ref = useRef();
    const texture = useLoader(THREE.TextureLoader, img);
  
    // useFrame((state, delta) => (
    //   ref.current.rotation.x += 0.01
    // ));
  
    return (
      <mesh
        position={(movingOBJ === "a") ? [x/100, y/-100, 0] : [0, 0, 0]}
        ref={ref}
        scale={10}
        onClick={(event) => {
          if (movingOBJ === "a") {
            changeMovingOBJ(null);
          } else {
            console.log("can move!");
            changeMovingOBJ("a");
          }
        }}>
  
        <planeBufferGeometry attach="geometry" />
        <meshBasicMaterial attach="material" map={texture} toneMapped={false} />
      </mesh>
    )
  }

  const [x, setX] = useState()
  const [y, setY] = useState()
  const [movingOBJ, changeMovingOBJ] = useState()

  useEffect(() => {
    const update = (e) => {
      setX(e.x)
      setY(e.y)
    }
    window.addEventListener('mousemove', update)
    window.addEventListener('touchmove', update)
    return () => {
      window.removeEventListener('mousemove', update)
      window.removeEventListener('touchmove', update)
    }
  }, [setX, setY])

  return (
    <>
      <Canvas colorManagement>
        <Suspense fallback={null}>
          <Image />
        </Suspense>
      </Canvas>
    </>
  );
}

export default Viewer;