import React,{Component} from 'react'
import PickerRing from './PickerRing'

export default class PickerSelector extends Component{
    constructor(...args){
        super(...args);
        this.onPickerSelect=this.onPickerSelect.bind(this);
    }
    componentWillReceiveProps (nextProps) {
                nextProps.current != this.props.current && this.current
    }
    onPickerSelect(current){
        this.current=current;
    }
    componentDidMount(){
    }
    render(){
        return (
            <div className="wx-picker-bd">
                <PickerRing array={this.props.array} current={this.props.current} onPickerSelect={this.onPickerSelect}/>
            </div>
        )
    }
}