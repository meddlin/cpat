import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

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

const Dashboard = React.lazy(() => import ('./pages/Dashboard'));
const NavigationBar = React.lazy(() => import ('./components/NavigationBar'));

const CompanyListing = React.lazy(() => import ('./pages/CompanyListing'));
const DeviceListing = React.lazy(() => import ('./pages/DeviceListing'));
const LocationListing = React.lazy(() => import ('./pages/LocationListing'));
const PersonListing = React.lazy(() => import ('./pages/PersonListing'));
const TargetListing = React.lazy(() => import ('./pages/TargetListing'));

const CompanyDetail = React.lazy(() => import ('./components/target-types/company/CompanyDetail'));
const DeviceDetail = React.lazy(() => import ('./components/target-types/device/DeviceDetail'));
const LocationDetail = React.lazy(() => import ('./components/target-types/location/LocationDetail'));
const PersonDetail = React.lazy(() => import ('./components/target-types/person/PersonDetail'));
const TargetDetail = React.lazy(() => import ('./components/target-types/target/TargetDetail'));

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
								
								<Route path="/companies" exact={true} name="dashbaord" component={CompanyListing} />
								<Route path="/devices" exact={true} name="dashbaord" component={DeviceListing} />
								<Route path="/locations" exact={true} name="dashbaord" component={LocationListing} />
								<Route path="/people" exact={true} name="dashbaord" component={PersonListing} />
								<Route path="/targets" exact={true} name="dashbaord" component={TargetListing} />
								
								<Route path="/company/detail" exact={true} name="dashbaord" component={CompanyDetail} />
								<Route path="/device/detail" exact={true} name="dashbaord" component={DeviceDetail} />
								<Route path="/location/detail" exact={true} name="dashbaord" component={LocationDetail} />
								<Route path="/person/detail" exact={true} name="dashbaord" component={PersonDetail} />
								<Route path="/target/detail" exact={true} name="dashbaord" component={TargetDetail} />

								<Route path="/company/create" exact={true} name="dashbaord" component={CompanyCreate} />
								<Route path="/device/create" exact={true} name="dashbaord" component={DeviceCreate} />
								<Route path="/location/create" exact={true} name="dashbaord" component={LocationCreate} />
								<Route path="/person/create" exact={true} name="dashbaord" component={PersonCreate} />
								<Route path="/target/create" exact={true} name="dashbaord" component={TargetCreate} />

								<Route path="/company/update/:id" exact={true} name="dashbaord" component={CompanyUpdate} />
								<Route path="/device/update/:id" exact={true} name="dashbaord" component={DeviceUpdate} />
								<Route path="/location/update/:id" exact={true} name="dashbaord" component={LocationUpdate} />
								<Route path="/person/update/:id" exact={true} name="dashbaord" component={PersonUpdate} />
								<Route path="/target/update/:id" exact={true} name="dashbaord" component={TargetUpdate} />
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
	