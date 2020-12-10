import React from 'react';
import './style.css';
import {Container} from "react-bootstrap";
import Home from "./components/Home";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Home/>
            </Container>
        );
    }
}

export default App;
