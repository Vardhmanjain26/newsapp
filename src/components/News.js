import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {

    static defaultProps = {
        country : "in",
        pageSize : "9",
        category : "sports"
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=44c1ac9388e248598b5aa611ae9250b4&pageSize=${this.props.pageSize}`;
        this.setState({loading : true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading : false
        })
    }

    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=44c1ac9388e248598b5aa611ae9250b4&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading : true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1,
            loading : false
        })
    }

    handleNextClick = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))){
            let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=44c1ac9388e248598b5aa611ae9250b4&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading : true});
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                articles: parsedData.articles,
                page: this.state.page + 1,
                loading : false
            })
        }
    }

    render() {

        return (
            <div className="container my-3">
                 <h1 className='text-center'> News Site - Top Headlines</h1>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {
                        !this.state.loading && this.state.articles.map((element) => {
                            return (
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 60) : ""} description={element.description ? element.description.slice(0, 100) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg"} newsUrl={element.url} />
                                </div>);
                        })
                    }
                </div>
                <div className='container d-flex justify-content-between' >
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Prev</button>
                    <button type="button" className="btn btn-dark" onClick={this.handleNextClick}> Next &rarr; </button>
                </div>
            </div>
        )
    }
}

export default News
// if property of state in jsx used , then , this.state.property
// if function of object in jsx used , then , this.property