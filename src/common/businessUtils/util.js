/**
 * 存放工具公共方法
 */


export default {
    /**
     * 获取主机服务器地址
     */
    
      getLocation_util:()=>{
         let host = window.location.href;
         let locationUrl = host.split('#');

         return locationUrl[0];

      },
      /**
       * 获取URL中的参数
       */
   
      getUrlPam_util:()=>{
         var url = window.location.href;
         if(url.indexOf("?")<0){
           return {};
         }
         var vars = url.split("?");
         var localPams = vars[1].split("&");
         var obj = {}
         for (var i=0;i<localPams.length;i++) {
               var index = localPams[i].indexOf("=");
               var pair0 = localPams[i].substr(0,index);
               var pair1 = localPams[i].substr(index+1);
               obj[pair0] = pair1;
         }
         return obj;
      },
      /**
       * 标准时间转化
       */
      timestampToTime:(timestamp,state)=>{
         var localTime = timestamp.getTime()
         var date = new Date(localTime);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
         

         var Y = date.getFullYear();

         var Year = date.getYear();
     
         var M = (date.getMonth()+1)>10?date.getMonth()+1:'0'+(date.getMonth()+1);

     
         var D = date.getDate()>10?date.getDate():'0'+date.getDate();
     
         var h = date.getHours()+ ':';
     
         var m = date.getMinutes+ ':';
     
         var  s = date.getSeconds();
         console.log(date.toLocaleTimeString())
         var state = '.';
         return Y+state+M+state+D;
      },
      
}
