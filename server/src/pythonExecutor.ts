import { PythonShell } from 'python-shell';

PythonShell.runString('x=1+1;print(x)', null, (err, output) => {
  if (err) {
    throw err;
  }
  // tslint:disable-next-line:no-console
  console.log(output);
  // tslint:disable-next-line:no-console
  console.log('finished');
});
