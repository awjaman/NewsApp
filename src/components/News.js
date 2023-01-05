import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";




export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pagesSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `NewsMonkey>${this.capitalizeFirstLetter(
      this.props.category
    )}`;
  }

  async updateNews() {
    this.props.setProgress(20);
    console.log(this.props.apiKey)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading:true
    })
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading:false
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7e0b6ff2e01f4f2d809508448926e4f6&page=1&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({ articles: parsedData.articles,
    //     totalResults:parsedData.totalResults,
    //       loading:false });
    this.updateNews();
  }
  handlePrevClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   this.props.country
    // }&category=${
    //   this.props.category
    // }&apiKey=7e0b6ff2e01f4f2d809508448926e4f6&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    //  this.setState({ loading: true });
    // console.log(this.props.pageSize)
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);

    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading:false
    // })
    this.setState({
      page: this.state.page - 1,
      loading: true,
    });
    this.updateNews();
  };

  handleNextClick = async () => {
    //  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7e0b6ff2e01f4f2d809508448926e4f6&page=${
    //    this.state.page + 1
    //  }&pageSize=${this.props.pageSize}`;
    //  this.setState({loading:true});
    //  let data = await fetch(url);
    //  let parsedData = await data.json();
    //  console.log(parsedData);

    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading:false
    //   })
    this.setState({
      page: this.state.page + 1,
      loading: true,
    });
    this.updateNews();
  };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
    
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
        {/* <div className="Container my-3"></div> */}
        <h2 className="text-center" style={{ marginTop: "90px" }}>
          NewsMonkey-Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row">
              {/* {!this.state.loading && */}
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-3 my-2" key={element.url}>
                    <NewsItem
                      title={element ? element.title : ""}
                      description={element ? element.description : ""}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            class="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            Previous &larr;
          </button>
          <button
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / 20)
            }
            type="button"
            class="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
        {/* </div> */}
      </>
    );
  }
}

export default News
