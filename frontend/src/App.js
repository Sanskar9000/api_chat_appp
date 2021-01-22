import './App.css';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import { isAuthenticated } from './utils'
import ChatLayout from './components/ChatRoom/ChatLayout';
import CreateRoom from './components/ChatRoom/CreateRoom';
import { APP_URL } from './constants';
class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            currentUser: null,
            allRooms: [],
            currentRoom: {
                chatroom: [], 
                users: [],
                messages: []
            }
        }
    }

    componentDidMount() {
        const { currentRoom: { chatroom } } = this.state;

        fetch(`${APP_URL}/api/v1/chatrooms`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            } 
        })
        .then(response => response.json())
        .then(data => {
            var roomData = data;
            this.setState({
                allRooms: roomData
            })
        })

        if(chatroom !== []) {
            <Redirect to='/' />
        }

    }

    updateCurrentUser = (data) => {
        this.setState({
            ...this.state,
            currentUser: data
        })
    }

    updateRooms = (data) => {
        var rooms = this.state.allRooms;
        
        this.setState({
            ...this.state,
            allRooms: rooms.concat(data),
            currentRoom: {
                chatroom: data.chatroom_id
            }
        })
    }

    handleLogout = () => {
        localStorage.removeItem('jwt_token')
        this.setState({
          currentUser: null
        })
        return <Redirect to='/' />
    }

    render() {
        return (
            <div>
                <Header currentUser={this.state.currentUser} logout={this.handleLogout} />
                <Switch>
                    <Route exact path='/' render={(props) => {
                        return this.state.currentUser && isAuthenticated && this.state.currentRoom['room'] !== {} ? 
                            <ChatLayout {...props} currentUser={this.state.currentUser} logout={this.state.handleLogout} /> :
                            <Login {...props} updateCurrentUser={this.updateCurrentUser} />
                    }} />
                    <Route exact path='/chatrooms/create' render={(props) => {
                        return this.state.currentUser && isAuthenticated ?
                            <CreateRoom {...props} currentUser={this.state.currentUser} updateRooms={this.updateRooms} /> :
                            <Login {...props} updateCurrentUser={this.updateCurrentUser} />
                    }} />
                    <Route exact path='/auth/login' render={(props) => {
                        return this.state.currentUser && isAuthenticated ?
                        <Redirect to='/' /> :
                        <Login {...props} updateCurrentUser={this.updateCurrentUser} />
                    }} />
                    <Route path='/auth/register' render={(props) => {
                        return this.state.currentUser && isAuthenticated ?
                        <Redirect to='/' /> :
                        <Register {...props} updateCurrentUser={this.updateCurrentUser} />
                    }}/>
                </Switch>
            </div>
          
        );
    }
}


export default App;
