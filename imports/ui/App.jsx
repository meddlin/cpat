import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from './history';

import Header from './Header';
import Home from './Home';
import FileUpload from './FileUpload';
import ScriptSelector from './ScriptSelector';
import Analytics from './Analytics';

const App = () => (
  <Router history={history}>
	  <div id="app">
	  	<Header />

	  	<Route path="/" exact={true} component={Home} />
	  	<Route path="/upload" component={FileUpload} />
	  	<Route path="/scripts" component={ScriptSelector} />
	  	<Route path="/analytics" component={Analytics} />
	  </div>
  </Router>
);

export default App;
