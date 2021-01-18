import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Search from './Search';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Button from '@material-ui/core/Button';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        marginTop: "40px",
    },
    search: {
    },
}));



export class Home extends Component {

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
        partners: [],
        branches : [],

        Branch_listing_active: true,

    };

    updatePartner = () => {
        axios.get("http://localhost:8080/internal/partners/search?status=true")
            .then(response => {
                console.log(response.data)
                this.setState({
                    partners : response.data
                })
                this.setState(response.data)
            })
            .catch(error => console.log(error));
    }

    constructor(props) {
        super(props);
        this.updatePartner();
    }

    partnerCards() {
        const data = []
        for (let partner of this.state.partners) {
            console.log(partner.Storage_partner_company_name)
            data.push(
                <Card>
                    <CardContent>
                        <Typography color="secondry" gutterBottom>
                            <h4>Company "{partner.Storage_partner_company_name}" Owner: {partner.Storage_partner_name}</h4>
                        </Typography>
                        <Typography color="textSecondary">
                            Email_id: {partner.Email_id===undefined ? "Not Defined": partner.Email_id}
                            <br/>
                            Listing_active: {partner.Listing_active ? "Active" : "Inactive"}
                            <br />
                            Date_created: {partner.Date_created}
                            <Rating
                                readOnly={"true"}
                                name="customized-empty"
                                defaultValue={5}
                                precision={0.5}
                                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                            />
                        </Typography>

                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" >Get Custom Quote</Button>
                    </CardActions>

                </Card>


            )
        }
        return data
    }


    render() {



        return (

            <React.Fragment>

                <div style={{marginBottom: "170px"}}>
                    <Search/>
                    {this.partnerCards()}

                </div>

            </React.Fragment>


        )

    }
}

const styles = {
    button: {
        margin: 15
    }
}

export default Home