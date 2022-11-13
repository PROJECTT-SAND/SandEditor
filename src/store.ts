import create from 'zustand';

type Store = {
  mouseIsEnterViewer: boolean
  playerState: number
  toolState: number
  logs: any[]
  codes: any

  setters: {
    setPlayerState: (state: number) => void
  }
}

const useStore = create<Store>(set => ({
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
  },

  setters: {
    setPlayerState: (state) => {
      set(() => ({playerState: state}));
    }
  }
}));

export default useStore;