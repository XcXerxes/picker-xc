import React,{Component} from 'react'
import PickerSelector from '../components/PickerSelector'
import PickerTime from '../components/PickerTime'
import PickerDate from '../components/PickerDate'
import "../../public/css/Picker.css"
export default class Picker extends Component{
    constructor(...args){
        super(...args);
        this.getPicker=this.getPicker.bind(this);
        this.state={
            mode:"date",
            array:this.props.rang||[],
        }
    }
    confirm(){

    }
    getPicker(){
        switch(this.state.mode){
            case "selector":
            const {array}=this.state;
            const current=array.indexOf("美国");
            return (
                <PickerSelector array={array} current={current} ref={ref=>this._selector=ref}/>
            )
            case "time":
            return(
                <PickerTime start="9:01" current="10:05" />
            );
            case "date":
                return(
                 <PickerDate current="2012-10-01" start="2011-10-20"/>
                )
            default:

        }
    }
    render(){
        return(
            <div className="wx-picker-mask">
                <div className='wx-picker'>
                    <div className="wx-picker-hd">
                        <a href="#" onClick={this.confirm} className="wx-picker-action">取消</a>
                        <a href="#" className="wx-picker-action">确定</a>
                    </div>
                    {this.getPicker()}
                </div>
            </div>
        )
    }
}