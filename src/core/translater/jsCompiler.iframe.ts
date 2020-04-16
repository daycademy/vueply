export default `
function handleJs(files) {
  let transpiledFiles = files.map(({ filename, content }) => \`
    {
      filename: "\${ filename }",
      func: function (require, exports) {
        \${ Babel.transform(content, { presets: ['env']}).code }
      },
      exports: {}
    }
  \`);

  let code = \`
    const modules = [\${ transpiledFiles.join(',') }];
    const require = function(file) {
      const module = modules.find(({ filename }) => filename === file);

      if (!module) {
        throw new Error('Demoit can not find "' + file + '" file.');
      }
      module.func(require, module.exports);
      return module.exports;
    };
    modules[\${ 0 }].func(require, modules[\${ 0 }].exports);
  \`;
  // js = js.replace('export default', 'return');
  // js = Babel.transform(js, { presets: ['env']}).code;
  return (new Function(code))();
}

function mergeJs(files, template) {
  const jsCode = handleJs(files);
  const vueObj = Object.assign({template}, jsCode, {el: '#app'}); 
  return new Vue(vueObj);
}

try {
  mergeJs(files, template);
} catch (err) {
  console.log(err);
  document.getElementsByTagName('body')[0].innerHTML = '<p style="color:red">' + err + '</p>';
}
`;
