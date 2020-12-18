;(function() {
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    window.UPTOEDG = {}
    window.UPTOEDG.close = function() {
      document.body.removeChild(window.UPTOEDG.wrap)
    }
    const html
    = '<div style="position: fixed;bottom: 0;z-index: 99999;width: 100vw;font-family: 微软雅黑;">'
      + '<div style="margin: 0 auto;width: 590px;border: solid 1px #000;font-size: 14px;color: #000;background-color: #fff;">'
        + '<div style="border-top: solid 6px #f1ad0c;padding: 8px 16px;overflow: hidden;line-height: 2;">'
          + '<span style="margin-right: 120px;">该浏览器无法使用完整功能。请使用最新的<a style="color: #1890ff;text-decoration: underline;" href="https://www.microsoft.com/zh-cn/edge">Edge浏览器</a></span>'
          + '<a onclick="UPTOEDG.close()" style="color: #1890ff;margin-right: 8px;text-decoration: none;" href="https://go.microsoft.com/fwlink/?linkid=2108834&Channel=Stable&language=zh-cn">我知道了</a>'
          + '<svg onclick="UPTOEDG.close()" style="width:16px;height:16px;position: relative;top: 2px;" viewBox="0 0 24 24">'
            + '<path fill="#a0a0a0" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />'
          + '</svg>'
        + '</div>'
      + '</div>'
    + '</div>'
    window.UPTOEDG.wrap = document.createElement('div')
    window.UPTOEDG.wrap.innerHTML = html
    document.body.appendChild(window.UPTOEDG.wrap)
  }
})();
