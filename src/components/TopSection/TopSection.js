import React, { Component } from 'react'

import Header from './Header/Header'
import VideoPlayer from './VideoPlayer/VideoPlayer.js'
import Regform  from './Regform/Regform'

import en_1 from './en_1.mp4'
import fr_video from './fr_video.mp4'


export default class TopSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            videos: {
                en_1,
                fr_video
            }
        };
        this.regPanel = React.createRef();
    }
    handleScroll() {

        let panel = this.regPanel.current;

        window.scrollTo({
            top: panel.offsetTop,
            left: 0,
            behavior: 'smooth'
        })
    }

    render() {
        let languageManager = this.props.languageManager();

        return (
            <div className='TopSection'>
                <Header languageManager={this.props.languageManager} handleScroll={this.handleScroll.bind(this)}/>
                <div className="headline">
                    <div className="title">
                        <h1>{languageManager.title}</h1>
                    </div>
                    <div className="subtitle">
                        {/*<h2>{languageManager.subtitle}</h2>*/}
                        <h4>
                            <span className="white">{languageManager.subtitle2[0]} </span>
                            <span className="yellow"> {languageManager.subtitle2[1]}</span>
                        </h4>
                    </div>
                </div>
                <div className="top-reg" id="top">
                    <div className="container">
                        <div className="row">
                            <div className="video embed-responsive col-lg-8 col-md-7 col-sm-12">
                                <VideoPlayer link={this.state.videos[languageManager.video]} />
                            </div>
                            <div className="col-lg-4 col-md-5 col-sm-12">
                                <div className="form-container" ref={this.regPanel}>
                                    <div className="formHeader"><h1>{languageManager.topreg1}</h1></div>
                                    <Regform {...this.props} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
