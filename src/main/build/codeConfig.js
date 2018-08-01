// const { ipcMain, dialog } = require('electron')
//
// ipcMain.on('open-file-dialog', (event) => {
//   dialog.showOpenDialog({
//     properties: ['openFile', 'openDirectory'],
//   }, (files) => {
//     if (files) {
//       event.sender.send('selected-directory', files)
//     }
//   })
// })

import { ipcMain, dialog } from 'electron';

const cf = {};

console.log('add code config');

ipcMain.on('open-build-code-add-dialog', (event) => {
  dialog.showOpenDialog({
    filters: [{ name: 'solution', extensions: ['sln'] }],
    properties: ['openFile'],
  }, (files) => {
    if (files) {
      event.sender.send('build-code-add-dialog', files);
    }
  });
});

export default cf;

