import create from 'zustand';

const useStore = create((set) => ({
  mouseIsEnterViewer: false
}));

export default useStore;