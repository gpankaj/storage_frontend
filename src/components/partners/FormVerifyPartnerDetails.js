import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';

export class FormBusinessDetails extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    render() {

        const {values, handleChange} = this.props;


        return (

            <div>
                <h1>Verify Partner Details</h1>
                <TextField hintText="Company Name " label="company"
                           onChange={handleChange('company')} defaultValue={values.company}
                ></TextField>
                <br/>


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

export default FormBusinessDetails