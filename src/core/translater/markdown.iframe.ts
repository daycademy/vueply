export default `
function renderMarkdown(code) {
  var md = window.markdownit({
    html: true,
    linkify: true,
    typographer: true
  });
  var result = md.render(code);
  return result;
}

try {
  document.getElementById('app').innerHTML = renderMarkdown(markdown);
} catch (err) {
  console.log(err);
  document.getElementsByTagName('body')[0].innerHTML = '<p style="color:red">' + err + '</p>';
}
`;
