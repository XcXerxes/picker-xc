import React, {
    Component
}
from 'react'
import PickerRing from './PickerRing'

export default class PickerDate extends Component {
    constructor(...args) {
        super(...args);
        //设置默认的年月日
        let yearArr = [],
            monthArr = [],
            dayArr = [];
        for (var i = 1; i < 32; i++) {
            i < 13 && monthArr.push(i > 9 ? `${i}月` : `0${i}月`);
            dayArr.push(i > 9 ? `${i}日` : `0${i}日`);
        }
        for (var a = 1900; a <= 2100; a++) {
            yearArr.push(`${a}年`);
        }
        this.state = {
            yearArray: yearArr,
            monthArray: monthArr,
            dayArray: dayArr,
            yearCurrent: (new Date).getFullYear(),
            monthCurrent: 0,
            dayCurrent: 1

        };
        this.onDaySelect = this.onDaySelect.bind(this);
        this.onMonthSelect = this.onMonthSelect.bind(this);
        this.onYearSelect = this.onYearSelect.bind(this);
        this.validDate = this.validDate.bind(this);
        this.setCurrent=this.setCurrent.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.current != this.props.current) {
            if(nextProps.fields==="year"){
                const year=parseInt(nextProps.current)
                this.setState({
                    yearCurrent: isNaN(year) ? (new Date).getFullYear : Math.min(Math.max(year, 0), 2100),
                })
            }else {
                const arr = nextProps.current.split("-");
                const year = parseInt(arr[0]);
                const month = parseInt(arr[1]);
                const day = parseInt(arr[2]);
                this.setState({
                    yearCurrent: isNaN(year) ? (new Date).getFullYear : Math.min(Math.max(year, 0), 2100),
                    monthCurrent: isNaN(month) ? 0 : Math.min(Math.max(month-1, 0), 11),
                    dayCurrent: isNaN(day) ? 1 : Math.min(Math.max(day, 0), 31)
                })
            }
        }
            nextProps.start != this.props.start && this.setRange("start", nextProps.start || "1900-01-01");
            nextProps.end != this.props.end && this.setRange("end", nextProps.end || "2100-01-01");
    }
    componentDidMount() {
            this.range = {};
            this.setRange("start", this.props.start || "1900-01-01");
            this.setRange("end", this.props.end || "2100-01-01");
            this.setCurrent(this.props.current);
        }
        //判断有效值
    validDate(yearCurrent, monthCurrent, dayCurrent) {
            const validVal = new Date(yearCurrent+'-'+(monthCurrent+1)+'-'+dayCurrent);
            const day = validVal.getDate();
            this.state.dayCurrent != day && this.setState({
                dayCurrent: day
            });
            this._dayPicker.setCurrent(day - 1);
            return validVal;
        }
        //设置start和end的范围
    setRange(rangeStr, propsRange) {
            if (propsRange) {
                const invalidVal = new Date(propsRange); //设置标注的时间
                "Invalid Date" != invalidVal && (this.range[rangeStr] = invalidVal.getTime()); //判断填入的时间是否合法
            }
        }
        //设置当前的值
    setCurrent(current) {debugger;
            if (current) {
                let invalidVal = new Date(current);
                "Invalid Date" === invalidVal && (invalidVal = new Date);
                invalidVal.getTime() < this.range.start ?
                    (invalidVal = new Date(this.range.start)) :invalidVal.getTime() > this.range.end && (invalidVal = new Date(this.range.end));
                this.setState({
                    yearCurrent: invalidVal.getFullYear(),
                    monthCurrent: invalidVal.getMonth(),
                    dayCurrent: invalidVal.getDate()
                })
            }
        }
        //选择year
    onYearSelect(current) {
            let year = current + 1900;
            const validVal = this.validDate(year, this.state.monthCurrent, this.state.dayCurrent);
            debugger;
            validVal.getTime() < this.range.start ? (year = new Date(this.range.start).getFullYear()) : validVal.getTime() > this.range.end && (year = new Date(this.range.end).getFullYear());
            this.setState({
                yearCurrent: year
            });
            this._yearPicker.setCurrent(year - 1900)
        }
        //选择month
    onMonthSelect(current) {
            let month = current;
            const validVal = this.validDate(this.state.yearCurrent, month, this.state.dayCurrent);
            validVal.getTime() < this.range.start ? (month = new Date(this.range.start).getMonth()) : validVal.getTime() > this.range.end && (month = new Date(this.range.end).getMonth());
            this.setState({
                monthCurrent: month
            });
            this._monthPicker.setCurrent(month)
        }
        //选择day
    onDaySelect(current) {
        debugger;
        let day = current + 1;
        const validVal = this.validDate(this.state.yearCurrent, this.state.monthCurrent, day);
        validVal.getTime() < this.range.start ? day = new Date(this.range.start).getDate() : validVal.getTime() > this.range.end && (day = new Date(this.range.end).getDate());
        this.setState({
            dayCurrent: day
        });
        this._dayPicker.setCurrent(day - 1)
    }
    //获取当前的值
    getValue(){
        let year=this.state.yearCurrent;
        if(this.props.fields==="month"){
          let month=this.state.monthCurrent+1;
            month=month>9?month:`0${month}`;
            year=`${year}-${month}`;
        }else if(this.props.fields==="day"){
            let month=this.state.monthCurrent+1;
            let day=this.state.dayCurrent;
            month=month>9?month:`0${month}`;
            day=day>9?day:`0${day}`;
            year=`${year}-${month}-${day}`;
        }
        return year;
    }
    render() {
        return ( 
            < div className = "wx-picker-bd" >
                < PickerRing array = {this.state.yearArray}  current = {this.state.yearCurrent - 1900} ref = {ref => this._yearPicker = ref} onPickerSelect = {this.onYearSelect}/> 
                < PickerRing array = {this.state.monthArray} current = {this.state.monthCurrent}  hidden = {"year" ===this.props.fields} ref = {ref => this._monthPicker = ref}
                    onPickerSelect = {this.onMonthSelect}/> 
                < PickerRing array = {this.state.dayArray}  current = { this.state.dayCurrent - 1} hidden ={"day" !==this.props.fields}  ref = {ref => this._dayPicker = ref}
                onPickerSelect = {this.onDaySelect}/> 
            < /div>
        )
    }
}
