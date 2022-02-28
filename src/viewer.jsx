import style from './style/viewer.module.scss';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree, createPortal } from '@react-three/fiber';

import * as THREE from "three"
import { ScrollControls, useScroll, Text, Loader, Line, Shadow, useTexture, meshBounds } from "@react-three/drei"



function Content(props) {
  const ref = useRef()
  useFrame((state, delta) => (ref.current.rotation.x += 0.01))
  return (
    <>
      <mesh
        position={[1.2, 0, 0]}
        ref={ref}
        scale={1}
        onPointerOver={(event) => {}}
        onPointerOut={(event) => {}}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={'orange'} />
      </mesh>
      <Image />
    </>
  )
}


function Image() {
  // const ref = useRef()
  // return (
  //   <group ref={ref}>
  //     <Plane shift={100} aspect={1.5} scale={[3]} frustumCulled={false} />
  //   </group>
  // )

  // return (
  //   <mesh ref={ref} {...props}>
  //     <planeGeometry args={[1, 1, 32, 32]} />
  //     <customMaterial ref={material} color={color} map="example1.png" map-minFilter={THREE.LinearFilter} transparent opacity={opacity} />
  //   </mesh>
  // )
}



function viewer() {
  return (
    <>
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Content />
      </Canvas>
    </>
  );
}

export default viewer;