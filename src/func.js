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
    const value = params[key] ? encodeURIComponent(params[key]) : '';
    urlParams.push(`${key}=${value}`);
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
 * @param y y 坐标位置，默认 0
 * @param onComplete 到达目标元素的回调函数
 */
export const scrollTo = ({ el = window, interval = 20, y = 0, onComplete }) => {
  const id = scrollToCount;
  scrollToCount += 1;
  scrollToLastTargetRecord[id] = -1;

  const isWin = el === window;

  const timer = setInterval(() => {
    const scrollY = isWin ? el.scrollY : el.scrollTop;

    if (Math.abs(scrollY - y) < 1) {
      clearInterval(timer);
      if (onComplete) onComplete();
      return;
    }

    const target =
      scrollY > y
        ? (scrollY - y) * 0.8 + y
        : Math.ceil((y - scrollY) * 0.2) + scrollY;

    // 如果是向下滚动，元素不够高，无法到达元素位置，则需要此判断，否则会陷入死循环
    if (scrollToLastTargetRecord[id] === target) {
      clearInterval(timer);
      if (onComplete) onComplete();
      return;
    }

    scrollToLastTargetRecord[id] = target;

    el.scrollTo(0, target);
  }, interval);
};
