import React, { Component } from 'react';

import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

import Button from '@material-ui/core/Button';

export class Success extends Component {

    render() {
        return (

            <div>
                <h1>Thank you for Your Registration</h1>
                <p>You will get instructions for further instructions.</p>
            </div>


        )

    }
}

const styles = {
    button: {
        margin: 15
    }
}

export default Success