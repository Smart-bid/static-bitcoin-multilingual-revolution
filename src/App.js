import React, { Component } from 'react'
import ReactQueryParams from 'react-query-params'
import {UserContext} from './helpers/dataContext';

import TopSection from './components/TopSection/TopSection'
import MidSection from './components/MidSection/MidSection'
import BottomSection from './components/BottomSection/BottomSection'
import Page from './pages/Page'

// Pages
import * as Pages from './pages'

export default class App extends ReactQueryParams {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            page: 'main',
            first_name: '',
            last_name: '',
            email: '',
            countryCode: ""
        };

        this.handleStep = this.handleStep.bind(this);
        this.pageHandler = this.pageHandler.bind(this);
        this.handleForward = this.handleForward.bind(this);
    }

    static contextType = UserContext;

    handleStep = (step) => {
        this.setState({step})
    };

    handleForward = (params) => {
        this.props.handleLeadStep(params);
    };

    handleSubmit = (params) => {
        this.props.onSubmit(params)
        .then(() => this.setState({ step: 1 }))
    };

    getValueFromInputs = e => {
        this.setState({ [e.target.name] : e.target.value});
    };

    getCountryCode = (countryVal) => {
        this.setState({
            countryCode: countryVal
        })
    };

    pageHandler(page) {
        window.scrollTo(0, 0);

        switch (page) {
            default:  
                this.setState({page: 'main'});
                break;
            case 'terms':
                this.setState({page: Pages.terms});
                break;
            case 'privacy':
                this.setState({page: Pages.privacy});
                break;
            case 'gov':
                this.setState({page: Pages.gov});
                break;
            case 'disc':
                this.setState({page: Pages.disc});
                break;
            case 'spam':
                this.setState({page: Pages.spam});
                break;
        }

    }

    render() {

        if (this.state.page === 'main') {
            return (
                <div className='App'>
                    <UserContext.Provider value={{
                        first_name: this.state.first_name,
                        last_name: this.state.last_name,
                        email: this.state.email,
                        countryCode: this.state.countryCode,
                        getCountryCode: this.getCountryCode,
                        getValueFromInputs: this.getValueFromInputs
                    }}>
                    <TopSection
                                countryCode={this.props.countryCode}
                                handleStep={this.handleStep}
                                step={this.state.step}
                                handleSubmit={this.handleSubmit}
                                pageHandler={this.pageHandler}
                                handleForward={this.handleForward}
                                languageManager={this.props.languageManager}
                                validateParams={this.props.validateParams}/>

                    <MidSection languageManager={this.props.languageManager}/>

                    <BottomSection
                        languageManager={this.props.languageManager}
                        pageHandler={this.pageHandler}
                        handleForward={this.handleForward}/>
                    </UserContext.Provider>
                </div>
            )
        } else {
            return (
                <Page page={this.state.page} pageHandler={this.pageHandler}></Page>
            )
        }
    }
}
