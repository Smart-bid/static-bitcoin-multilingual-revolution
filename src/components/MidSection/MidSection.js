import React, { Component } from 'react'
import Specification from './Specification/Specification'
import Review from './Review/Review'
import Table from './Table/Table'
import HowItWorks from './HowItWorks/HowItWorks'
import Faq from './Faq/Faq'

import bitGo from './images/bitgo.png'
import norton from './images/norton.png'
import secureTrading from './images/secure-trading.png'
import mcAffee from './images/mcafee.png'

import girlHoldBtc from './images/girl-holding-bitcoin.png'
import mediaLogos from './images/seenon.png'

export default class MidSection extends Component {
    render() {
        let languageManager = this.props.languageManager();

        return (
            <div className="MidSection">

                <div className="logos-section">
                    <div className="container">
                        <div className="logos-wrapper">
                            <img src={bitGo} alt=""/>
                            <img src={norton} alt=""/>
                            <img src={secureTrading} alt=""/>
                            <img src={mcAffee} alt=""/>
                        </div>
                    </div>
                </div>

                <section className="join-us-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <h1 className="join-us-header">
                                    <span data-i18n="">{languageManager.join_title[0]}</span>
                                    <span style={{color: '#5F3394'}} data-i18n="">{languageManager.join_title[1]}</span>
                                </h1>
                                <br/>
                                <p className="join-us-p">
                                    <span data-i18n="">
                                        {languageManager.join_description[0]}<br/>
                                        {languageManager.join_description[1]}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="fake-news-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                <p className="seenon-p">{languageManager.mediaTitle}</p>
                                <p className="fake-news-logos-wrapper">
                                    <img src={mediaLogos} alt="media logos"/>
                                </p>
                            </div>
                            <div className="col-md-7">
                                <div className="join-us-img-wrapper">
                                    <img src={girlHoldBtc} alt="join us" className="join-us-img"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Review languageManager={this.props.languageManager}/>

                <Specification languageManager={this.props.languageManager}/>

                <Table languageManager={this.props.languageManager}/>

                <HowItWorks languageManager={this.props.languageManager}/>

                <Faq languageManager={this.props.languageManager}/>
            </div>

        )
    }
}
