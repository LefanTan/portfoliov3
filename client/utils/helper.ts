import { marked as defaultMarked } from "marked";

defaultMarked.setOptions({
  mangle: false,
  headerIds: false,
});

export const marked = defaultMarked;

export function throttle(fn: Function, wait = 200) {
  // Previously called time of the function
  let prev = 0;

  return function (...args: any[]) {
    const now = new Date().getTime();
    // If current time is `wait` time more than start time, invoke the fn
    if (now - prev > wait) {
      prev = now;
      return fn(...args);
    }
  };
}

export function debounce(fn: Function, wait = 200, maxWait?: number) {
  let timeout: ReturnType<typeof setTimeout>;

  // Previously called time of the function
  let prev = 0;

  return function (...args: any[]) {
    const now = new Date().getTime();

    if (maxWait && now - prev > maxWait) {
      prev = now;
      return fn(...args);
    }
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
}
