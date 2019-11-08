import React, {Component} from 'react'

export default class Review extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let languageManager = this.props.languageManager();

        return (
            <div className="testimonials-section">
                <div className="container-fluid">
                    <h1 className="testimonials-header purple">{languageManager.review_title}</h1>
                </div>
                <div className="row">

                    {
                        languageManager.review_body.map((item, index) => {
                            return(
                                <div className="col-md-6 col-sm-12 col-lg-3 no-padding" key={index}>
                                    <div className={`testimonial-wrapper testimonial-wrapper-${index+1}`}>
                                        <div className="testimonial-intro-text white">
                                            <span>
                                                {item.name}
                                            </span><br/>
                                            <span>
                                                {item.place}
                                            </span><br/>
                                            <span className="yellow testimonial-profit-span">
                                                <span>{item.from}</span>: {item.price}
                                            </span>
                                        </div>
                                        <div className="testimonial-hover-text">
                                            <i>"<span>{item.text}</span>"</i>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {/*<div className="review-block">*/}
                {/*    <div className="container">*/}
                {/*        <div className="row border-block">*/}
                {/*            {*/}
                {/*                languageManager.review_body.slice(0,4).map((item, index) => {*/}
                {/*                    return (*/}
                {/*                        <div className="col-lg-3 border-line" key={index}>*/}
                {/*                            <div className="person-block">*/}
                {/*                                <div className="person-card">*/}
                {/*                                    <img src={this.state.images[item.img]} alt={item.name}/>*/}
                {/*                                    <div className="person-name">*/}
                {/*                                        <p>{item.name}</p>*/}
                {/*                                        <p>{item.place}</p>*/}
                {/*                                    </div>*/}
                {/*                                </div>*/}
                {/*                                <div className="review-text">*/}
                {/*                                    <p>{item.text}</p>*/}
                {/*                                </div>*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                    )*/}
                {/*                })*/}
                {/*            }*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        )
    }
}