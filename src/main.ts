const { app, BrowserWindow, Menu } = require('electron');
const log = require('electron-log');
const isDev = require('electron-is-dev');

function createWindow() {
    const win = new BrowserWindow({ 
        width: 800, 
        height: 600, 
        webPreferences: { 
            nodeIntegration: true,
            contextIsolation : false
        }
    });

    if(isDev) {
        win.loadURL("http://localhost:3000/");
        win.webContents.openDevTools();
    } else {
        win.loadURL(`file://${__dirname}/../build/index.html`);
    }

    const template = [
        {
            label: "SAND-editer",
            submenu: [],
        },
        {
            label: "파일",
            submenu: [
                {
                    label: "파일 만들기",
                    click: () => {
                        window.webContents.excuteJavaScript(`
                            getBackground();
                        `);
                    }
                },
                {
                    label: "파일 저장",
                },
                {
                    label: "파일 열기",
                },
            ],
        }
    ];

    const customMenu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(customMenu);
}

app.whenReady().then(() => { 
    createWindow() 
})

app.on('window-all-closed', () => { 
    if (process.platform !== 'darwin') app.quit() 
})