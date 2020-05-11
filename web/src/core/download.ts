import FileModel from '@/store/models/FileModel';

export const transform = (type: string, code: string, importedFiles: Array<FileModel>): string => {
  let resultCode = code;
  if (type === 'text/html') {
    const javascriptFiles = importedFiles.filter((file) => file.type === 'javascript');
    const cssFiles = importedFiles.filter((file) => file.type === 'css');

    let javascriptHtmlScripts = '';
    for (let i = 0; i < javascriptFiles.length; i += 1) {
      if (javascriptFiles.length - 1 !== i) {
        javascriptHtmlScripts += `<script src="./${javascriptFiles[i].name}"><\/script>\n`;
      } else {
        javascriptHtmlScripts += `<script src="./${javascriptFiles[i].name}"><\/script>`;
      }
    }

    let cssHtmlLinks = '';
    for (let i = 0; i < cssFiles.length; i += 1) {
      if (cssFiles.length - 1 !== i) {
        cssHtmlLinks += `<link rel="stylesheet" href="./${cssFiles[i].name}">\n`;
      } else {
        cssHtmlLinks += `<link rel="stylesheet" href="./${cssFiles[i].name}">`;
      }
    }

    const htmlCode = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Vueply Project</title>
${cssHtmlLinks}
</head>

<body>
${resultCode}
${javascriptHtmlScripts}
</body>
</html>`;
    resultCode = htmlCode;
  }
  return resultCode;
};

export const download = (filename: string, text: string): void => {
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};
