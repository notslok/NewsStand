import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Loader from "./loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
    pageSize: 6,
  };

  static propTypes = {
    // setting expected data types of of defaultProps
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    // runs before render
    super(props);

    this.state = {
      articles: [],
      loading: true, //for loading spinner
      page: 1,
      totalResults: 0,
    };

    document.title = `${this.capitalizeFirstLetter(
      this.props.category 
    )} - NewsStand`;
  }

  // USING DRY PRINCIPLE
  async updateNews() {
    // if(!(this.state.page > Math.ceil(this.state.totalResults/this.props.pageSize))){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();

    console.log(parsedData.articles);

    this.setState({
      articles: parsedData.articles,
      loading: false,
      totalResults: parsedData.totalResults,
    });
    // }
  }

  async componentDidMount() {
    //runs after render
    this.updateNews();
  }

  componentWillUnmount() {
    this.setState({
        loading:false
    })
  }

  // prev and next button handler
  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  handlePreviousClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <>
        <div className="container my-3">
          <h1 className="text-center" style={{ margin: "40px 0px" }}>
            {this.capitalizeFirstLetter(this.props.category)} Headlines
          </h1>

          {/* This loader not needed for infinite scroll feature */}
          {/* {this.state.loading && <Loader/>} */}

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Loader/>}
          >
            {console.log(this.state.articles.length)}
            {console.log(this.state.loading)}
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      title={element.title ? element.title : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 80)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      source={
                        element.source.name ? element.source.name : `Unverified`
                      }
                      date={
                        element.publishedAt ? new Date(element.publishedAt) : ""
                      }
                    />
                  </div>
                );
              })}
            </div>
          </InfiniteScroll>

          <div className="d-flex justify-content-evenly">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-outline-dark"
              onClick={this.handlePreviousClick}
            >
              &larr; Previous
            </button>
            <button
              disabled={
                this.state.page + 1 > Math.ceil(this.state.totalResults / 3)
              }
              type="button"
              className="btn btn-outline-dark"
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default News;
