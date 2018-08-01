import { ipcRenderer } from 'electron';


const codeConfig = {
  add() {
    ipcRenderer.send('open-build-code-add-dialog');
  },
};

ipcRenderer.on('build-code-add-dialog', (event, path) => {
  console.log(`You selected: ${path}`);
});

console.log(codeConfig);

export default codeConfig;

