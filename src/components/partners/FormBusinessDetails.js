import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';

export class FormBusinessDetails extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.previousStep();
    }


    render() {
        const {values, handleChange} = this.props;


        return (

            <div>
                <h1>Business Details</h1>
                <TextField hintText="Company Name" label="company"
                           onChange={handleChange('company')} defaultValue={values.company}
                ></TextField>
                <br/>

                <TextField hintText="Gst Number" label="gst"
                           onChange={handleChange('gst')} defaultValue={values.gst}
                ></TextField>
                <br/>


                <br/>
                <Button primary="true" style={styles.button}
                        onClick={this.continue}
                >
                    Continue</Button>

                <Button primary="false" style={styles.button}
                        onClick={this.back}
                >
                    Back</Button>
            </div>


        )

    }
}

const styles = {
    button: {
        margin: 15
    }
}

export default FormBusinessDetails