import React, { Component } from 'react'
import amelie from './images/amelie.jpg'
import chris from './images/chris.jpg'
import isabel from './images/isabel.jpg'
import kiyle from './images/kiyle.jpg'

export default class People extends Component {
    constructor(props) {
        super(props);
        var random = this.rand();
        this.state = {
            random: random,
            shakeClass: 'dynamic-person-img',
            images: {
                chris,
                isabel,
                amelie,
                kiyle,
            }
        };

        setInterval(() => {
            this.setState({shakeClass: (this.state.shakeClass === 'dynamic-person-img') ? 'dynamic-person-img shake' : 'dynamic-person-img'})
        }, 5000)

    }


    rand() {
        const random = Math.floor(Math.random() * 3);
        return random;
    }
    componentDidMount() {
        const _this = this;
        this.timer = setInterval(function(){
            var random = _this.rand();
            _this.setState({
                random: random,
            })
        },5000)
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        let languageManager = this.props.languageManager();
        const random = this.state.random
        return (
            <div className="dynamic-person-div none">
                <div className="dynamic-person-img-wrapper">
                    <img src={this.state.images[languageManager.customer[random].img]} alt="" className={this.state.shakeClass}/>
                </div>
                <p className="dynamic-person-p">
                    <span className="dynamic-person-name-span">{languageManager.customer[random].name}</span><br/>
                    <span>{languageManager.invest}</span><br/>
                    <span className={this.state.shakeClass} style={{width: "auto", height: "auto", border: "none"}}>{languageManager.customer[random].earn}</span>
                    <span className={this.state.shakeClass} style={{width: "auto", height: "auto", border: "none"}}> {languageManager.currency}</span>
                </p>
            </div>
        )

    }
}
