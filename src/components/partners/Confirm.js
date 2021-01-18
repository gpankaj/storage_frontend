import React, { Component } from 'react';

import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

import Button from '@material-ui/core/Button';

export class Confirm extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.previousStep();
    }

    render() {
        const {values: {
            name, phone_number, email, company, gst
        }} = this.props;


        return (

            <div>
                <h1>Confirm Partner Data</h1>
                <List>
                    <ListItemText primary="Name" secondary={name}/>

                    <ListItemText primary="Phone Number" secondary={phone_number}/>
                    <ListItemText primary="Email" secondary={email}/>
                    <ListItemText primary="Company" secondary={company}/>
                    <ListItemText primary="Gst" secondary={gst}/>

                </List>
                <Button primary="true" style={styles.button}
                        onClick={this.continue}
                >
                    Confirm & Continue</Button>

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

export default Confirm