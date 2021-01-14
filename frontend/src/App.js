import './App.css';
import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
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

    handleLogout = () => {
        localStorage.removeItem('jwt_token')
        this.setState({
          currentUser: null
        })
        return <Redirect to='/home' />
    }

    render() {
        
        return (
            <div>
                <Header currentUser={this.state.currentUser} logout={this.handleLogout} />
                <Switch>
                    <Route path='/auth/login' component={Login} />
                    <Route path='/auth/register' component={Register} />
                    
                </Switch>
            </div>
          
        );
    }
}


export default App;
