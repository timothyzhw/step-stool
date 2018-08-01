import { ipcRenderer } from 'electron';
import fs from 'fs';
import path from 'path';

import { code } from '../datastore';
import store from '../../store';
import Process from '../process';

const codeConfig = {
  add() {
    ipcRenderer.send('open-build-code-add-dialog');
  },
  checked(list) {
    const slns = code.get('solutions').value();
    slns.forEach((sln) => {
      if (list.includes(sln.name)) {
        sln.checked = true;
      } else {
        sln.checked = false;
      }
    });
    code.write();
    this.resetStore(slns);
  },
  async load() {
    this.resetStore(code.get('solutions').value());
    // const slns = await Promise.all(.map(async (item) => {
    //   const sln = Object.assign({}, item);
    //   sln.projects = await this.getProjects(sln.filepath);
    //   console.log(sln);
    //   return sln;
    // }));
    // store.dispatch('buildLoadSolution', slns);
  },
  async resetStore(slns) {
    const solutions = await Promise.all(slns.map(async (item) => {
      const sln = Object.assign({}, item);
      sln.projects = await this.getProjects(sln.filepath);
      console.log(sln);
      return sln;
    }));
    store.dispatch('buildLoadSolution', solutions);
  },

  async getProjects(sln) {
    const projList = [];
    try {
      const res = await Process.exec(`dotnet sln ${sln} list`);

      if (res.exitCode === 0) {
        console.log('get proj ', sln, res);
        const projs = res.stdout.replace(/\r\n/g, '\n').split('\n');
        const dirname = path.dirname(sln);
        projs.forEach((proj) => {
          // console.log(proj);
          const projpath = path.join(dirname, proj);
          if (proj && fs.existsSync(projpath)) {
            console.log(proj);
            projList.push({ name: path.basename(projpath, '.csproj'), filepath: projpath });
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
    return []; // projList;
  },
};

codeConfig.load();

ipcRenderer.on('build-code-add-dialog', async (event, filepath) => {

  console.log(`You selected: ${filepath}`);

  if (fs.existsSync(filepath)) {
    const slns = code.get('solutions');
    const sln = { filepath, name: path.basename(filepath, '.sln'), checked: true, index: slns.size().value() + 1 };
    if (!slns.find({ filepath }).value()) {
      await code.get('solutions').push(sln).write();
      store.dispatch('buildAddSolution', sln);
    }
  }
});

export default codeConfig;

