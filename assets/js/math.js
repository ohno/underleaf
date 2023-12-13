// https://qiita.com/kosuke_shimizu/items/187467354c32a7e18d07
function math(input) {
  url(input);
  document.getElementById('output').innerHTML = input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  // https://docs.mathjax.org/en/v3.2-latest/web/typeset.html#handling-asynchronous-typesetting
  MathJax.typesetPromise().then(() => {
    // modify the DOM here
    MathJax.typesetPromise();
  }).catch((err) => console.log(err.message));
}
