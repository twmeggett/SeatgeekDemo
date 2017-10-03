import React from 'react';
import { render } from 'react-dom';

import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router'
import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux'

import reducers from './reducers';
import EventList from './containers/EventList.jsx';
import EventDetails from './containers/EventDetails.jsx';
import Loading from './components/Loading.jsx';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const history = createHistory()

const loggerMiddleware = createLogger()

const middleware = applyMiddleware(
	thunk,
	loggerMiddleware,
	routerMiddleware(history)
);

const composeEnhancers =
	window.navigator.userAgent.includes('Chrome') ? compose(
		middleware,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	) : compose(middleware);

const store = createStore(
	reducers, /* preloadedState, */
	composeEnhancers
);

render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<div>
		        <Route exact path="/" component={EventList}/>
		        <Route path="/event" component={EventDetails}/>
		    </div>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root')
);
