import React, {Component} from 'react'
import qImage from './q.png'

export default class Faq extends Component {

    render() {
        let languageManager = this.props.languageManager();

        return (
            <div className="faq-section">
                    <div className="container">
                        <h2 className="faq-section-header text-center dark-purple bold">{languageManager.qna_title}</h2>
                        <div className="row">
                            <div className="col-md-6">
                                {
                                    languageManager.qna_question.slice(0,3).map((item, index) => {
                                        return (
                                            <div className="row" key={index}>
                                                <div className="col-md-11">
                                                    <div className={`faq-wrapper faq-wrapper-${index+1}`}>
                                                        {/*<img src={qImage} alt="question"/>*/}
                                                        <h4 className="faq-question light-purple bold">{item.q}</h4>
                                                        <p className="faq-answer">{item.a}</p>
                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    })
                                }
                            </div>
                            <div className="col-md-6">
                                {
                                    languageManager.qna_question.slice(3,6).map((item, index) => {
                                        return (
                                            <div className="row" key={index}>
                                                <div className="col-md-11">
                                                    <div className={`faq-wrapper faq-wrapper-${index+4}`}>
                                                        {/*<img src={qImage} alt="question"/>*/}
                                                        <h4 className="faq-question light-purple bold">{item.q}</h4>
                                                        <p className="faq-answer">{item.a}</p>
                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}