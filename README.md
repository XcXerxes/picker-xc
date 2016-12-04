#### picker组件

*************
这是一个仿微信小程序的```pikcer```组件，滚动选择器，现支持三种选择器，通过mode来区分，分别是普通选择器，时间选择器，日期选择器，默认是普通选择器。

************
##### 使用:
安装：
```
npm install 
```
运行:
```
npm start
```
***************
##### OPTIONS

普通选择器：```mode = selector```

属性  | 类型 | 默认值 | 说明
---|---|---|---
 range| Array |[]|mode为selector时有效
vlaue | Number| 0|mode为 selector 时，是数字，表示选择了 range 中的第几个，从0开始。
bindchange|EvemtHandle||value改变时触发change事件，event.target = {value: value}

*****************************

时间选择器：```mode=time```:

属性  | 类型 | 默认值 | 说明
---|---|---|---
vlaue | String| |表示选中的时间，格式为"hh:mm"
 start| String ||表示有效时间范围的开始，字符串格式为"hh:mm"
 end| String ||表示有效时间范围的结束，字符串格式为"hh:mm"
bindchange|EvemtHandle||value改变时触发change事件，event.target = {value: value}

***********************
日期选择器：```mode=date```:

属性  | 类型 | 默认值 | 说明
---|---|---|---
vlaue | String| |表示选中的日期，格式为"YYYY-MM-DD"
 start| String ||表示有效日期范围的开始，字符串格式为"YYYY-MM-DD"
 end| String ||表示有效日期范围的结束，字符串格式为"YYYY-MM-DD"
 fields| String |day|有效值year,month,day，表示选择器的粒度
bindchange|EvemtHandle||value改变时触发change事件，event.target = {value: value}

***********************

### 示例代码：
```
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

```

