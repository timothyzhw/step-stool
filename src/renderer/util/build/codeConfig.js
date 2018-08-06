import { ipcRenderer, shell } from 'electron';
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
  checkAll(checked) {
    const slns = code.get('solutions').value();
    slns.forEach((sln) => {
      sln.checked = checked;
    });
    this.resetStore(slns);
    code.write();
  },
  async order(list) {
    list.forEach((o, i) => {
      o.index = i + 1;
    });
    code.set('solutions', list).write();
    this.resetStore(list);
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
    if (true) {
      return projList;
    }
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
  get tool() {
    if (!code.has('tool').value()) {
      const tool = 'MSBuild';
      this.tool = tool;
      return tool;
    }
    // console.log(code.get('tool').value());
    return code.get('tool').value();
  },
  set tool(value) {
    console.log(value);
    code.set('tool', value).write();
  },
  get target() {
    if (!code.has('target').value()) {
      const t = ['netcoreapp2.1'];
      this.target = t;
      return t;
    }
    return code.get('target').value();
  },
  set target(value) {
    code.set('target', value).write();
  },
  openFolder(filename) {
    shell.showItemInFolder(filename);
  },
  openFile(filename) {
    shell.openItem(filename);
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

