import React from "react";
import {
    Col,
    Container, 
    Row, 
    Alert,
    Card

} from "react-bootstrap";
import Logo from '../Logo.png';
import DoctorCovid from '../assets/images/svg/doctor_vaccine.svg';
import virus from '../assets/images/svg/virus.svg';
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
            fixHeader: false,
        }
    }

    componentDidMount() {
        this.getVirusData();
        window.addEventListener('scroll', this.listenScrollEvent)
    }

    // toggle body overflow as toggle of right sider
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.show) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }

    // GET online statistics of covid virus
    getVirusData = () => {
        axios({
            method: 'get',
            url: 'https://thevirustracker.com/free-api?global=stats',
            headers: {}
        }).then(res => {

        }).catch(err => {

        });
    };


//  Hanle Scroll Events such as show fixed header
    listenScrollEvent = e => {
        if (window.scrollY < 85) {
            this.setState({
                ...this.state,
                fixHeader: false,
                virusOpacity: 0
            })
        }else if (window.scrollY < 200){
            this.setState({
                ...this.state,
                fixHeader: true,
                virusOpacity: 0
            })
        } else if (window.scrollY > 300) {
            this.setState({
                ...this.state,
                fixHeader: true,
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
            <div>
                <div className={this.state.fixHeader ? "scroll-header show" : "scroll-header" }>
                    <Container>
                        <Row>
                            <Col>
                                <Link className="d-flex logo" to="/">
                                    <img src={Logo} width={35} height={35} alt="logo"/>
                                    <h4 className="pl-2 pt-1">Covid News</h4>
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Container className={this.props.show ? "overflow-hidden" : ""}>
                    <Row>
                        <Col className="py-5">
                            <Link className="d-flex logo" to="/">
                                <img src={Logo} width={35} height={35} alt="logo"/>
                                <h4 className="pl-2 pt-1">Covid News</h4>
                            </Link>
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            {/* <Card>
                                <Card.Body> */}
                                <div className="covid-statistics">
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
                                </div>
                                    
                                {/* </Card.Body>
                            </Card> */}

                            <img src={DoctorCovid} className="hader-image"/>
                        </Col>
                        <Col>
                            <NewsList/>
                            <img className="virus-ill" src={virus} style={{opacity: this.state.virusOpacity}} alt=""/>
                        </Col>
                    </Row>
                    <DetailsView/>
                </Container>
            </div>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        show: state.show
    }
};

export default connect(mapStateToProps, null)(Home);