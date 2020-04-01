export const transform = (type: string, code: string): string => {
  let resultCode = code;
  if (type === 'text/html') {
    const htmlCode = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Vueply Project</title>
</head>

<body>
${resultCode}
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
