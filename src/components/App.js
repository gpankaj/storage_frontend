import Header from "../components/ui/Header";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from "../components/ui/Theame"
import React from "react";
import Typography from '@material-ui/core/Typography';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { PublicRoute, PrivateRoute } from "react-private-public-route";


import Footer from "../components/ui/Footer";
import Hidden from '@material-ui/core/Hidden';
import {makeStyles} from "@material-ui/core/styles";
import PartnerForm from '../components/partners/PartnerForm';

import ReactSession from 'react-client-session';

import Auth2 from '../components/auth/Auth2';

import Home from "../components/ui/Home";
import PartnerLogout from "./logout/PartnerLogout";
import Branch from "./loggedinpartnerinfo/Branch";


const userProperty = {
    'user_id': '',
    'token': '',
    'expires': '',
};

const useStyles = makeStyles(theme=> ({

}));

function App() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isRestricted, setIsRestricted] = React.useState(true);

    const login = () => {
        setIsLoggedIn(isLoggedIn => !isLoggedIn);
    };

    const logout = () => {
        setIsLoggedIn(isLoggedIn => !isLoggedIn);
    };

    const restricted = () => {
        setIsRestricted(prevState => !prevState);
    };

    console.log("isLoggedIn", isLoggedIn);

    return (
      <ThemeProvider theme={theme}>

        <BrowserRouter>
            <Header/>

            <Footer/>

            <Switch>
                <Route exact={true} path="/" component={()=><Home userProperty={userProperty} logout={logout}  login={login} isLoggedIn={isLoggedIn}/>} ></Route>

                <Route exact={true} path="/requirements" component={()=><div>Requirements</div>}></Route>


                <Route exact={true} path="/partners" component={()=><PartnerForm login={login} logout={logout} userProperty={userProperty} isLoggedIn={isLoggedIn}/>}></Route>

                <Route exact={true} path="/partners/login" component={()=><Auth2 userProperty={userProperty} login={login} isLoggedIn={isLoggedIn}/>}></Route>



                <Route exact={true} path="/contact" component={()=><div>Contact</div>}></Route>

                <Route exact={true} path="/branch" component={()=><Branch userProperty={userProperty} logout={logout}  login={login} isLoggedIn={isLoggedIn}/>}></Route>

                <Route exact={true} path="/customerlogin" component={()=><div>Customer Login</div>}></Route>

                <Route exact={true} path="/how" component={()=><div>How</div>}></Route>

                <Route exact={true} path="/career" component={()=><div>Career</div>}></Route>
                <Route exact={true} path="/about" component={()=><div>About</div>}></Route>



                <Route exact={true} path="/branches"></Route>


            </Switch>
        </BrowserRouter>

    </ThemeProvider>
  );
}

export default App;
