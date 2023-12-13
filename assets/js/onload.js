window.onload = function() {
  const searchParams = new URLSearchParams(window.location.search)
  if (searchParams.has('input') && !(searchParams.get('input')=="")) {
    document.getElementById('input').value = searchParams.get('input');
  } else {
    document.getElementById('input').value =`Hello!

$$
f(x) = x^2
$$

Start writing!
`;
  }
  document.getElementById('output').value = math(document.getElementById('input').value);

  // tab support
  document.getElementById('input').addEventListener('keydown', function (e) {
    var elem, end, start, value;
    if (e.keyCode === 9) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      elem = e.target;
      start = elem.selectionStart;
      end = elem.selectionEnd;
      value = elem.value;
      elem.value = "" + (value.substring(0, start)) + "\t" + (value.substring(end));
      elem.selectionStart = elem.selectionEnd = start + 1;
      return false;
    }
  });
}