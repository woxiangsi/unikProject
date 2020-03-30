/*
最后修改日期： 2017-08-03 13:25:08 张云飞
使用说明请参考《mobile_agent_使用说明.md》
*/

console.log("start load mobile agent js file: mobile_agent_ext2.js");

window.mobileAgent = window.mobileAgent || {};

(function (mobileAgent, window) {

    var _postMessage = function (action, params, callBack) {
        var json = JSON.stringify({
            action: action,
            params: params,
            callBack: callBack
        });
        if (typeof window.mobileAgent != "undefined" &&
            typeof window.mobileAgent.postMessage != "undefined") {
            window.mobileAgent.postMessage(json);
        }
        if (typeof window.webkit != "undefined" &&
            typeof window.webkit.messageHandlers != "undefined" &&
            typeof window.webkit.messageHandlers.iOSAgent != "undefined") {
            window.webkit.messageHandlers.iOSAgent.postMessage(json);
        }
    };

    //是否运行在app环境
    mobileAgent.isRunOnApp = function () {
        if (typeof window.mobileAgent != "undefined" &&
            typeof window.mobileAgent.postMessage != "undefined") {
            return true;
        }

        if (typeof window.webkit != "undefined" &&
            typeof window.webkit.messageHandlers != "undefined" &&
            typeof window.webkit.messageHandlers.iOSAgent != "undefined") {
            return true;
        }
        return false;
    };

    mobileAgent.closeWindow = function () {
        _postMessage('close');
    };

    mobileAgent.goBack = function () {
        _postMessage('back');
    };
    //登出
    mobileAgent.logout = function () {
        _postMessage('logout');
    };
    mobileAgent.sharePage = function (title, content, imagePath, url) {
        var callBackMethodName = 'callBack' + Math.random();
        mobileAgent[callBackMethodName] = function (err, rs) {
            callBack(err, rs);
            mobileAgent[callBackMethodName] = null;
            callBackMethodName = null;
        };

        _postMessage(
            'share', {
                title: title,
                content: content,
                imagePath: imagePath,
                url: url
            },
            callBackMethodName
        );
    };

    mobileAgent.scanQRCode = function (callBackName) {
        _postMessage('scanQRCode', {
            callBackName: callBackName
        });
    };


    mobileAgent.sharePagePart = function(title, content, imagePath, url, shareType,subHeight) {
        var callBackMethodName = 'callBack' + Math.random();
        mobileAgent[callBackMethodName] = function(err, rs) {
            callBack(err, rs);
            mobileAgent[callBackMethodName] = null;
            callBackMethodName = null;
        };

        _postMessage(
            'share', {
                title: title,
                content: content,
                imagePath: imagePath,
                shareType: shareType,
                url: url,
                subHeight:subHeight
            },
            callBackMethodName
        );
    };

    mobileAgent.onStatisticsEvent = function(eventName,eventId) {
        _postMessage('onStatisticsEvent', {
            eventId: eventId,
            eventName: eventName
        });
    };

    mobileAgent.callWindowFun = function (funName, args, requestCode) {
        var rs = null;
        var responseCode = -1;
        if (window[funName]) {
            rs = window[funName].apply(null, args);
            responseCode = 0;
        } else {
            responseCode = -1;
        }
        _postMessage(
            'callWindowFun_callback', {
                funName: funName,
                result: [rs],
                requestCode: requestCode,
                responseCode: responseCode
            }
        );
    };

    mobileAgent.showErrorView = function (errCode, errText) {
        _postMessage('showErrorView', {
            errCode: errCode,
            errText: errText
        });
    };

    mobileAgent.openNewWindow = function (url, title) {
        _postMessage('openNewWindow', {
            url: url,
            title: title
        });
    };

    mobileAgent.newsDetailButtonAction = function(){
        _postMessage('newsDetailButtonAction');
    };

    mobileAgent.openURL = function (url, para, callBack) {
        var callBackMethodName = 'callBack' + Math.random();
        mobileAgent[callBackMethodName] = function (err, rs) {
            callBack(err, rs);
            mobileAgent[callBackMethodName] = null;
            callBackMethodName = null;
        };
        _postMessage(
            'openURL', {
                url: url,
                para: para
            },
            callBackMethodName
        );
    };

    /* pageName 原生与H5互相约定的名称
     * arguments 参数，H5将原生需要的参数通过arguments传过去
     * 1.里程统计跳转轨迹回放
     * pageName：MILEAGE_STATISTICAL_TRACK_REPLAY
     * arguments：carId(车辆id值)、carCode(车牌号)、beginDate(开始时间)、endDate(结束时间)
     * 2.产销智能推荐油耗排行榜跳转车辆监控
     * pageName：INTELLIGENCE_REAL_TIME_MONITOR
     * arguments：vin(车辆vin)
     * 3.维修保养工单详情
     * pageName：MAINTAIN_DETAILS
     * arguments：woCode（工单号）
     */

    mobileAgent.goPage = function (pageName, argumentss) {
        _postMessage('goPage', {
            pageName: pageName,
            arguments: argumentss
        });
    };

    mobileAgent.onUmengEvent = function (eventName, eventId) {
        _postMessage('umengEvent', {
            eventName: eventName,
            eventId: eventId
        });
    };
    //调用原生日历方法
    mobileAgent.dateSelected = function (selectedStyle,fromDate,toDate,dateSelectedCallBack) {
        _postMessage('dateSelected', {
            selectedStyle:selectedStyle,
            fromDate: fromDate,
            toDate:toDate,
            dateSelectedCallBack:dateSelectedCallBack
        });
    };

    mobileAgent.postMessageToApp = function (action, params) {
        _postMessage('' + action, params);
    };

    /**
     添加导航栏右侧按钮

     buttonPlace： 按钮的位置，目前可选值为first,second
     text    ： 按钮名称
     imageType： 按钮图片类型，目前可选值为share
     actionCallBackName:  按钮出发事件回调名称，需要全局函数
     */
    mobileAgent.addNavBarRightButton = function (buttonPlace, text, imageType, actionCallBackName) {
        _postMessage('addNavBarRightButton', {
            buttonPlace: buttonPlace,
            text: text,
            imageType: imageType,
            actionCallBackName: actionCallBackName
        });
    };


    /**
     * 获取位置
     * @param buttonPlace
     * @param text
     * @param imageType
     * @param actionCallBackName
     * @param pageType 1:销售活动列表-活动提报 2：大客户经理-地址维护
     */
    mobileAgent.getLatitudeAndLongitude = function (addressList,judgeChange,actionCallBackName,pageType) {
        _postMessage('getLatitudeAndLongitude', {
            addressList: addressList,
            judgeChange: judgeChange,
            actionCallBackName: actionCallBackName,
            pageType:pageType
        });
    };


    /**
     * 缩放图片
     * @param buttonPlace
     * @param text
     * @param imageType
     * @param actionCallBackName
     */
    mobileAgent.pictureZoom = function (pictureList) {
        _postMessage('pictureZoom', {
            pictureList: pictureList
        });
    };



    // 给左侧导航栏添加按钮
    mobileAgent.addNavBarLeftButton = function (buttonPlace, text, imageType, actionCallBackName) {
        _postMessage('addNavBarLeftButton', {
            buttonPlace: buttonPlace,
            text: text,
            imageType: imageType,
            actionCallBackName: actionCallBackName
        });
    };

    // type（ 1: 日 2： 周 3： 月）
    // time： 2018 - 3 - 10
    mobileAgent.showTimePicker = function (type, time, actionCallBackName) {
        _postMessage('showTimePicker', {
            type: type,
            time: time,
            actionCallBackName: actionCallBackName
        });
    };

    /**
     选择照片并上传

     successCallBackName： 成功回调方法名，参数有：图片URL
     failedCallBackName： 失败回调方法名,参数有：失败原因
     isClear 1：压缩比例小点，显示清晰；2：显示不太清晰
     */
    mobileAgent.selectImageAndUpload = function (successCallBackName, failedCallBackName,picLimit,isClear) {
        _postMessage('selectImageAndUpload', {
            successCallBackName: successCallBackName,
            failedCallBackName: failedCallBackName,
            picLimit:picLimit,
            isClear:isClear
        });
    };
    /**
     识别身份证信息
     successCallBackName： 成功回调方法名，参数有：图片URL
     failedCallBackName： 失败回调方法名,参数有：失败原因
     */
    mobileAgent.analyseImageAndUpload = function (successCallBackName, failedCallBackName,picLimit,isClear) {
        _postMessage('analyseImageAndUpload', {
            successCallBackName: successCallBackName,
            failedCallBackName: failedCallBackName,
        });
    };

    /**
     * @description: 获取定位点
     * @param {callBack}:JS回调函数.{longitude:"经度",latitude:"纬度",address:"地址名称"}
     * @return:
     */
    mobileAgent.getLocation = function(callBack){
        var callBackMethodName = 'callBack' + Math.random();
        mobileAgent[callBackMethodName] = function (err, rs) {
            callBack(err, rs);
            mobileAgent[callBackMethodName] = null;
            callBackMethodName = null;
        };
        _postMessage(
            "location",
            {},
            callBackMethodName
        );
    };

        /**
     * @description: 获取定位点
     * @param {callBack}:JS回调函数.{longitude:"经度",latitude:"纬度",address:"地址名称"}
     * @return:
     */
    mobileAgent.getLocation1 = function(callBack){
        var callBackMethodName = 'callBack' + Math.random();
        mobileAgent[callBackMethodName] = function (err, rs) {
            callBack(err, rs);
            mobileAgent[callBackMethodName] = null;
            callBackMethodName = null;
        };
        _postMessage(
            "getLocation",
            {},
            callBackMethodName
        );
    };

    mobileAgent.getReverse = function(callBack){
        var callBackMethodName = 'callBack' + Math.random();
        mobileAgent[callBackMethodName] = function (err, rs) {
            callBack(err, rs);
            mobileAgent[callBackMethodName] = null;
            callBackMethodName = null;
        };
        _postMessage(
            "getReverse",
            {},
            callBackMethodName
        );
    };

    //设置结果值
    mobileAgent.setResult = function (resultData) {
        _postMessage('setResult', resultData);
    };

    mobileAgent.hideNavigationBar = function () {
        _postMessage('hideNavigationBar');
    };

    mobileAgent.showNavigationBar = function () {
        _postMessage('showNavigationBar');
    };



    mobileAgent.jumpToHistory = function(history){
        _postMessage('jumpToHistory',{
            history:history
        });
    };

    mobileAgent.clearTitleView = function(){
        _postMessage('clearTitleView');
    };




    // 消息传小红点数量
    mobileAgent.unReadMessageNumberDidChange = function (messageNumber) {
        _postMessage('unReadMessageNumberDidChange', {messageNumber: messageNumber});
    };

    // 消息记录用户选择tab的行为
    mobileAgent.changeMessageTabAction  = function (messageTab) {
        _postMessage('changeMessageTabAction', {messageTab: messageTab});
    };

    // 消息点击js方法
    mobileAgent.tapOneMessageAction = function (params) {
        _postMessage('tapOneMessageAction', params);
    };


})(window.mobileAgent || {}, window);


//hybrid对象,hybrid 用于js自身使用，接收来自客户端的调用
window.hybrid = window.hybrid || {};

(function (hybrid, window) {
    hybrid._eventArray = new Array(); //权限数组
    //引发事件
    hybrid.raiseEvent = function (action, params) {
        for (var i in hybrid._eventArray) {
            var evt = hybrid._eventArray[i];
            if (evt != null && evt.eventName === action) {
                console.log("hit on " + evt);
                evt.callback.apply(null, [params]);
            }
        }
    };

    hybrid.addEventListener = function (eventName, callback) {
        hybrid._eventArray.push({eventName: eventName, callback: callback});
    };

    hybrid.removeEventListener = function (eventName) {
        for (var i in hybrid._eventArray) {
            var evt = hybrid._eventArray[i];
            if (evt != null && evt.eventName === eventName) {
                hybrid._eventArray.splice(i, 1);
            }
        }
    };

    hybrid.sendEventMessage = function (msg) {
        mobileAgent.postMessageToApp('sendEventMessage', msg);
    };

})(window.hybrid || {}, window);

//hybrid.addEventListener("xxx", function(para){
//     console.log("para"+para);
//})
//
//hybrid.raiseEvent("xxx",{"d":"v"});
//
//hybrid.removeEventListener("xxx");
//
//hybrid.raiseEvent("xxx",{"d":"v"});