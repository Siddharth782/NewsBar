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

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const upDateNews = async () => {
    props.setProgress(10);
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
    // check this tmrw
   setLoading(true);
  document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
   upDateNews();
  }, [])  


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
      const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&language=en&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
      setPage(page + 1);

      setLoading(true)
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles));
      setTotalresults(parsedData.totalResults)
      setLoading(false)

    }

  }

  const spinning = () => {
    if(articles.length<90) return <Spinner />
    else <></>
  }

    return (
      <>
        <h2 className='text-center' style={{ margin: '20px 0px', marginTop:'83px' }} >Top {capitalizeFirstLetter(props.category)} Headlines </h2>
      

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== 100}
          loader={spinning()}
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