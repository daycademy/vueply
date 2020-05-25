import { PythonShell } from 'python-shell';

let pythonTimeout: any = {};

export const executeCode = (code: string, callback: (err: any, output?: any[]) => any) => {
  const pythonShell = PythonShell.runString(code, null, (err, output) => {
    if (output.length >= 10000) {
      callback(null, null);
    } else {
      callback(err, output);
    }
    clearTimeout(pythonTimeout);
  });

  pythonTimeout = setTimeout(() => {
    pythonShell.childProcess.kill();
  }, 5000);
};
