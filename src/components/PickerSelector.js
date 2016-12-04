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
    getValue(){
        return this.current;
    }
    render(){
        return (
            <div className="wx-picker-bd">
                <PickerRing {...this.props} onPickerSelect={this.onPickerSelect}/>
            </div>
        )
    }
}