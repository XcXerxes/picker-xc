import React, {Component} from 'react'
import addEventListener from 'rc-util/lib/Dom/addEventListener';

export default class PickerRing extends Component {
    constructor(...args) {
        super(...args);
        this.touch=false;
        this.state = {
            translateY: 0
        }
        this.setCurrent = this
            .setCurrent
            .bind(this);
        this.offsetHeight = 34;
    }
    //引用事件库，兼容PC和移动端，添加事件
    addEvents(type){
        if(type==="mouse"){
            this.onMouseMoveListener=addEventListener(document,"mousemove",this.onMouseMove.bind(this));
            this.onMouseUpListener=addEventListener(document,"mouseup",this.onMouseUp.bind(this));
        }else if(type==="touch"){
            this.onTouchMoveListener=addEventListener(document,"touchmove",this.onTouchMove.bind(this));
            this.onTouchEndListener=addEventListener(document,"touchend",this.onTouchEnd.bind(this))
        }
    }
    //移除事件
    removeEvents(type){
        if(type==="mouse"){
            this.onMouseMoveListener.remove();
            this.onMouseUpListener.remove();
        }else if(type==="touch"){
            this.onTouchMoveListener.remove();
            this.onTouchEndListener.remove();
        }
    }
    componentDidMount() {
        this.setCurrent(this.props.current);
    }
    //设置当前值
    setCurrent(current) {
        this.setState({
          translateY: (3-current) * this.offsetHeight
        });
    }
    componentWillReceiveProps(nextProps){
        nextProps.current!=this.props.current && this.setCurrent(nextProps.current);
    }
    
    onMouseDown(e) {
        if(!e.button == 0){return;}
        console.log('start')
        this.startY = e.pageY;
        this.lastTranslateY = this.state.translateY || 0;
        this.touch = true;
        this.addEvents('mouse');
    }
    onMouseMove(e) {
        if(!this.touch){return;};
        console.log('moving....')
            let offset = e.pageY - this.startY + this.lastTranslateY;
        this.onMove(e,offset);
    }
    onMouseUp(e) {debugger;
        this.removeEvents("mouse");
        this.end();
    }
    
    onTouchStart(e){
        if(e.touches.length>1||(e.type.toLowerCase()==="touchend"&& e.touches.length>0)){return;}
        this.startY=e.touches[0].clientY;
        this.lastTranslateY=this.state.translateY||0;
        this.touch=true;
        this.addEvents("touch");
    }
    onTouchMove(e){
        if(!this.touch){return;}
        let offset=e.touches[0].clientY-this.startY+this.lastTranslateY;
        this.onMove(e,offset);
    }
    onTouchEnd(e){
        this.removeEvents("touch");
        this.end();
    }
    //处理值改变时的逻辑
    onMove(e,offset){
        let position=offset;
        position=Math.max((3-this.props.array.length+1)*this.offsetHeight,position);
        position=Math.min(3*this.offsetHeight,position);
        this.setState({translateY:position});
    }
    //处理mouseup和touchend的逻辑
    end(){
        const me = this;
        this.touch = false,
        this.startY = 0,
        this.lastTranslateY = 0;
        let offset = this.state.translateY;
        offset = Math.max((3 - this.props.array.length + 1) * this.offsetHeight, offset),
        offset = Math.min(3 * this.offsetHeight, offset);
        const n = 3-parseInt(offset / this.offsetHeight);
        isNaN(n) || (this.current = n);
        offset = ( 3-this.current) * this.offsetHeight;
        this.setState({translateY: offset});
            me.props.onPickerSelect && me
                .props
                .onPickerSelect(me.current)
        setTimeout(function () {
        }, 0)
    }
    render() {
        const contentStyle = {
            transform: `translate3d(0,${this.state.translateY}px,0)`,
            transition: "all .3s ease"
        };
        const itemList = this
            .props
            .array
            .map((item, index) => {
                return (
                    <div className="wx-picker-item" key={index}>{item}</div>
                )
            });
        return (
            <div
                className="wx-picker-group"
                ref={ref=>this._pickerGroup=ref}
                onMouseDown={this.onMouseDown.bind(this)}
                onTouchStart={this.onTouchStart.bind(this)}
                style={{display:this.props.hidden?"none":""}}
                >
                <div className="wx-picker-mask2">
                </div>
                <div className="wx-picker-indicator">
                </div>
                <div className="wx-picker-content" style={contentStyle}>{itemList}</div>
            </div>
        )
    }
}

/***
    onMouseMove={this.onMouseMove}
    onMouseUp={this.onMouseUp}
    onMouseLeave={this.onMouseUp}
*/