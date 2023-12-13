// https://qiita.com/kosuke_shimizu/items/187467354c32a7e18d07
function math(input) {
  url(input);
  document.getElementById('output').innerHTML = input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'output']);
}
