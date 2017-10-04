import fetch from 'isomorphic-fetch';
import attachQueryParams from '../util/attachQueryParams';
import removeTimeZoneFromISO from '../util/removeTimeZoneFromISO';

export const REQUEST_EVENTS = 'REQUEST_EVENTS';
export function requestEvents() {
	return {
		type: REQUEST_EVENTS,
	}
}

export const REQUEST_EVENT = 'REQUEST_EVENT';
export function requestEvent() {
	return {
		type: REQUEST_EVENT,
	}
}

export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';
export function receiveEvents(events, limit, page) {
	return {
		type: RECEIVE_EVENTS,
		events,
		limit,
		page,
	}
}

export const RECEIVE_EVENT = 'RECEIVE_EVENT';
export function receiveEvent(event) {
	return {
		type: RECEIVE_EVENT,
		event,
	}
}

export const REL_RECEIVE_EVENTS = 'REL_RECEIVE_EVENTS';
export function relReceiveEvents(events, limit, page) {
	return {
		type: REL_RECEIVE_EVENTS,
		events,
		limit,
		page,
	}
}

export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export function updateLocation(location) {
	return {
		type: UPDATE_LOCATION,
		location,
	}
}

export function fetchEvents(page, latLon, relatedId) {
	const CLIENT_ID = 'NTMxNDQzOXwxNDcwMDkxNzg4';
	const url = `https://api.seatgeek.com/2/${relatedId ? 'recommendations' : 'events'}`;
	const range = 10;
	let queryParams = {
		page,
		client_id: CLIENT_ID,
		range: `${range}mi`,
		'datetime_utc.gte': removeTimeZoneFromISO(new Date()),
	}

	if (latLon && typeof latLon === 'object') {
		queryParams = { ...queryParams, lat: latLon.lat, lon: latLon.lon }
	} else {
		queryParams = { ...queryParams, geoip: true }
	}

	if (relatedId) {
		queryParams = { ...queryParams, 'events.id': relatedId }
	}

	return (dispatch) => {
	    return fetch(attachQueryParams(url, queryParams))
			.then(
				response => response.json(),
				error => console.log('An error occured.', error)
			)
			.then((json) => {
				if (json) {
					console.log(json)
					if (relatedId) {
						const events = json.recommendations.map(function ( item ) {
							return item.event;
						})
						dispatch(relReceiveEvents(events, json.meta.total, json.meta.page))
					} else {
						dispatch(receiveEvents(json.events, json.meta.total, json.meta.page))
					}
				}
	    })
	}
}

export function fetchEvent(id) {
	const CLIENT_ID = 'NTMxNDQzOXwxNDcwMDkxNzg4';
	const url = `https://api.seatgeek.com/2/events/${id}`;
	const queryParams = {
		client_id: CLIENT_ID,
	}

	return (dispatch) => {
	    return fetch(attachQueryParams(url, queryParams))
			.then(
				response => response.json(),
				error => console.log('An error occured.', error)
			)
			.then((json) => {
				console.log(json)
				dispatch(receiveEvent(json))
	    })
	}
}
