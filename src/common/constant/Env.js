/** *******************************************
Env 环境配置， 在构建时期决定 打包构建的内容

描述：在商业软件中，经常需要根据不同构建类型切换不同配置项，比如 HostURl。
    可能的构建类型有： 开发，uat,正式包等。
注意：需要在命令提示符状态下出入环境变量 REACT_APP_BUILD_TYPE 变量。
    请参阅package.json
使用示例：
  import { HostURL,UploadFileHostURL } from "../Env.js";
  //HostURL;
******************************************** */


// 开发 环境配置
const env = {
  DEVELOP: {
    HostURL: 'http://sy.aerozhonghuan.com:11000/mock/10', //图吧域名
    
    getQdfawHost: "http://sy.aerozhonghuan.com:81/dev/qdfaw/api", //车场域名

    getUserCenterHost: "http://sy.aerohuanyou.com:81/test/qdfaw/usercenter",  //用户中心基地址
    
    getWeChatHost: "https://wx.aerohuanyou.com/qqWeChatOfficialTest/web", //微信工程基地址

    getActivityHost: "http://211.145.49.130:85/qq_activity_dev/web",  //活动h5工程基地址

  },
  TEST: {
    HostURL: "http://sy.aerozhonghuan.com:11000/mock/10", //图吧域名

    getQdfawHost: "http://sy.aerozhonghuan.com:81/test/qdfaw/api", //车场域名

    getUserCenterHost: "https://sy.aerohuanyou.com/test/qdfaw/usercenter",  //用户中心基地址
    
    getWeChatHost: "https://wx.aerohuanyou.com/qqWeChatOfficialUat/web/", //微信工程基地址

    getActivityHost: "http://211.145.49.130:85/qq_activity_test/web",  //活动h5工程基地址
  },
  UAT: {
    HostURL: "http://cc.aerohuanyou.com:8081/api", //图吧域名

    getQdfawHost: "http://cc.aerohuanyou.com:8081/api", //车场域名

    getUserCenterHost: "https://cc.aerohuanyou.com:8081/usercenter",  //用户中心基地址
    
    getWeChatHost: "https://wx.aerohuanyou.com/qqWeChatOfficialUat/web/", //微信工程基地址

    getActivityHost: "http://211.145.49.130:85/qq_activity_uat/web",  //活动h5工程基地址
  },
  RELEASE: {// production 环境配置
    HostURL: "http://jfx.mapbar.com/api", //图吧域名

    getQdfawHost: "http://jfx.qdfaw.com:8081/api", //车场域名

    getUserCenterHost: "https://jfx.mapbar.com/usercenter",  //用户中心基地址
    
    getWeChatHost: "https://wx.jfx.qdfaw.com/qqWeChatOfficialRelease/web", //微信工程基地址

    getActivityHost: "http://qq.aerohuanyou.com:10106/qq_activity_release",  //活动h5工程基地址
  },
};

// 默认自动条件一个属性 BuildType = 对应的key
Object.keys(env).forEach((key) => {
  env[key].BuildType = `${key}`;
});

// 我们约定，开发包传入 develp, UAT传入 uat, 正式包传入 production
console.log(process.env.NETWORK_ENV)
const buildType = process.env.NETWORK_ENV || 'TEST';
// console.log('#从环境变量中的 BuildType=' + buildType);
// console.log("buildType")
// console.log(buildType)
// 根据不同的 buildType，将击中上面的配置项目
const Env = env[buildType];

const { HostURL, getUserCenterHost,getQdfawHost,getWeChatHost,getActivityHost } = Env;
// const { UploadFileHostURL } = Env;
// const { ForceUpgrade } = Env;

//console.log(`# 环境配置加载完成. BuildType=${Env.BuildType}, HostURL=${HostURL}, UploadFileHostURL=${UploadFileHostURL}`);
// 故意导出多个配置，为了使用便捷, 充分利用 js语言特性
export {
  Env, HostURL, getUserCenterHost,getQdfawHost,getWeChatHost,getActivityHost
};
