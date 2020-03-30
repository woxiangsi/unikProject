import React from 'react';
import './utilComponents.scss';
import {List,Icon,DatePicker,Calendar} from 'antd-mobile';

class CheckUtil extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataList:[]
        }
    }
    componentWillMount() {
        const data = this.props.checkData;
        this.setState({dataList:data})
    }
    componentWillReceiveProps(nextProps){
        // this.setState({
        //     dataList:nextProps.checkData
        // })
    }
    onChange3 = (value,index) =>{
        let dataList = this.state.dataList;
        dataList[index].value = !value;
        this.props.onChange(index,dataList)
        this.setState({
            dataList:dataList
        },function(){
            
        })
        
    }
    render (){
        const {dataList} = this.state
        return (
        <div className="utilComponents touchScroll">
            <List renderHeader={this.props.title} className="clearFloat">
                {dataList.map((i,index) => (
                    <div className={`radio_item ${ i.value===true? 'radio_checked':''}`} key={index} onClick={()=>{this.onChange3(i.value,index)}}>
                        <span>{i.label}</span>
                    </div>
                ))}
            </List>
        </div>
        )
    }
}
class FilterUtil extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataList:[]
        }
    }
    componentWillMount() {
        const data = this.props.checkData;
        this.setState({dataList:data})
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            dataList:nextProps.checkData
        })
    }
    onChange3 = (value,index) =>{
        let dataList = this.state.dataList;
        dataList[index].value = !value;
        this.setState({
            dataList:dataList
        })
        this.props.onChange(index,dataList)
    }
    render (){
        const {dataList} = this.state
        return (
        <div className="FilterUtil touchScroll">
            <List renderHeader={this.props.title} className="clearFloat">
                {dataList.map((i,index) => (
                    <div className={`radio_item ${ i.value===true? 'radio_checked':''}`} key={index} onClick={()=>{this.onChange3(i.value,index)}}>
                        <span>{i.label}</span>
                    </div>
                ))}
            </List>
        </div>
        )
    }
}
class RadioUtil extends React.Component {
    constructor(props) {
        super(props)
        const dataList = props.data;
        this.state = {
            activeId:'',
            dataList:dataList
        }
    }
    componentWillMount() {
       
    }
    componentWillReceiveProps(nextProps){
        
    }
    onChange3 = (activeId,index)=>{
        this.setState({
            activeId:activeId
        })
        this.props.onChange(index,activeId)
    }
    render (){
        const {dataList} = this.state
        return (
            <div className="utilComponents touchScroll">
                <List renderHeader={this.props.title} className="clearFloat">
                    {dataList.map((i,index) => (
                        <div className={`radio_item ${ i.value===this.state.activeId? 'radio_checked':''}`} key={index} onClick={()=>{this.onChange3(i.value,index)}}>
                            <span>{i.label}</span>
                        </div>
                    ))}
                </List>
            </div>
        )
    }

}
class TabBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataList:[]
        }
    }
    componentWillMount() {
        const data = this.props.data;
        this.setState({dataList:data})
    }
    componentWillReceiveProps(nextProps){
        console.log("9999")
        console.log(nextProps)

    }
    onChange = (value,index) =>{
        let dataList = this.state.dataList;
        dataList[index].value = !value;
        this.setState({
            dataList:dataList
        })
        this.props.onChange(index,dataList)
    }
    render (){
        const {dataList} = this.state
        return (
        <div className="TabBar touchScroll">
            <div className="filterTile">
                <span>{this.props.title}：</span>
            </div>
            {dataList.map((i,index) => (
                <div className={`radio_item ${ i.value===true? 'radio_checked':''}`} key={index} onClick={()=>{this.onChange(i.value,index)}}>
                    <span>{i.title}</span>
                </div>
            ))}
        </div>
        )
    }
}
const chooseImg = require("../../assets/imgs/choose.png");

var currentFirstDate;
// currenttime = getNowDayDate(new Date());
// const now = new Date();
class GetTime extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            now:new Date(),
            currenttime:'2019.10',
            visible:false,
            isCheck:'day',
            dayPic:"none",
            weekPic:"none",
            monthPic:"none",
            beginDate:'',
            isShowPicker:true,
        }
    }
    componentDidMount(){
        window.__navBakComp__ = this;
        var currenttime = this.props.currenttime?this.props.currenttime:getNowDayDate(new Date());
        this.setState({
            currenttime
        })
        // this.setOption()
    }
    // 点击top时间，调出选择弹出层
    chooseDate=()=>{
       //是否需要弹出框
        if(this.props.isHidePicker == true){
            return;
        }
        let shoeFlag = this.state.visible;
        this.setState({
            visible:shoeFlag?false:true
        })
    }
    // 选择日
    chooseday=()=>{
        // 对勾显示
        let currenttime = getNowDayDate(new Date())
        this.setState({
            isCheck:'day',
            visible:false,
            currenttime:currenttime
        },this.parentProp)
    }
    // 选择周
    chooseweek=()=>{
        // 对勾显示
        let currenttime = getNowWeekDate(new Date())
        this.setState({
            isCheck:'week',
            visible:false,
            currenttime:currenttime
        },this.parentProp)
    }
    // 选择月
    choosemonth=()=>{
        // 对勾显示
        let currenttime = getNowFormatMonth()
        this.setState({
            isCheck:'month',
            visible:false,
            currenttime:currenttime
        },this.parentProp)
    }
    //自定义时间
    choosecustom=()=>{
        // currenttime = getNowFormatMonth()
        this.setState({
            // isCheck:'custom',
            // visible:false,
            show:true,
            // currenttime:currenttime
        })
    }
    // 点击弹窗浮层，弹窗消失
    clickmask=()=>{
        this.setState({
            visible:false
        })
    }
    // 点击左箭头获取上一个时间 上一天 上一周 上一月
    clickPreTime=(time)=>{
        // 上一天
        if(time.length == 10){
			let day = new Date(time.replace(/[.]/g, "/"));
			day.setTime(day.getTime() - 24 * 60 * 60 * 1000);
			let month = (day.getMonth() + 1) < 10 ? "0" + (day.getMonth() + 1) : (day.getMonth() + 1);
			let date = (day.getDate() < 10) ? "0" + day.getDate() : day.getDate();
            let timestr = day.getFullYear() + "." + (month) + "." + date;
            this.setState({
                currenttime:timestr
            },this.parentProp)
        // },()=>console.log(this.state.currenttime))
        }
        // 上一周
        else if(time.length == 22){
            this.setState({
                currenttime:getNowWeekDate(addDate(currentFirstDate, -7))
            },this.parentProp)
        }
        // 上一月
        else if(time.length == 7){
            this.setState({
                currenttime:getPreMonth(time)
            },this.parentProp)
        }

    }
    // 点击右箭头获取下一个时间 下一天 下一周 下一月
    clickNextTime=(time)=>{
        // 下一天
        if(time.length == 10){
            let day1 = new Date();
			let date, month, year, str;
			let day2 = new Date(time.replace(/[.]/g, "/"));
			day2.setTime(day2.getTime() + 24 * 60 * 60 * 1000);
			date = (day2.getDate() < 10) ? "0" + day2.getDate() : day2.getDate();
			month = (day2.getMonth() + 1) < 10 ? "0" + (day2.getMonth() + 1) : (day2.getMonth() + 1);
			year = day2.getFullYear();
            str = year + "." + month + "." + date;
            if(day2.getTime() < day1.getTime()){
                this.setState({
                    currenttime:str
                },this.parentProp)
            }else if(day2.getTime() >= day1.getTime()) {
				return;
			}
            
        }
        // 下一周
        else if(time.length == 22){
            // let = new Date(date);
            if((new Date().getTime()) >= (currentFirstDate.getTime() + 24 * 60 * 60 * 1000 * 7)) {
                this.setState({
                    currenttime:getNowWeekDate(addDate(currentFirstDate, 7))
                },this.parentProp)
			} else {
				return;
			}
        }
        // 下一月
        else if(time.length == 7){
            let strArrMon = time.split(".");

			if(Number(strArrMon[0]) == new Date().getFullYear()) {
				if((Number(strArrMon[1]) + 1) <= (new Date().getMonth() + 1)) {
					this.setState({
                        currenttime:getNextMonth(time)
                    },this.parentProp)
				} else {
					return;
				}

			} else if(Number(strArrMon[0]) < new Date().getFullYear()) {
				this.setState({
                    currenttime:getNextMonth(time)
                },this.parentProp)
			} else {
				return;
			}
        }
    }
    onConfirm = (startTime, endTime) => {
        document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;

        var startTime=timeChange(startTime);
        var endTime=timeChange(endTime);
        this.setState({
          show: false,
          visible: false,
          isCheck:'custom',
          startTime,
          endTime,
          currenttime:startTime+'--'+endTime
        },this.parentProp);
      }
    
      onCancel = () => {
        document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
        this.setState({
          show: false,
          startTime: undefined,
          endTime: undefined,

        });
      }
      calendarBnt = ()=>{
          this.setState({show:true})
      }
    parentProp(){
        console.log(this.state)
        let time = this.state.currenttime;
        let isCheck = this.state.isCheck;

        this.props.time(time,isCheck)
    }

    render(){


        return(
            <div className="GetTime">
                <div className="changeDate">
                    <Icon type="left" 
                        className="leftbtn" 
                        style={{"display":(this.state.isCheck=='custom'?'none':'inline-block')}}
                        onClick={this.clickPreTime.bind(this,this.state.currenttime)}/>
                    <span className="date" onClick={this.chooseDate.bind(this)}>{this.state.currenttime}</span>
                    <Icon type="right" 
                        className="leftbtn" 
                        style={{"display":(this.state.isCheck=='custom'?'none':'inline-block')}}
                        onClick={this.clickNextTime.bind(this,this.state.currenttime)}/>
                </div>
                {this.state.visible?
                    <div className="chooseMask" onClick={this.clickmask.bind(this)}>
                        <div className="day com" onClick={this.chooseday.bind(this)}>日<img src={chooseImg} alt="" style={{"display":(this.state.isCheck=='day'?'inline-block':'none')}}/></div>
                        <div className="week com" onClick={this.chooseweek.bind(this)}>周<img src={chooseImg} alt="" style={{"display":(this.state.isCheck=='week'?'inline-block':'none')}}/></div>
                        <div className="month com" onClick={this.choosemonth.bind(this)}>月<img src={chooseImg} alt="" style={{"display":(this.state.isCheck=='month'?'inline-block':'none')}}/></div>
                        <div className="month com" onClick={this.choosecustom.bind(this)}>自定义<img src={chooseImg} alt="" style={{"display":(this.state.isCheck=='custom'?'inline-block':'none')}}/></div>
                        {/* <div className="date_picker" onClick={this.calendarBnt.bind(this)}>
                            <span className="">选择时间：</span>
                            <span className="fr">2019.09.01--2019.09.11</span>
                        </div> */}
                        
                
                    </div>
                :""}
                <Calendar
                            {...this.state.config}
                            visible={this.state.show}
                            onCancel={this.onCancel}
                            onConfirm={this.onConfirm}
                            onSelectHasDisableDate={this.onSelectHasDisableDate}
                            getDateExtra={this.getDateExtra}
                            defaultDate={this.state.now}
                            minDate={new Date(+this.state.now - 5184000000)}
                            maxDate={new Date(+this.state.now + 31536000000)}
                            />
                
            </div>
        )
    }
}
function timeChange(time){
    var d = new Date(time);
    var month = (d.getMonth()+1)<10?'0'+(d.getMonth()+1):(d.getMonth()+1);
    var day = d.getDate()<10?'0'+d.getDate():d.getDate();
    var datetime=d.getFullYear() + '.' + month + '.' + day;
    return datetime
}

// 获取当前日并且格式化
function getNowDayDate(theDate){
    var day = theDate;
    var Year = 0;
    var Month = 0;
    var Day = 0;
    var CurrentDate = "";
//    初始化时间
    Year = day.getFullYear();
    Month = day.getMonth() + 1;
    Day = day.getDate();
    CurrentDate += Year +".";
    if(Month>=10){
        CurrentDate += Month +"."
    }else{
        CurrentDate += "0" + Month +"."
    }
    if(Day>=10){
        CurrentDate += Day;
    }else{
        CurrentDate += "0" + Day
    }
    return CurrentDate;
}
// 获取当前周并且格式化
function getNowWeekDate(date) {
	var week;
	if (date.getDay()==0) {
		week = 7-1;
	}else{
		week = date.getDay() - 1;
	}
	date = addDate(date, week * -1);
    currentFirstDate = new Date(date);
	return (formatDate(date) + "--" + formatDate(addDate(date, 6)));
};
function formatDate(date) {
	var year = date.getFullYear() + '.';
	var month1 = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
	var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	return year + month1 + "." + day;
};
function addDate(date, n) {
	date.setDate(date.getDate() + n);
	return date;
};
// 获取当前月并且格式化
function getNowFormatMonth() {
    var day = new Date();
    var Year = 0;
    var Month = 0;
    var CurrentDate = "";
    // 初始化时间
    Year = day.getFullYear(); // ie火狐下都可以
    Month = day.getMonth() + 1;
    CurrentDate += Year + ".";
    if(Month >= 10) {
        CurrentDate += Month;
    } else {
        CurrentDate += "0" + Month;
    }
    return CurrentDate;
}
// 获取上个月并且格式化
function getPreMonth(date) {
	var arr = date.split('.');
	var year = arr[0]; //获取当前日期的年份
	var month = arr[1]; //获取当前日期的月份
	var day = arr[2]; //获取当前日期的日
	var days = new Date(year, month, 0);
	days = days.getDate(); //获取当前日期中月的天数
	var year2 = year;
	var month2 = parseInt(month) - 1;
	if(month2 == 0) {
		year2 = parseInt(year2) - 1;
		month2 = 12;
	}
	var day2 = day;
	var days2 = new Date(year2, month2, 0);
	days2 = days2.getDate();
	if(day2 > days2) {
		day2 = days2;
	}
	if(month2 < 10) {
		month2 = '0' + month2;
	}
	var t2 = year2 + '.' + month2;
	return t2;
}
// 获取下个月并且格式化
function getNextMonth(date) {
	var now = new Date();
	var nowYear = now.getFullYear();
	var nowMonth = now.getMonth() + 1;

	var arr = date.split('.');
	var year = arr[0]; //获取当前日期的年份
	var month = arr[1]; //获取当前日期的月份
	var day = arr[2]; //获取当前日期的日
	var days = new Date(year, month, 0);
	days = days.getDate(); //获取当前日期中的月的天数
	var year2 = year;
	var month2 = parseInt(month) + 1;
	if(month2 == 13) {
		year2 = parseInt(year2) + 1;
		month2 = 1;
	}
	var day2 = day;
	var days2 = new Date(year2, month2, 0);
	days2 = days2.getDate();
	if(day2 > days2) {
		day2 = days2;
	}
	if(nowYear == year2) {
		if(nowMonth < month2) {
			month2 = nowMonth;
		}
		/*else if(nowMonth >= day2){
		           		day2 = days2;
		           	}*/
	}
	if(month2 < 10) {
		month2 = '0' + month2;
	}

	var t2 = year2 + '.' + month2;
	return t2;
}

export {RadioUtil,CheckUtil,TabBar,FilterUtil,GetTime};