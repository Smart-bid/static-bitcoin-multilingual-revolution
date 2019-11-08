import React, {Component} from 'react'
import ReactPlayer from 'react-player'

import btn from './play_btn.png'

export default class VideoPlayer extends Component {
    constructor(props) {
        super(props)
        var date = this.currentDate();
        this.state = {
            play: false,
            time: date
        }
    }

    handlePlay() {
        this.setState({play: true});
    }

    currentDate() {
        let stamp = new Date().getTime(),
            date = `\/Date(${stamp})\/`,
            nowDate = new Date(parseInt(date.substr(6))),
            result = "";
        result += nowDate.format("dddd, mmmm d, yyyy");
        return result;
    }

    componentDidMount() {
        document.body.addEventListener("click", this.handlePlay.bind(this));
    }

    render() {
        return (
            <div className="VideoPlayer">
                <div className="gtd-video-title current-time">
                    <span>{this.state.time}</span>
                </div>
                <ReactPlayer url={this.props.link} playing={this.state.play} controls={true} muted width='100%'
                             height='100%'/>
            </div>
        )
    }
}