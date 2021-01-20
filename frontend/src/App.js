import './App.css';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import { isAuthenticated } from './utils'
import ChatLayout from './components/ChatLayout';
class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            currentUser: null,
            allRooms: [],
            currentRoom: {
                room: {}, 
                users: [],
                messages: []
            }
        }
    }

    updateCurrentUser = (data) => {
        this.setState({
            currentUser: data
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
                        return <ChatLayout {...props} currentUser={this.state.currentUser} logout={this.state.handleLogout} />
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
