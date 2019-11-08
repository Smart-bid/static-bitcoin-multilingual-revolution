import React, {Component} from 'react'
import step1 from './images/step1.png'
import step2 from './images/step2.png'
import step3 from './images/step3.png'

export default class HowItWorks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: {
                step1,
                step2,
                step3
            }
        }
    }
    render() {
        let languageManager = this.props.languageManager();

        return (
            <div className="how-it-works-section text-center">
                <div className="container">
                    <div className="how-it-works-wrapper">
                        <h2 className="dark-purple bold how-it-works-header">{languageManager.how_it_works_title}</h2>
                        <div className="row">
                            {
                                languageManager.how_it_works_information.slice(0,3).map((item, index) => {
                                    return (
                                        <div className="col-md-4 no-padding step-wrapper-col" key={index}>
                                            <div className="step-wrapper step-wrapper-1">
                                                <h3 className={`step-header white step-header-${index+1}`}>{languageManager.step} {index+1}</h3>
                                                <div className="step-img-wrapper">
                                                    <img src={this.state.images[item.img]} alt=""/>
                                                </div>
                                                <h5 className="step-subheader bold dark-purple">{item.title}</h5>
                                                <p className="step-description">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="how-it-works-btn-wrapper">
                    <button className="yellow-btn open-free-account-btn scroll-top-btn" onClick={ ()=> window.location.href='#' }>
                        <span>{languageManager.how_it_works_button}</span>
                    </button>
                </div>
            </div>
        )
    }
}