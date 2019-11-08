import React, { Component } from 'react'
import logo from './logo.png'

export default class BottomSection extends Component {
    render() {
        let languageManager = this.props.languageManager();

        return (
            <div>
                <section className="pre-footer-section">
                    <div className="container">
                        <button className="pre-footer-btn scroll-top-btn" onClick={()=>{window.location.href='#'}}>
                            <span>{languageManager.last_btn}</span>
                        </button>
                    </div>
                </section>
                <footer className="footer text-center">
                    <div className="container">
                        <img src={logo} className="footer-logo" alt="logo"/>
                    </div>
                </footer>
            </div>

        )
    }
}
