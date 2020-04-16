import FileModel from '@/store/models/FileModel';

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

const writeToDoc = (document: Document, cssCode: string, script: string): boolean => {
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
  document.write(`<script type="text/javascript">

function handleJs(js) {
  // js = js.replace('export default', 'return');
  return (new Function(js))();
}

function mergeJs(js, template) {
  const jsObj = handleJs(js);
  const vueObj = Object.assign({template}, js.code, {el: '#app'}); 
  return new Vue(vueObj);
}

try {
  mergeJs(js, template);
} catch (err) {
  console.log(err);
  document.getElementsByTagName('body')[0].innerHTML = '<p style="color:red">' + err + '</p>';
}
<\/script>`);

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
  return writeToDoc(frame.document, cssCode, script);
};

function transformTemplateLiterals(javascriptCode: string): string {
  const templateLiteralMatches = javascriptCode.match(/`(.*?)`/g);
  let jsCode = javascriptCode;
  if (templateLiteralMatches) {
    templateLiteralMatches.forEach((templateLiteral) => {
      const ntl = templateLiteral.replace(/`/g, '\'').replace(/\('\${/g, '(').replace(/}/g, ' + \'').replace(/\${/g, '\' + ');
      const regex = new RegExp(escapeRegExp(templateLiteral), 'g');
      jsCode = jsCode.replace(regex, ntl);
    });
  }
  return jsCode;
}

const translateIntoJavaScript = (
  frame: Window,
  htmlCode: string,
  javascriptCode: string,
  cssCode: string,
): boolean => {
  const templateCode = htmlCode.replace(/\s*\n+\s*/g, ' ').replace(/>\s+/g, '>').replace(/\s+</g, '<');
  const jsCode = transformTemplateLiterals(javascriptCode);

  /* eslint-disable-next-line */
  const script = 'var template = `<template>' + templateCode + '</template>`;' + 'var js =`' + jsCode + '`;';
  return writeToDoc(frame.document, cssCode, script);
};

function replaceNormalImportStatements(
  mainJavascriptFile: string,
  projectFiles: Array<FileModel>,
): string {
  const otherFileNamesRegex = mainJavascriptFile.match(/import\s*['"].*['"]/gm);

  if (otherFileNamesRegex) {
    // Loop through found import statements
    otherFileNamesRegex.forEach((otherFileNameRegex) => {
      // Replace single and double quotes with nothing and select the filename
      const otherFileName = otherFileNameRegex.replace(/["']/g, '').split(' ')[1];
      // Filter the project files and get the file by the import statement filename
      const file: FileModel = projectFiles
        .filter((projectFile: FileModel) => projectFile.name === otherFileName)[0];
      // Replace import statement in main javascript file with file code
      const importRegex = new RegExp(`import ['"]${file.name}['"]`, 'gm');
      mainJavascriptFile = mainJavascriptFile.replace(importRegex, file.code);
    });
  }
  return mainJavascriptFile;
}

const transpileAndExecute = (
  frame: Window,
  htmlCode: string,
  javascriptCode: string,
  cssCode: string,
  projectFiles: Array<FileModel>,
): boolean => {
  let mainJavascriptFile = javascriptCode;

  // Get all other file names (normal imports)
  mainJavascriptFile = replaceNormalImportStatements(mainJavascriptFile, projectFiles);

  return translateIntoJavaScript(
    frame, htmlCode, mainJavascriptFile, cssCode,
  );
};

export default {
  translateIntoJavaScript,
  translateIntoVue,
  transpileAndExecute,
};
