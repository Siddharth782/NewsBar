import React from 'react'
const Newsitem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props; 

    return (
      <div className='my-2'>
        <div className="card" style={{ width: "22rem" }} >
          <div style={{ display: 'flex', justifyContent: 'flex-end', position: "absolute", right: 0 }}>
            <span className="badge rounded-pill bg-danger" style={{ zIndex: "1" }}>{source}</span>
          </div>
          <img src={imageUrl} style={{ height: "12rem", width: "22rem" }} className="card-img-top" alt="img" />
          <div className="card-body">
            <h5 className="card-title">{title}..</h5>
            <p className="card-text">{description}..</p>
            <p className="card-text"><small className="text-muted">By {author ? author : "unknown"} on {new Date(date).toGMTString()} </small></p>
            <a rel='norefferer' href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
  }

export default Newsitem