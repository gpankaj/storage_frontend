import { createMuiTheme } from '@material-ui/core/styles';

const hubBlue = "#0c5aff";
const hubOrange = "#e9aa59";

export default createMuiTheme({
    palette: {
        common: {
            blue: `${hubBlue}`,
            orange: `${hubOrange}`
        },
        primary: {
            main: `${hubBlue}`
        },
        secondary: {
            main: `${hubOrange}`
        },
    },
    typography: {
        h5: {
            fontWeight: 140,
            color: "white"
        },
        tab: {
            textTransform: "None",
            fontSize: "1.5rem",
            fontFamily: "Arial, Helvetica, sans-serif"
        },
        estimate: {
            fontFamily: "Pacifico",
            fontSize: "1.5rem",
            textTransform: "none",
            color: "white",
        }
    }
})