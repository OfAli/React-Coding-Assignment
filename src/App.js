import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";
import React from 'react';
import history from "./history";
import Landing from "./Containers/index"
import Article from "./Containers/Article"

function App() {
  return (
      <div>
          <Router history={history}>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/article" component={Article}/>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
