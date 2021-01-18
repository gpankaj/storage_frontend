import React, { Component } from 'react';

import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router-dom';

//DELETE/MODIFY a PARTNER.
import axios from "axios";
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import Branches from "./Branch";
import Auth2 from "../auth/Auth2";


export class Partner extends Component {


    updateBranches = ()=>  {
        axios.get("http://localhost:8080/branches/"+this.props.userProperty.user_id)
            .then(response => {
                this.setState({
                    branches: response.data
                })
                console.log(this.state.branches);
            })
            .catch(error => console.log(error));
    }

    updatePartner = () => {
        axios.get("http://localhost:8080/partners/"+this.props.userProperty.user_id + "?access_token="+ this.props.userProperty.token)
            .then(response => {
                console.log(response.data)
                this.setState({
                    Id: response.data.Id,
                    Storage_partner_name: response.data.Storage_partner_name,
                    Storage_partner_company_name: response.data.Storage_partner_company_name,
                    Storage_partner_company_gst: response.data.Storage_partner_company_gst,
                    Listing_active: response.data.Listing_active,
                    Email_id: response.data.Email_id,
                    Phone_numbers: response.data.Phone_numbers,
                    Verified: response.data.Verified,
                    Date_created: response.data.Date_created,


                })
                this.setState(response.data)
            })
            .catch(error => console.log(error));
    }

    state = {
        Id: '',
        Storage_partner_name: '',
        Storage_partner_company_name:'',
        Storage_partner_company_gst: '',
        Listing_active: '',
        Email_id: '',
        Phone_numbers: '',
        Verified: '',
        Date_created: '',

        open: false,
        openpartnermodal: false,


        activeBranch: true,

        branches : [],

        Branch_listing_active: true,

    };

    constructor(props) {
        super(props);
        console.log(this.props.userProperty);
        this.state.Id = this.props.userProperty.user_id

        this.updatePartner();
        this.updateBranches();

    };

    handlePartnerEdit = () => {
        this.setState({openpartnermodal : true})
        console.log("Trying to open handlePartnerEdit modal")
    };

    handlePartnerCloseModal = () => {
        console.log("Trying to close modal")
        this.setState({openpartnermodal: false})
        this.updatePartner();

    };

    saveEditPartner = () => {
        console.log("Saving patch");

        let data = {
            Storage_partner_company_name: this.state.Storage_partner_company_name,
            Storage_partner_name: this.state.Storage_partner_name,
            Storage_partner_company_gst: this.state.Storage_partner_company_gst,
            Email_id: this.state.Email_id,
            Listing_active: this.state.Listing_active,
        };
        console.log("Transferring this data ", data)
        axios.patch("http://localhost:8080/partners/"+this.props.userProperty.user_id + "?access_token="+ this.props.userProperty.token,
                data
            )
            .then(response => {

                console.log("Response" ,response.data)
                this.setState(response.data)
            })
            .catch(error => console.log("Error " , error));
        this.setState({openpartnermodal : false})
    };



    saveDeletePartner = () => {
        axios.delete("http://localhost:8080/partners/"+this.props.userProperty.user_id + "?access_token="+ this.props.userProperty.token)
            .then(response => {

                console.log("Response" ,response.data)
                this.setState(response.data)
            })
            .catch(error => console.log("Error " , error));
        this.setState({openpartnermodal : false})
    }

    saveAddBranch = () => {
        console.log("Saving new Branch");

        let data = {
            City: this.state.City,
            Point_of_contact1: this.state.Point_of_contact1,
            Point_of_contact2: this.state.Point_of_contact2,
            Point_of_contact3: this.state.Point_of_contact3,
            Remarks: this.state.Remarks,
            Branch_email_id: this.state.Branch_email_id,
            Branch_listing_active: this.state.Branch_listing_active
        };
        console.log("Transferring this data ", data)
        axios.post("http://localhost:8080/branches?access_token="+ this.props.userProperty.token,
            data
        )
            .then(response => {
                console.log("Response new branch creation" ,response.data)
                this.setState(response.data);
                this.updateBranches();
            })
            .catch( (error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the
                    // browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
        this.setState({open : false})

    }




    handleAddBranch = () => {
        this.setState({open : true})
        console.log("Trying to open modal")
    };

    handleCloseModal = () => {
        console.log("Trying to close modal")
        this.setState({open: false})

    };
    handleChange = input => e => {
        this.setState({[input] : e.target.value});
    };

    handleAddBranchSubmit = () => {
        this.setState({open : false});
        console.log("Trying to open modal");
    };


    render() {

        const handlePartnerSwitchChange = () => {
            this.setState({Listing_active: !this.state.Listing_active});
        };


        const handleBranchSwitchChange = () => {
            this.setState({Branch_listing_active: !values.Branch_listing_active});
        };



        const {Id, Storage_partner_company_name, Storage_partner_name, Storage_partner_company_gst,Listing_active, Email_id, Phone_numbers, Verified, Date_created}= this.state;
        const {Branch_id, City,Point_of_contact1, Point_of_contact2, Point_of_contact3, Branch_email_id, Remarks, Branch_verified, Branch_listing_active, Branch_date_created } = this.state;

        const values = {
            Id, Storage_partner_company_name, Storage_partner_name, Storage_partner_company_gst,Listing_active, Email_id, Phone_numbers, Verified, Date_created,

            Branch_id, City,Point_of_contact1, Point_of_contact2, Point_of_contact3, Branch_email_id, Remarks, Branch_verified, Branch_listing_active,
            Branch_date_created };

        return (
            <div>


                <Card>
                    <CardContent>
                        <Typography color="secondry" gutterBottom>
                            <h1>Welcome "{this.state.Storage_partner_company_name}" You are Logged in as {this.state.Storage_partner_name}</h1>
                        </Typography>
                        <Typography color="textSecondary">
                            GST: {this.state.Storage_partner_company_gst===undefined ? "Not Defined": this.state.Storage_partner_company_gst}
                            <br/>
                            Email_id: {this.state.Email_id===undefined ? "Not Defined": this.state.Email_id}
                            <br/>
                            Listing_active: {this.state.Listing_active ? "Active" : "Inactive"}
                            <br />
                            Date_created: {this.state.Date_created}

                        </Typography>

                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" onClick={this.handlePartnerEdit} >Edit</Button>
                        <Button variant="contained" color="secondary" disabled="true" onClick={this.saveDeletePartner} >DELETE</Button>
                    </CardActions>
                </Card>


                <div>
                    <Button variant="contained" color="primary" onClick={this.handleAddBranch}>
                        Add Branch
                    </Button>
                    <Branches userProperty={this.props.userProperty} branches={this.state.branches} updateBranches={this.updateBranches}/>
                </div>





                <Dialog
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.openpartnermodal}
                    onClose={this.handlePartnerCloseModal}

                >

                    <div style={styles.form} autoComplete="off">
                        <h1>Edit Partner Details</h1>
                        <TextField hintText="Partner Company Name" label="Storage_partner_company_name"
                                   InputProps={{
                                       readOnly: true,
                                   }}
                                   onChange={this.handleChange('Storage_partner_company_name')} defaultValue={values.Storage_partner_company_name}
                        ></TextField>
                        <br/>

                        <TextField hintText="Owner Name" label="Storage_partner_name"
                                   onChange={this.handleChange('Storage_partner_name')} defaultValue={values.Storage_partner_name}
                        ></TextField>
                        <br/>

                        <TextField hintText="GST Number" label="Storage_partner_company_gst"
                                   onChange={this.handleChange('Storage_partner_company_gst')} defaultValue={values.Storage_partner_company_gst}
                        ></TextField>
                        <br/>

                        <br/>
                        <FormControlLabel control={
                            <Switch
                                checked={values.Listing_active}
                                onChange={handlePartnerSwitchChange}
                                name="Listing_active"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                label="Enable"
                            />}
                                          label={values.Listing_active === true ? "Enabled" : "Disabled"}
                        />
                        <br/>

                        <br/>
                        <Button primary="true" style={styles.button}
                                onClick={this.saveEditPartner}
                                color="primary"
                        >
                            Save Changes</Button>


                    </div>
                </Dialog>










                <Dialog
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleCloseModal}
                >

                    <div style={styles.form}>
                        <h1>Add New Branch</h1>
                        <TextField hintText="Branch in City" label="City"
                                   onChange={this.handleChange('City')} defaultValue=""
                        ></TextField>
                        <br/>

                        <TextField hintText="Phone number of Point of Contact for this city" label="Point_of_contact1" defaultValue=""
                                   onChange={this.handleChange('Point_of_contact1')}
                        ></TextField>
                        <br/>

                        <TextField hintText="Phone number of Point of Contact for this city" label="Point_of_contact2" defaultValue=""
                                   onChange={this.handleChange('Point_of_contact2')}
                        ></TextField>
                        <br/>

                        <TextField hintText="Phone number of Point of Contact for this city" label="Point_of_contact3" defaultValue=""
                                   onChange={this.handleChange('Point_of_contact3')}
                        ></TextField>
                        <br/>

                        <TextField hintText="Remarks" label="Remarks" defaultValue=""
                                   onChange={this.handleChange('Remarks')}
                        ></TextField>

                        <br/>

                        <TextField hintText="Branch email id" label="Branch_email_id" defaultValue=""
                                   onChange={this.handleChange('Branch_email_id')}
                        ></TextField>

                        <br/>
                        <FormControlLabel control={
                            <Switch
                                checked={values.Branch_listing_active}
                                onChange={handleBranchSwitchChange}
                                name="Branch_listing_active"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />}
                                          label={values.Branch_listing_active===true ? "Enabled" : "Disabled"}
                        />
                            <br/>

                        <br/>
                        <Button primary="true" style={styles.button}
                                onClick={this.saveAddBranch}
                                color="primary"
                        >
                            Add Branch</Button>


                    </div>
                </Dialog>


            </div>


        )
    }
}

const styles = {
    button: {
        margin: 15
    },
    form: {
        margin: 70
    },
    table: {
        minWidth: 650,
    },
}
export default Partner