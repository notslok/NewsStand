import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Loader from "./loading";
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 3,
        category: "general"
    }

    static propTypes = { // setting expected data types of of defaultProps
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props){ // runs before render
        super(props);
        
        this.state = {
            articles: [], 
            loading: false, //for loading spinner
            page: 1
        }

        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsStand`
    }

    // USING DRY PRINCIPLE
    async updateNews(){
        if(!(this.state.page> Math.ceil(this.state.totalResults/this.props.pageSize))){
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
            
            this.setState({loading: true});
            
            let data = await fetch(url);
            let parsedData = await data.json()
            
            this.setState({
                page: this.state.page,
                articles: parsedData.articles,
                loading: false
            })
        }
    }

    async componentDidMount(){ //runs after render
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
        
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // this.setState({
        //     articles: parsedData.articles, 
        //     totalResults: parsedData.totalResults, 
        //     loading: false
        // })
        this.updateNews();
        // console.log(parsedData)
    }

    // prev and next button handler
    handleNextClick = async () => {
        
        // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            
        //     this.setState({loading: true});
            
        //     let data = await fetch(url);
        //     let parsedData = await data.json()
            
        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedData.articles,
        //         loading: false
        //     })
        // }

        this.setState({page: this.state.page + 1});
        this.updateNews()

    }

    handlePreviousClick = async () => {
        console.log("clicked next");
        
        // console.log("clicked next");
        
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        
        // this.setState({loading: true});
        
        // let data = await fetch(url);
        // let parsedData = await data.json()
        
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading: false
        // })

        this.setState({page: this.state.page - 1});
        this.updateNews();
    }

  render() {
    return (
      <div className="container my-3">

        <h1 className="text-center" style={{margin: '40px 0px'}}>{this.capitalizeFirstLetter(this.props.category)} Headlines</h1>

        {this.state.loading && <Loader/>}

        
        <div className="row">
        {!this.state.loading && this.state.articles.map((element) => {
        return (
            
            <div className="col-md-4" key={element.url}>
                <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 80) : ""} imageUrl={element.urlToImage} newsUrl={element.url} source={element.source.name ? element.source.name : `Unverified`} date={element.publishedAt ? new Date(element.publishedAt) : ""}/>
            </div>
            
            );
        })}
          
        </div>
            <div className="d-flex justify-content-evenly">
                <button disabled={this.state.page<=1} type="button" className="btn btn-outline-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/3)} type="button" className="btn btn-outline-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
      </div>
    );
  }
}

export default News;
