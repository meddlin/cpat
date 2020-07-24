import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { TargetListing } from './pages/TargetListing';
import { PersonListing } from './pages/PersonListing';
import { LocationListing } from './pages/LocationListing';
import { DeviceListing } from './pages/DeviceListing';
import { CompanyListing } from './pages/CompanyListing';

import { TargetDetail } from './components/target-types/target/TargetDetail';
import { PersonDetail } from './components/target-types/person/PersonDetail';
import { LocationDetail } from './components/target-types/location/LocationDetail';
import { DeviceDetail } from './components/target-types/device/DeviceDetail';
import { CompanyDetail } from './components/target-types/company/CompanyDetail';

import { CompanyCreate } from './components/target-types/company/forms/CompanyCreate';
import { DeviceCreate } from './components/target-types/device/forms/DeviceCreate';
import { LocationCreate } from './components/target-types/location/forms/LocationCreate';
import { PersonCreate } from './components/target-types/person/forms/PersonCreate';
import { TargetCreate } from './components/target-types/target/forms/TargetCreate';

import { CompanyUpdate } from './components/target-types/company/forms/CompanyUpdate';
import { DeviceUpdate } from './components/target-types/device/forms/DeviceUpdate';
import { LocationUpdate } from './components/target-types/location/forms/LocationUpdate';
import { PersonUpdate } from './components/target-types/person/forms/PersonUpdate';
import { TargetUpdate } from './components/target-types/target/forms/TargetUpdate';

import SignalRChatTest from './pages/SignalRChatTest';
import { ScriptsTest } from './pages/ScriptsTest';

const Dashboard = React.lazy(() => import ('./pages/Dashboard'));
// const ScriptsTest = React.lazy(() => import ('./pages/ScriptsTest'));
const NavigationBar = React.lazy(() => import ('./components/NavigationBar'));



// const CompanyListing = React.lazy(() => import ('./pages/CompanyListing'));
// const CompanyDetail = React.lazy(() => import ('./components/target-types/company/CompanyDetail'));

const App = () => {
	return (
		<div className="App">
			<Router>
				<div>
					<Suspense fallback={<div>Loading...</div>}>
						<NavigationBar />
						<div style={{ padding: '10px' }}>
							<Switch>
								<Route path="/" exact={true} name="dashbaord" component={Dashboard} />

								<Route path="/signalr" exact={true} name="signalr" component={SignalRChatTest} />
								
								<Route path="/companies" exact={true} name="companyListing" component={CompanyListing} />
								<Route path="/devices" exact={true} name="deviceListing" component={DeviceListing} />
								<Route path="/locations" exact={true} name="locationListing" component={LocationListing} />
								<Route path="/people" exact={true} name="personListing" component={PersonListing} />
								<Route path="/targets" exact={true} name="targetListing" component={TargetListing} />
								
								<Route path="/company/detail/:id" exact={true} name="companyDetail" component={CompanyDetail} />
								<Route path="/device/detail/:id" exact={true} name="deviceDetail" component={DeviceDetail} />
								<Route path="/location/detail/:id" exact={true} name="locationDetail" component={LocationDetail} />
								<Route path="/person/detail/:id" exact={true} name="personDetail" component={PersonDetail} />
								<Route path="/target/detail/:id" exact={true} name="targetDetail" component={TargetDetail} />

								<Route path="/company/create" exact={true} name="companyCreate" component={CompanyCreate} />
								<Route path="/device/create" exact={true} name="deviceCreate" component={DeviceCreate} />
								<Route path="/location/create" exact={true} name="locationCreate" component={LocationCreate} />
								<Route path="/person/create" exact={true} name="personCreate" component={PersonCreate} />
								<Route path="/target/create" exact={true} name="targetCreate" component={TargetCreate} />

								<Route path="/company/update/:id" exact={true} name="companyUpdate" component={CompanyUpdate} />
								<Route path="/device/update/:id" exact={true} name="deviceUpdate" component={DeviceUpdate} />
								<Route path="/location/update/:id" exact={true} name="locationUpdate" component={LocationUpdate} />
								<Route path="/person/update/:id" exact={true} name="personUpdate" component={PersonUpdate} />
								<Route path="/target/update/:id" exact={true} name="targetUpdate" component={TargetUpdate} />

								<Route path="/scripts/test" exact={true} name="scriptsTest" component={ScriptsTest} />
							</Switch>
						</div>
					</Suspense>
				</div>
			</Router>
		</div>
	);
}
	
function mapStateToProps(state) {
	return {};
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
	