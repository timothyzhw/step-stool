import os from 'os';
import child_process from 'child_process';

let platform = 'unknown';

switch (os.platform()) {
  case 'darwin':
    platform = 'mac';
    break;
  case 'win32':
    platform = 'win';
    break;
  default:
    platform = 'linux';
}

const cache = {
  isgnome: null,
  isxterm: null,
  isxtermemulator: null,
};

const isGnome = async () => {
  if (cache.isgnome !== null) {
    return cache.isgnome;
  }
  try {
    await child_process.execSync('which gnome-terminal');
    cache.isgnome = true;
    return true;
  } catch (e) {
    cache.isgnome = false;
    return false;
  }
};

const isXterm = async () => {
  if (cache.isxterm !== null) {
    return cache.isxterm;
  }
  try {
    await child_process.execSync('which xterm');
    cache.isxterm = true;
    return true;
  } catch (e) {
    cache.isxterm = false;
    return false;
  }
};

const isXtermEmulator = async () => {
  if (cache.isxtermemulator !== null) {
    return cache.isxtermemulator;
  }
  try {
    await child_process.execSync('which x-terminal-emulator');
    cache.isxtermemulator = true;
    return true;
  } catch (e) {
    cache.isxtermemulator = false;
    return false;
  }
};

const openLinux = async (cmd) => {
  const isgnome = await isGnome();
  const isxterm = !isgnome && await isXterm();
  const isxtermemulator = !isgnome && !isxterm && await isXtermEmulator();

  if (isgnome) {
    return `gnome-terminal -e 'bash -c "${cmd};exec bash'`;
  } else if (isxterm) {
    return `xterm -e 'bash -c "${cmd};exec bash"'`;
  } else if (isxtermemulator) {
    return `x-terminal-emulator -e 'bash -c "${cmd};exec bash"'`;
  }

  return '';
};

const openTab = {
  mac: cmd => [
    'osascript -e \'tell application "Terminal" to activate\' -e \'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down\' ',
    '-e \'tell application "Terminal" to do script ',
    `"${cmd.replace(/"/g, '\\"')}" `,
    'in selected tab of the front window\''].join(''),
  linux: openLinux,
  win: cmd => `start cmd /K ${cmd}`,
};

const defaultConfig = {
  onStdout: () => {
  },
  onStderr: () => {
  },
  onError: () => {
  },
  onExit: () => {
  },
};

const open = (cmd, options) => {
  const command = openTab[platform](cmd);
  console.log(command);
  const p = child_process.exec(command, options);
  console.log(p.toString());
};

export default open;
