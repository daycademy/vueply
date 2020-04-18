import FileModel from '@/store/models/FileModel';
import jsCompiler from './jsCompiler.iframe';
import vueCompiler from './vueCompiler.iframe';

const writeToDoc = (
  document: Document,
  cssCode: string,
  script: string,
  isJs: boolean,
  template?: string,
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
  document.write(`<script type="text/javascript">${script}<\/script>`);
  if (isJs) {
    document.write(`<script type="text/javascript">${jsCompiler}<\/script>`);
  } else {
    document.write(`<script type="text/javascript">${vueCompiler}<\/script>`);
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
  const script = 'var files = ' + jsFiles + ';';
  return writeToDoc(frame.document, cssCode, script, true, templateCode);
};

export default {
  translateIntoJavaScript,
  translateIntoVue,
  translateFilesIntoJavaScript,
};
