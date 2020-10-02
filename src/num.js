/* eslint-disable import/prefer-default-export */

/**
 * 填充 0
 *
 * @param num
 * @param length 长度，默认为2
 * @returns {string}
 */
export const fillZero = (num = 0, length = 2) => {
  let result = `${num}`;

  while (true) {
    if (result.length >= length) break;

    result = `0${result}`;
  }

  return result;
};

/**
 * 格式化为可读数字
 *
 * 123456789 => 123,456,789
 * 123456789.123 => 1,2345,6789.123
 *
 * @param num 待处理的数字
 * @param group 分组，以多少个数字为一组，默认 3
 * @returns {string}
 */
export const readableNumber = (num = 0, group = 3) => {
  if (!num) return '0';

  const items = `${num}`.split('.');

  const intStr = `${items[0]}`;
  const decimalStr = `${items[1] || ''}`;

  // 不需要进行分组
  if (intStr.length <= group) return `${num}`;

  const reverseIntStr = intStr
    .split('')
    .reverse()
    .join('');
  const resultIntStr = reverseIntStr
    .replace(new RegExp(`(\\d{${group}})`, 'g'), '$1,')
    .split('')
    .reverse()
    .join('');

  const finalIntStr =
    resultIntStr.slice(0, 1) === ',' ? resultIntStr.slice(1) : resultIntStr;

  return `${finalIntStr}${decimalStr ? `.${decimalStr}` : ''}`;
};

/**
 * 安全的 float（保留N位小数）
 *
 * @param f
 * @param fixed
 * @returns {number}
 */
export const safeFloat = (f, fixed = 2) => parseFloat(f.toFixed(fixed));
