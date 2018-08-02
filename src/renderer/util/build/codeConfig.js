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
  remove(list) {
    const slns = code.get('solutions').value();
    list.forEach(sln => code.get('solutions').remove({ name: sln }).write());
    this.resetStore(slns);
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
  async order(list) {
    list.forEach((o, i) => {
      o.index = i + 1;
    });
    code.set('solutions', list).write();
    this.resetStore(list);
  },
  buildArg(filename) {
    return ['build', filename, '-p:TargetFramework=netcoreapp2.1', `-p:BuildPlatform=${process.platform}`];
  },
  async load() {
    this.resetStore(code.get('solutions').value());
  },
  async resetStore(slns) {
    const solutions = await Promise.all(slns.map(async (item) => {
      const sln = Object.assign({}, item);
      sln.projects = await this.getProjects(sln.filepath);
      return sln;
    }));
    store.dispatch('buildLoadSolution', solutions.sort((a, b) => a.index - b.index));
  },
  async getProjects(sln) {
    const projList = [];
    try {
      const res = await Process.exec(`dotnet sln ${sln} list`);

      if (res.exitCode === 0) {
        const projs = res.stdout.replace(/\r\n/g, '\n').split('\n');
        const dirname = path.dirname(sln);
        projs.forEach((proj) => {
          // console.log(proj);
          const projpath = path.join(dirname, proj);
          if (proj && fs.existsSync(projpath)) {
            projList.push({ name: path.basename(projpath, '.csproj'), filepath: projpath });
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
    return projList;
  },
};

codeConfig.load();

ipcRenderer.on('build-code-add-dialog', async (event, filepath) => {

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

