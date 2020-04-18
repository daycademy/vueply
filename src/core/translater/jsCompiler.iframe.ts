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
  return code;
}

try {
  (new Function(handleJs(files)))();
} catch (err) {
  console.log(err);
  document.getElementsByTagName('body')[0].innerHTML = '<p style="color:red">' + err + '</p>';
}
`;
