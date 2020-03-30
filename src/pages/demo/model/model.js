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

  //1.获取用户实名认证状态
      model.getIdentityAuthInfoss = function(params,succFun){
         console.log('当前请求的url'+ config.getIdentityAuthInfoUrl);
        /** 
         * 1.注意get请求和post请求的区别。get {params:params}
         * post parems
        */
         $http.get(config.getIdentityAuthInfoUrl,{params:params})
         .then(function(response){
             console.log(response.data);
           succFun(response.data)
         })
         .catch(function(error){
           console.log(error);
         });   
   }
//2.提交保存 saveIdentityAuthUrl

      model.saveIdentityAuth = function(params,succFun) {
      console.log('当前请求的url'+ config.saveIdentityAuthUrl);
      $http.get(config.saveIdentityAuthUrl,{params:params})
      .then(function(response){
          console.log(response.data);
          alert(response.data.resultCode);
        succFun(response.data)
      })
      .catch(function(error){
        console.log(error);
      }); 
       
     }

     //3.编辑接口

     model.editIdentityAuth = function(params,succFun) {
      console.log('当前请求的url'+ config.editIdentityAuthUrl);
      $http.get(config.editIdentityAuthUrl,{params:params})
      .then(function(response){
          alert(response.data.resultCode);
        succFun(response.data)
      })
      .catch(function(error){
        console.log(error);
      }); 
     }

    return model;
}
module.exports = createModel;
