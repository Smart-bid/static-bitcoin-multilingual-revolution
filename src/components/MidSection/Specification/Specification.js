import React, {Component} from 'react'
import join1 from './img/join1.png'
import join2 from './img/join2.png'
import join3 from './img/join3.png'


export default class Specification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: {
                join1,
                join2,
                join3
            }
        }
    }
    render() {
        let languageManager = this.props.languageManager();

        return (
            <div className="features-section text-center">
                <div className="container">
                    <div className="row">
                        {
                            languageManager.descriptions.slice(0,3).map((item, index) => {
                                return (
                                    <div className="col-lg-4 feature-wrapper-col" key={index}>
                                        <div className="feature-wrapper">
                                            <div className="feature-img-wrapper">
                                                <img src={this.state.images[item.img]} alt={item.name}/>
                                            </div>
                                            <h5 className="feature-header">{item.name}</h5>
                                            <p className="feature-description">
                                                {item.text}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}