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
import ChatMessage from './ChatMessage';
import RoomWebSocket from './RoomWebSocket';

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


const ChatRoomShow = (props) => {
    console.log("currentRoom ===> ", props.currentRoom)   
    console.log("cableApp ===> ", props.cableApp)   
    console.log("roomData ===> ", props.roomData)
    
    const classes = useStyles();
    const [messageText, setMessageText] = useState([]);

    const handleChange = (e) => {
        e.preventDefault()
        setMessageText(e.target.value);
    }   
    
    const handleSendMessage = () => {
        var message = document.getElementById('messages');
        debugger
        message.innerText = messageText;
    }

    const whichUser = (message) => {
        debugger
        const user = props.roomData.users.data.find(user => parseInt(user.id) === message.user_id )
        return user
    }

    const displayMessages = (messages) => {
        return messages.map(message => {
            const user = this.whichUser(message)
            return <ChatMessage key={message.id} message={message} user={user} currentUser={props.currentUser}/>
        }) 
    }

    return(
        <Fragment>
            <div>
                <Grid item xs={9}>
                    <List className={classes.messageArea}>
                        <ListItem key="1">
                            <Grid container>
                                <Grid item xs={12}>
                                    <div id='chat-feed'>
                                        <h3>Chat Feed:</h3>
                                        <div id='messages'>
                                            { props.roomData.messages.length > 0 ? (
                                                this.displayMessages(props.roomData.messages)
                                            ) : (
                                                <h3>This room has no messages yet - be the first to post!</h3>
                                            ) }
                                        </div>
                                    </div>
                                    <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="right" secondary="09:30"></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="2">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="left" secondary="09:31"></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                    </List>
                    <Divider />
                    <Grid container style={{padding: '20px'}}>
                        <Grid item xs={11}>
                            <TextField id="outlined-basic-email" label="Type Something" value={messageText} onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid xs={1} align="right">
                            <Fab color="primary" aria-label="add" onClick={handleSendMessage}><SendIcon /></Fab>
                        </Grid>
                    </Grid>
                </Grid>

                <RoomWebSocket
                    cableApp={props.cableApp}
                    roomData={props.roomData}
                    getRoomData={props.getRoomData}
                    updateApp={props.updateApp}
                />
            </div>
        </Fragment>
    )
}

export default ChatRoomShow;