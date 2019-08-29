# @senntyou/utils

工具函数、快捷对象、工具集等

```
npm install @senntyou/utils --save
```

```
import { isMobile, isWeiXin, ... } from '@senntyou/utils';
```

### isMobile：是否是移动端

`type: bool`

### isWeiXin：是否是微信浏览器

`type: bool`

### isIos：是否是 ios 终端

`type: bool`

### isMiniProgram：是否是微信小程序 web-view

`type: function`

（因为 `window.__wxjs_environment` 值可能还未注入，所以使用方法动态判断）

```
if (isMiniProgram()) {
  // 是微信小程序 web-view
}
```

### getDate：获取一个时间对象

`type: function`

```
const date = getDate(d);

const {
  d,          // Date 对象实例
  year,       // 年
  month,      // 月
  day,        // 日
  week,       // 周 0-6
  hours,      // 小时
  minutes,    // 分钟
  seconds,    // 秒
  date,       // 日期 2019-01-01
  time,       // 时间 01:01:01
  dateTime,   // 日期时间 2019-01-01 01:01:01
} = date;
```

- `@param/d`: `type: Date` `default: 当前` 获取某个时刻的时间数据
- `@return`: `type: {}` 时间数据

### now：当前时间数据

```
const {
  d,          // Date 对象实例
  year,       // 年
  month,      // 月
  day,        // 日
  week,       // 周 0-6
  hours,      // 小时
  minutes,    // 分钟
  seconds,    // 秒
  date,       // 日期 2019-01-01
  time,       // 时间 01:01:01
  dateTime,   // 日期时间 2019-01-01 01:01:01
} = now;
```

### refreshNow: 刷新当前时间数据

`type: function`

```
refreshNow(d)
```

- `@param/d`: `type: Date` `default: 当前` 刷新到哪一个时间，默认是当前

### urlParams：url 参数

`type: {}`

```
'url?key1=1&key2=2&key3='    =>
{
  key1: '1',
  key2: '2',
  key3: '',
}
```

### fillZero：填充 0

`type: function`

```
fillZero(num, length)
```

- `@param/num`: `type: number` `default: 0` 待处理的数字
- `@param/length`: `type: number` `default: 2` 填充长度
- `@return`: `type: string` 填充后的字符串

```
fillZero(1)        // '01'
fillZero(1, 4)        // '0001'
fillZero(12, 4)        // '0012'
```

### reloadTitle：重新加载微信浏览器的标题，hack 在微信 webview 中无法修改 document.title 的情况

`type: function`

```
reloadTitle(title)
```

- `@param/title`: `type: string` 标题

### makeUrlSearch：make url params search

`type: function`

```
makeUrlSearch(params)
```

- `@param/params`: `type: {}` 参数
- `@return`: `type: string` url search

```
makeUrlSearch({key1: 1, key2: 2})                // 'key1=1&key2=2'
```

### posToDoc：元素距离文档顶部的位置信息

`type: function`

```
posToDoc(el)
```

- `@param/params`: `type: dom` 元素
- `@return`: `type: {}` 位置信息

```
posToDoc(el)                 // { x, y }
```

### loadImages：加载图片快捷函数

`type: function`

```
loadImages(images, cb)
```

- `@param/images`: `type: string/string[]` 图片集合
- `@param/cb`: `type: function` 回调函数

```
loadImages([url1, url2, ...], () => {
  // 所有图片都加载完成
})
```

### numOfDate：把日期转成数字

`type: function`

```
numOfDate(date)
```

- `@param/date`: `type: string` 日期
- `@return`: `type: number`

```
numOfDate('2019-01-01')                // 20190101
```

### numOfTime：把时间转成数字

`type: function`

```
numOfTime(time)
```

- `@param/time`: `type: string` 时间
- `@return`: `type: number`

```
numOfTime('12:12:12')                  // 121212
```

### numOfDateTime：把日期时间转成数字

`type: function`

```
numOfDateTime(dateTime)
```

- `@param/dateTime`: `type: string` 日期时间
- `@return`: `type: number`

```
numOfDateTime('2019-01-01 12:12:12')   // 20190101121212
```

### distanceOfDates：返回两个日期之间的距离，以天计

`type: function`

```
distanceOfDates(start, end)
```

- `@param/start`: `type: string` 开始日期
- `@param/end`: `type: string` 结束日期
- `@return`: `type: number` 距离

```
distanceOfDates('2019-01-01', '2019-01-10')      // 9
distanceOfDates('2019-01-10', '2019-01-02')      // -8
```

### readableTime：格式化为可读时间（n 秒前、n 分钟前、n 小时前、n 天前、n 个月前、n 年前）

`type: function`

```
readableTime(time)
```

- `@param/time`: `type: string` 日期
- `@return`: `type: string` 可读时间

```
readableTime('2019-01-01 01:01:01')              // 12 秒前
```

### dateByInterval：获取距离输入日期指定时间间隔的日期

`type: function`

```
dateByInterval(interval, start)
```

- `@param/interval`: `type: number` `default: 0` 相隔多少天（负数表示之前的日期）
- `@param/start`: `type: string` 开始日期，默认为今天的日期
- `@return`: `type: string` 指定时间

```
dateByInterval(10, '2019-01-10')                 // '2019-01-20'
dateByInterval(-10, '2019-01-22')                 // '2019-01-12'
```

### relativeToToday：相对今天的日期（当天，过去，未来 & 相隔天数）

`type: function`

```
relativeToToday(date)
```

- `@param/date`: `type: string` 日期
- `@return`: `type: {}` 相对关系对象

```
// today: 2019-01-10
relativeToToday('2019-01-10')               // {type: 0, distance: 0}
relativeToToday('2019-01-12')               // {type: 1, distance: 2}
relativeToToday('2019-01-08')               // {type: -1, distance: 2}
```

### validStartEndDate：检查结束日期是否大于等于开始日期

`type: function`

```
validStartEndDate(start, end)
```

- `@param/start`: `type: string` 开始日期，格式 2019-01-01
- `@param/end`: `type: string` 结束日期，格式 2019-01-01
- `@return`: `type: bool` 是否合法

```
validStartEndDate('2019-01-10')                  // true
validStartEndDate('2019-01-10', '2019-01-10')    // true
validStartEndDate('2019-01-10', '2019-01-12')    // true
validStartEndDate('2019-01-10', '2019-01-08')    // false
```

### htmlToText：提取富文本中的纯文字

`type: function`

```
htmlToText(content)
```

- `@param/content`: `type: string` 富文本
- `@return`: `type: string` 纯文字

```
htmlToText('<p>haha</p>')              // 'haha'
```

### removeATarget：移除 a 标签的 target=\_blank 属性

`type: function`

```
removeATarget(content)
```

- `@param/content`: `type: string` 富文本
- `@return`: `type: string`

```
removeATarget('<a href="/" target=_blank>haha</a>')              // '<a href="/">haha</a>'
```

## readableNumber：格式化为可读数字

`type: function`

```
readableNumber(num, group)
```

- `@param/num`: `type: number` 待处理的数字
- `@param/group`: `type: number` 分组，以多少个数字为一组，默认 3
- `@return`: `type: string`

```
readableNumber(123456789)              // '123,456,789'
readableNumber(123456789.123, 4)              // '1,2345,6789.123'
```

## scrollTo：滚动元素到指定位置

`type: function`

```
scrollTo({el, interval, y})
```

- `@param/el`: `type: dom` 容器元素，默认 `window`
- `@param/interval`: `type: number` 滚动间隔，默认 20 毫秒
- `@param/y`: `type: number` y 坐标位置，默认 0
