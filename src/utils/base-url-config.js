// 切换 baseUrl

export function getBaseURL(baseOriginal) {
  let baseURL;
  let base = window.location.host;

  switch (baseOriginal) {

    case 'lcmp':
      if (base.includes(".l.")) {
        baseURL = 'http://127.0.0.1:8089';
      } else if (base.includes(".d.")) {
        baseURL = 'http://127.0.0.1:8089';
      } else if (base.includes(".t.")) {
        baseURL = 'http://127.0.0.1:8089';
      }
      break;

    default:
      baseURL = 'http://127.0.0.1:8089';
  }

  return baseURL;
}
