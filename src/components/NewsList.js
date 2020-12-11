import React from "react";
import axios from 'axios';
import {
    Badge,
    Col, ListGroup, Row
} from "react-bootstrap";
import DetailsView from "./DetailsView";

class NewsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            selectedItem: {},
            show: false
        }
    }

    componentDidMount() {
        this.getNews(0);
    }

    getNews = (begin) => {
        axios.get('http://newsapi.org/v2/top-headlines', {
            params: {
                q: 'COVID Vaccine',
                apiKey: "7beb18d93a494e3ca347e870561b7045"
            }
        })
            .then((res) => {
                this.setState({
                    ...this.state,
                    articles: res.data.articles
                });
                console.log(res.data);
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    closeDetailView = () => {
        this.setState({
            ...this.state,
            show: false
        })
    };

    showNewsContent(index) {
        this.setState({
            ...this.state,
            show: true,
            selectedItem: this.state.articles[index]
        });
    }

    render() {
        return (
            <div>
                {/*<Card>*/}
                {/*    <Card.Body>*/}
                        <Row>
                            <Col>
                                <ListGroup className="px-4 my-5">
                                    {
                                        this.state.articles.map
                                        ((article, index) =>
                                            <ListGroup.Item className="my-2" action
                                                            onClick={() => this.showNewsContent(index)}>
                                                <Badge variant="primary" className="mb-2">{article.source.name}</Badge>
                                                <h5>
                                                    {article.title}
                                                </h5>
                                                <div className="d-flex">
                                                    {
                                                        article.author === null ?
                                                            ""
                                                            :
                                                            <span className="text-info mr-3">{article.author}</span>
                                                    }
                                                    <span className="text-secondary">{article.publishedAt}</span>
                                                </div>

                                            </ListGroup.Item>
                                        )
                                    }
                                </ListGroup>
                            </Col>
                        </Row>
                {/*    </Card.Body>*/}
                {/*</Card>*/}
                <DetailsView article={this.state.selectedItem} show={this.state.show}
                             handleClose={this.closeDetailView}/>
            </div>
        );
    }
}

export default NewsList;