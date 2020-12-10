import React from "react";
import {
    Col,
    Container, Row
} from "react-bootstrap";
import Logo from '../Logo.png';
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import NewsList from "./NewsList";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col className="d-flex py-5 logo">
                        <img src={Logo} alt=""/>
                        <h4 className="pl-2 pt-2">Covid News</h4>
                    </Col>
                </Row>
                <Row>
                    <Col lg={8}>
                        <Card>
                            <Card.Header>Fatality rate by age range</Card.Header>
                            <Card.Body>This is some text within a card body.</Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Alert variant="danger">
                            <Alert.Heading>Death</Alert.Heading>
                            <p>
                                20,000
                            </p>
                        </Alert>
                        <Alert variant="info">
                            <Alert.Heading>Active Confimed</Alert.Heading>
                            <p>
                                20,000
                            </p>
                        </Alert>
                        <Alert variant="success">
                            <Alert.Heading>Recover</Alert.Heading>
                            <p>
                                20,000
                            </p>
                        </Alert>
                    </Col>
                    <Col className="py-5">
                        <NewsList/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Home;