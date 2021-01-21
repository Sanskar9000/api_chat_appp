import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { AppBar, Button, Chip, FormControl, Input, InputLabel, MenuItem, Select, Tab, Tabs } from '@material-ui/core';
import { APP_URL } from '../../constants';

const styles = (theme) => ({
    root: {
        '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
        },
    },
    tabsIndicator: {
        backgroundColor: '#54AAB3',
    },
    selected: {
        backgroundColor: '#54AAB3',
        color: '#ffffff',
        fontWeight: 600,
        fontSize: 14
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
});


class CreateRoom extends React.Component {

    constructor(props) {
        super(props)
        this.state = { 
            roomName: '',
            currentTab: 0,
            users: ['Ashwin', 'Pant', 'Jadeja']
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
            this.props.updateRooms(data)
        })
    }   
        
    handleChange = (event) => {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value,
        });
    };

    handleTabChange = () => {
        let tabValue = this.state.currentTab
        // this.setState({
        //     currentTab: tabValue == 0 ? tabValue + 1 : tabValue - 1
        // })
    }

    ITEM_HEIGHT = 48;
    ITEM_PADDING_TOP = 8;
    MenuProps = {
        PaperProps: {
            style: {
            maxHeight: this.ITEM_HEIGHT * 4.5 + this.ITEM_PADDING_TOP,
            width: 250,
            },
        },
    };

    names = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
    ];

    render() { 
        const { classes } = this.props;
        
        console.log('curent tab ===========> ', this.state.currentTab)
        return ( 
            <div className="form-items">
                <h1>Create Room</h1>
                <AppBar position="static" color='secondary'>
                    <Tabs value={this.state.currentTab} onChange={this.handleTabChange()} classes={{indicator: classes.tabsIndicator}}>
                        <Tab label="Private Room" classes={{selected: classes.selected}}/>
                        <Tab label="Public Room" classes={{selected: classes.selected}}/>
                    </Tabs>
                </AppBar>
                {this.state.currentTab === 0 && 
                    <form noValidate autoComplete="off" onSubmit={(e) => this.handleSubmit(e)} >
                        <h3>Enter Room Name</h3>
                        <TextField
                            label="Room Name" 
                            variant="outlined" 
                            name="roomName"
                            value={this.state.roomName}
                            onChange={this.handleChange}  
                        />
                        <h3>Select users</h3>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-mutiple-chip-label">User Names</InputLabel>
                            <Select
                            labelId="demo-mutiple-chip-label"
                            id="demo-mutiple-chip"
                            multiple
                            value={this.state.users}
                            onChange={this.handleChange}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={(selected) => (
                                <div className={classes.chips}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} className={classes.chip} />
                                ))}
                                </div>
                            )}
                            MenuProps={this.MenuProps}
                            >
                            {this.names.map((name) => (
                                <MenuItem key={name} value={name} >
                                    {name}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    <br></br><br></br>
                    <Button variant="contained" color="primary" type="Submit">
                        Submit
                    </Button>
                </form>
                }
                {/* {this.state.currentTab === 1 &&  
                    <form noValidate autoComplete="off" onSubmit={(e) => this.handleSubmit(e)} >
                        <h3>Enter Room Name</h3>
                        <TextField
                            label="Room Name" 
                            variant="outlined" 
                            name="roomName"
                            value={this.state.roomName}
                            // onChange={(e) => this.handleChange(e)}  
                        />
                        <Button variant="contained" color="primary" type="Submit">
                            Submit
                        </Button>
                    </form>
                } */}
            </div>
        );
    }
}

export default withStyles(styles)(CreateRoom);