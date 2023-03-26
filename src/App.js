import React, { useState } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const apimaster = "f3dc06408822401ebe85bd67d79966c1" 

  const [progress, setProgress] = useState(0)


  return (
    <div>

      <Router>
        <LoadingBar
          color='red'
          height={'5px'}
          progress={progress}
        />
        <Navbar />
        <Routes>
          <Route exact path="/science" element={<News apiKey={apimaster} setProgress={setProgress} key="science" pageSize={15} category={"science"} />}></Route>
          <Route exact path="/" element={<News apiKey={apimaster} setProgress={setProgress} key="general" pageSize={15} category={"general"} />}></Route>
          <Route exact path="/business" element={<News apiKey={apimaster} setProgress={setProgress} key="business" pageSize={15} category={"business"} />}></Route>
          <Route exact path="/entertainment" element={<News apiKey={apimaster} setProgress={setProgress} key="entertainment" pageSize={15} category={"entertainment"} />}></Route>
          <Route exact path="/health" element={<News apiKey={apimaster} setProgress={setProgress} key="health" pageSize={15} category={"health"} />}></Route>
          <Route exact path="/sports" element={<News apiKey={apimaster} setProgress={setProgress} key="sports" pageSize={15} category={"sports"} />}></Route>
          <Route exact path="/technology" element={<News apiKey={apimaster} setProgress={setProgress} key="technology" pageSize={15} category={"technology"} />}></Route>
          <Route exact path="/general" element={<News apiKey={apimaster} setProgress={setProgress} key="general" pageSize={15} category={"general"} />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
