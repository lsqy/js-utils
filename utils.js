var utils = {
    isIOS: function() {
        var u = navigator.userAgent;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        return isIOS;
    },
    isAndroid: function() {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        return isAndroid;
    },
    /**
     * 将query字符串转为json数据
     * @param url
     * @returns {{json数据}}
     */
    query2json: function(url) {
        var getSearch, getSearchJson = {};
        //url支持两种模式，第一种是标准模式a.html?b=c#d.html，第二种是hash在前a.html#d.html?b=c
        var search = url ? url : location.search;
        //对第二种url提供兼容支持
        if (!url && !location.search && location.hash) {
            search = location.hash.substring(location.hash.indexOf("?") + 1);
        }
        var turlstr = (decodeURIComponent(search).replace(/\S*\?/, ""));
        getSearch = turlstr.replace(/\&/g, ",");
        var getSearchArr = getSearch.split(",");
        for (var i = 0, len = getSearchArr.length; i < len; i++) {
            var temp = getSearchArr[i].split("=");
            //还原$.param() 待完善
            var m = temp[0].match(/^(.+)\[(\d+)\]\[(.+)\]$/)
            if (m) {
                getSearchJson[m[1]] = getSearchJson[m[1]] || [];
                getSearchJson[m[1]][m[2]] = getSearchJson[m[1]][m[2]] || {};
                getSearchJson[m[1]][m[2]][m[3]] = [temp[1]];
            } else {
                getSearchJson[temp[0]] = temp[1];
            }

        }
        return getSearchJson;
    },
    /**
     * [throttle description]
     * 节流函数,防止重复点击
     * @param  {[type]} func    [要执行的函数]
     * @param  {[type]} wait    [等待的的时间]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    throttle: function(func, wait, options) {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        options || (options = {});
        var later = function() {
            previous = options.leading === false ? 0 : new Date().getTime();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        };
        return function() {
            var now = new Date().getTime();
            if (!previous && options.leading === false) previous = now;
            var remaining = wait - (Math.abs(now - previous));
            context = this;
            args = arguments;
            if (remaining <= 0) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    },
    /**
     * 比较时间大小
     */
    compareDate: function(d1, d2) {
        return ((new Date(d1.replace(/-/g, "\/"))) > (new Date(d2.replace(/-/g, "\/"))));
    }
}
