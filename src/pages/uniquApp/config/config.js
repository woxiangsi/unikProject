/**
 * Created by lsy on 2018/11/22.
 * 接口配置文件
 */
// import {BASEHOST_BASE,BASEHOST_USER} from '../../../common/constant/baseHost.js'
import {Env, HostURL, } from '../../../common/constant/Env.js'
console.log(Env)
module.exports = {
   listUrl:HostURL+'/unique/api/hot_recommend/model/list', //热销车型车辆列表

   conditionUrl:HostURL+'/unique/api/hot_recommend/condition',   //筛选条件

   veriftyUrl:HostURL+'/unique/api/sms/verifty',     //发送短信验证码
   



};
