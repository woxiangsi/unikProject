/**
 * Created by lsy on 2018/11/22.
 */

var  ajax = require("../../../common/businessUtils/ajaxUtils").default;
import $http from "../../../common/businessUtils/HTTP.js";

var config = require("../config/config");


function createModel(){
  var model = new Object();
  //  var base = createRefBasicModel();
  function Model(){}

  //   Model.prototype = base;
  var model = new Model();
  // model.baseModel = base;
  /***** 以上为固定代码，勿动, baseModel内方法自动继承过来，可用base调用  *****/

  //1.获取热销车型列表
  model.getList = function(params,succFun){
    /** 
     * 1.注意get请求和post请求的区别。get {params:params}
     * post parems
    */
    $http.get(config.listUrl,{params:params})
      .then(function(response){
        console.log(response.data);
        succFun(response.data)
      })
      .catch(function(error){
        console.log(error);
      });   
  }
  //1.获取筛选列表
  model.getCondition = function(params,succFun){
    $http.get(config.conditionUrl,{params:params})
      .then(function(response){
        console.log(response.data);
        succFun(response.data)
      })
      .catch(function(error){
        console.log(error);
      });   
  }
  //发送短信验证码
  model.sendVerifty = function(params,succFun){
    $http.post(config.veriftyUrl,params)
      .then(function(response){
        console.log(response.data);
        succFun(response.data)
      })
      .catch(function(error){
        console.log(error);
      });   
  }
  


return model;
}
module.exports = createModel;
