import React, { Component } from 'react'
import IntlTelInput from 'react-intl-tel-input'
import 'react-intl-tel-input/dist/main.css'

import { ReactComponent as Mark } from './excl.svg'
import logo from '../../BottomSection/logo.png'

export default class Regform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            check: false,
            phone_country_prefix: "",
            country_name: "",
            tel: "",
            agree_1: true,
            agree_2: true,
            errors: '',
        };
        // this.handleBackwards = this.handleBackwards.bind(this);
        // this.handleSync = this.handleSync.bind(this);
    }

    componentDidUpdate() {
        let forms = [...document.querySelectorAll('.Regform')];

        forms.map(form => {
            let steps = [...form.querySelectorAll('.form-wrapper')];
            steps.map((step, index) => {
                if (index+1 === this.props.step - 1) {
                    step.classList.add('step');
                }
            })
        })
    }

    handleSelectFlag = (num, country) => {
        this.setState({
            phone_country_prefix: '+' + `${country.dialCode}`,
            country_name: country.iso2
        })
    };

    phoneNumberBlur = (status, value, countryData) => {
        this.setState({
            phone_country_prefix: '+' + `${countryData.dialCode}`,
            country_name: countryData.iso2
        })
    }

    phoneValidate = (value) => {
        return !/[^0-9\-\/]/.test(value);
    }

    handleForward = (e) => {
        let form = e.target.parentElement;
        let paramsToValidate = {};

        // Step 1
        if(this.props.step === 1){
            paramsToValidate = {
                email: this.state.email,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                agree_2: this.state.agree_2,
                funnel_name: window.location.origin,
            };
            let checkParams = this.props.validateParams(paramsToValidate);

            if (checkParams.success) {
                this.props.setLeadData(paramsToValidate).then(this.props.handleLeadStep(), this.props.handleStep(this.props.step + 1));
            } else {
                const fieldWithMessages = Object.keys(checkParams.errors).find(field => checkParams.errors[field].hasOwnProperty('messages'));
                const firstError = checkParams.errors[fieldWithMessages].messages[0];
                this.setState({
                    errors: firstError
                })
            }
        }
        // Step 2
        else if (this.props.step === 2){
            let tel = form.querySelector('.tel');
            let phone_number = tel.value.replace(/^\s+|\s/g, '');

            if (!this.phoneValidate(phone_number)) {
                this.setState({
                    errors: ['Enter only number']
                });
                return this.state.errors
            } else if (phone_number.length > 3) {
                paramsToValidate = {
                    phone_number: phone_number,
                    phone_country_prefix: this.state.phone_country_prefix
                };
                let submitPhone = this.props.validateParams(paramsToValidate);
                if (submitPhone.success) {
                    this.props.setLeadData(paramsToValidate).then(this.props.handleSubmit(), this.props.handleStep(this.props.step + 1));
                    this.setState({
                        errors: []
                    });
                }
                else{
                    this.setState({
                        errors: submitPhone.errors
                    })
                }
            } else {
                this.setState({
                    errors: ['Enter phone number']
                });
                return this.state.errors
            }
        }
    };

    handleStepChange = (name, value) => {
        let errors = null;
        this.setState({[name]: value.replace(/^\s+|\s/g, ''), errors});
    };

    render() {
        const {
            first_name,
            last_name,
            email,
            tel
        } = this.state;
        let languageManager = this.props.languageManager();

        if (this.props.step <= 2) {
            return (
                <div className={"Regform " + (this.props.class ? this.props.class : '')} ref={this.setTextInputRef}>

                    <div className="steps form-header">
                        <div className="progbar">
                            <ul className="formUl">
                                {[1,2,3].map(index => {
                                    if(index <= this.props.step-1) {
                                        return (
                                            <li className="num active" key={index} index={index}>✓</li>
                                        )
                                    } else {
                                        return (
                                            <li className="num" key={index}></li>
                                        )
                                    }
                                })}
                            </ul>
                        </div>
                    </div>

                    <div className='inner'>
                        <div className='form-wrapper one'>
                            {this.state.errors && <div className="errors">
                                {this.state.errors}
                            </div>}
                            <div className="form-group">
                                <input className="form-control fname" type="text" name="first_name" placeholder={languageManager.fname} value={first_name} onChange={(e) => this.handleStepChange(e.target.name, e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <input className="form-control lname" type="text" name="last_name" placeholder={languageManager.lname} value={last_name} onChange={(e) => this.handleStepChange(e.target.name, e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <input className="form-control email" type="text" name="email" placeholder={languageManager.email} value={email} onChange={(e) => this.handleStepChange(e.target.name, e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <button onClick={this.handleForward} className='registerBtn'>{languageManager.button}</button>
                            </div>
                        </div>
                        <div className='form-wrapper two'>
                            {this.state.errors && <div className="errors">
                                {this.state.errors[0]}
                            </div>}
                            <div className="gtd-form-wrapper">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input type="text" name="first_name" placeholder={languageManager.fname} value={first_name} className="form-control gtd-field-fname" onChange={(e) => this.handleStepChange(e.target.name, e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input type="text" name="last_name" placeholder={languageManager.lname} className="form-control gtd-field-lname" value={last_name} onChange={(e) => this.handleStepChange(e.target.name, e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="email" name="email" placeholder={languageManager.email} className="form-control gtd-field-email" value={email} onChange={(e) => this.handleStepChange(e.target.name, e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <div className="row" style={{margin:0}}>
                                        <IntlTelInput
                                            preferredCountries={[this.props.countryCode]}
                                            containerClassName="intl-tel-input"
                                            inputClassName="inputfield form-control tel"
                                            autoPlaceholder={true}
                                            separateDialCode={true}
                                            onSelectFlag={this.handleSelectFlag}
                                            defaultCountry={this.state.country_name}
                                            onPhoneNumberBlur={this.phoneNumberBlur}
                                            onPhoneNumberChange={(status, value, countryData, number, id) => {
                                                if (value.length < 15) {
                                                    this.setState({
                                                        phone_country_prefix: `+${countryData.dialCode}`,
                                                        tel: value.replace(/[^0-9]/g, ''),
                                                    })
                                                }
                                            }}
                                            value={tel}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button onClick={this.handleForward} className='registerBtn '>{languageManager.button}</button>
                        </div>
                        {/*<div className='form-wrapper three'>*/}
                        {/*    /!*{this.state.errors && <div className="errors">*/}
                        {/*        {this.state.errors[0]}*/}
                        {/*    </div>}*!/                            */}
                        {/*    <button onClick={this.handleForward} className='start' >{languageManager.button_last}</button>*/}
                        {/*</div>*/}
                    </div>
                    <div className="error"><Mark className='excl'/><span></span></div>
                </div>
            )
        }else {
            return (
                <div className={"Regform " + (this.props.class ? this.props.class : '')} ref={this.setTextInputRef}>
                    <img src={logo} alt="lodaing" className="loading"/>
                </div>
            )

        }
    }
}
