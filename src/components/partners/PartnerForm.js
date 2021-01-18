import React, { Component } from 'react';

import FormPartnerDetails from './FormPartnerDetails';
import FormBusinessDetails from "./FormBusinessDetails";
import Confirm from "./Confirm";
import axios from "axios";
import Button from '@material-ui/core/Button';

import Success from "./Success";
import Auth2 from "../auth/Auth2";
import Partner from "../loggedinpartnerinfo/Partner";

export class PartnerForm extends Component {
    state  = {
        step: 1,
        name: '',
        phone_number: '',
        email: '',
        company: '',
        gst: '',
        password: '',
        token: '',
    }

    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step : step+1
        })


    }

    previousStep = () => {
        const { step } = this.state;
        this.setState({
            step: step -1
        })
    }

    //Handle Fields Change

    handleChange = input => e => {
        this.setState({[input] : e.target.value});


    }

    handleLogoutRequest = () => {
        this.props.logout()
    }



    render() {

        const {step} = this.state;
        const {name,phone_number, email, company, gst, password } = this.state;
        const values = {name,phone_number, email, company, gst, password};


        const loginButton = (
            <Button variant="contained" color="primary" href="/partners/login">
                Partner Login
            </Button>
        )

        const logoutButton = (
            <Button variant="contained" onClick={this.handleLogoutRequest} olor="primary">
                Partner Logout
            </Button>
        )


        if (step === 4) {
            console.log(values)
            axios.post("http://localhost:8080/partners",{
                "Storage_partner_name": values.name,
                "Email_id": values.email,
                "Phone_numbers": values.phone_number,
                "Storage_partner_company_gst": values.gst,
                "Storage_partner_company_name" : values.company,
                "Password": values.password
            })
                .then(response => console.log(response))
                .catch(error => console.log(error))
        }


        console.log("Logged in ", this.props.login);
        console.log("isLoggedIn ", this.props.isLoggedIn);

        if (this.props.isLoggedIn) {
            return(
                <div>
                    {logoutButton}
                    <Partner userProperty={this.props.userProperty} />

                </div>
            )
        }


        switch(step) {
            case 1:
                return (
                    <div>
                    <FormPartnerDetails
                        nextStep = {this.nextStep}
                        handleChange = {this.handleChange}
                        values = {values}
                    />
                        {loginButton}

                    </div>
                );
            case 2:
                return (
                    <div>
                    <FormBusinessDetails
                        nextStep = {this.nextStep}
                        previousStep = {this.previousStep}
                        handleChange = {this.handleChange}
                        values = {values}
                    />
                    {loginButton}
                    </div>
                );
            case 3:
                return (
                    <div>
                    <Confirm
                        nextStep = {this.nextStep}
                        previousStep = {this.previousStep}
                        values = {values}
                    />
                        {loginButton}
                    </div>
                );
            case 4:
                return (
                    <Success/>
                );
        }

    }
}

export default PartnerForm;