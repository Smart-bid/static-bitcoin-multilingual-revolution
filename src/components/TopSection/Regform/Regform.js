import React, { Component } from 'react'
import {UserContext} from '../../../helpers/dataContext'
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
            password: "",
            confirm_password: "",
            phone_country_prefix: "",
            tel: "",
            agree_1: true,
            agree_2: true,
            firstPassType: 'password',
            secondPassType: 'password',
            errorIndexes: [0,1,2,3]
        };
    }

    static contextType = UserContext;

    handleSelectFlag = (num, country) => {
        this.setState({
            phone_country_prefix: '+' + `${country.dialCode}`
        })
    };
    /*phoneNumberBlur = (status, value, countryData) => {
        this.setState({
            phone_country_prefix: '+' + `${countryData.dialCode}`
        })
    };*/

    handleForward = (e) => {
        let form = e.target.parentElement;
        let paramsToValidate = {};

        // Step 1
        if(this.props.step === 1){
            paramsToValidate = {
                email: this.context.email,
                first_name: this.context.first_name,
                last_name: this.context.last_name,
                agree_2: this.state.agree_2,
                funnel_name: window.location.origin,
            };
            let submitResponse = this.props.validateParams(paramsToValidate);

            if (submitResponse.success) {
                this.props.handleForward(paramsToValidate);
                this.props.handleStep(this.props.step + 1);
            } else{
                this.setState({
                    errors: submitResponse.errors
                })
            }
        }
        // Step 2
        else if (this.props.step === 2){
            if (this.state.tel.length > 3) {
                paramsToValidate = {
                    first_name: this.context.first_name,
                    last_name: this.context.last_name,
                    email: this.context.email,
                    phone_number: this.state.tel,
                    phone_country_prefix: this.state.phone_country_prefix
                };
                let submitResponse = this.props.validateParams(paramsToValidate);
                if (submitResponse.success) {
                    this.props.handleSubmit(paramsToValidate);
                    this.props.handleStep(this.props.step + 1);
                    console.log(paramsToValidate);
                }  else{
                    this.setState({
                        errors: submitResponse.errors
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

    componentDidUpdate() {
        let forms = [...document.querySelectorAll('.Regform')];
        forms.map(form => {
            let steps = [...form.querySelectorAll('.form-wrapper')];
            steps.map((step, index) => {
                if (index+1 === this.props.step-1) {
                    step.classList.add('step');
                }
            })
        })
    }

    render() {
        const {
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
                                {this.state.errors[0]}
                            </div>}
                            <div className="form-group">
                                <input className="form-control fname" type="text" name="first_name" placeholder={languageManager.fname} defaultValue={this.context.first_name} onChange={(e) => {this.context.getValueFromInputs(e)}}/>
                            </div>
                            <div className="form-group">
                                <input className="form-control lname" type="text" name="last_name" placeholder={languageManager.lname} defaultValue={this.context.last_name} onChange={(e) => {this.context.getValueFromInputs(e)}}/>
                            </div>
                            <div className="form-group">
                                <input className="form-control email" type="text" name="email" placeholder={languageManager.email} defaultValue={this.context.email} onChange={(e) => {this.context.getValueFromInputs(e)}}/>
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
                                            <input type="text" name="first_name" placeholder={languageManager.fname} defaultValue={this.context.first_name} className="form-control gtd-field-fname" onChange={(e) => {this.context.getValueFromInputs(e)}}/>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input type="text" name="last_name" placeholder={languageManager.lname} className="form-control gtd-field-lname" defaultValue={this.context.last_name} onChange={(e) => {this.context.getValueFromInputs(e)}}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="email" name="email" placeholder={languageManager.email} className="form-control gtd-field-email" defaultValue={this.context.email} onChange={(e) => {this.context.getValueFromInputs(e)}}/>
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
                                            //onPhoneNumberBlur={this.phoneNumberBlur}
                                            defaultCountry={this.context.countryCode}
                                            onPhoneNumberChange={(status, value, countryData, number, id) => {

                                                if (value.length < 15) {
                                                    this.setState({
                                                        phone_country_prefix: `+${countryData.dialCode}`,
                                                        tel: value.replace(/[^0-9]/g, ''),
                                                    })
                                                    this.context.getCountryCode(countryData.iso2);
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
