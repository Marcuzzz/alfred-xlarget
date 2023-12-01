const { app, BrowserWindow, ipcMain, dialog, screen } = require('electron');
const path = require('path');
require('@electron/remote/main').initialize();

const global = require('../global');
global.homedir = require('os').homedir();
global.args = process.argv;
global.data = {};

const fileIndex = global.args.indexOf('--file');
const htmlIndex = global.args.indexOf('--html');
const bgcolorIndex = global.args.indexOf('--bgcolor');

if (bgcolorIndex !== -1 && global.args[bgcolorIndex + 1]) {
    global.data.bgColor = global.args[bgcolorIndex + 1];
}

if (fileIndex !== -1) {
    // If --file is provided, get the file path
    const filePath = global.args[fileIndex + 1];

    // Read the file as HTML
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        global.data.html = data;
    });
} else if (htmlIndex !== -1) {
    // If --html is provided, get the HTML data
    const htmlData = global.args[htmlIndex + 1];
    global.data.html = htmlData;
} else {
    // Handle the case when no valid options are provided
    console.error('Invalid command line arguments. Use either --file or --html.');
}

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    const mainWindow = new BrowserWindow({
        width: Math.round(width * 0.8),
        height: Math.round(height * 0.8),
        transparent: true,
        frame: false,
        alwaysOnTop: false,
        webPreferences: {
            // nodeIntegration: true,
            // enableRemoteModule: true,
            // contextIsolation: false,
            // webSecurity: false,
            // allowRunningInsecureContent: true
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // Calculate the centered position
    const xPos = Math.round((width - mainWindow.getBounds().width) / 2);
    const yPos = Math.round((height - mainWindow.getBounds().height) / 2);

    // Set the window position
    mainWindow.setPosition(xPos, yPos + 20);

    //mainWindow.loadFile('./html/index.html');

    const bgColor = "<script>document.body.style.backgroundColor = '"+global.data.bgColor+"';</script>" 

    mainWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(global.data.html + '\n' + bgColor)}`);
    //mainWindow.webContents.openDevTools()
    //require("@electron/remote/main").enable(mainWindow.webContents);

    // Listen for the blur event on the mainWindow
    mainWindow.on('blur', () => {
        app.quit();
    });

    global.version = app.getVersion();

    ipcMain.on('getdata', async (event) => {
        try {
            //Get html input
            //
            console.log(global.data);
            event.sender.send('return', global.data);
        } catch (err) {
            console.log(err);
            // Handle errors
        }
    });
}

app.whenReady().then(() => {
    createWindow();

    // app.on('activate', function () {
    //   if (BrowserWindow.getAllWindows().length === 0) createWindow()
    // });
});

app.on('window-all-closed', function () {
    //if (process.platform !== 'darwin')

    try {
        app.quit();
    } catch (Error) {}
});
