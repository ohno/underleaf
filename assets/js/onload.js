window.onload = function() {
  const searchParams = new URLSearchParams(window.location.search)
  if (searchParams.has('input') && !(searchParams.get('input')=="")) {
    document.getElementById('input').value = searchParams.get('input');
  } else {
    document.getElementById('input').value =`Hello!

$$
f(x) = ^2
$$
`;
  }
  document.getElementById('output').value = math(document.getElementById('input').value);
}