import React, { Component } from 'react'

export class xkcd extends Component {
    constructor(){
        super();
        this.state=({
            comicUrl: "/",
            comicTitle: ""
        })
    }

    async componentDidMount(){
        let url = this.props.apiEndpoint;
        console.log(url)
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            comicUrl: parsedData.img,
            comicTitle: parsedData.safe_title
        })
    }

    render() {
    return (
        <div className="card mb-3 my-4">
        <img src={this.state.comicUrl} className="card-img-top" alt="Today's XKCD"/>
        <div className="card-body">
          <h5 className="card-title">{this.state.comicTitle}</h5>
          </div>
      </div>
    )
  }
}

export default xkcd
