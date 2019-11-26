import React, { Component } from 'react'
import ReactQueryParams from 'react-query-params'

import TopSection from './components/TopSection/TopSection'
import MidSection from './components/MidSection/MidSection'
import BottomSection from './components/BottomSection/BottomSection'
import Page from './pages/Page'

// Pages
import * as Pages from './pages'

export default class App extends ReactQueryParams {
    render() {
        return (
            <div className='App'>
                <TopSection {...this.props} />

                <MidSection languageManager={this.props.languageManager}/>

                <BottomSection
                    languageManager={this.props.languageManager}
                    pageHandler={this.pageHandler}
                    handleForward={this.handleForward}/>
            </div>
        )
    }
}
