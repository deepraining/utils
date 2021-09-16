/* eslint-disable no-cond-assign */

/**
 * 提取富文本中的纯文字
 *
 * @param content
 * @returns {string}
 */
export const htmlToText = content => content.replace(/<([^><]*?)>/g, '');

/**
 * 移除 a 标签的 target=_blank 属性
 *
 * @param content
 * @returns {void | string | *}
 */
export const removeATarget = content => {
  const regExp = / target=(_blank|"_blank"|'_blank')/gi;

  return content.replace(regExp, '');
};
