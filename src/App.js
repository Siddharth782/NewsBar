import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        {/* Hello this is {this.c} here.  */}
        {/* 'this' is here used to denote this class here, inside which we have written 'this'*/}
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/science" element={<News key="science" pageSize={15} category={"science"} />}></Route>
            <Route exact path="/" element={<News key="general" pageSize={15} category={"general"} />}></Route>
            <Route exact path="/business" element={<News key="business" pageSize={15} category={"business"} />}></Route>
            <Route exact path="/entertainment" element={<News key="entertainment" pageSize={15} category={"entertainment"} />}></Route>
            <Route exact path="/health" element={<News key="health" pageSize={15} category={"health"} />}></Route>
            <Route exact path="/sports" element={<News key="sports" pageSize={15} category={"sports"} />}></Route>
            <Route exact path="/technology" element={<News key="technology" pageSize={15} category={"technology"} />}></Route>
            <Route exact path="/general" element={<News key="general" pageSize={15} category={"general"} />}></Route>
          </Routes>
        </Router>
      </div>
    )
  }
}
