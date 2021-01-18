import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from "axios";

import {Redirect} from 'react-router-dom';

class  Auth2 extends Component {
    state  = {
        email: '',
        password: ''
    }



    loginRequest = (e) => {
        e.preventDefault();
        console.log("Trying to login " + this.state.email  + " and password "+ this.state.password)
        //localhost:9090/oauth/access_token/

        axios.post("http://localhost:9090/oauth/access_token/",{
            "Email_id": this.state.email,
            "Password": this.state.password
        })
            .then(response => {

                console.log(response.data)
                this.props.userProperty.user_id=response.data.User_id
                this.props.userProperty.token=response.data.Access_token
                this.props.userProperty.expires=response.data.Expires
                console.log(this.props.userProperty)
                this.props.login()
                //window.location = "/partners"

            })
            .catch(error => console.log(error));

    };

    handleChange = input => e => {
        this.setState({[input] : e.target.value});
    };

    render() {
            if (this.props.isLoggedIn == false) {
                return (
                    <div>
                        <Grid container spacing={8} alignItems="flex-end">

                            <Grid item md={true} sm={true} xs={true}>
                                <TextField id="email" onChange={this.handleChange('email')} label="email" type="email"
                                           autoFocus required/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} alignItems="flex-end">

                            <Grid item md={true} sm={true} xs={true}>
                                <TextField id="password" onChange={this.handleChange('password')} label="Password"
                                           type="password" required/>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" justify="space-between">
                            <Grid item>
                                <FormControlLabel control={
                                    <Checkbox
                                        color="primary"
                                    />
                                } label="Remember me"/>
                            </Grid>
                            <Grid item>
                                <Button disableFocusRipple disableRipple variant="text" color="primary">Forgot password
                                    ?</Button>
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Button variant="outlined" onClick={this.loginRequest} color="primary">Login</Button>
                        </Grid>


                        <Button variant="contained" color="primary" href="/partners/">
                            Register New Partner
                        </Button>

                    </div>
                );
            } else {
                return (
                    <Redirect to='/partners'/>
                )
            }
    }
}

export default Auth2;