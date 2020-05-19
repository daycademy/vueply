import { PythonShell } from 'python-shell';

export const executeCode = (code: string, callback: (err: any, output?: any[]) => any) => {
  PythonShell.runString(code, null, (err, output) => {
    callback(err, output);
  });
};
