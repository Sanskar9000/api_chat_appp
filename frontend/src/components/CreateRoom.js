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

class CreateRoom extends React.Component {

    constructor(props) {
        super(props)
        this.state = { 
            roomName: '',
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch(`${APP_URL}/api/v1/chatrooms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({chatroom: {
                title: this.state.roomName,
            }})    
        })
        .then(response => response.json())
        .then(data => {
            if (data.authenticated) {
                localStorage.setItem('jwt_token', data.token)
                this.props.updateCurrentUser(data.user)
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
                <h1>Create Room</h1>
                <form noValidate autoComplete="off" onSubmit={(e) => this.handleSubmit(e)} >
                    <h3>UserName</h3>
                    <TextField 
                        label="Room Name" 
                        variant="outlined" 
                        name="roomName"
                        value={this.state.roomName}
                        onChange={(e) => this.handleChange(e)}  
                    />
                    <Button variant="contained" color="primary" type="Submit">
                        Submit
                    </Button>
                </form>
            </div>
        );
    }
}

export default withStyles(styles)(Login);