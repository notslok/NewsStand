import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Loader from "./loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, settotalResults] = useState(0);

  // document.title = `${capitalizeFirstLetter(
  //   props.category 
  // )} - NewsStand`;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };



  // USING DRY PRINCIPLE
  const updateNews = async () => {
    props.setProgress(10);

    // if(!(this.state.page > Math.ceil(this.state.totalResults/props.pageSize))){
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

  
    setLoading(true)
  
    let data = await fetch(url);
    let parsedData = await data.json();
    
    props.setProgress(50);

    console.log(parsedData.articles);

    setArticles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    setLoading(false);
    
    // }
    props.setProgress(100);
  }

  // Replacement for componentDidMount()
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsStand`;
    updateNews();
    // ignore warnings regarding updateNews()...
    // eslint-disable-next-line
  }, [])


  const fetchMoreData = async () => {

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;

    setPage(page+1); //--> async behaviour
    
    let data = await fetch(url);
    let parsedData = await data.json();
    
    setArticles(articles.concat(parsedData.articles));
    settotalResults(parsedData.totalResults);
  };


    return (
      <>
        <div className="container my-3">
          <h1 className="text-center" style={{ margin: "40px 0px", marginTop: '90px' }}>
            {capitalizeFirstLetter(props.category)} Headlines
          </h1>

          {/* This loader not needed for infinite scroll feature */}
          {/* {this.state.loading && <Loader/>} */}
          
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Loader/>}
          >
            <div className="row">
              {articles.map((element) => {
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
        </div>
      </>
    );
}


News.defaultProps = {
  country: "in",
  category: "general",
  pageSize: 3,
};

News.propTypes = {
  // setting expected data types of of defaultProps
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number,
};


export default News;
