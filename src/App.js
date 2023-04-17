import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

// import Xkcd from './components/xkcd';
export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API_1

  state = {
    progress:0
  }

  setProgress = (progress)=>{
    this.setState({progress: progress})
  }

  render() {
    return (
      <div>   
      <Router>
        <Navbar/>
        <LoadingBar color='#00fff6' height={3} progress={this.state.progress} onLoaderFinished={() => this.setProgress(0)}/>
        <Routes>
        {/* including key for remounting component while navigating through navbar*/}
            <Route exact path="/" element={<News setProgress={this.setProgress}  key="general" pageSize={3} apiKey={this.apiKey} country="in" category="general"/>}/>  
            <Route exact path="/business" element={<News setProgress={this.setProgress}  key="business" pageSize={3} apiKey={this.apiKey} country="in" category="business"/>}/>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress}  key="entertainment" pageSize={3} apiKey={this.apiKey} country="in" category="entertainment"/>}/>
            <Route exact path="/general" element={<News setProgress={this.setProgress}  key="general" pageSize={3} apiKey={this.apiKey} country="in" category="general"/>}/>
            <Route exact path="/health" element={<News setProgress={this.setProgress}  key="health" pageSize={3} apiKey={this.apiKey} country="in" category="health"/>}/>
            <Route exact path="/science" element={<News setProgress={this.setProgress}  key="science" pageSize={3} apiKey={this.apiKey} country="in" category="science"/>}/>
            <Route exact path="/sports" element={<News setProgress={this.setProgress}  key="sports" pageSize={3} apiKey={this.apiKey} country="in" category="sports"/>}/>
            <Route exact path="/technology" element={<News setProgress={this.setProgress}  key="technology" pageSize={3} apiKey={this.apiKey} country="in" category="technology"/>}/>
        </Routes>
        {/* <Xkcd apiEndpoint="https://xkcd.com/info.0.json"/> */}
        </Router>
        </div>
    );
  };
};
