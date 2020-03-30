/**
 * Created by lsy on 2018/11/22.
 * 接口配置文件
 */
// import {BASEHOST_BASE,BASEHOST_USER} from '../../../common/constant/baseHost.js'
import {Env, HostURL, } from '../../../common/constant/Env.js'
console.log(Env)
module.exports = {
	
   getRecommendInfoWechatUrl: HostURL+"/qingqi/sellapp/getRecommendInfoWechat",  //获取推介人信息

   sendSmsWithoutChkSalesUrl: HostURL+"/user/sendSmsWithoutChkSales",  //获取验证码

   quickQualificationWechatUrl: HostURL+"/qingqi/sellapp/quickQualificationWechat",  //获取返利名额

   addVinBoughtUrl: HostURL+"/qingqi/sellapp/addVinBought",  //添加底盘号

   //******实名认证相关接口 */

   getIdentityAuthInfoUrl:HostURL + "/qingqi/driver/getIdentityAuthInfo",//查询用户认证信息

   saveIdentityAuthUrl : HostURL+'/qingqi/driver/saveIdentityAuth',  //提交保存接口

   editIdentityAuthUrl : HostURL+'/qingqi/driver/editIdentityAuth',  //编辑接口

   getUserInfoUrl : HostURL+'/qingqi/tocapp/getUserInfo', //查询用户信息修改

   addCarUrl : HostURL+'/qingqi/tocapp/addCar',  //添加车辆



};
