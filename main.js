const { app, BrowserWindow, session } = require('electron')

// Force touch events for the touch panel
app.commandLine.appendSwitch('touch-events', 'enabled');

function createWindow () {
  const win = new BrowserWindow({
    kiosk: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  win.loadFile('index.html')
}

app.whenReady().then(() => {
  // Auto-approve location permissions for the kiosk
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    if (permission === 'geolocation') {
      callback(true); // Grant location access automatically
    } else {
      callback(false); // Deny other permissions by default
    }
  });

  createWindow();
});
