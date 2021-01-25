import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { APP_URL } from '../constants';

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

    handleSubmit = (e) => {
        e.preventDefault()
        fetch(`${APP_URL}/api/v1/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({user: {
                username: this.state.username,
                password: this.state.password
            }})    
        })
        .then(response => response.json())
        .then(result => {
            if (result.authenticated) {
                localStorage.setItem('jwt_token', result.token)
                this.props.updateCurrentUser(result.user.data)
            } else {
                alert('Password/Username combination not found')
            }   
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    render() { 
        return ( 
            <div className="form-items">
                <h1>Login</h1>
                <form noValidate autoComplete="off" onSubmit={(e) => this.handleSubmit(e)} >
                    <h3>UserName</h3>
                    <TextField 
                        label="Enter User Name" 
                        variant="outlined" 
                        name="username"
                        value={this.state.username}
                        onChange={(e) => this.handleChange(e)}  
                    />
                    <h3>Password</h3>
                    <TextField 
                        label="Enter Password" 
                        variant="outlined" 
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={(e) => this.handleChange(e)}
                    /><br /><br />
                    <Button variant="contained" color="primary" type="Submit">
                        Submit
                    </Button>
                </form>
            </div>
        );
    }
}

export default withStyles(styles)(Login);