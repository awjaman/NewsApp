import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
      let {title,description,imageUrl,newsUrl,author,date,source}=this.props;
  // write anyone --------------------------------------
    //   let title=this.props.title;
    //   let description =this.props.description;
    return (
      <div>
        <div className="card">
          <div style={{display:'flex',
          justifyContent:'flex-end',
          position:'absolute',
          right:'0'}}>
            <span
              class=" badge rounded-pill bg-danger">
              {source}
            </span>
          </div>

          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-primary"
            >
              Read More
            </a>
            <p class="card-text">
              <small class="text-muted">
                By {author ? author : "Unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem
