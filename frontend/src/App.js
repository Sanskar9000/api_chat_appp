import './App.css';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';

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
                    <Route exact path='/auth/login' render={() => {
                        return this.state.currentUser ?
                        <Redirect to='/' /> :
                        <Login updateCurrentUser={this.updateCurrentUser} />
                    }} />
                    <Route path='/auth/register' component={Register} />
                </Switch>
            </div>
          
        );
    }
}


export default App;
