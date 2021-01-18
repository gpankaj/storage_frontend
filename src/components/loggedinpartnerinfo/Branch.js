import React, { Component } from 'react';

import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


export class Branches extends Component {

    state = {
        openEditBranchmodal: false,

        Branch_id: '',
        City: '',
        Point_of_contact1: '',
        Point_of_contact2: '',
        Point_of_contact3: '',
        Branch_email_id: '',
        Remarks: '',
        Branch_verified: '',
        Branch_listing_active: ''
    }

    constructor(props) {
        super(props);
        console.log(this.props.branches)

    }

    handleBranchEdit = (row)=> {
        this.setState({openEditBranchmodal: true})
        this.setState(row)
    }

    handleBranchEditCloseModal = ()=> {
        this.setState({openEditBranchmodal: false})
    }

    handleChange = input => e => {
        this.setState({[input] : e.target.value});
    };

///branches/:partner_id/:branch_id
    saveEditBranch = ()=> {
        let data = {
            City: this.state.City,
            Point_of_contact1: this.state.Point_of_contact1,
            Point_of_contact2: this.state.Point_of_contact2,
            Point_of_contact3: this.state.Point_of_contact3,
            Branch_email_id: this.state.Branch_email_id,
            Remarks: this.state.Remarks,
            Branch_verified: this.state.Branch_verified,
            Branch_listing_active: this.state.Branch_listing_active,
        };

        axios.patch("http://localhost:8080/branches/"+this.state.Id + "/"+ this.state.Branch_id+ "?access_token="+ this.props.userProperty.token,
            data
        )
            .then(response => {

                console.log("Response" ,response.data)
                this.setState(response.data)
                this.props.updateBranches();
            })
            .catch(error => console.log("Error " , error));
        this.setState({openEditBranchmodal : false})

    };

    saveDeleteBranch = () => {
        axios.delete("http://localhost:8080/branches/"+this.state.Id + "/"+ this.state.Branch_id+ "?access_token="+ this.props.userProperty.token
        )
            .then(response => {

                console.log("Response" ,response.data)
                this.setState(response.data)
                this.props.updateBranches();
            })
            .catch(error => console.log("Error " , error));
        this.setState({openEditBranchmodal : false})
    }


    render() {

        const handleBranchSwitchChange = () => {
            this.setState({Branch_listing_active: !this.state.Branch_listing_active});
        };

        return(
            <div>



                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>

                                <TableCell>Branch_id</TableCell>

                                <TableCell>City</TableCell>
                                <TableCell align="right">Contact1</TableCell>
                                <TableCell align="right">Contact2</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Remarks</TableCell>
                                <TableCell align="right">Branch_verified</TableCell>
                                <TableCell align="right">Branch_listing_active</TableCell>
                                <TableCell align="right">Edit Branch</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.branches.map((row) => (
                                <TableRow key={row.Branch_id}>

                                    <TableCell align="left">{row.Branch_id}</TableCell>

                                    <TableCell component="th" scope="row">
                                        {row.City}
                                    </TableCell>
                                    <TableCell align="right">{row.Point_of_contact1}</TableCell>
                                    <TableCell align="right">{row.Point_of_contact2}</TableCell>
                                    <TableCell align="right">{row.Branch_email_id}</TableCell>
                                    <TableCell align="right">{row.Remarks}</TableCell>
                                    <TableCell align="right">{row.Branch_verified ? "Verified": "Not Verified"}</TableCell>
                                    <TableCell align="right">{row.Branch_listing_active ? "Active": "Inactive"}</TableCell>

                                    <TableCell align="right">
                                        <Button onClick={() => this.handleBranchEdit(row)}>edit</Button>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>










                <Dialog
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.openEditBranchmodal}
                    onClose={this.handleBranchEditCloseModal}

                >

                    <div style={styles.form} autoComplete="off">
                        <h1>Edit Branch Details</h1>


                        <TextField hinttext="Branch City" label="City"

                                   onChange={this.handleChange('City')} defaultValue={this.state.City}
                        ></TextField>
                        <br/>

                        <TextField hinttext="Point_of_contact1" label="Point_of_contact1"
                                   onChange={this.handleChange('Point_of_contact1')} defaultValue={this.state.Point_of_contact1}
                        ></TextField>
                        <br/>

                        <TextField hinttext="Point_of_contact2" label="Point_of_contact2"
                                   onChange={this.handleChange('Point_of_contact2')} defaultValue={this.state.Point_of_contact2}
                        ></TextField>
                        <br/>


                        <TextField hinttext="Point_of_contact3" label="Point_of_contact3"
                                   onChange={this.handleChange('Point_of_contact3')} defaultValue={this.state.Point_of_contact3}
                        ></TextField>
                        <br/>


                        <TextField hinttext="Branch_email_id" label="Branch_email_id"
                                   onChange={this.handleChange('Branch_email_id')} defaultValue={this.state.Branch_email_id}
                        ></TextField>
                        <br/>


                        <TextField hinttext="Remarks" label="Remarks"
                                   onChange={this.handleChange('Remarks')} defaultValue={this.state.Remarks}
                        ></TextField>
                        <br/>



                        <br/>
                        <FormControlLabel control={
                            <Switch
                                checked={this.state.Branch_listing_active}
                                onChange={handleBranchSwitchChange}
                                name="Listing_active"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                label="Enable"
                            />}
                                          label={this.state.Branch_listing_active === true ? "Enabled" : "Disabled"}
                        />
                        <br/>

                        <br/>
                        <Button primary="true" style={styles.button}
                                onClick={this.saveEditBranch}
                                color="primary"
                        >
                            Save Changes</Button>


                    </div>

                    <Button primary="true" style={styles.button}
                            onClick={this.saveDeleteBranch}
                    >
                        DELETE BRANCH</Button>
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

export default Branches;