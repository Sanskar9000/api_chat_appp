import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import avatar from './img/avatar.jpg';
import { APP_URL } from '../../constants';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto'
    }
});

const ChatRooms = (props) => {

    const classes = useStyles();
    const [chatrooms, setChatrooms] = useState([]);

    useEffect(() => {
        fetch(`${APP_URL}/api/v1/users/${props.currentUser.attributes.id}/chatrooms`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            } 
        })
        .then(response => response.json())
        .then(data => {
            if(data.chatrooms.length > 0 && data.chatrooms !== undefined) {
                var roomData = data;
                setChatrooms(roomData.chatrooms);
            }
        })
    }, [])

    return (
        <Fragment>
            {
                (chatrooms.length !== 0 && chatrooms.length !== undefined) ? 
                    (<div>
                        <Grid container>
                            <Grid item xs={12} >
                                <Typography variant="h5" className="header-message">Chat</Typography>
                            </Grid>
                        </Grid>
                        <Grid container component={Paper} className={classes.chatSection}>
                            <Grid item xs={12} className={classes.borderRight500}>
                                <List>
                                    <ListItem button key={props.currentUser.attributes.username}>
                                        <ListItemIcon>
                                        <Avatar alt={props.currentUser.attributes.username} src={avatar} />
                                        </ListItemIcon>
                                        <ListItemText primary={props.currentUser.attributes.username}></ListItemText>
                                    </ListItem>
                                </List>
                                <Divider />
                                    <Grid item xs={12} style={{padding: '10px'}}>
                                        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                                    </Grid>
                                <Divider />
                                <List>
                                {chatrooms.map((room) => {
                                    return (    
                                        <div>
                                            <ListItem button key={room.id}>
                                                <ListItemIcon>
                                                    <Avatar alt={room.title} src={room.title} />
                                                </ListItemIcon>
                                                <ListItemText primary={room.title}>{room.title}</ListItemText>
                                                <Button variant="contained" color="primary">
                                                    Enter Room
                                                </Button>
                                            </ListItem>
                                        </div>
                                    )
                                })}
                                </List>
                            </Grid>
                        </Grid>
                    </div>) :
                    (<div>
                        <h1>Please Create a Room to Chat With friends :)</h1>
                    </div>)
            }
        </Fragment>
    );  
}

export default ChatRooms;