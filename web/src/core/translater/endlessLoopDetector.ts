export default `
function limitEval(code, fnOnStop, opt_timeoutInMS) {
  var id = Math.random() + 1,
    blob = new Blob(
      ['onmessage=function(a){a=a.data;postMessage({i:a.i+1});postMessage({r:eval.call(this,a.c),i:a.i})};'],
      { type:'text/javascript' }
    ),
    myWorker = new Worker(URL.createObjectURL(blob));

  function onDone() {
    URL.revokeObjectURL(blob);
    fnOnStop.apply(this, arguments);
  }

  myWorker.onmessage = function (data) {
    data = data.data;
    if (data) {
      if (data.i === id) {
        id = 0;
        onDone(true, data.r);
      }
      else if (data.i === id + 1) {
        setTimeout(function() {
          if (id) {
            myWorker.terminate();
            onDone(false);
          }
        }, opt_timeoutInMS || 1000);
      }
    }
  };

  myWorker.postMessage({ c: code, i: id });
}
`;
