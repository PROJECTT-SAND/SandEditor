import create, { StateCreator } from 'zustand';

// import { viewerController } from './stroes/viewerController'

interface viewerController {
  mouseIsEnterViewer: boolean
  isGrid: boolean
  playerState: number
  toolState: number
  optionState: object
  setMouseIsEnterViewer: (value: boolean) => void
  setPlayerState: (value: number) => void
  setToolState: (value: number) => void
  setOptionState: (value: object) => void
}
const createViewerController: StateCreator<viewerController> = (set) => ({
  mouseIsEnterViewer: false,
  isGrid: false,
  playerState: 1,
  toolState: 1,
  optionState: {
    "showGrid": false,
    "fullScreen": false
  },
  setMouseIsEnterViewer: value => set(() => ({ mouseIsEnterViewer: value })),
  setPlayerState:        value => set(() => ({ playerState: value })),
  setToolState:          value => set(() => ({ toolState: value })),
  setOptionState:        value => set(() => ({ optionState: value })),
});

interface objects {
  objValue: object
  setObjValue: (objName: string, pos: object) => void
}
const createObjects: StateCreator<objects> = (set) => ({
  objValue: {
    example1: {x: 0, y: 0}
  },
  setObjValue: (objName, pos) => {
    // set(() => ({ objValue[objName]: pos }));
  },
});

interface logs {
  logs: any[]
}
const createLogs: StateCreator<logs> = (set) => ({
  logs: []
});

interface codes {
  codes: any
}
const createCodes: StateCreator<codes> = (set) => ({
  codes: {
    "qwe.sdcod":
    `func null start(obj:obj)
      obj.[x, y, size] = [10, 20, 100]

      loop(10)
        obj.X += 10`
  },
});

export const useBoundStore = create<viewerController & objects & logs & codes>()((...a) => ({
  ...createViewerController(...a),
  ...createObjects(...a),
  ...createLogs(...a),
  ...createCodes(...a),
}))