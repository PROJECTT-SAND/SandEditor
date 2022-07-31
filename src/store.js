import create from 'zustand';

const useStore = create((set) => ({
  mouseIsEnterViewer: false,
  playerState: 1,
  toolState: 1,
  logs: [],
  codes: {
    "qwe.sdcod":
    `func null start(obj:obj)
      obj.[x, y, size] = [10, 20, 100]

      loop(10)
        obj.X += 10`
  }
}));

export default useStore;