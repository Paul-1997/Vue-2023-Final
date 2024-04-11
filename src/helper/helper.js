export function debounce(callback, delay = 350) {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export function throttle(callback, delay = 350) {
  let timer;
  return (...args) => {
    if (timer) return;

    timer = setTimeout(() => {
      timer = null;
    }, delay);
    callback(...args);
  };
}
