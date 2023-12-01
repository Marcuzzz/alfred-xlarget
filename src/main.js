const { app, BrowserWindow, ipcMain, dialog, screen } = require('electron');
const path = require('path');
const fs = require('fs');
const yargs = require('yargs');

require('@electron/remote/main').initialize();

const global = require('../global');
global.homedir = require('os').homedir();
global.data = {};

global.args = yargs
  .option('file', {
    describe: 'Specify a file path',
    type: 'string',
  })
  .option('html', {
    describe: 'Specify HTML content',
    type: 'string',
  })
  .option('bgcolor', {
    describe: 'Specify background color',
    type: 'string',
  })
  .option('color', {
    describe: 'Specify text color',
    type: 'string',
  })
  .option('thcolor', {
    describe: 'Specify th background color',
    type: 'string',
  })
  .option('size', {
    describe: 'Specify window size',
    type: 'number',
    default: 0.85
  })
  .argv;


if (global.args.file) {
    // Read the file as HTML
    fs.readFile(global.args.file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        global.data.html = data;

        // Create window once file content is available
        createWindow();
    });
} else if (global.args.html) {
    // If --html is provided, get the HTML data
    const htmlData = global.args[htmlIndex + 1];
    global.data.html = htmlData;

    // Create window once HTML data is available
    createWindow();
} else {
    // Handle the case when no valid options are provided
    console.error('Invalid command line arguments. Use either --file or --html.');
}

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    const mainWindow = new BrowserWindow({
        width: Math.round(width * global.args.size),
        height: Math.round(height * global.args.size),
        transparent: true,
        frame: false,
        alwaysOnTop: false,
        webPreferences: {
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // Calculate the centered position
    const xPos = Math.round((width - mainWindow.getBounds().width) / 2);
    const yPos = Math.round((height - mainWindow.getBounds().height) / 2);

    // Set the window position
    mainWindow.setPosition(xPos, yPos + 20);


    if (global.args.bgcolor) {
        global.data.html += "\n<script>document.body.style.backgroundColor = '"+global.args.bgcolor+"';</script>" 
    }

    if (global.args.color) {
        global.data.html += "\n<script>document.body.style.color = '"+global.args.color+"';</script>" 
    }

    if (global.args.thcolor) {
        global.data.html += "\n<script>document.th.style.backgroundColor = '"+global.args.thcolor+"';</script>" 
    }

    mainWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(global.data.html)}`);
    //mainWindow.webContents.openDevTools();

    mainWindow.on('blur', () => {
        app.quit();
    });

    global.version = app.getVersion();

    ipcMain.on('getdata', async (event) => {
        try {
            event.sender.send('return', global.data);
        } catch (err) {
            console.log(err);
        }
    });
}

app.whenReady().then(() => {
    // Moved the window creation logic inside fs.readFile callback

    const theMainWindow = require('electron').remote.getCurrentWindow()
    theMainWindow.on('blur', function() {
        app.quit();
      })

});

app.on('window-all-closed', function () {
    try {
        app.quit();
    } catch (Error) {}
});

//console.log(global.data.html); // This will be undefined here; it's asynchronous
