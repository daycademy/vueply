export default `
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
`;
