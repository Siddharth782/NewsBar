import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  apimaster = process.env.REACT_APP_NEWS_API 
  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }

  render() {
    return (
      <div>
        {/* Hello this is {this.c} here.  */}
        {/* 'this' is here used to denote this class here, inside which we have written 'this'*/}
        <Router>
          <LoadingBar
            color='red'
            height={'5px'}
            // progress={10} // used to denote how much loading has been done
            progress={this.state.progress}
          // onLoaderFinished={() => setProgress(0)}
          />
          <Navbar />
          <Routes>
            <Route exact path="/science" element={<News apiKey={this.apimaster}setProgress={this.setProgress} key="science" pageSize={15} category={"science"} />}></Route>
            {/* we have passed setProgress function to news through a prop setProgress */}
            <Route exact path="/" element={<News apiKey={this.apimaster}setProgress={this.setProgress} key="general" pageSize={15} category={"general"} />}></Route>
            <Route exact path="/business" element={<News apiKey={this.apimaster}setProgress={this.setProgress} key="business" pageSize={15} category={"business"} />}></Route>
            <Route exact path="/entertainment" element={<News apiKey={this.apimaster}setProgress={this.setProgress} key="entertainment" pageSize={15} category={"entertainment"} />}></Route>
            <Route exact path="/health" element={<News apiKey={this.apimaster}setProgress={this.setProgress} key="health" pageSize={15} category={"health"} />}></Route>
            <Route exact path="/sports" element={<News apiKey={this.apimaster}setProgress={this.setProgress} key="sports" pageSize={15} category={"sports"} />}></Route>
            <Route exact path="/technology" element={<News apiKey={this.apimaster}setProgress={this.setProgress} key="technology" pageSize={15} category={"technology"} />}></Route>
            <Route exact path="/general" element={<News apiKey={this.apimaster}setProgress={this.setProgress} key="general" pageSize={15} category={"general"} />}></Route>
          </Routes>
        </Router>
      </div>
    )
  }
}
