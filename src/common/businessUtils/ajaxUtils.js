import Axios from "axios";
export default {
    /**
     * 封装ajax的get请求
     * @param url
     * @param params
     * @param successFun
     * @param failFun
     * @param errorFun
     */
    getJson:function(url,params,successFun,failFun,errorFun){
        var req = {
            url: url,
            method: 'get',
            params: params,
            headers:{'Token':'token'}
        };
        // console.log(req);
        Axios(req).catch(
            function(err){
                if(err.response && err.response.data  && err.response.data.result == 403){
                    
                }
                if(typeof errorFun == "function")
                    errorFun(err.response.data)
                else{
                    showMessage('失败',err.response&&err.response.data.message?err.response.data.message:"服务器通讯异常，请检查网络",'error');
                }
            }
        ).then(
            function(res){
                
                if(res && res.data && res.data.code === 403){
                   alert("请求失败")
                }
                successFun(res?res.data:res);
            }
         )
    },
    postJson:function(url,params,successFun,failFun,errorFun){
        var req = {
            url: url,
            method: 'POST',
            data: params,
            contentType: "application/json",
        };
        // console.log(req);
        Axios(req).catch(
            function(err){
                // console.log(err);
                if(err.result == 403){
                    errorFun(err.response.data)
                }
                if(typeof errorFun == "function")
                    errorFun(err.response.data)
                else{
                    alert('失败',err.response&&err.response.data.message?err.response.data.message:"服务器通讯异常，请检查网络",'error');
                }
            }
        ).then(
            function(res){
                
                // console.log(res);
                if(res && res.data && res.data.code === 403){
                    alert("失败","登录信息已失效，请重新登录",'error');
                    
                }
                successFun(res.data);
            }
        );
    },
    postPromiseJsons:function(url,params,){
        const promise = new Promise(function(resolve,reject){
            var req = {
                url: url,
                method: 'POST',
                data: params,
                contentType: "application/json",
            };
            Axios(req).catch(
                function(err){
                    // console.log(err);
                    if(err.result == 403){
                        reject(err.response.data)
                    }
                    if(typeof errorFun == "function")
                        reject(err.response.data)
                    else{
                        alert('失败',err.response&&err.response.data.message?err.response.data.message:"服务器通讯异常，请检查网络",'error');
                    }
                }
            ).then(
                function(res){
                    
                    // console.log(res);
                    if(res && res.data && res.data.code === 403){
                        alert("失败","登录信息已失效，请重新登录",'error');
                        
                    }
                    resolve(res.data);
                }
            );
        })
        return promise;
        // console.log(req);
        
    },
    getPromiseJsons:function(url,params){
        const promise = new Promise(function(resolve,reject){
            var req = {
                url: url,
                method: 'get',
                params: params,
                headers:{'Token':'token'}
            };
            // console.log(req);
            Axios(req).catch(
                function(err){
                    if(err.response && err.response.data  && err.response.data.result == 403){
                        reject(err.response.data)
                    }
                    if(typeof errorFun == "function")
                        reject(err.response.data)
                    else{
                        alert(err.response&&err.response.data.message?err.response.data.message:"服务器通讯异常，请检查网络");
                    }

                }
            ).then(
                function(res){
                    if(res && res.data && res.data.code === 403){
                        alert("请求失败")
                    }
                    resolve(res?res.data:res);
                }
            )

        })
        return promise;
        
        
    },
    
}
