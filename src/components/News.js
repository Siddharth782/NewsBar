import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalresults] = useState(0)
  document.title = `NewsBar | ${props.category}` // check this tmrw

  const upDateNews = async () => {
    props.setProgress(10);
    // const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&language=en&apiKey=e6f57c90c63246b49de838c6eaea3836&page=${page + 1}&pageSize=${props.pageSize}`
    // const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&language=en&apiKey=349826f0760b4aebb81e15f627f99c0d&page=${page}&pageSize=${props.pageSize}`
    const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&language=en&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    
    props.setProgress(30);
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    props.setProgress(70);

    setArticles(parsedData.articles)
    setTotalresults(parsedData.totalResults)
    setLoading(false)

    props.setProgress(100);

  }

  useEffect(() => {
   setLoading(true);
   upDateNews();
  }, []) // in this [], we write the condition which when becomes true we do this change
  


  const handleNext = async () => {
 
    await setPage(page + 1);
    upDateNews();
  }

  const handlePrev = async () => {

    await setPage(page - 1);
    upDateNews();
  }


  const fetchMoreData = async () => {
    if (articles.length < 90) {
      setPage(page + 1);
      // const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&language=en&apiKey=349826f0760b4aebb81e15f627f99c0d&page=${page + 1}&pageSize=${props.pageSize}`
      // const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&language=en&apiKey=f3dc06408822401ebe85bd67d79966c1&page=${page + 1}&pageSize=${props.pageSize}`
      const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&language=en&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
      
      setLoading(true)
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles));
      setTotalresults(parsedData.totalResults)
      setLoading(false)

    }

  }

    return (
      <>
        <h2 className='text-center' style={{ margin: '20px 0px' }} >Top Headlines of the Day from {props.category} </h2>
      

        <InfiniteScroll
          dataLength={articles.length}
          // dataLength={100}
          next={fetchMoreData}
          hasMore={articles.length !== 100}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row justify-content-center align-items-start">
              {articles.map((element) => {
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

// constructor then render then componentdidmount

News.defaultProps = {
  country: "in",
  category: 'top',
  totalResults: 0
}

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  totalResults: PropTypes.number,
}

export default News