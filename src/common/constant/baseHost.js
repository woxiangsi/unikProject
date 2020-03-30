var resultHost = {
    BASEHOST_USER:'',  //用户
    BASEHOST_BASE:'', //接口基地址
   
}
var serverUrl=window.location.hostname;
    console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV == 'dev'){
    //本地开发环境
    resultHost.BASEHOST_BASE = "http://cc.aerohuanyou.com:8081/api"; 
    resultHost.BASEHOST_USER = "https://sy.aerohuanyou.com/test/qdfaw/usercenter"; //测试环境基地址
	
}else if(process.env.NODE_ENV == 'test'){
   //测试环境
   resultHost.BASEHOST_BASE = serverUrl; 
   resultHost.BASEHOST_USER = "https://sy.aerohuanyou.com/test/qdfaw/usercenter"; //测试环境基地址
}else if(process.env.NODE_ENV == 'uat'){
   //uat环境
   resultHost.BASEHOST_BASE = serverUrl; 
   resultHost.BASEHOST_USER = "https://cc.aerohuanyou.com:8081/usercenter"; //UAT基地址

}else if(process.env.NODE_ENV == 'production'){
   //线上环境
   resultHost.BASEHOST_BASE = serverUrl; 
   resultHost.BASEHOST_USER = "https://jfx.mapbar.com/usercenter"; //正式环境
   
}

module.exports = resultHost;
