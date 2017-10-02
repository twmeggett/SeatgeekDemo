import fetch from 'isomorphic-fetch';
import attachQueryParams from '../util/attachQueryParams';
import removeTimeZoneFromISO from '../util/removeTimeZoneFromISO';

export const REQUEST_EVENTS = 'REQUEST_EVENTS';
export function requestEvents() {
	return {
		type: REQUEST_EVENTS,
	}
}

export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';
export function receiveEvents(events) {
	return {
		type: RECEIVE_EVENTS,
		events,
	}
}

export const REQUEST_EVENT = 'REQUEST_EVENT';
export function requestEvent() {
	return {
		type: REQUEST_EVENT,
	}
}

export const RECEIVE_EVENT = 'RECEIVE_EVENT';
export function receiveEvent(event) {
	return {
		type: RECEIVE_EVENT,
		event,
	}
}

export const LIMIT_RECEIVED = 'LIMIT_RECEIVED';
export function limitReceived() {
	return {
		type: LIMIT_RECEIVED,
	}
}

export const CLEAR_EVENTS = 'CLEAR_EVENTS';
export function clearEvents() {
	return {
		type: CLEAR_EVENTS,
	}
}

export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export function updateLocation(location) {
	return {
		type: UPDATE_LOCATION,
		location,
	}
}

export function fetchEvents(page, latLon) {
	const CLIENT_ID = 'NTMxNDQzOXwxNDcwMDkxNzg4';
	const url = 'https://api.seatgeek.com/2/events';
	const range = 10;
	let queryParams = {
		page,
		client_id: CLIENT_ID,
		range: `${range}mi`,
		'datetime_utc.gte': removeTimeZoneFromISO(new Date()),
		'listing_count.gt': 0,
	}

	if (latLon && typeof latLon === 'object') {
		queryParams = { ...queryParams, lat: latLon.lat, lon: latLon.lon }
	} else {
		queryParams = { ...queryParams, geoip: true }
	}

	return (dispatch) => {
	    dispatch(requestEvents())
	    return fetch(attachQueryParams(url, queryParams))
			.then(
				response => response.json(),
				error => console.log('An error occured.', error)
			)
			.then((json) => {
				if (json) {
					console.log(json)
					if (json.meta.total === json.events.length) {
						dispatch(limitReceived())
					}
					dispatch(receiveEvents(json.events))
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
	    dispatch(requestEvent())
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
