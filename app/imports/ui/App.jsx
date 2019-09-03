import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from './history';

import Header from './Header';
import Home from './Home';
import FileUpload from './FileUpload';

import Analytics from './Analytics';

import TargetView from './target-types/targets/TargetView';
import TargetsViewAll from './target-types/targets/TargetsViewAll';
import TargetCreate from './target-types/targets/TargetCreate';

import ScriptSelector from './ScriptSelector';
import ScriptCreate from './target-types/scripts/script-create/ScriptCreate';
import ScriptEdit from './target-types/scripts/script-edit/ScriptEdit';

import PersonView from './target-types/person/PersonView';
import PersonCreate from './target-types/person/person-create/PersonCreate';

import CompanyView from './target-types/company/company-view/CompanyView';
import CompanyCreate from './target-types/company/company-create/CompanyCreate';

import DeviceView from './target-types/device/device-view/DeviceView';
import DeviceCreate from './target-types/device/device-create/DeviceCreate';

import LocationView from './target-types/location/location-view/LocationView';
import LocationCreate from './target-types/location/location-create/LocationCreate';
import PdfFileView from './target-types/pdf-files/PdfFileView';

const App = () => (
  <Router history={history}>
	  <div id="app">
	  	<Header />

	  	<Route path="/" exact={true} component={Home} />
	  	<Route path="/upload" component={FileUpload} />
	  	<Route path="/analytics" component={Analytics} />

	  	{/**
	  	 * Target routes
	  	 */}
	  	<Route path="/target/view/:id" component={TargetView} />
	  	<Route path="/target/viewAll" component={TargetsViewAll} />
	  	<Route path="/target/create" component={TargetCreate} />

	  	{/**
	  	 * Script routes
	  	 */}
		<Route path="/scripts/edit/:id" component={ScriptEdit} />
	  	<Route path="/scripts/viewAll" component={ScriptSelector} />
	  	<Route path="/scripts/create" component={ScriptCreate} />

	  	{/**
	  	 * Person routes
	  	 */}
	  	<Route path="/person/view" component={PersonView} />
	  	<Route path="/person/create" component={PersonCreate} />

	  	{/**
	  	 * Company routes
	  	 */}
	  	<Route path="/company/view" component={CompanyView} />
	  	<Route path="/company/create" component={CompanyCreate} />

	  	{/**
	  	 * Device routes
	  	 */}
	  	<Route path="/device/view" component={DeviceView} />
	  	<Route path="/device/create" component={DeviceCreate} />

	  	{/**
	  	 * Location routes
	  	 */}
	  	<Route path="/location/view" component={LocationView} />
		<Route path="/location/create" component={LocationCreate} />

	  	{/**
	  	 * PDF File routes
	  	 */}
	  	<Route path="/pdfFile/view" component={PdfFileView} />
	  </div>
  </Router>
);

export default App;
