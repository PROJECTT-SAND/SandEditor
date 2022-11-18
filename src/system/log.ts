import { useBoundStore } from '../store';

function _log(kind: any, Props: any) {
  let logsValue = useBoundStore.getState().logs;
    
  logsValue.push({
    kind,
    content: Props,
    time: new Date()
  });
  
  useBoundStore.setState({
      logs: logsValue,
      ...useBoundStore
  });
}

export default {
  command: (Props: any) => _log('command', Props),
  text: (Props: any) => _log('text', Props),
  warning: (Props: any) => _log('warning', Props),
  error: (Props: any) => _log('error', Props),
}