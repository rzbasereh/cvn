import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import './style.css';

import Home from "./components/Home";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/">
                       <Home/>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;
