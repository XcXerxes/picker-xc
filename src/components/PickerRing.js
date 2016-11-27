import React, {Component} from 'react'

export default class PickerRing extends Component {
    constructor(...args) {
        super(...args);
        this.touch=false;
        this.state = {
            translateY: 0
        }
        this.onMouseDown = this
            .onMouseDown
            .bind(this);
        this.onMouseMove = this
            .onMouseMove
            .bind(this);
        this.onMouseUp = this
            .onMouseUp
            .bind(this);
        this.setCurrent = this
            .setCurrent
            .bind(this);
        this.offsetHeight = 34;
    }
    componentDidMount() {debugger;
        this.setCurrent(this.props.current);
    }
    setCurrent(current) {debugger;
        this.setState({
          translateY: current * -this.offsetHeight
        });
    }
    componentWillReceiveProps(nextProps){
        nextProps.current!=this.props.current && this.setCurrent(nextProps.current);
    }
    onMouseDown(e) {
        console.log('start')
        this.startY = e.pageY;
        this.lastTranslateY = this.state.translateY || 0;
        this.touch = true;
    }
    onMouseMove(e) {
        if(!this.touch)return false;
        debugger;
        console.log('moving....')
            let offset = e.pageY - this.startY + this.lastTranslateY;
            offset = Math.max((this.props.array.length -1) * -this.offsetHeight, offset);
            console.log(offset);
            offset = Math.min(0, offset);
            this.setState({translateY: offset});
    }
    onMouseUp(e) {
        const me = this;
        this.touch = false,
        this.startY = 0,
        this.lastTranslateY = 0;
        let offset = this.state.translateY;
        //offset = Math.max((3 - this.props.array.length + 1) * this.offsetHeight, offset),
        offset = Math.max((this.props.array.length -1) * -this.offsetHeight, offset);
        //offset = Math.min(3 * this.offsetHeight, offset);
        offset = Math.min(0, offset);
        const n = parseInt(offset / -this.offsetHeight);
        isNaN(n) || (this.current = n);
        offset = ( this.current) * this.offsetHeight;
        this.setState({translateY: offset});
            me.props.onPickerSelect && me
                .props
                .onPickerSelect(me.current)
        setTimeout(function () {debugger;
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
                onMouseDown={this.onMouseDown}
                onMouseMove={this.onMouseMove}
                onMouseUp={this.onMouseUp}
                onMouseLeave={this.onMouseUp}>
                <div className="wx-picker-mask2">
                    <div className="wx-picker-indicator">
                        <div className="wx-picker-content" style={contentStyle}>{itemList}</div>
                    </div>
                </div>
            </div>
        )
    }
}