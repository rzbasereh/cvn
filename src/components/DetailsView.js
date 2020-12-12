import React from "react";
import {
    Col,
    Container,
    Row
} from "react-bootstrap";
import ReactTimeAgo from "react-time-ago";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {FiX} from 'react-icons/fi';
import Logo from '../Logo.png';
import {closeSlide} from "../store/actions/actions";

class DetailsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            closeMode: 0
        }
    }
    
    render() {
        return (
            <div className={this.props.show ? "side_detail show" : "side_detail"}>
                {/* Sider Close */}
                <Link to={"/"} className="close" onClick={this.props.handleClose}>
                    <span/>
                    <FiX/>
                    <span/>
                </Link>
                {/* Sider Content*/}
                <Container>
                    <Row>
                        <Col className="py-4">
                            <Link className="d-flex logo" to="/">
                                <img src={Logo} width={35} height={35} alt="logo"/>
                                <h4 className="pl-2 pt-1">Covid News</h4>
                            </Link>
                        </Col>
                    </Row>
                    <div className="px-2 px-md-4">
                        <Row className="bg-secondary rounded-3 px-2 py-4 px-md-4 ">
                            <Col lg={6}>
                                <img className="rounded-3 mb-3 mb-lg-0" src={this.props.article.urlToImage} alt=""
                                     style={{width: "100%"}}/>
                            </Col>
                            <Col lg={6}>
                                <h3>{this.props.article.title}</h3>
                                <p className="text-secondary">{this.props.article.description}</p>
                                <div className="clearfix">
                                    {
                                        this.props.article.author ?
                                            <div className="float-md-left">
                                                <span className="text-secondary">author: </span>
                                                {this.props.article.author}
                                            </div>
                                            :
                                            ""
                                    }
                                    {
                                        this.props.article.publishedAt ?
                                            <span className="float-md-right"><ReactTimeAgo
                                                date={this.props.article.publishedAt} locale="en-US"/></span>
                                            :
                                            ""
                                    }
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="pt-4 pb-5 text-body">{this.props.article.content}</p>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        show: state.show,
        article: state.article
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleClose: () => dispatch(closeSlide())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsView);