import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from './history';

import Header from './Header';
import Home from './Home';
import FileUpload from './FileUpload';
import ScriptSelector from './ScriptSelector';
import Analytics from './Analytics';

import TargetView from './target-types/TargetView';
import TargetsViewAll from './target-types/targets/TargetsViewAll';
import TargetCreate from './target-types/targets/TargetCreate';
import PersonView from './target-types/PersonView';
import CompanyView from './target-types/CompanyView';
import DeviceView from './target-types/DeviceView';
import LocationView from './target-types/LocationView';
import PdfFileView from './target-types/PdfFileView';

const App = () => (
  <Router history={history}>
	  <div id="app">
	  	<Header />

	  	<Route path="/" exact={true} component={Home} />
	  	<Route path="/upload" component={FileUpload} />
	  	<Route path="/scripts" component={ScriptSelector} />
	  	<Route path="/analytics" component={Analytics} />

	  	<Route path="/target/view/:id" component={TargetView} />
	  	<Route path="/target/viewAll" component={TargetsViewAll} />
	  	<Route path="/target/create" component={TargetCreate} />

	  	<Route path="/person/view" component={PersonView} />
	  	<Route path="/company/view" component={CompanyView} />
	  	<Route path="/device/view" component={DeviceView} />
	  	<Route path="/location/view" component={LocationView} />
	  	<Route path="/pdfFile/view" component={PdfFileView} />
	  </div>
  </Router>
);

export default App;
