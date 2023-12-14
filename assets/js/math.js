// https://qiita.com/kosuke_shimizu/items/187467354c32a7e18d07
function math(input) {
  // update URL
  url(input);
  // update textarea size
  var Hin  = document.getElementById('input').scrollHeight;
  var Hout = document.getElementById('output').scrollHeight;
  document.getElementById('input').height = (Math.max(Hin, Hout)*2) + "px";
  console.log(document.getElementById('input').height);
  console.log(document.getElementById('input').scrollHeight);

  // update LaTeX
  document.getElementById('output').innerHTML = input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  // https://docs.mathjax.org/en/v3.2-latest/web/typeset.html#handling-asynchronous-typesetting
  MathJax.typesetPromise().then(() => {
    // modify the DOM here
    MathJax.typesetPromise();
  }).catch((err) => console.log(err.message));
}
