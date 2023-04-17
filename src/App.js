import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

// import Xkcd from './components/xkcd';
const App = () => {
  
  const apiKey = process.env.REACT_APP_NEWS_API_1
  const pageSize = 3;

  const [progress, setProgress] = useState(0);


    return (
      <div>   
      <Router>
        <Navbar/>
        <LoadingBar color='#00fff6' height={3} progress={progress} onLoaderFinished={() => setProgress(0)}/>
        <Routes>
        {/* including key for remounting component while navigating through navbar*/}
            <Route exact path="/" element={<News setProgress={setProgress}  key="general" pageSize={pageSize} apiKey={apiKey} country="in" category="general"/>}/>  
            <Route exact path="/business" element={<News setProgress={setProgress}  key="business" pageSize={pageSize} apiKey={apiKey} country="in" category="business"/>}/>
            <Route exact path="/entertainment" element={<News setProgress={setProgress}  key="entertainment" pageSize={pageSize} apiKey={apiKey} country="in" category="entertainment"/>}/>
            <Route exact path="/general" element={<News setProgress={setProgress}  key="general" pageSize={pageSize} apiKey={apiKey} country="in" category="general"/>}/>
            <Route exact path="/health" element={<News setProgress={setProgress}  key="health" pageSize={pageSize} apiKey={apiKey} country="in" category="health"/>}/>
            <Route exact path="/science" element={<News setProgress={setProgress}  key="science" pageSize={pageSize} apiKey={apiKey} country="in" category="science"/>}/>
            <Route exact path="/sports" element={<News setProgress={setProgress}  key="sports" pageSize={pageSize} apiKey={apiKey} country="in" category="sports"/>}/>
            <Route exact path="/technology" element={<News setProgress={setProgress}  key="technology" pageSize={pageSize} apiKey={apiKey} country="in" category="technology"/>}/>
        </Routes>
        {/* <Xkcd apiEndpoint="https://xkcd.com/info.0.json"/> */}
        </Router>
        </div>
    );
};

export default App;
