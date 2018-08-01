import { ipcRenderer } from 'electron';
import fs from 'fs';
import path from 'path';

import { code } from '../datastore';
import store from '../../store';

const codeConfig = {
  add() {
    ipcRenderer.send('open-build-code-add-dialog');
  },

  load() {
    const slns = code.get('solutions').value();
    console.log(slns);
    store.dispatch('buildLoadSolution', slns);
  },
};

ipcRenderer.on('build-code-add-dialog', (event, filepath) => {

  console.log(`You selected: ${filepath}`);

  if (fs.existsSync(filepath)) {
    const slns = code.get('solutions');
    const sln = { filepath, name: path.basename(filepath, '.sln'), index: slns.size().value() + 1 };
    if (!slns.find({ filepath }).value()) {
      console.warn('write 1');
      slns.push(sln).write();
    }
    store.dispatch('buildAddSolution', sln);

    console.log(slns);
  }
});

export default codeConfig;

