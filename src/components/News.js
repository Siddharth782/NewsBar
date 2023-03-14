import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {

  constructor(props) {
    super(props);
    // console.log("lmao")
    this.state = { // this.state -> defines the state of the object inside which constructor is written
      // articles: this.results, // articles is the variable defined inside state and this.results refer to the results inside this object
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `NewsBar | ${this.props.category}` // check this tmrw

  } // constructor runs every time an object of this class is created.like 3 objects of newsItem is created in news component so it would run 3 times
  // we can set the state of a card from inside the constructor. 
  // we r keeping the constructor here coz we will make calls and fetch news from inside news component

  static defaultProps = {
    country: "in",
    category: 'top',
    totalResults: 0
  }

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    totalResults: PropTypes.number,
  }

  async upDateNews() {
    this.props.setProgress(10);
    // const url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&language=en&apiKey=e6f57c90c63246b49de838c6eaea3836&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    // const url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&language=en&apiKey=349826f0760b4aebb81e15f627f99c0d&page=${this.state.page}&pageSize=${this.props.pageSize}`
    const url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&language=en&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.props.setProgress(30);
    this.setState({ loading: true })
    let data = await fetch(url);
    this.props.setProgress(50);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);

  }

  async componentDidMount() { // it runs after the render method
    // let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&language=en&apiKey=e6f57c90c63246b49de838c6eaea3836&page=1&pageSize=${this.props.pageSize}`
    // let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&language=en&apiKey=349826f0760b4aebb81e15f627f99c0d&page=1&pageSize=${this.props.pageSize}`
    // let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&language=en&apiKey=f3dc06408822401ebe85bd67d79966c1&page=1&pageSize=${this.props.pageSize}`

    this.setState({ loading: true })
    this.upDateNews();
    // let data = await fetch(url); // fetch using an url returns promise. await is used so that system awaits till promise is returned back, i.e. till that promise is resolved
    // let parsedData = await data.json();
    // console.log(parsedData)
    // this.setState({
    //   // articles: parsedData.results,
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false
    // })
  }

  handleNext = async () => {
    // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
    //   let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&language=en&apiKey=e6f57c90c63246b49de838c6eaea3836&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
    //   this.setState({ loading: true })
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false
    //   })
    // }
    await this.setState({ page: this.state.page + 1 });
    this.upDateNews();
  }

  handlePrev = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&language=en&apiKey=e6f57c90c63246b49de838c6eaea3836&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    // this.setState({ loading: true })
    // let data = await fetch(url);
    // let parsedData = await data.json();

    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false
    // })
    await this.setState({ page: this.state.page - 1 });
    this.upDateNews();
  }


  fetchMoreData = async () => {
    if (this.state.articles.length < 90) {
      this.setState({ page: this.state.page + 1 })
      // const url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&language=en&apiKey=349826f0760b4aebb81e15f627f99c0d&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
      // const url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&language=en&apiKey=f3dc06408822401ebe85bd67d79966c1&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
      const url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&language=en&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
      
      this.setState({ loading: true })
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        loading: false
      })
    }

  }


  render() {
    return (
      <>
        <h2 className='text-center' style={{ margin: '20px 0px' }} >Top Headlines of the Day from {this.props.category} </h2>
        {/* {this.state.loading && <Spinner />} */}
        {/* this method allows to use spinner */}

        {/* <div className="row justify-content-center align-items-start"> */}
        {/* this allows me to iterate over all the elements inside the array, below one */}
        {/* {!(this.state.loading) && this.state.articles.map((element) => { */}
        {/* return <div className="col-md-4" key={element.url}> */}
        {/* key is important & is used to identify each element of array. key should be written inside the element which we are going to return, like div here  */}
        {/* <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/The_Guardian_2018.svg/330px-The_Guardian_2018.svg.png"} */}
        {/* newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} /> */}
        {/* </div> */}
        {/* })} */}
        {/* </div> */}


        {/* <div className="d-flex justify-content-between">
          <button disabled={this.state.page <= 1} onClick={this.handlePrev} type='button' className="btn btn-dark">&larr; Previous</button>
          <button disabled={this.state.page + 1 >= Math.ceil(100 / this.props.pageSize)} onClick={this.handleNext} type='button' className="btn btn-dark">Next &rarr;</button>
        </div> */}

        {/* below is the infinte scroller */}

        <InfiniteScroll
          // dataLength={this.state.articles.length}
          dataLength={this.state.articles.length}
          // dataLength={100}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== 100}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row justify-content-center align-items-start">
              {this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/The_Guardian_2018.svg/330px-The_Guardian_2018.svg.png"}
                    newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>

      </>

    )
  }
}
// constructor then render then componentdidmount

export default News