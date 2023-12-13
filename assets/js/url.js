function url(input) {
  let url = new URL(window.location.href);
  let params = url.searchParams;
  params.set('input', input);
  history.pushState(null, null, url);
}
