import FileModel from '@/store/models/FileModel';
import jsCompiler from './jsCompiler.iframe';
import vueCompiler from './vueCompiler.iframe';

const writeToDoc = (
  document: Document,
  cssCode: string,
  script: string,
  isJs: boolean,
  template?: string,
  singleFile = false,
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
  if (!template) document.write('<div id="app"></div>');
  else document.write(template);
  if (!singleFile) {
    document.write(`<script type="text/javascript">${script}<\/script>`);
    if (isJs) {
      document.write(`<script type="text/javascript">${jsCompiler}<\/script>`);
    } else {
      document.write(`<script type="text/javascript">${vueCompiler}<\/script>`);
    }
  } else {
    document.write(`<script type="text/javascript">
;(function() {
  ${script}
})()
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

const translateIntoWebVue = (
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

const translateIntoJavaScript = (
  frame: Window,
  htmlCode: string,
  javascriptCode: string,
  cssCode: string,
  header = '',
): boolean => {
  let templateCode = htmlCode;
  if (header && templateCode.search('<h1 id="headline">')) {
    const headline = templateCode.substring(
      templateCode.search('<h1 id="headline">'), templateCode.search('</h1>'),
    ).split('>');
    if (headline) {
      const regexp = new RegExp(headline[1], 'g');
      templateCode = templateCode.replace(regexp, header);
    }
    templateCode = templateCode.replace(/\s*\n+\s*/g, ' ').replace(/>\s+/g, '>').replace(/\s+</g, '<');
  } else {
    templateCode = htmlCode.replace(/\s*\n+\s*/g, ' ').replace(/>\s+/g, '>').replace(/\s+</g, '<');
  }
  const jsCode = javascriptCode.replace(/`/g, '\\`');

  return writeToDoc(frame.document, cssCode, jsCode, true, templateCode, true);
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
  const script = 'var files = ' + jsFiles + ';';
  return writeToDoc(frame.document, cssCode, script, true, templateCode);
};

const translateIntoTypeScript = (
  frame: Window,
  htmlCode: string,
  typescriptFiles: Array<FileModel>,
  cssCode: string,
) => {
  const templateCode = htmlCode.replace(/\s*\n+\s*/g, ' ').replace(/>\s+/g, '>').replace(/\s+</g, '<');

  let tsFiles = '[';
  typescriptFiles.forEach((tsFile) => {
    tsFiles += `
  {
    filename: \`${tsFile.name}\`,
    content: \`${tsFile.code.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`
  },
`;
  });
  tsFiles += '];';

  /* eslint-disable-next-line */
  const script = 'var files = ' + tsFiles + ';';
  return writeToDoc(frame.document, cssCode, script, false, templateCode);
};

export default {
  translateIntoJavaScript,
  translateIntoVue,
  translateIntoWebVue,
  translateFilesIntoJavaScript,
  translateIntoTypeScript,
};
