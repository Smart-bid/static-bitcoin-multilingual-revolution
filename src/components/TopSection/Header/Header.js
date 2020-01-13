import React, { Component } from 'react'
import People  from './People/People'

import logo from './logo.png'

//Flags
import nlflag from './header-photos/nl.svg'
import plflag from './header-photos/pl.svg'
import itflag from './header-photos/it.svg'
import gbflag from './header-photos/GB.png'

export default class Header extends Component {
    constructor(props) {
        super(props);

        let today = new Date(),
            date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

        this.state = {
            date: date,
            time: {},
            seconds: 330,
            flags: {
                nlflag,
                plflag,
                itflag,
                gbflag
            }
        };
        this.timer = 0;
        this.countDown = this.countDown.bind(this);
    }

    secondsToTime(sec){

        let divisor_for_minutes = sec % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
        minutes = ("0" + minutes).slice(-2);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.round(divisor_for_seconds);
        seconds = ("0" + seconds).slice(-2);

        let timeObj = {
            "minutes": minutes,
            "seconds": seconds
        };
        return timeObj;
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
        if (this.timer == 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        if (seconds == 0) {
            clearInterval(this.timer);
        }
    }

    render() {
        let languageManager = this.props.languageManager();

        return (
            <header className='Header'>
                <div className="intro-section-1">
                    <div className="container">
                        <p className="intro-p">
                            <b>{languageManager.risk[0]}</b> {languageManager.risk[1]} <b>{this.state.date} {languageManager.risk[2]}</b> {this.state.time.minutes}:{this.state.time.seconds}
                        </p>
                    </div>
                </div>

                <section className="intro-section-2">
                    <div className="container">
                        <div className="intro-part-2">
                            <img src={logo} width="333" alt="logo" className="logo"/>
                            <div className="exclusive-offers-wrapper intro-margin-div none">
                                <div>
                                    <span className="purple">{languageManager.exclusive[0]}</span><br/>
                                    <span className="red">{languageManager.exclusive[1]}</span>
                                    <span className="red gtd-geo-country-name">{languageManager.exclusive[2]}</span>
                                </div>
                                <span className="gtd-geo-country-flag-icon flag-icon flag-icon-ua">
                                    <img src={this.state.flags[languageManager.flag]} width="45" alt=""/>
                                </span>
                            </div>

                                <People languageManager={this.props.languageManager}/>

                        </div>
                    </div>
                </section>

            </header>
        )
    }
}
