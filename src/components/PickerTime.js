import React,{Component} from 'react'
import PickerRing from './PickerRing'

export default class PickerTime extends Component{
    constructor(...args){
        super(...args);
        for (var hourArr=[],minuteArr=[],i=0;i<60;i++){
            i<24&& hourArr.push(i>9?i:"0"+i);
            minuteArr.push(i>9?i:"0"+i);
        }    
        this.state={hourArray:hourArr,minuteArray:minuteArr,hourCurrent:0,minuteCurrent:0};
        this.onHourSelect=this.onHourSelect.bind(this);
        this.onMinuteSelect=this.onMinuteSelect.bind(this);
    }
    componentDidMount(){debugger
        this.range={};
        this.setRange("start",this.props.start||"00:00");
        this.setRange("end",this.props.end||"23:59");
        this.setCurrent(this.props.current||"00:00");
    }
    componentWillReceiveProps(nextProps){
        nextProps.current!=this.props.current && this.setCurrent(nextProps.current);
        nextProps.start!=this.props.start && this.setRange("start",nextProps.start);
        nextProps.end!=this.props.end && this.setRange("end",nextProps.end);
    }
    setCurrent(propsCurrent){
        const arr=propsCurrent.split(":"),
              hoursNum=+(arr[0]),
              minuteNum=+(arr[1]);
        this.setState({
            hourCurrent:isNaN(hoursNum)?0:Math.min(Math.max(hoursNum,0),23),
            minuteCurrent:isNaN(minuteNum)?0:Math.min(Math.max(minuteNum,0),59)
        })
    }
    
    setRange(str,propsTime){
        const arr=propsTime.split(":");
        let hoursNum=+arr[0],
            minutesNum=+arr[1];
        hoursNum=isNaN(hoursNum)?0:hoursNum;
        minutesNum=isNaN(minutesNum)?0:minutesNum;
        this.range[str]=60*hoursNum+minutesNum;
    }
    onHourSelect(current){
        let currentVal=current;
        const hours=60*current+this.state.minuteCurrent;
        hours<this.range.start ? currentVal=parseInt(this.range.start/60):
        hours>this.range.end && (currentVal=parseInt(this.range.end/60));
        this.setState({hourCurrent:currentVal});
        this._hourPicker.setCurrent(currentVal);
        
    }
    onMinuteSelect(current){
       const minute=60*this.state.hourCurrent+current;
        let currentVal=current;
        minute<this.range.start ? currentVal=parseInt(this.range.start%60):
        minute>this.range.end && (currentVal=parseInt(this.range.end%60));
        this.setState({minuteCurrent:currentVal});
        this._minutePicker.setCurrent(currentVal); 
    }
    render(){
        const {start,end}=this.props;
        const index=this.state.hourArray.indexOf()
        return(
            <div className="wx-picker-bd">
                <PickerRing  ref={ref=>this._hourPicker=ref} array={this.state.hourArray} 
                current={this.state.hourCurrent} onPickerSelect={this.onHourSelect}
                />
                <PickerRing ref={ref=>this._minutePicker=ref}
                array={this.state.minuteArray} current={this.state.minuteCurrent} onPickerSelect={this.onMinuteSelect}
                />
            </div>
        )
    }
}