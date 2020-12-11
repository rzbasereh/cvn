import React from "react";
import axios from 'axios';
import {
    Badge,
    Col, Dropdown, Form, ListGroup, Row
} from "react-bootstrap";
import {setArticle} from "../store/actions/actions";
import {connect} from "react-redux";
import ReactTimeAgo from 'react-time-ago'
import {Link} from "react-router-dom";

class NewsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            articles: [],
            sources: "",
            language: "",
            sortBy: "publishedAt"
        }
    }

    componentDidMount() {
        this.getNews();
        console.log(this.props);
    }

    getNews = () => {
        this.setState({
            ...this.state,
            loading: true
        }, 
        () => axios.get('http://newsapi.org/v2/top-headlines', {
                    params: {
                        q: 'COVID Vaccine',
                        apiKey: "7beb18d93a494e3ca347e870561b7045",
                        sources: this.state.sources,
                        language: this.state.language,
                        sortBy: this.state.sortBy
                    }
                })
                .then((res) => {
                    this.setState({
                        ...this.state,
                        articles: res.data.articles,
                        loading: false
                    });
                })
                .catch(function (err) {
                    this.setState({
                        ...this.state,
                        loading: false
                    });
                })
        )
    };

    handleSort = (event) => {
        let sort = event.target.value;
        this.setState({
            ...this.state,
            sortBy: sort
        }, () => this.getNews());
    };

    render() {
        return (
            <div>
                <Row className="px-md-4 my-5">
                    <Col sm={12}>
                        <div className="clearfix">
                            <Form.Group className="float-left d-md-flex" controlId="exampleForm.ControlSelect2">
                                <Form.Label className="text-nowrap mr-md-2 mt-md-2">Sorted By:</Form.Label>
                                <Form.Control onChange={this.handleSort} as="select">
                                    <option value="publishedAt">Date published</option>
                                    <option value="relevancy">Relevancy to search keyword</option>
                                    <option value="popularity">Popularity of source</option>
                                </Form.Control>
                            </Form.Group>

                            <Dropdown className="float-right">
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    Filter
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Col>
                    <Col>
                        <ListGroup>
                            <ListGroup.Item className="my-2" action>
                                
                            </ListGroup.Item>
                            {
                                this.state.articles.map
                                (article =>
                                    <Link to={article.title.replace(/\s+/g, '-').toLowerCase()}
                                          onClick={() => this.props.setArticle(article)}>
                                        <ListGroup.Item className="my-2" action>
                                            <Badge variant="primary" className="mb-2">{article.source.name}</Badge>

                                            <h4>
                                                {article.title}
                                            </h4>

                                            <div className="d-md-flex">
                                                {
                                                    article.author === null ?
                                                        ""
                                                        :
                                                        <div className="text-info mr-3">{article.author}</div>
                                                }
                                                <div className="text-secondary text-nowrap"><ReactTimeAgo
                                                    date={article.publishedAt} locale="en-US"/></div>
                                            </div>

                                        </ListGroup.Item>
                                    </Link>
                                )
                            }
                        </ListGroup>
                    </Col>
                </Row>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        setArticle: (article) => dispatch(setArticle(article))
    }
};

export default connect(null, mapDispatchToProps)(NewsList);