// Copyright (c) 2015 Ismail Habib Muhammad
// protocolcheck.js
; (function () {
  function _registerEvent(target, eventType, cb) {
    if (target.addEventListener) {
      target.addEventListener(eventType, cb);
      return {
        remove: function () {
          target.removeEventListener(eventType, cb);
        }
      };
    } else {
      target.attachEvent(eventType, cb);
      return {
        remove: function () {
          target.detachEvent(eventType, cb);
        }
      };
    }
  }
  function _createHiddenIframe(target, uri) {
    var iframe = document.createElement("iframe");
    iframe.src = uri;
    iframe.id = "hiddenIframe";
    iframe.style.display = "none";
    target.appendChild(iframe);
    return iframe;
  }
  function openUriWithHiddenFrame(uri, failCb, successCb) {
    var timeout = setTimeout(function () {
      failCb();
      handler.remove();
    }, 1000);
    var iframe = document.querySelector("#hiddenIframe");
    if (!iframe) {
      iframe = _createHiddenIframe(document.body, "about:blank");
    }
    var handler = _registerEvent(window, "blur", onBlur);
    function onBlur() {
      clearTimeout(timeout);
      handler.remove();
      successCb();
    }
    iframe.contentWindow.location.href = uri;
  }
  function openUriUsingIEInOlderWindows(uri, failCb, successCb) {
    if (getInternetExplorerVersion() === 10) {
      openUriUsingIE10InWindows7(uri, failCb, successCb);
    } else if (getInternetExplorerVersion() === 9 || getInternetExplorerVersion() === 11) {
      openUriWithHiddenFrame(uri, failCb, successCb);
    } else {
      openUriInNewWindowHack(uri, failCb, successCb);
    }
  }
  function openUriUsingIE10InWindows7(uri, failCb, successCb) {
    var timeout = setTimeout(failCb, 1000);
    window.addEventListener("blur", function () {
      clearTimeout(timeout);
      successCb();
    });
    var iframe = document.querySelector("#hiddenIframe");
    if (!iframe) {
      iframe = _createHiddenIframe(document.body, "about:blank");
    }
    try {
      iframe.contentWindow.location.href = uri;
    } catch (e) {
      failCb();
      clearTimeout(timeout);
    }
  }
  function openUriInNewWindowHack(uri, failCb, successCb) {
    var myWindow = window.open('', '', 'width=0,height=0');
    myWindow.document.write("<iframe src='" + uri + "'></iframe>");
    setTimeout(function () {
      try {
        myWindow.location.href;
        myWindow.setTimeout("window.close()", 1000);
        successCb();
      } catch (e) {
        myWindow.close();
        failCb();
      }
    }, 1000);
  }
  function openUriWithMsLaunchUri(uri, failCb, successCb) {
    navigator.msLaunchUri(uri,
      successCb,
      failCb
    );
  }
  function getInternetExplorerVersion() {
    var rv = -1;
    if (navigator.appName === "Microsoft Internet Explorer") {
      var ua = navigator.userAgent;
      var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null)
        rv = parseFloat(RegExp.$1);
    }
    else if (navigator.appName === "Netscape") {
      var ua = navigator.userAgent;
      var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null) {
        rv = parseFloat(RegExp.$1);
      }
    }
    return rv;
  }
  window.protocolCheck = function (uri, failCb, successCb, unsupportedCb) {
    function failCallback() {
      failCb && failCb();
    }
    function successCallback() {
      successCb && successCb();
    }
    if (navigator.msLaunchUri) { //for IE and Edge in Win 8 and Win 10
      openUriWithMsLaunchUri(uri, failCb, successCb);
    } else {
      openUriUsingIEInOlderWindows(uri, failCallback, successCallback);
    }
  }
})();

; (function () {
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    const proto = 'microsoft-edge:'
    var href = proto + window.location.href
    window.UPTOEDG = {}
    window.UPTOEDG.close = function () {
      document.body.removeChild(window.UPTOEDG.wrap)
    }
    window.UPTOEDG.handler = function () {
      window.protocolCheck(href, function () {
        var href = 'https://go.microsoft.com/fwlink/?linkid=2108834&Channel=Stable&language=zh-cn'
        var btn = document.createElement('a')
        btn.href = href
        btn.innerHTML = 'Download Edge'
        btn.style.display = 'none'
        document.body.appendChild(btn)
        btn.click()
        document.body.removeChild(btn)
      })
      window.UPTOEDG.close()
    };
    var html
      = '<div style="position: fixed;bottom: 0;z-index: 2147483647;width: 100vw;font-family: 微软雅黑;">'
      + '<div style="margin: 0 auto;width: 590px;border: solid 1px #000;font-size: 14px;color: #000;background-color: #fff;">'
      + '<div style="border-top: solid 6px #f1ad0c;padding: 8px 16px;overflow: hidden;line-height: 2;">'
      + '<span style="margin-right: 120px;">该浏览器无法使用完整功能。请使用最新的<a style="color: #1890ff;text-decoration: underline;" href="https://www.microsoft.com/zh-cn/edge">Edge浏览器</a></span>'
      + '<a onclick="UPTOEDG.handler()" style="color: #1890ff;margin-right: 8px;text-decoration: none;" href="javascript:">我知道了</a>'
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
