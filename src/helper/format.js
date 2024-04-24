import moment from 'moment';
// 地區客製化
moment.updateLocale(
  'zh-tw',
  // doc:https://github.com/derekprior/momentjs-rails/blob/main/vendor/assets/javascripts/moment/zh-tw.js
  {
    weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    weekdaysShort: '週日_週一_週二_週三_週四_週五_週六'.split('_'),
    weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'YYYY/MM/DD',
      LL: 'YYYY年M月D日',
      LLL: 'YYYY年M月D日 HH:mm',
      LLLL: 'YYYY年M月D日dddd HH:mm',
      l: 'YYYY/M/D',
      ll: 'YYYY年M月D日',
      lll: 'YYYY年M月D日 HH:mm',
      llll: 'YYYY年M月D日dddd HH:mm',
    },
  },
);
function formatDate(date, formatType = 'LLLL') {
  return moment(date).local().format(formatType);
}
function formatCurrency(number, locale = 'zh-TW', currency = 'TWD') {
  return number.toLocaleString(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  });
}

export { formatDate, formatCurrency };
