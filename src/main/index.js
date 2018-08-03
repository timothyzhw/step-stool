import { app, BrowserWindow } from 'electron' // eslint-disable-line
import glob from 'glob';
import path from 'path';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
  });
  console.log(winURL);
  mainWindow.loadURL(winURL);
  // mainWindow.toggleDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // BrowserWindow.addDevToolsExtension('node_modules/vue-devtools');
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Require each JS file in the main-process dir
function loadCodeBuild() {
  // console.log('loadbuild');
  // const files = glob.sync(path.join(__dirname, 'build/*.js'));
  // console.log(files);
  // files.forEach((file) => {
  //   console.log(file);
  //   import(file);
  // });
  // autoUpdater.updateMenu()
  import('./build/codeConfig.js');
}

loadCodeBuild();
require('electron-debug')({ showDevTools: true });
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
