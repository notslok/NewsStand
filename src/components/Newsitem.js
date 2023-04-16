import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, source, date} = this.props;
    return (
      <div className='my-3'>
        <div className="card">
            <img src={imageUrl ? imageUrl : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0IUOeKn57mlLy9WBBOmXcERYfudAhda2HjA&usqp=CAU`} className="card-img-top" alt="..."/>
            <div className="card-body shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <span className="badge text-bg-success">{source}</span>
                <p className="card-text"><small className="text-body-secondary fst-italic">{date.toString()}</small></p>
                <a href={newsUrl} target="_blank" rel='noreferrer' className="btn btn-sm btn-primary">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default Newsitem

