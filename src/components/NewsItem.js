import React from 'react'
const Newsitem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props; // to get access to props we hv to write this.props as this is a class based component
    // the above lines means that from any object(here this.props) we will pull out title, description and is available to use inside render part

    return (
      <div className='my-2'>
        <div className="card" style={{ width: "22rem" }} >
          <div style={{ display: 'flex', justifyContent: 'flex-end', position: "absolute", right: 0 }}>
            {/* <span className="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger" style={{ zIndex: "1" }}>{source}</span> */}
            <span className="badge rounded-pill bg-danger" style={{ zIndex: "1" }}>{source}</span>
          </div>
          <img src={imageUrl} style={{ height: "12rem", width: "22rem" }} className="card-img-top" alt="img" />
          <div className="card-body">
            <h5 className="card-title">{title}..</h5>
            <p className="card-text">{description}..</p>
            <p className="card-text"><small className="text-muted">By {author ? author : "unknown"} on {new Date(date).toGMTString()} </small></p>
            <a rel='norefferer' href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
            {/* rel='norefferer would hide from the given link is clicked */}
          </div>
        </div>
      </div>
    )
  }

export default Newsitem