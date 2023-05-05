import { useBoundStore } from './store';

import log from './system/log';
import * as sys from './system/Sys';

export const system = {
	run: (Props: string) => {
		return new Promise((resolve, reject) => {
			try {
				(async () => {
					const store = useBoundStore.getState();

					log.command(Props);
					const prefix = Props.split(' ')[0];
					const command = Props.split(' ')[1];

					if (prefix == 'sys') {
						if (command == 'start') {
							log.text('시스템: 실행 중');
							store.setPlayerState(2);

							// sys.start;

							const code = store.codes['qwe.sdcod'];

							log.text('시스템: 실행 완료');
							store.setPlayerState(3);
							log.warning('InGame 13번 코드에 오류가 있습니다.');
						}
						if (command == 'pause') {
							log.text('시스템: 일시정지');
							store.setPlayerState(4);
						}
						if (command == 'stop') {
							log.text('시스템: 중지 중');
							store.setPlayerState(5);

							log.text('시스템: 중지 완료');
							store.setPlayerState(1);
						}
					} else {
						log.error('알 수 없는 명령어');
					}

					// log.endCalculation();
					resolve(null);
				})();
			} catch {
				reject();
			}
		});
	},
};

// const sys = {
//   start: () => {
//     return new Promise(async (resolve, reject) => {
//       function tokenizing(code) {
//         let tokenize = code;

//         const asdf = ['\\(', '\\)', '\\[', '\\]', ',', '\\:', '\\.'];
//         let regExp = "/(";

//         for(let item of asdf) {
//           regExp += item + '|';
//         }

//         regExp += " )/g"; //공백 포함

//         tokenize = tokenize
//           .split(regExp)
//           .map(item => { return item.replace(/\n/g,'') })
//           .filter(item => item !== '' && item !== ' ')

//         return tokenize;
//       }

//       // function lexing() {

//       // }

//       log.text("시스템: 살행 중");
//       useBoundStore.setState({ playerState: 2, ...useBoundStore });

//       // await (()=>{})

//       const code = useBoundStore.getState().codes["qwe.sdcod"];

//       console.log(code);

//       log.text("시스템: 살행 완료");
//       useBoundStore.setState({ playerState: 3, ...useBoundStore });
//       log.warning("InGame 13번 코드에 오류가 있습니다.");
//     })
//   }

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

//           log.text("시스템: 살행 중");
//           useBoundStore.setState({ playerState: 2, ...useBoundStore });

//           // await (()=>{})

//           const code = useBoundStore.getState().codes["qwe.sdcod"];

//           console.log(code);

//           log.text("시스템: 살행 완료");
//           useBoundStore.setState({ playerState: 3, ...useBoundStore });
//           log.warning("InGame 13번 코드에 오류가 있습니다.");
//           resolve();
//           break;

//         case "stop":
//           log.text("시스템: 종료 중");
//           useBoundStore.setState({ playerState: 5, ...useBoundStore });

//           await (() => {});

//           log.text("시스템: 종료 완료");
//           useBoundStore.setState({ playerState: 1, ...useBoundStore });
//           resolve();
//           break;

//         case "restart":
//           log.text("시스템: 재시작 중");
//           useBoundStore.setState({ playerState: 5, ...useBoundStore });

//           await (() => {});

//           log.text("시스템: 재시작 완료");
//           useBoundStore.setState({ playerState: 1, ...useBoundStore });
//           resolve();
//           break;

//         case "pause":
//           log.text("시스템: 일시중지 중");
//           useBoundStore.setState({ playerState: 5, ...useBoundStore });

//           await (() => {});

//           log.text("시스템: 일시중지 완료");
//           useBoundStore.setState({ playerState: 1, ...useBoundStore });
//           resolve();
//           break;
//         default:
//           log.error("sys: 알 수 없는 명령어");
//       }
//     } catch {
//       reject();
//     }
//   });
// }

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

//           log.text("시스템: 살행 중");
//           useBoundStore.setState({ playerState: 2, ...useBoundStore });

//           // await (()=>{})

//           const code = useBoundStore.getState().codes["qwe.sdcod"];

//           console.log(code);

//           log.text("시스템: 살행 완료");
//           useBoundStore.setState({ playerState: 3, ...useBoundStore });
//           log.warning("InGame 13번 코드에 오류가 있습니다.");
//           resolve();
//           break;

//         case "stop":
//           log.text("시스템: 종료 중");
//           useBoundStore.setState({ playerState: 5, ...useBoundStore });

//           await (() => {});

//           log.text("시스템: 종료 완료");
//           useBoundStore.setState({ playerState: 1, ...useBoundStore });
//           resolve();
//           break;

//         case "restart":
//           log.text("시스템: 재시작 중");
//           useBoundStore.setState({ playerState: 5, ...useBoundStore });

//           await (() => {});

//           log.text("시스템: 재시작 완료");
//           useBoundStore.setState({ playerState: 1, ...useBoundStore });
//           resolve();
//           break;

//         case "pause":
//           log.text("시스템: 일시중지 중");
//           useBoundStore.setState({ playerState: 5, ...useBoundStore });

//           await (() => {});

//           log.text("시스템: 일시중지 완료");
//           useBoundStore.setState({ playerState: 1, ...useBoundStore });
//           resolve();
//           break;
//         default:
//           log.error("sys: 알 수 없는 명령어");
//       }
//     } catch {
//       reject();
//     }
//   });
// }
