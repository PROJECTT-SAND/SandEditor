import { sysConsole } from './components/Console/Console';

export const system = {
  run: function(Props) {
    return new Promise((resolve, reject) => {
      try {
        (async function() {
          sysConsole.command(Props);
          await calculation();
          sysConsole.endCalculation();
          resolve();
        })();
      } catch {
        reject();
      }
    });
  }
}

function calculation() {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        sysConsole.text("시스템1");
        sysConsole.text("시스템2");
        sysConsole.warning("주의1");
        sysConsole.warning("주의2");
        sysConsole.warning("주의3");
        resolve();
      }, 1000);
    } catch {
      reject();
    }
  });
}