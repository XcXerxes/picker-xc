import React,{Component} from 'react'
import Picker from './Picker'


export default class App extends Component{
    constructor(...args){
        super(...args);
        this.range=["中国","美国","日本","英国","德国","西班牙"];
        this.state={
            index:0,
            time:"05:20"||"",
            date:"2016-05-20"||""
        }
    }
    selectorchange(e){
        debugger;
        console.log("当前值为:"+e.target.value);
        this.setState({
            index:e.target.value
        })
    }
    timechange(e){
        debugger;
        console.log("当前值为:"+e.target.value);
        this.setState({
            time:e.target.value
        })
    }
    datechange(e){
       debugger;
        console.log("当前值为:"+e.target.value);
        this.setState({
            date:e.target.value
        }) 
    }
    render(){
            const range=this.range;
        return(
            <div className="app">
                <section className="container">
                    <h2 style={{color:'chocolate'}}>普通选择器</h2>
                    <Picker  value={this.state.index} range={range} bindchange={this.selectorchange.bind(this)}>
                        <h4><span className="xc-picker-choose"> 当前选择是：</span>{range[this.state.index]}</h4>
                    </Picker>
                </section>    
                <section className="container">
                    <h2 style={{color:'chocolate'}}>时间选择器</h2>
                    <Picker mode="time" value={this.state.time}  bindchange={this.timechange.bind(this)}>
                        <h4><span className="xc-picker-choose"> 当前选择是：</span>{this.state.time}</h4>
                    </Picker>
                </section>
                <section className="container">
                    <h2 style={{color:'chocolate'}}>日期选择器</h2>
                    <Picker mode="date" value={this.state.date} start="2015-05-20" end="2017-05-20" bindchange={this.datechange.bind(this)}>
                        <h4><span className="xc-picker-choose"> 当前选择是：</span>{this.state.date}</h4>
                    </Picker>
                </section>         
            </div>
        )
    }
}
