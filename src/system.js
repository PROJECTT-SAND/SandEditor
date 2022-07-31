import { sysConsole } from './components/Console/Console';
import useStore from './store';

export const system = {
  run: function(Props) {
    return new Promise((resolve, reject) => {
      try {
        (async () => {
          sysConsole.command(Props);

          switch (Props.split(' ')[0]) {
            case 'sys':
              await sys(Props.split(' ').slice(1));
              break;

            default:
              sysConsole.error("알 수 없는 명령어");
          };

          sysConsole.endCalculation();
          resolve();
        })();
      } catch {
        reject();
      }
    });
  }
}

function sys(Props) {
  return new Promise(async(resolve, reject) => {
    try {
      switch (Props[0]) {
        case 'start':
          sysConsole.text("시스템: 살행 중");
          useStore.setState({playerState: 2, ...useStore});

          // await (()=>{})

          const code = useStore.getState().codes["qwe.sdcod"]

          console.log(code)
          
          sysConsole.text("시스템: 살행 완료");
          useStore.setState({playerState: 3, ...useStore});
          sysConsole.warning("InGame 13번 코드에 오류가 있습니다.");
          resolve();
          break;

        case 'stop':
          sysConsole.text("시스템: 종료 중");
          useStore.setState({playerState: 5, ...useStore});

          await (()=>{})

          sysConsole.text("시스템: 종료 완료");
          useStore.setState({playerState: 1, ...useStore});
          resolve();
          break;

        case 'restart':
          sysConsole.text("시스템: 재시작 중");
          useStore.setState({playerState: 5, ...useStore});

          await (()=>{})

          sysConsole.text("시스템: 재시작 완료");
          useStore.setState({playerState: 1, ...useStore});
          resolve();
          break;

        case 'pause':
          sysConsole.text("시스템: 일시중지 중");
          useStore.setState({playerState: 5, ...useStore});

          await (()=>{})

          sysConsole.text("시스템: 일시중지 완료");
          useStore.setState({playerState: 1, ...useStore});
          resolve();
          break;
        default:
          sysConsole.error("sys: 알 수 없는 명령어");
      };

    } catch {
      reject();
    }
  });
}