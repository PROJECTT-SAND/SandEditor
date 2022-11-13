import { sysConsole } from "../components/Console/Console";
// import lexing from "./lexing";
import tokenizing from "./tokenizing";

// const asd = require("./tokenizing.wasm");

export function start() {
  return new Promise(async (resolve, reject) => {
    // phasing, tokenizing, run
    // asd()
    resolve(null);
  })
}

// export function start() {
//   return new Promise<void>(async (resolve, reject) => {
//     const store = useStore();
    
//     sysConsole.text("시스템: 살행 중");
//     store.setters.setPlayerState(2);
//     // await (()=>{})
//     const code = store.codes["qwe.sdcod"];
//     // console.log(code);
//     sysConsole.text("시스템: 살행 완료");
//     store.setters.setPlayerState(3);
//     sysConsole.warning("InGame 13번 코드에 오류가 있습니다.");

//     resolve();
//   })
// }

export function stop() {
  return new Promise(async (resolve, reject) => {
    const store = useStore();
    
    sysConsole.text("시스템: 종료 중");
    store.setters.setPlayerState(5);

    await (() => {});

    sysConsole.text("시스템: 종료 완료");
    store.setters.setPlayerState(1);
    resolve();
  })
}

export function restart() {
  return new Promise<void>(async (resolve, reject) => {
    const store = useStore();

    sysConsole.text("시스템: 재시작 중");
    store.setters.setPlayerState(5);

    await (() => {});

    sysConsole.text("시스템: 재시작 완료");
    store.setters.setPlayerState(1);
    resolve();
  })
}

export function pause() {
  return new Promise<void>(async (resolve, reject) => {
    const store = useStore();

    sysConsole.text("시스템: 일시중지 중");
    store.setters.setPlayerState(5);

    await (() => {});

    sysConsole.text("시스템: 일시중지 완료");
    store.setters.setPlayerState(1);
    resolve();
  })
}

// function sys(Props) {
//   return new Promise(async (resolve, reject) => {
//     try {
//       switch (Props[0]) {
//         case 'start':
//           function tokenizing(code) {
//             let tokenize = code;

//             const asdf = ['\\(', '\\)', '\\[', '\\]', ',', '\\:', '\\.'];
//             let regExp = "/(";

//             for(let item of asdf) {
//               regExp += item + '|';
//             }

//             regExp += " )/g"; //공백 포함

//             tokenize = tokenize
//               .split(regExp)
//               .map(item => { return item.replace(/\n/g,'') })
//               .filter(item => item !== '' && item !== ' ')

//             return tokenize;
//           }

//           // function lexing() {

//           // }

//           sysConsole.text("시스템: 살행 중");
//           useStore.setState({ playerState: 2, ...useStore });

//           // await (()=>{})

//           const code = useStore.getState().codes["qwe.sdcod"];

//           console.log(code);

//           sysConsole.text("시스템: 살행 완료");
//           useStore.setState({ playerState: 3, ...useStore });
//           sysConsole.warning("InGame 13번 코드에 오류가 있습니다.");
//           resolve();
//           break;

//         case "stop":
//           sysConsole.text("시스템: 종료 중");
//           useStore.setState({ playerState: 5, ...useStore });

//           await (() => {});

//           sysConsole.text("시스템: 종료 완료");
//           useStore.setState({ playerState: 1, ...useStore });
//           resolve();
//           break;

//         case "restart":
//           sysConsole.text("시스템: 재시작 중");
//           useStore.setState({ playerState: 5, ...useStore });

//           await (() => {});

//           sysConsole.text("시스템: 재시작 완료");
//           useStore.setState({ playerState: 1, ...useStore });
//           resolve();
//           break;

//         case "pause":
//           sysConsole.text("시스템: 일시중지 중");
//           useStore.setState({ playerState: 5, ...useStore });

//           await (() => {});

//           sysConsole.text("시스템: 일시중지 완료");
//           useStore.setState({ playerState: 1, ...useStore });
//           resolve();
//           break;
//         default:
//           sysConsole.error("sys: 알 수 없는 명령어");
//       }
//     } catch {
//       reject();
//     }
//   });
// }
