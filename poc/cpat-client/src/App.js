import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import './App.css';

const CompanyDetail = React.lazy(() => import ('./components/target-types/company/CompanyDetail'));
const DeviceDetail = React.lazy(() => import ('./components/target-types/device/DeviceDetail'));
const LocationDetail = React.lazy(() => import ('./components/target-types/location/LocationDetail'));
const PersonDetail = React.lazy(() => import ('./components/target-types/person/PersonDetail'));
const TargetDetail = React.lazy(() => import ('./components/target-types/target/TargetDetail'));

const CompanyListing = React.lazy(() => import ('./pages/CompanyListing'));
const DeviceListing = React.lazy(() => import ('./pages/DeviceListing'));
const LocationListing = React.lazy(() => import ('./pages/LocationListing'));
const PersonListing = React.lazy(() => import ('./pages/PersonListing'));
const TargetListing = React.lazy(() => import ('./pages/TargetListing'));

const App = () => {
	return (
		<div className="App">
			<Router>
				<div>
					<Suspense fallback={<div>Loading...</div>}>
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
						</Switch>
					</Suspense>
				</div>
			</Router>
		</div>
	);
}
	
export default App;
	