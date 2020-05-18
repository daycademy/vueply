const pythonScript = `${process.cwd()}/example.py`;

import { PythonShell } from 'python-shell';
const pyShell = new PythonShell(pythonScript);
pyShell.on('message', (message: string) => {
  // tslint:disable-next-line:no-console
  console.log(message);
});

pyShell.end((err) => {
  if (err) {
    throw err;
  }

  // tslint:disable-next-line:no-console
  console.log('Python script executed successfully');
});
