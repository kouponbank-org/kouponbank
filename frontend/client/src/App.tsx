import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { BasePageRouterR } from "./components/base-page-router";
import { store } from "./store";

/**
 * @constructor App representing the current front end for our application.
 */
class App extends React.Component {
  /**
   * Renders the application with React.
   *
   * @returns {JSX.Element} The current layout of our application.
   */
  
  // store={store} calls upon our store (reducer) file to passed down
  // throughout the child files
  // Route path="/" has our BasePageRouterR file showcase the first
  // main path of our application. 
  
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route path="/" component={BasePageRouterR} />
        </Router>
      </Provider>
    );
  }
}

export default App;
