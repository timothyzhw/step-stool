import path from 'path';
import fse from 'fs-extra';

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const appPath = path.join(process.env.HOME, '.StepStool');

// const blogPath = path.join(app.getPath('userData'), '.StepStool');

// Check if the hve-blog folder exists, if it does not exist, it is initialized
// if (!fse.pathExistsSync(blogPath)) {
//   fse.ensureDirSync(blogPath);
//   fse.copySync(`${__static}/blog`, blogPath);
//   fse.copySync(`${__static}/blog/.gitignore`, `${blogPath}/.gitignore`);
// }

// db.json
const codeFile = path.join(appPath, 'build/code.json');
fse.ensureFile(codeFile);
const code = low(new FileSync(codeFile));
code.defaults({ solutions: [], user: { name: 'tim' } }).write();

// site.json
const site = {}; // low(new FileSync(path.join(appPath, 'build/site.json')));

export { code, site };
