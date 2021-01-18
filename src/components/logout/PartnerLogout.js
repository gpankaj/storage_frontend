import React, { Component } from 'react';

import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router-dom';

export class PartnerLogout extends Component {
    constructor(props){
        super(props);
        this.props.logout()
    }
    render() {
        return (

            <Redirect to='/partners'/>

        )

    }
}

const styles = {
    button: {
        margin: 15
    }
}

export default PartnerLogout