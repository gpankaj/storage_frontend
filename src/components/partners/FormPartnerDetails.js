import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';

export class FormPartnerDetails extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    render() {
        const {values, handleChange} = this.props;


        return (

            <div>
                <h1>Partner Details</h1>
                <TextField hintText="Enter Your Name" label="Name"
                    onChange={handleChange('name')} defaultValue={values.name}
                ></TextField>
                <br/>
                <TextField hintText="Enter Your Phone Number" label="Mobile Number"
                           onChange={handleChange('phone_number')} defaultValue={values.phone_number}
                ></TextField>
                <br/>
                <TextField hintText="Enter Your Email id" label="Email"
                           onChange={handleChange('email')} defaultValue={values.email}
                ></TextField>
                <br/>

                <TextField hintText="Enter Your Password" label="Password"
                           onChange={handleChange('password')} defaultValue={values.password}
                           type="password"
                ></TextField>
                <br/>
                <Button primary="true" style={styles.button}
                    onClick={this.continue}
                >
                    Continue</Button>

            </div>


        )

    }
}

const styles = {
    button: {
        margin: 15
    }
}

export default FormPartnerDetails