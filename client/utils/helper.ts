import { marked as defaultMarked } from "marked";
import { DirectusTypes } from "~/directus";

export function pMarked(text: string) {
  // HACK to add multiple new lines: https://github.com/markedjs/marked/issues/190#issuecomment-865303317
  return defaultMarked(text.replace(/\n(?=\n)/g, "\n\n<br/>\n"), {
    mangle: false,
    headerIds: false,
    breaks: true,
    gfm: true,
  });
}

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

/**
 * Format UTC date to locale date string
 * @param utcDate
 * @returns
 */
export function formatUtcDate(utcDate: string) {
  const dateObj = new Date(utcDate);

  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Calculates the read time of a blog post assuming that the average person reads 200 words per minute
 * @param blogSections
 * @returns
 */
export function calculateBlogReadTime(
  blogSections: DirectusTypes["blog_sections"][]
) {
  const totalWords = blogSections.reduce((acc, curr) => {
    if (curr.type === "image") return acc;

    return acc + (curr.textContent?.split(" ").length ?? 0);
  }, 0);

  return Math.ceil(totalWords / 200);
}
