import FileModel from '@/store/models/FileModel';
import jsCompiler from './jsCompiler.iframe';
import vueCompiler from './vueCompiler.iframe';
import tsCompiler from './tsCompiler.iframe';
import markdownCompiler from './markdown.iframe';
import markdownitTaskList from './markdownitTaskList';

const writeToDoc = (
  document: Document,
  cssCode: string,
  script: string,
  projectType: string,
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
    if (projectType === 'javascript') {
      document.write(`<script type="text/javascript">${jsCompiler}<\/script>`);
    } else if (projectType === 'vue') {
      document.write(`<script type="text/javascript">${vueCompiler}<\/script>`);
    } else if (projectType === 'typescript') {
      document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/typescript/3.9.0-beta/typescript.min.js"><\/script>');
      document.write(`<script type="text/javascript">${tsCompiler}<\/script>`);
    } else if (projectType === 'markdown') {
      document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/markdown-it/10.0.0/markdown-it.min.js"><\/script>');
      document.write(`<script>${markdownitTaskList}<\/script>`);
      document.write(`<script type="text/javascript">${markdownCompiler}<\/script>`);
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
  return writeToDoc(frame.document, cssCode, script, 'vue');
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
  return writeToDoc(frame.document, cssCode, script, 'vue');
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

  return writeToDoc(frame.document, cssCode, jsCode, 'javascript', templateCode, true);
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
  return writeToDoc(frame.document, cssCode, script, 'javascript', templateCode);
};

const translateIntoTypeScript = (
  frame: Window,
  htmlCode: string,
  typescriptFiles: Array<FileModel>,
  cssCode: string,
  header = '',
) => {
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
  return writeToDoc(frame.document, cssCode, script, 'typescript', templateCode);
};

const translateIntoMarkdown = (frame: Window, file: string) => {
  const code = `var markdown = \`${file}\``;
  return writeToDoc(frame.document, '', code, 'markdown');
};

export default {
  translateIntoJavaScript,
  translateIntoVue,
  translateIntoWebVue,
  translateFilesIntoJavaScript,
  translateIntoTypeScript,
  translateIntoMarkdown,
};
