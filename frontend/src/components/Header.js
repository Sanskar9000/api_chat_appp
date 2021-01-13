import { Button } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Login from './Login';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Header = (props) => {
    const classes = useStyles();
    const history = useHistory({});

    const handleLogin = () => {
        history.push('/auth/login');
    }

    return ( 
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Chat App
                    </Typography> 
                    {props.currentUser && 
                        <Button color="inherit">Create Group</Button>
                    }

                    {!props.currentUser && 
                        <Button color="inherit" onClick={handleLogin}>Login</Button>
                    }
                    
                    {!props.currentUser && 
                        <Button color="inherit">Register</Button>
                    }

                    {props.currentUser && 
                        <Button color="inherit">Logout</Button>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}
 
export default Header;