import React from "react";
import {
    Col,
    Container, Row
} from "react-bootstrap";
import {FiX} from 'react-icons/fi';
import {closeSlide} from "../store/actions/actions";
import {connect} from "react-redux";
import ReactTimeAgo from "react-time-ago";
import {Link} from "react-router-dom";

class DetailsView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.article === null) {

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
                <Link to={"/"}>
                    <div className="close" onClick={this.props.handleClose}>
                        <span/>
                        <FiX/>
                        <span/>
                    </div>
                </Link>
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
                                <p className="py-4 text-body">{this.props.article.content}</p>
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