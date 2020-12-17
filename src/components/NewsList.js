import React from "react";
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import {
    Badge,
    Col,
    Form, 
    ListGroup, 
    Row,
    Button
} from "react-bootstrap";
import {setArticle} from "../store/actions/actions";
import {FiX} from 'react-icons/fi';
import {connect} from "react-redux";
import ReactTimeAgo from 'react-time-ago'
import {Link} from "react-router-dom";
import { SphereSpinner } from "react-spinners-kit";

import us from '../assets/images/svg/flags/us.svg';

const langList = [
    {
        key: 'us',
        name: 'United States',
        img: us
    }
];
const pageSize = 3;
const covers = Array(pageSize).fill(1);


class NewsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: {
                data: [],
                total: 0,
                loading: true,
                loadingmore: false
            },
            sourcesList: {
                loading: false,
                data: []
            },

            page: 1,
            filter_toggle: false,
            sources: "",
            language: "",
            sortBy: "publishedAt",
        }
    }

    componentDidMount() {
        this.getNews(false);
        this.getSources();
    }

    //  GET latest news base on user filter and orderinglangList
    getNews = (loadingmore) => {
        this.setState({
            ...this.state,
            articles: {
                ...this.state.articles,
                loading: !loadingmore
            }   
        }, 
        () => axios.get('https://newsapi.org/v2/everything', {
                    params: {
                        q: 'COVID Vaccine',
                        apiKey: "7beb18d93a494e3ca347e870561b7045",
                        pageSize: pageSize,
                        page: this.state.page,
                        sources: this.state.sources,
                        language: this.state.language,
                        sortBy: this.state.sortBy
                    }
                })
                .then((res) => {
                    this.setState({
                        ...this.state,
                        articles: {
                            data: [...this.state.articles.data, ...res.data.articles],
                            total: res.data.totalResults,
                            loading: false,
                            loadingmore: false
                        }
                    });
                })
                .catch(function (err) {
                    // this.setState({
                    //     ...this.state,
                    //     articles: {
                    //         ...this.state.articles,
                    //         loading: false,
                    //         loadingmore: false
                    //     }
                    // });
                })
        )
    };

    getSources = () => {
        this.setState({
            ...this.state,
            sourcesList: {
                ...this.state.sourcesList,
                loading: true
            }   
        }, 
        () => axios.get('https://newsapi.org/v2/sources', {
                    params: {
                        apiKey: "7beb18d93a494e3ca347e870561b7045",
                    }
                })
                .then((res) => {
                    this.setState({
                        ...this.state,
                        sourcesList: {
                            data: res.data.sources,
                            loading: false
                        }
                    });
                })
                .catch(function (err) {
                    this.setState({
                        ...this.state,
                        sourcesList: {
                            ...this.state.sourcesList,
                            loading: false
                        }
                    });
                })
        )  
    };

    handleLoadMore = () => {
        if(this.state.articles.total > this.state.articles.data.length) {
                this.setState({
                    ...this.state,
                    articles: {
                        ...this.state.articles,
                        loadingmore: true
                    },
                    page: this.state.page + 1
                }, () => this.getNews(true)); 
        }
        
    }

    //  Hanle change of sort value
    handleSort = (event) => {
        let sort = event.target.value;
        this.setState({
            ...this.state,
            sortBy: sort
        }, () => this.getNews(false));
    };

    // Handle Filter Toggle
    handleFilterToggle = () => {
        if (this.state.filter_toggle) {
            this.setState({
                ...this.state,
                filter_toggle: false
            }, () => document.body.classList.remove('overflow-hidden'));
        } else {
            this.setState({
                ...this.state,
                filter_toggle: true
            }, () => document.body.classList.add('overflow-hidden'));
        }
    }

    render() {
        return (
            <div>
                <Row className="px-md-4 my-5">
                    <Col sm={12}>
                        <div className="clearfix">
                            <Form.Group className="float-left d-flex" controlId="exampleForm.ControlSelect2">
                                <Form.Label className="text-nowrap mr-sm-2 mt-2">Sorted By:</Form.Label>
                                <Form.Control onChange={this.handleSort} as="select">
                                    <option value="publishedAt">Date published</option>
                                    <option value="relevancy">Relevancy</option>
                                    <option value="popularity">Popularity</option>
                                </Form.Control>
                            </Form.Group>

                            <div className="float-right filter-sidebar">
                                <Button variant="secondary" onClick={this.handleFilterToggle}>
                                    Filter
                                </Button>

                                <div className={this.state.filter_toggle ? "right sider p-3 show" : "right sider p-2"}>
                                    <Row>
                                        <Col xs={12}>
                                            <h4 className="sider-title">Filters</h4>
                                            <div className="close" onClick={this.handleFilterToggle} >
                                                <FiX/>
                                            </div>
                                        </Col>
                                        <Col xs={12}>
                                            <h6 className="pb-2 pt-4">languages</h6>
                                            <ListGroup horizontal>
                                                {
                                                    langList.map(item => {
                                                        <ListGroup.Item>
                                                            <img alt={item.key} src={item.img}/>
                                                        </ListGroup.Item>
                                                    })
                                                }
                                            </ListGroup>
                                        </Col>
                                        <Col xs={12}>
                                            <h6 className="pb-2 pt-4">sources</h6>
                                            {this.state.sourcesList.data.concat}
                                            <ListGroup horizontal>
                                                {
                                                    this.state.sourcesList.data.map(source => {
                                                        <ListGroup.Item>
                                                            {source.name}
                                                        </ListGroup.Item>
                                                    })
                                                }
                                            </ListGroup>
                                        </Col>
                                        <Button variant='primary' className="apply-filter">Apply Filters</Button>
                                    </Row>
                                </div>
                                <div className={this.state.filter_toggle ? "show sider-backdrop" : "sider-backdrop"} 
                                    onClick={this.handleFilterToggle}/>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <ListGroup>
                            {
                                this.state.articles.loading ? // Preview Loading until syncing news 
                                    covers.map(
                                        () =>   <ListGroup.Item className="my-2" action>
                                                    <Skeleton width={80} height={30} className="rounded-pill"/>
                                                    <Skeleton height={30} className="mb-2"/>
                                                    <Skeleton width={70} className="mr-2" />
                                                    <Skeleton width={100}/>
                                                </ListGroup.Item>
                                    )
                                : 
                                this.state.articles.data.map(
                                    article =>
                                    <Link to={encodeURIComponent(article.title).replace(/\s+/g, '-').toLowerCase()}
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
                        {
                            this.state.articles.loading ?
                                ""
                            :
                                <div className="text-center mt-3" style={{ display: "block ruby" }}>
                                    {this.state.articles.loadingmore ? 
                                        <div className="d-flex bg-secondary px-5 py-2 rounded-pill">
                                            <SphereSpinner size={25} color="#5A33E4" loading />
                                            <span className="ml-3">Loading</span>
                                        </div>
                                    :
                                        <Button className="px-4" onClick={this.handleLoadMore}>Load More</Button>
                                    }
                                </div>
                        }
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