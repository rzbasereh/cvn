import React from "react";
import {
    Col,
    Container, Row
} from "react-bootstrap";
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
                    <div className="px-2 px-md-4">
                        <Row><Col className="py-5"> </Col></Row>
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
                                    <span className="float-md-right">{this.props.article.publishedAt}</span>
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