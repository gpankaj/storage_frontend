import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import footerAdornment from "../../assets/Footer Adornment.svg"
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom'
import facebook from '../../assets/facebook.svg';
import twitter from '../../assets/twitter.svg';
import instagram from '../../assets/instagram.svg';

import Box from '@material-ui/core/Box';


const useStyles = makeStyles(theme=> ({
    footer:{
        marginTop: "20px",
        backgroundColor: theme.palette.common.blue,
        zIndex: 1302,
        width: "100%",
        position: "fixed",
        bottom: "0px",
        height: "100px",

        [theme.breakpoints.down("md")]: {
            height: "75px",
        },
        [theme.breakpoints.down("xs")]: {
            height: "50px",
        }
    },
    adornment : {
        width: "10em",
        verticalAlign: "bottom",

        [theme.breakpoints.down("md")]: {
            width: "7em",
        },
        [theme.breakpoints.down("xs")]: {
            width: "5em",
        }
    },
    mainContainer: {
        position: "absolute"
    },
    link: {
        color: "white",
        fontFamily: "Arial",
        fontSize: "0.75rem",
        fontWeight: "bold",
        textDecoration: "none",
    },
    icon: {
        height: "2em",
        width: "2em",
        marginTop: "2em",
    },
    socialContainer: {
        position: "absolute",
        marginTop: "-4.5em",
        right: "1.5em",

    }
}));

export default function Footer() {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>

                <Grid container className={classes.mainContainer} justify={"center"} spacing={7}>

                <Grid item >
                    <Grid container direction={"column"} >
                        <Grid item component={Link} to="/about"  className={classes.link}>
                            About
                        </Grid>

                    </Grid>
                </Grid>


                <Grid item >
                    <Grid container direction={"column"} >
                        <Grid item component={Link}  to="/career" className={classes.link}>
                            Career
                        </Grid>

                    </Grid>
                </Grid>


            </Grid>
            <img className={classes.adornment} alt="blackdecorative slash" src={footerAdornment}>

            </img>

            <Grid container justify="flex-end" alignItems="baseline" spacing={2} className={classes.socialContainer}>

                <Grid item component={"a"} href={"https://www.facebook.com"} rel="noopener noreferrer" target="_blank">
                    <img alt="facebook logo" src={facebook} className={classes.icon}/>
                </Grid>

                <Grid item component={"a"} href={"https://www.instagram.com"} rel="noopener noreferrer" target="_blank">
                    <img alt="instagram logo" src={instagram} className={classes.icon}/>
                </Grid>

                <Grid item component={"a"} href={"https://www.twitter.com"} rel="noopener noreferrer" target="_blank">
                    <img alt="twitter logo" src={twitter} className={classes.icon}/>
                </Grid>

            </Grid>
        </footer>)
}