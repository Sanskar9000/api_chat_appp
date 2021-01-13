import './App.css';
import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './components/Header';
import { routes } from './routes';
import { isAuthenticated } from "./utils";

const RenderRoute = (route) => {
    document.title = route.title;
    const history = useHistory({});
    if(route.needAuth && !isAuthenticated()) {
        history.push("/auth/login");
    }

    return (
        <Route  
            path={route.path} 
            exact
            render={(props) => <route.component {...props} />}
        >
        </Route>
    );
};

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
        return null
    }

    render() {
        
        return (
            <div>
                <Switch>
                    <Header currentUser={this.state.currentUser} logout={this.handleLogout} />
                    {routes.map((route, index) => {
                        <RenderRoute key={index} {...route} />
                    })}
                </Switch>
            </div>
          
        );
    }
}


export default App;
