import React from "react";
import {
    Col,
    Container, Row
} from "react-bootstrap";
import Logo from '../Logo.png';
import virus from '../assets/images/svg/virus.svg';
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import NewsList from "./NewsList";


import {FiTrendingDown, FiTrendingUp} from 'react-icons/fi';
import axios from "axios";
import {Link} from "react-router-dom";
import DetailsView from "./DetailsView";
import {connect} from "react-redux";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            virusOpacity: 0,
            virusData: {}
        }
    }

    componentDidMount() {
        this.getVirusData();
        window.addEventListener('scroll', this.listenScrollEvent)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.show) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }


    getVirusData = () => {
        axios({
            method: 'get',
            url: 'https://thevirustracker.com/free-api?global=stats',
            headers: {}
        }).then(res => {

        }).catch(err => {

        });
    };

    listenScrollEvent = e => {
        if (window.scrollY < 200) {
            this.setState({
                ...this.state,
                virusOpacity: 0
            })
        } else if (window.scrollY > 300) {
            this.setState({
                ...this.state,
                virusOpacity: 1
            })
        } else {
            this.setState({
                ...this.state,
                virusOpacity: (window.scrollY - 200) / 300
            })
        }
    };

    render() {
        return (
            <Container className={this.props.show ? "overflow-hidden" : ""}>
                <Row>
                    <Col className="py-5">
                        <Link className="d-flex logo" to="/">
                            <img src={Logo} alt=""/>
                            <h4 className="pl-2 pt-2">Covid News</h4>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <Card>
                            <Card.Body>
                                <Alert variant="success">
                                    <span>Recover</span>
                                    <div className="clearfix">
                                        <Alert.Heading className="float-left">20, 000</Alert.Heading>
                                        <FiTrendingDown className="float-right text-danger"/>
                                    </div>
                                </Alert>
                                <Alert variant="info">
                                    <span>Active Confimed</span>
                                    <div className="clearfix">
                                        <Alert.Heading className="float-left">20, 000</Alert.Heading>
                                        <FiTrendingUp className="float-right text-success"/>
                                    </div>
                                </Alert>
                                <Alert variant="danger">
                                    <span>Death</span>
                                    <div className="clearfix">
                                        <Alert.Heading className="float-left">20, 000</Alert.Heading>
                                        <FiTrendingDown className="float-right text-danger"/>
                                    </div>
                                </Alert>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <NewsList/>
                        <img className="virus-ill" src={virus} style={{opacity: this.state.virusOpacity}} alt=""/>
                    </Col>
                </Row>
                <DetailsView/>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        show: state.show
    }
};

export default connect(mapStateToProps, null)(Home);