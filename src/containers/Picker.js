import React,{Component} from 'react'
import PickerSelector from '../components/PickerSelector'
import PickerTime from '../components/PickerTime'
import PickerDate from '../components/PickerDate'
import "../../public/css/Picker.css"
export default class Picker extends Component{
    constructor(...args){
        super(...args);
        this.cancel=this.cancel.bind(this);
        const {mode,value}=this.props;
        this.state={
            hidden:true,
            current:(mode==="selecotr"||!mode)?(value||0):(value||"")
        }
    }
    confirm(e){debugger;
        this.cancel();
        const value=this.refs[this.props.mode].getValue();
        if(this.props.bindchange){
            e.target.value=value;
            this.props.bindchange(e);
        }
    }
    cancel(){
        this.setState({
            hidden:true
        })
    }
    show(){
        const {mode,value}=this.props;
        this.setState({
            hidden:false,
            current:(mode==="selecotr"||!mode)?(value||0):(value||"")
        })
    }
    getPicker(){
        switch(this.props.mode||"selector"){
            case "selector":
            const array=this.props.range;
            return (
                <PickerSelector array={array} current={this.state.current} ref={ref=>this._selector=ref} ref="selector"/>
            )
            case "time":
            return(
                <PickerTime  {...this.props} current={this.state.current}  ref="time"/>
            );
            case "date":
                return(
                 <PickerDate  {...this.props}  current={this.state.current} ref="date"/>
                )
            default:

        }
    }
    render(){debugger;
        return(
            <div>
                <div style={{display:this.state.hidden?"none":""}}>
                    <div className="wx-picker-mask" onClick={this.cancel}>
                    </div>
                    <div className='wx-picker'>
                        <div className="wx-picker-hd">
                            <a href="javascript:void(0);" onClick={this.cancel} className="wx-picker-action">取消</a>
                            <a href="javascript:void(0);"  className="wx-picker-action" onClick={this.confirm.bind(this)}  >确定</a>
                        </div>
                        {this.getPicker()}
                    </div>
                </div>
                <div onClick={this.show.bind(this)}>{this.props.children}</div>    
            </div>        
        )
    }
}

Picker.defaultProps={
    range:[],
    fields:"day",
    mode:"selector"
}