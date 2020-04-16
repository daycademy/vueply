import FileModel from '@/store/models/FileModel';

const writeToDoc = (
  document: Document,
  cssCode: string,
  script: string,
  isJs: boolean,
): boolean => {
  const lib = 'https://cdn.jsdelivr.net/npm/vue@2.6.11';
  document.write('<!DOCTYPE html>');
  document.write('<html>');
  document.write('<head>');
  document.write(`<style type="text/css">${cssCode}<\/style>`);
  document.write('<script src="https://unpkg.com/@babel/standalone@7.9.5/babel.min.js"><\/script>');
  document.write(`<script src=${lib} type="text/javascript"><\/script>`);
  document.write('</head>');
  document.write('<body>');
  document.write('<div id="app"></div>');
  document.write(`<script type="text/javascript">${script}<\/script>`);
  if (isJs) {
    document.write(`<script type="text/javascript">
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
<\/script>`);
  } else {
    document.write(`<script type="text/javascript">
function handleJs(js) {
  js = js.replace('export default', 'return');
  return (new Function(js))();
}

function mergeJs(js, template) {
  const jsObj = handleJs(js);
  const vueObj = Object.assign({template}, jsObj, {el: '#app'}); 
  return new Vue(vueObj);
}

try {
  mergeJs(js, template);
} catch (err) {
  console.log(err);
  document.getElementsByTagName('body')[0].innerHTML = '<p style="color:red">' + err + '</p>';
}
<\/script>`);
  }

  document.write('<script src="https://kit.fontawesome.com/5b323b6f9f.js" crossorigin="anonymous"><\/script>');
  document.write('</body>');
  document.write('</html>');
  document.close();
  return true;
};

const translateIntoVue = (frame: Window, code: string): boolean => {
  const templateMatch = code.match(/<template>\s.*?\s<\/template>/gms);
  const javascriptMatch = code.match(/<script>\s.*?\s<\/script>/gms);
  const cssMatch = code.match(/<style>\s.*?\s<\/style>/gms);

  if (!templateMatch || !javascriptMatch || !cssMatch) {
    return false;
  }

  const templateCode = templateMatch[0].replace(/\s*\n+\s*/g, ' ').replace(/>\s+/g, '>').replace(/\s+</g, '<');
  const jsCode = javascriptMatch[0].replace('<script>', '').replace('<\/script>', '');
  const cssCode = cssMatch[0].replace('<style>', '').replace('<\/style>', '');
  /* eslint-disable-next-line */
  const script = 'var template = `' + templateCode + '`;' + 'var js =`' + jsCode + '`;';
  return writeToDoc(frame.document, cssCode, script, false);
};

const translateIntoJavaScript = (
  frame: Window,
  htmlCode: string,
  javascriptCode: string,
  cssCode: string,
): boolean => {
  const templateCode = htmlCode.replace(/\s*\n+\s*/g, ' ').replace(/>\s+/g, '>').replace(/\s+</g, '<');
  const jsCode = javascriptCode.replace(/`/g, '\\`');

  /* eslint-disable-next-line */
  const script = 'var template = `<template>' + templateCode + '</template>`;' + 'var js =`' + jsCode + '`;';
  return writeToDoc(frame.document, cssCode, script, false);
};

const translateFilesIntoJavaScript = (
  frame: Window,
  htmlCode: string,
  javascriptFiles: Array<FileModel>,
  cssCode: string,
): boolean => {
  const templateCode = htmlCode.replace(/\s*\n+\s*/g, ' ').replace(/>\s+/g, '>').replace(/\s+</g, '<');

  let jsFiles = '[';
  javascriptFiles.forEach((javascriptFile) => {
    jsFiles += `
  {
    filename: \`${javascriptFile.name}\`,
    content: \`${javascriptFile.code.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`
  },
`;
  });
  jsFiles += '];';

  /* eslint-disable-next-line */
  const script = 'var template = `<template>' + templateCode + '</template>`;' + 'var files = ' + jsFiles + ';';
  return writeToDoc(frame.document, cssCode, script, true);
};

export default {
  translateIntoJavaScript,
  translateIntoVue,
  translateFilesIntoJavaScript,
};
