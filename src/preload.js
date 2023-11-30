const { contextBridge, ipcRenderer } = require('electron');

// Expose ipcRenderer to the renderer process
contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel, data) => {
    // Whitelist channels to ensure only valid channels are used
    const validChannels = ['getdata'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  on: (channel, listener) => {
    // Whitelist channels to ensure only valid channels are used
    const validChannels = ['return'];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => listener(...args));
    }
  },
});

// Expose other APIs or functions as needed
contextBridge.exposeInMainWorld('myAPI', {
  // Your API methods or properties
});
