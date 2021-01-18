import React, {useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from "@material-ui/core/styles";
import logo2 from "../../assets/logo2.jpg"
import Tooltip from "@material-ui/core/Tooltip";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Link} from 'react-router-dom';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const useStyles = makeStyles(theme => ({
    toolbarMargin: {
    ...theme.mixins.toolbar,
        marginBottom: "1.5em",
        marginLeft: "5em",
        [theme.breakpoints.down("md")]: {
            marginBottom: "1em",
            marginLeft: "2em",
        },
        [theme.breakpoints.down("xs")] : {
            marginBottom: "1em",
            marginLeft: "2em",
        }
    },
    logo: {
        width: "10em",
        height: "4em",
        marginLeft: "0.5em",
        marginBottom: "0.5em",
        marginTop: "0.5em",
        borderRadius: 100,
        backgroundColor: 'rgba(222,200,0,0.5)',
        [theme.breakpoints.down("md")]: {
            width: "7em",
            height: "3em",
        },
        [theme.breakpoints.down("xs")] : {
            width: "6em",
            height: "2.5em",
        }
    },
    tabContainer: {
        marginLeft: 'auto',
        marginRight: "70px"
    },
    logotab: {
        marginLeft: "1px",
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 8,
        marginRight: "35px",
        color: "white",

    },
    button: {
        ...theme.typography.estimate,
        borderRadius: "50px",
        marginLeft: "50px",
        marginRight: "50px",
        height: "45px",
    },
    menu: {
        backgroundColor: theme.palette.common.blue,
        color: "white",
        borderRadius: "0px",
    },
    MenuItem: {
        ...theme.typography.tab,
        opacity: 0.7,
        "&:hover" : {
            opacity: 1,
        }
    },
    drawerIconContainer: {
        marginLeft: "auto",
        "&:hover" : {
            backgroundColor: "transparent"
        }
    },
    drawerIcon: {
        height: "50px",
        width: "50px"
    },
    drawer: {
        backgroundColor: theme.palette.common.blue,

    },
    drawerItem: {
        ...theme.typography.tab,
        color: "white",
        opacity: 0.7
    },
    drawerItemSelected: {
        opacity: 1
    },
    menuItemSelected: {
        opacity: 1
    },
    appBar: {
        zIndex: theme.zIndex.modal +1
    }
}));


export default function Header(props) {

    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const [openDrawer, setOpenDrawer] = useState(false)

    const classes = useStyles();

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const [value, setValue] = useState(0);

    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const menuOptions = [
                         {name: "Customer Login", link: "/customerlogin"},
                         {name: "Become a Partner", link: "/partners" },
                         {name: "contact" , link: "/contact"},
                         {name: "How it works", link: "/how"}
                         ];

    const handleMenuItemClick = (e,i) => {
        setAnchorEl(null);
        setOpenMenu(false);
        setSelectedIndex(i)

    };

    useEffect(()=>{
        if(window.location.pathname === "/" && value !== 0 ) {
            setValue(0)
        } else if(window.location.pathname === "/requirements" && value !== 0 ) {
            setValue(0)

        } else if(window.location.pathname === "/partners" && value !== 1 ) {
            setValue(1)
            setSelectedIndex(1)
        } else if(window.location.pathname === "/contact" && value !== 1 ) {
            setValue(1)
            setSelectedIndex(2);
        } else if(window.location.pathname === "/how" && value !== 1 ) {
            setValue(1)
            setSelectedIndex(3)
        }else if(window.location.pathname === "/customerlogin" && value !== 1 ) {
            setValue(1)
            setSelectedIndex(0)
        }
    }, [value] );

    const handleHeaderTabChange = (e,newValue) => {
        setValue(newValue)
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
        setOpenMenu(true)

    };

    const handleClose = (event) => {
        setAnchorEl(null)
        setOpenMenu(false)
    };

    const tabs = (
        <React.Fragment>

            <Tabs value={value} className={classes.tabContainer} indicatorColor="primary" onChange={handleHeaderTabChange}>


                <Tab className={classes.tab} component={Link} to="/" label="StorageHub"
                    onClick={()=> { setValue(0);setOpenMenu(false) }}
                />

                <Tab className={classes.tab} component={Link} to="/contact" label="Menu"
                     aria-owns={anchorEl ? "simple-menu": undefined}
                     aria-haspopup={anchorEl ? "true": undefined}
                     onMouseOver={ (event => handleClick(event))}
                />
            </Tabs>
        </React.Fragment>
    );

    const drawer = (
        <React.Fragment>
            <SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS}
                             open={openDrawer} onClose={()=>setOpenDrawer(false)}
                                onOpen={()=>setOpenDrawer(true)} classes={{paper: classes.drawer}}>

                    <div className={classes.toolbarMargin}/>
                    <List disablePadding >
                        <ListItem className={selectedIndex===0 && value===1 ? [classes.drawerItem , classes.drawerItemSelected]:[classes.drawerItem]}
                                  onClick={ ()=>{setOpenDrawer(false); setValue(1); setSelectedIndex(0)} }
                                  divider button component={Link} to="/customerlogin"
                                  selected={selectedIndex===0}
                        >
                            <ListItemText disableTypography>Customer Login</ListItemText>
                        </ListItem>

                        <ListItem className={selectedIndex===1 && value===1 ? [classes.drawerItem , classes.drawerItemSelected]:[classes.drawerItem]}
                                  onClick={ ()=>{setOpenDrawer(false); setValue(1); setSelectedIndex(1)} }
                                  divider button component={Link} to="/partners"
                                  selected={selectedIndex===1}
                        >
                            <ListItemText disableTypography>Become a Partner</ListItemText>
                        </ListItem>

                        <ListItem className={selectedIndex===2 && value===1 ? [classes.drawerItem , classes.drawerItemSelected]:[classes.drawerItem]}
                                  onClick={ ()=>{setOpenDrawer(false); setValue(1); setSelectedIndex(2)} }
                                  divider button component={Link} to="/contact"
                                  selected={selectedIndex===2}
                        >
                            <ListItemText  disableTypography>Contact</ListItemText>
                        </ListItem>

                        <ListItem className={selectedIndex===3 && value===1 ? [classes.drawerItem , classes.drawerItemSelected]:[classes.drawerItem]}
                                  onClick={ ()=>{setOpenDrawer(false); setValue(1); setSelectedIndex(3)} }
                                  divider button component={Link} to="/how"
                                  selected={selectedIndex===3}
                        >
                            <ListItemText disableTypography>How it works</ListItemText>
                        </ListItem>
                    </List>

            </SwipeableDrawer>
            <IconButton className={classes.drawerIconContainer} onClick={()=>{setOpenDrawer(!openDrawer)}} disableRipple >
                <MenuIcon className={classes.drawerIcon}/>
            </IconButton>
        </React.Fragment>
    );

    return (

        <React.Fragment>
            <ElevationScroll>
            <AppBar position="fixed" color="primary"  className={classes.appBar}>
                <Toolbar disableGutters={true}>


                    <Tooltip title="Storage Transport and Packing Solutions (Residential Industrial & Offices)">
                    <Link to="/">
                        <img src={logo2}  className={classes.logo} alt="Company Logo"  />
                    </Link>
                    </Tooltip>


                    {matches ? drawer: tabs}



                </Toolbar>
            </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} />


            
            <Menu id="simple-menu" anchorEl={anchorEl} open={openMenu} onClose={handleClose} MenuListProps={ {onMouseLeave: handleClose } }
                    classes={{paper: classes.menu}}
                  elevation={0} keepMounted

            >
                <div className={classes.toolbarMargin} />

                {menuOptions.map((option, i) => (

                    <MenuItem key={`${option}${i}`}
                        onClick={(e)=>{handleMenuItemClick(e,i); setValue(1); handleClose();}}
                        component={Link}
                        to={option.link} classes={ {root: classes.MenuItem} }
                        selected={i===selectedIndex && value===1}
                              className={selectedIndex===i && value===1 ? [classes.menuItemSelected , classes.menuItem]:[classes.menuItem]}
                    >
                        {option.name}
                    </MenuItem>

                )) }

            </Menu>

            {
                /*
                <Button variant="contained" color="secondary" className={classes.button} raised>FREE ESTIMATE</Button>

                <Button variant="contained" color="secondary" className={classes.button} raised>Post Requirement</Button>
                */
            }


        </React.Fragment>
    )
}