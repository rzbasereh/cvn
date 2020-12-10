import React from "react";
import {
    Col,
    Container, Row
} from "react-bootstrap";
import Logo from '../Logo.png';
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import NewsList from "./NewsList";
import {FiX} from 'react-icons/fi';

class DetailsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {}
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.article !== this.props.article) {

        }
    }

    render() {
        return (
            <div className={this.props.show ? "side_detail show" : "side_detail"}>
                {/* Sider Close */}
                <div className="close" onClick={this.props.handleClose}>
                    <span/>
                    <FiX/>
                    <span/>
                </div>
                {/* Sider Content*/}
                <Container>
                    <div className="px-4">
                        <Row><Col className="py-5"> </Col></Row>
                        <Row className="bg-secondary rounded-3 p-4">
                            <Col md={6}>
                                <img className="rounded-3" src={this.props.article.urlToImage} alt=""
                                     style={{width: "100%"}}/>
                            </Col>
                            <Col md={6}>
                                <h3>{this.props.article.title}</h3>
                                <p className="text-secondary">{this.props.article.description}</p>
                                <div className="clearfix">
                                    {
                                        this.props.article.author ?
                                            <div className="float-left">
                                                <span className="text-secondary">author: </span>
                                                {this.props.article.author}
                                            </div>
                                            :
                                            ""
                                    }
                                    <span className="float-right">{this.props.article.publishedAt}</span>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="py-4 text-body">{this.props.article.content}</p>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        );
    }
}

export default DetailsView;