import { fillZero } from './num';

// 一天的毫秒数
const secondsOfMinute = 60;
const secondsOfHour = 60 * secondsOfMinute;
const secondsOfDay = 24 * secondsOfHour;
const secondsOfMonth = 30 * secondsOfDay;
const secondsOfYear = 12 * secondsOfMonth;
const millisecondsOfDay = 1000 * secondsOfDay;

/**
 * 获取一个时间对象
 *
 * @returns {{date: string, dateTime: string, hours: number, seconds: number, week: number, d: Date, month: number, year: number, minutes: number, time: string, day: number}}
 */
export const getDate = date => {
  const d = date || new Date();
  const year = d.getFullYear(); // 当前4位年份
  const month = d.getMonth() + 1; // 当前月份 1-12
  const day = d.getDate(); // 当前星期 0-6 (日-六)
  const week = d.getDay(); // 当前几号
  const hours = d.getHours(); // 小时
  const minutes = d.getMinutes(); // 分钟
  const seconds = d.getSeconds(); // 秒

  const monthStr = fillZero(month);
  const dayStr = fillZero(day);
  const hoursStr = fillZero(hours);
  const minutesStr = fillZero(minutes);
  const secondsStr = fillZero(seconds);

  return {
    d,
    year,
    month,
    day,
    week,
    hours,
    minutes,
    seconds,
    date: `${year}-${monthStr}-${dayStr}`,
    time: `${hoursStr}:${minutesStr}:${secondsStr}`,
    dateTime: `${year}-${monthStr}-${dayStr} ${hoursStr}:${minutesStr}:${secondsStr}`,
  };
};

/**
 * 当前时间数据
 */
export const now = getDate();

/**
 * 刷新当前时间数据
 */
export const refreshNow = date => {
  const newDate = getDate(date);

  Object.keys(newDate).forEach(key => {
    now[key] = newDate[key];
  });
};

/**
 * 把日期转成数字
 *
 * '2019-01-01' => 20190101
 *
 * @param date
 * @returns {number}
 */
export const numOfDate = date =>
  parseInt(`${date.slice(0, 4)}${date.slice(5, 7)}${date.slice(8, 10)}`, 10);

/**
 * 把时间转成数字
 *
 * '12:12:12' => 121212
 *
 * @param time
 * @returns {number}
 */
export const numOfTime = time =>
  parseInt(`${time.slice(0, 2)}${time.slice(3, 5)}${time.slice(6, 8)}`, 10);

/**
 * 把日期时间转成数字
 *
 * '2019-01-01 01:01:01' => 20190101010101
 *
 * @param dateTime
 * @returns {number}
 */
export const numOfDateTime = dateTime =>
  parseInt(
    `${dateTime.slice(0, 4)}${dateTime.slice(5, 7)}${dateTime.slice(
      8,
      10,
    )}${dateTime.slice(11, 13)}${dateTime.slice(14, 16)}${dateTime.slice(
      17,
      19,
    )}`,
    10,
  );

/**
 * 返回两个日期之间的距离，以天计
 *
 * @param start
 * @param end
 * @returns {number}
 */
export const distanceOfDates = (start, end) => {
  if (!start || !end) return 0;

  // 兼容 ios
  const startDate = new Date(start.replace(/-/g, '/'));
  const endDate = new Date(end.replace(/-/g, '/'));

  return Math.floor(
    (endDate.getTime() - startDate.getTime()) / millisecondsOfDay,
  );
};

/**
 * 格式化为可读时间
 *
 * 秒前
 * 分钟前
 * 小时前
 * 天前
 * 个月前
 * 年前
 *
 * @param time
 * @returns {string}
 */
export const readableTime = time => {
  if (!time) return '';

  // ios 兼容
  const date = new Date(time.replace(/-/g, '/'));
  const current = new Date();

  const distance = current.getTime() - date.getTime();
  const seconds = Math.floor(distance / 1000);

  if (seconds < secondsOfMinute) return `${seconds}秒前`;
  if (seconds < secondsOfHour)
    return `${Math.floor(seconds / secondsOfMinute)}分钟前`;
  if (seconds < secondsOfDay)
    return `${Math.floor(seconds / secondsOfHour)}小时前`;
  if (seconds < secondsOfMonth)
    return `${Math.floor(seconds / secondsOfDay)}天前`;
  if (seconds < secondsOfYear)
    return `${Math.floor(seconds / secondsOfMonth)}个月前`;
  return `${Math.floor(seconds / secondsOfYear)}年前`;
};

/**
 * 获取距离输入日期指定时间间隔的日期
 *
 * @param interval 相隔多少天（负数表示之前的日期）
 * @param start 开始日期，默认为今天的日期
 * @returns {string}
 */
export const dateByInterval = (interval = 0, start = now.date) => {
  const startDate = new Date(start.replace(/-/g, '/'));
  // 时间戳
  const startDateTime = startDate.getTime();

  const dateTime = startDateTime + interval * millisecondsOfDay;
  const date = new Date(dateTime);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${fillZero(month)}-${fillZero(day)}`;
};

/**
 * 相对今天的日期（当天，过去，未来 & 相隔天数）
 *
 * @param date
 * @returns {{type: number, distance: number}}
 *     type: -1(past), 0(today), 1(future)
 *     distance: days interval
 */
export const relativeToToday = date => {
  const dates = date.split('-');
  const year = parseInt(dates[0], 10);
  const month = parseInt(dates[1], 10);
  const day = parseInt(dates[2], 10);

  // today
  if (year === now.year && month === now.month && day === now.day)
    return { type: 0, distance: 0 };

  // future
  if (
    year > now.year ||
    (year === now.year && month > now.month) ||
    (year === now.year && month === now.month && day > now.day)
  )
    return { type: 1, distance: distanceOfDates(now.date, date) };

  // past
  return { type: -1, distance: distanceOfDates(date, now.date) };
};

/**
 * 检查结束日期是否大于等于开始日期
 *
 * @param start 开始日期，格式 2019-01-01
 * @param end 结束日期，格式 2019-01-01
 * @returns {boolean}
 */
export const validStartEndDate = (start, end) => {
  if (!start || !end) return !0;

  const startNum = numOfDate(start);
  const endNum = numOfDate(end);

  return endNum >= startNum;
};
