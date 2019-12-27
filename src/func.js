/**
 * 重新加载微信浏览器的标题，hack 在微信 webview 中无法修改 document.title 的情况
 *
 * @param title
 */
export const reloadTitle = title => {
  if (!title) return;

  document.title = title;

  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.setAttribute('src', '/favicon.ico');

  iframe.addEventListener('load', () => {
    setTimeout(() => {
      iframe.remove();
    }, 0);
  });

  document.body.appendChild(iframe);
};

/**
 * make url params search
 *
 * @example
 *
 * ```
 * {key1: 1, key2: 2} -> key1=1&key2=2
 * ```
 *
 * @param params
 * @returns {string}
 */
export const makeUrlSearch = params => {
  const urlParams = [];

  Object.keys(params).forEach(key => {
    urlParams.push(`${key}=${params[key] || ''}`);
  });

  return urlParams.join('&');
};

/**
 * parse url search
 *
 * @example
 *
 * ```
 * (?)key1=1&key2=2 -> {key1: 1, key2: 2}
 * ```
 *
 * @param search
 * @returns {string}
 */
export const parseUrlSearch = search => {
  const params = {};

  if (search) {
    const str = search.slice(0, 1) === '?' ? search.slice(1) : search;
    str.split('&').forEach(item => {
      const items = item.split('=');
      params[items[0]] = items[1] || '';
    });
  }

  return params;
};

/**
 * 元素距离文档顶部的位置信息
 *
 * {x, y}
 *
 * @param element
 * @returns {{x: number, y: number}}
 */
export const posToDoc = element => {
  let el = element;

  let x = 0;
  let y = 0;

  while (el) {
    x += el.offsetLeft;
    y += el.offsetTop;
    el = el.offsetParent;
  }

  return { x, y };
};

/**
 * 加载图片快捷函数
 *
 * @param images
 * @param cb
 */
export const loadImages = (images, cb) => {
  const imagesToLoad = Array.isArray(images) ? [...images] : [images];

  let count = 0;
  const load = () => {
    count += 1;
    if (count >= imagesToLoad.length && cb) cb();
  };

  imagesToLoad.forEach(image => {
    const img = new Image();

    img.src = image;
    img.onload = load;
  });
};

// 用于记录上一次位置
const scrollToLastTargetRecord = {
  // id: target
};
let scrollToCount = 1;
/**
 * 滚动元素到指定位置
 *
 * @param el 元素，默认 window
 * @param interval 滚动间隔，默认 20 毫秒
 * @param step 每次减小的步长，默认 0.2
 * @param y y 坐标位置，默认 0
 * @param onComplete 到达目标元素的回调函数
 * @param animate 是否使用动画，默认 true
 */
export const scrollTo = ({
  el = window,
  interval = 20,
  step = 0.2,
  y = 0,
  onComplete,
  animate = !0,
}) => {
  const id = scrollToCount;
  scrollToCount += 1;
  scrollToLastTargetRecord[id] = -1;

  const isWin = el === window;
  const reverseStep = 1 - step;

  const initScrollY = isWin ? el.scrollY : el.scrollTop;
  // 是否是向下滚动
  const isDown = y > initScrollY;

  // 不使用动画
  if (!animate) {
    el.scrollTo(0, y);
    if (onComplete) onComplete();
    return;
  }

  const timer = setInterval(() => {
    const scrollY = isWin ? el.scrollY : el.scrollTop;

    if (!isDown && Math.abs(scrollY - y) < 1) {
      clearInterval(timer);
      if (onComplete) onComplete();
      return;
    }

    const target = !isDown
      ? (scrollY - y) * reverseStep + y
      : Math.ceil((y - scrollY) * step) + scrollY;

    // 如果是向下滚动，元素不够高，无法到达元素位置，则需要此判断，否则会陷入死循环
    if (isDown && scrollToLastTargetRecord[id] === target) {
      clearInterval(timer);
      if (onComplete) onComplete();
      return;
    }

    scrollToLastTargetRecord[id] = target;

    el.scrollTo(0, target);
  }, interval);
};

/**
 * 安全的 float（保留N位小数）
 *
 * @param f
 * @param fixed
 * @returns {number}
 */
export const safeFloat = (f, fixed = 2) => parseFloat(f.toFixed(fixed));
