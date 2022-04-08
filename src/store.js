import create from 'zustand';

const useStore = create(() => ({
  ViewerMouse: {
    PosX: 0,
    PosY: 0,
    onEnter: false
  },

}));

export default useStore;