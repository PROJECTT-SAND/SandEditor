import style from './Viewport.module.scss';
import React, { useState, useRef, useEffect } from 'react';
import * as THREE from "three"
import { useBoundStore } from '@/store'
import img from './example1.png'

export default function Viewer() {
  const { currentLifeCycle, isGrid, toolState, setMouseIsEnterViewer } = useBoundStore();

  type ObjValueType = {
    x: number,
    y: number
  }

  type ObjValueTypes = {
    [key: string]: ObjValueType
  }

  const canvas = useRef<HTMLCanvasElement>(null);
  const [isStart, setIsStart] = useState(false);
  // const [isGrid, setIsGrid] = useState(false);
  const [objValue, setobjValue] = useState<ObjValueTypes>({});

  class OBJ extends THREE.Mesh {
    cubeSize: number;
    cubeActive: boolean;

    constructor() {
      super()
      this.geometry = new THREE.CircleGeometry(15, 32);
      this.material = new THREE.MeshBasicMaterial({ color: 0xeeeeee });
      this.cubeSize = 2;
      this.cubeActive = false;

      // setobjValue({
      //   ...objValue, [this.uuid]: {
      //     x: 0,
      //     y: 0
      //   }
      // });
    }

    render() {
    }

    onResize(width: number, height: number, aspect: number) {
    }

    onPointerOver(e: any) {
      (this.material as THREE.MeshBasicMaterial).color.set('hotpink');
      (this.material as THREE.MeshBasicMaterial).color.convertSRGBToLinear();
    }

    onPointerOut(e: any) {
      (this.material as THREE.MeshBasicMaterial).color.set('orange');
      (this.material as THREE.MeshBasicMaterial).color.convertSRGBToLinear();
    }

    onClick(e: any) {
      this.cubeActive = !this.cubeActive
      this.scale.setScalar(this.cubeSize * (this.cubeActive ? 1.5 : 1))
    }

    onDrag(e: any) {
      if (toolState === 1 && currentLifeCycle != 3) {
        this.position.x = (e.clientX + objValue[this.uuid].x);
        this.position.z = (-e.clientY + objValue[this.uuid].y);
      }
    }

    onDragEnd(e: any) {
      if (toolState === 1 && currentLifeCycle != 3) {
        setobjValue({
          ...objValue, [this.uuid]: {
            x: e.clientX + objValue[this.uuid].x,
            y: -e.clientY + objValue[this.uuid].y
          }
        });
      }
    }
  }

  // const OBJbind = useGesture({
  //   onDrag: ({ down, offset: [x, y] }) => {
  //     if (toolState === 1 && playerState != 3) {
  //       setSpring({
  //         immediate: true,
  //         position: [
  //           (x + objValue["example1"].x) / aspect,
  //           -0.01,
  //           (-y + objValue["example1"].y) / -aspect
  //         ]
  //       });
  //     }
  //   },
  //   onDragEnd: ({ offset: [x, y] }) => {
  //     if (toolState === 1 && playerState != 3) {
  //       setobjValue({
  //         ...objValue, "example1": {
  //           x: x + objValue["example1"].x,
  //           y: -y + objValue["example1"].y
  //         }
  //       });
  //     }
  //   }

  const VS = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`

  const FS = `
  uniform sampler2D uTexture;

  varying vec2 vUv;

  void main() {
    vec3 texture = texture2D(uTexture, vUv).rgb;
    gl_FragColor = vec4(texture.r, texture.g, texture.b, 1.0);
  }`

  const Ctx = {
    Width: window.innerWidth,
    Height: window.innerHeight,
  };

  let renderer: THREE.WebGLRenderer;
  const textureLoader = new THREE.TextureLoader();

  let intersects: any[] = [];
  let hovered: { [key: string]: any } = {};
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2()

  const scene1 = new THREE.Scene();
  // const scene2 = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    Ctx.Width / Ctx.Height,
    0.1,
    1000
  );

  camera.position.z = 700;

  useEffect(() => {
    if (canvas.current == null) {
      return;
    }

    createScene(canvas.current);

    canvas.current.addEventListener('pointermove', (e) => {
      mouse.set((e.clientX / Ctx.Width) * 2 - 1, -(e.clientY / Ctx.Height) * 2 + 1)
      raycaster.setFromCamera(mouse, camera)
      intersects = raycaster.intersectObjects(scene1.children, true)

      // 이전에 호버링된 항목이 히트에 없으면 onPointerOut을 호출해야 합니다
      Object.keys(hovered).forEach((key) => {
        const hit = intersects.find((hit) => hit.object.uuid === key)
        if (hit === undefined) {
          const hoveredItem = hovered[key]
          if (hoveredItem.object.onPointerOver) hoveredItem.object.onPointerOut(hoveredItem)
          delete hovered[key]
        }
      })

      intersects.forEach((hit) => {
        // Hit 이 호버링된 것으로 플래그 지정되지 않은 경우 onPointerOver를 호출해야 합니다
        if (!hovered[hit.object.uuid]) {
          hovered[hit.object.uuid] = hit
          if (hit.object.onPointerOver) hit.object.onPointerOver(hit)
        }
        // onPointerMove
        if (hit.object.onPointerMove) hit.object.onPointerMove(hit)
      })
    })

    canvas.current.addEventListener('click', (e) => {
      intersects.forEach((hit) => {
        // onClick
        if (hit.object.onClick) hit.object.onClick(hit)
      })
    })
  }, [])

  const createScene = (el: HTMLCanvasElement) => {
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
    renderer.autoClear = false;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;
    resize();
    render();
  };

  const resize = () => {
    Ctx.Width = window.innerWidth;
    Ctx.Height = window.innerHeight;

    renderer.setSize(Ctx.Width, Ctx.Height);
    camera.aspect = Ctx.Width / Ctx.Height;
    camera.updateProjectionMatrix();
  };

  const render = () => {
    requestAnimationFrame(render);

    renderer.clear();
    // renderer.render(scene2, camera);
    // renderer.clearDepth();
    renderer.render(scene1, camera);
  };

  scene1.add(new OBJ());

  return (
    <div className={style.viewer}
      onMouseEnter={() => {
        setMouseIsEnterViewer(true);
      }}
      onMouseLeave={() => {
        setMouseIsEnterViewer(false);
      }}
    >

      <canvas ref={canvas}></canvas>
    </div>
  );
}