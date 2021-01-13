import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
    root: {
        '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
        },
    },
});

class Login extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = { 
            username: '',
            password: '',
        }
    }
    
    render() { 
        const { classes } = this.props;

        return ( 
            <form className={classes.root} noValidate autoComplete="off">
                <h3>UserName</h3>
                <TextField id="outlined-basic" label="UserName" variant="outlined" />
                <h3>Password</h3>
                <TextField id="outlined-basic" label="UserName" variant="outlined" type="password"/>
            </form>
        );
    }
}

export default withStyles(styles)(Login);