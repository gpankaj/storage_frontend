import React, { Component } from 'react';

import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

import Button from '@material-ui/core/Button';

export class RequirementCapture extends Component {


    render() {
        const {values: {
            name, phone_number, email, company, gst
        }} = this.props;


        return (

            <div>
                <h1>Get Quotes from Service Providers</h1>
                <List>
                    <ListItemText primary="Your Name" secondary={name}/>

                    <ListItemText primary="Phone Number" secondary={phone_number}/>
                    <ListItemText primary="Email" secondary={email}/>
                    <ListItemText primary="Requirement in detail" secondary={requirement}/>
                    <ListItemText primary="Tentative Date of Service" secondary={tentativedate}/>

                </List>
                <Button primary="true" style={styles.button}

                >
                    GET QUOTES</Button>


            </div>


        )

    }
}

const styles = {
    button: {
        margin: 15
    }
}

export default RequirementCapture