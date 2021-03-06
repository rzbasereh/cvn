import React from "react";
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import {
    Badge,
    Col,
    Form, 
    ListGroup, 
    Row,
    Button,
    InputGroup,
    FormControl
} from "react-bootstrap";
import {setArticle} from "../store/actions/actions";
import {FiX, FiSearch, FiInbox} from 'react-icons/fi';
import {connect} from "react-redux";
import ReactTimeAgo from 'react-time-ago'
import {Link} from "react-router-dom";
import { SphereSpinner } from "react-spinners-kit";
import ReactCountryFlag from "react-country-flag";
import {languageMenu} from "../lang_menu";

const pageSize = 25;
const covers = Array(pageSize).fill(1);
// const apiKey = "7beb18d93a494e3ca347e870561b7045";
// const apiKey = "b0c096bdabc740a18c9dd3dbc1675e39";
const apiKey = "e5a1a1aab4a04c0084fb9f9e6c19876f";

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
                loading: true,
                data: [],
                founded: []
            },
            langsList: {
                loading: true,
                data: [],
            },
            filter: {
                toggle: false,
                sources: [],
                language: "",
                changed: false
            },

            page: 1,
            sources: [],
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
                loading: !loadingmore, 
            }   
        }, () => {
            let sources = [];
            this.state.sources.map(source => {
                let instance = source.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, "");
                sources.push(instance);
            });
            axios.get('https://newsapi.org/v2/everything', {
                    params: {
                        q: 'COVID Vaccine',
                        apiKey: apiKey,
                        pageSize: pageSize,
                        page: this.state.page,
                        sources: sources.join(','),
                        language: this.state.language,
                        sortBy: this.state.sortBy
                    }
                })
                .then((res) => {
                    let data = res.data.articles;
                    if (loadingmore) {
                        data = Array.from(new Set([...this.state.articles.data, ...data]));
                    }
                    this.setState({
                        ...this.state,
                        articles: {
                            data: data,
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
                });
            }
        )
    };


    // Function to get all sources from api (containing languages and sources)
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
                        apiKey: apiKey,
                    }
                })
                .then((res) => {
                    let langs = [];
                    res.data.sources.map(item => {
                        langs.push(item.language);
                    });
                    langs = Array.from(new Set(langs));
                    console.log(langs);
                    this.setState({
                        ...this.state,
                        sourcesList: {
                            data: res.data.sources,
                            founded: res.data.sources,
                            loading: false
                        },
                        langsList: {
                            loading: false,
                            data: langs
                        }
                    });
                })
                .catch(function (err) {
                    // this.setState({
                    //     ...this.state,
                    //     sourcesList: {
                    //         ...this.state.sourcesList,
                    //         loading: false
                    //     }
                    // });
                })
        )  
    };


    // Func to detect changing in filter options
    filterHasChange = () => {
        let isChanged = false;
        if (JSON.stringify(this.state.filter.sources) !== JSON.stringify(this.state.sources) ||
            this.state.filter.language !== this.state.language) {
            isChanged = true;
        }
        return isChanged;
    }

    // Fanc to handle load more action
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
            page: 1,
            sortBy: sort
        }, () => this.getNews(false));
    };

    // Handle Filter Toggle
    handleFilterToggle = () => {
        if (this.state.filter.toggle) {
            this.setState({
                ...this.state,
                filter:{
                    ...this.state.filter,
                    toggle: false
                }
            }, () => document.body.classList.remove('overflow-hidden'));
        } else {
            this.setState({
                ...this.state,
                filter:{
                    ...this.state.filter,
                    changed: this.filterHasChange(),
                    toggle: true
                }
            }, () => document.body.classList.add('overflow-hidden'));
        }
    }

    // Func to handle language selecting
    handleLanguageSelect = (lang) => {
        this.setState({
            ...this.state,
            filter: {
                ...this.state.filter,
                language: lang,
            }
        }, () => {
            this.setState({
                ...this.state,
                filter: {
                    ...this.state.filter,
                    changed: this.filterHasChange()
                }
            })
        });
    }

    //  Func to handle source selecting 
    handleSourceSelect = (source) => {
        let sources = Array.from(new Set([...this.state.filter.sources, source]));
        this.setState({
            ...this.state,
            filter: {
                ...this.state.filter,
                sources: sources,
            }
        }, () => {
            this.setState({
                ...this.state,
                filter: {
                    ...this.state.filter,
                    changed: this.filterHasChange()
                }
            })
        });
    }


    // handle search source in filter sider
    handleSourceSearch = (event) => {
        let value = event.target.value.toString().toLowerCase();
        let result = this.state.sourcesList.data.filter(source => source.name.toLowerCase().includes(value));
        this.setState({
            ...this.state,
            sourcesList: {
                ...this.state.sourcesList,
                founded: result
            }
        });
    }

    // handle delete filter selecting items
    handleDelete = (item, mode) => {
        let language = this.state.filter.language;
        let sources = this.state.filter.sources;
        if (mode === "source") {
            sources = this.state.filter.sources.filter(source => item !== source);
        } else {
            language = "";
        }
        this.setState({
            ...this.state,
            filter: {
                ...this.state.filter,
                sources: sources,
                language: language,
            }
        }, () => {
            this.setState({
                ...this.state,
                filter: {
                    ...this.state.filter,
                    changed: this.filterHasChange()
                }
            })
        });
    };

    // handle changed filter apply
    handleApplyFilter = () => {
        this.setState({
            ...this.state,
            sources: this.state.filter.sources,
            language: this.state.filter.language,
            page: 1,
            sourcesList: {
                ...this.state.sourcesList,
                founded: this.state.sourcesList.data
            }, 
            filter: {
                ...this.state.filter,
                toggle: false
            }
        },() => {
            document.body.classList.remove('overflow-hidden');
            this.getNews(false);
        });
    };

    // hadle delete all filters and reload data
    handleCancelFilter = () => {
        this.setState({
            ...this.state,
            filter: {
                ...this.state.filter,
                language: "",
                sources: []
            }
        },() => {
            document.body.classList.remove('overflow-hidden');
            this.handleApplyFilter();
        });
    }

    render() {
        // filter container (sidder)
        const filterContainer = <div className={"right sider " + (this.state.filter.toggle ? " show " : "") + (this.state.filter.changed || this.state.sources.length || this.state.language ? "has-btn" : "")}>
            <div className="sider-header">
                <Row>
                    <Col xs={12}>
                        <h4 className="sider-title">Filters</h4>
                        <div className="close" onClick={this.handleFilterToggle} >
                            <FiX/>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="sider-body scroll">
                <Row>
                    <Col xs={12}>
                        <h6 className="pb-2">languages</h6>
                        <ListGroup horizontal className="langs-list">
                            {
                                this.state.langsList.loading ? 
                                    Array(14).fill(1).map(() => 
                                        <ListGroup.Item action className="text-center">
                                            <Skeleton width={45} height={30}/>
                                            <Skeleton width={70}/>
                                        </ListGroup.Item>
                                    )
                                :
                                    this.state.langsList.data.map(lang => {
                                        let isActive = false;
                                        if (this.state.filter.language === lang) {
                                            isActive = true;
                                        }
                                        let itemInfo = languageMenu.find(value => value.key === lang);
                                        return (
                                            <ListGroup.Item className="text-center" action active={isActive} 
                                                onClick={() => {isActive ? this.handleDelete(lang, "lang") : this.handleLanguageSelect(lang)}}>
                                                <ReactCountryFlag 
                                                    countryCode={itemInfo.code} 
                                                    svg
                                                    style={{
                                                        width: '2em',
                                                        height: '2em',
                                                    }}
                                                    aria-label={lang} />
                                                <span class="langs-title">{itemInfo.title}</span>
                                            </ListGroup.Item>
                                        );
                                    })
                            }
                        </ListGroup>
                    </Col>
                    <Col xs={12}>
                        <h6 className="pb-2 pt-4">sources</h6>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="search-source">
                                    <FiSearch/>
                                    {/* <FiLoader/> */}
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Search"
                                aria-label="Search"
                                aria-describedby="search-source"
                                onChange={this.handleSourceSearch}
                                />
                        </InputGroup>
                        <ListGroup className="source-list">
                            {
                                this.state.sourcesList.loading ?
                                    Array(128).fill(1).map(() =>
                                        <ListGroup.Item action>
                                            <Skeleton/>
                                        </ListGroup.Item>
                                    )
                                :
                                    this.state.sourcesList.founded.length ?
                                        this.state.sourcesList.founded.map(source => {
                                            let isActive = false;
                                            if (this.state.filter.sources.find(item => item === source.name)) {
                                                isActive = true;
                                            }
                                            return (
                                                <ListGroup.Item action active={isActive} onClick={() => this.handleSourceSelect(source.name)}>
                                                    {source.name}
                                                </ListGroup.Item>
                                            );
                                        })
                                    :
                                    <ListGroup.Item className="text-center">
                                        <FiInbox/>
                                        <div>Not found!</div>
                                    </ListGroup.Item>
                            }                            
                        </ListGroup>
                        {
                            this.state.filter.sources.map(source =>
                                <div className="tag-item">
                                    <span>{source}</span>
                                    <FiX className="close" onClick={() => this.handleDelete(source, "source")}/>
                                </div>
                            )
                        }   
                    </Col>
                    <Button variant='primary' onClick={this.handleApplyFilter}
                        className={this.state.filter.changed && this.state.filter.toggle  ? "apply-filter show" : "apply-filter"}>
                        Apply Filters
                    </Button> 
                    <Button variant='outline-primary' onClick={this.handleCancelFilter}
                        className={
                            !this.state.filter.changed && (this.state.language || this.state.sources.length) ?
                                "cancel-filter show" : "cancel-filter"
                            }>
                        Cancel Filters
                    </Button>
                </Row>
            </div>
        </div>;

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

                                {filterContainer}

                                <div className={this.state.filter.toggle ? "show sider-backdrop" : "sider-backdrop"} 
                                    onClick={this.handleFilterToggle}/>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        {
                            this.state.articles.data.length || this.state.articles.loading ?
                                <ListGroup className="news-list">
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
                                                        <div className="text-secondary text-nowrap">
                                                            <ReactTimeAgo date={article.publishedAt} locale="en-US"/>
                                                        </div>
                                                    </div>

                                                </ListGroup.Item>
                                            </Link>
                                        )
                                    }
                                </ListGroup>
                            :
                                <div className="text-center">
                                    <h1>No Result Found!</h1>
                                </div>  
                        }
                        {
                            this.state.articles.loading || this.state.articles.total === 0 || (this.state.articles.total <= this.state.page * pageSize) ?
                                null
                            :
                                <div className="text-center mt-3 mx-auto" style={{width: "203px" }}>
                                    {
                                        this.state.articles.loadingmore ? 
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