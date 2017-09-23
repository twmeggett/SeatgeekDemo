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

export function fetchEvents(location) {
	const CLIENT_ID = 'NTMxNDQzOXwxNDcwMDkxNzg4';
	const url = 'https://api.seatgeek.com/2/events';
	const range = 10;
	let queryParams = {
		client_id: CLIENT_ID,
		range: `${range}mi`,
		'datetime_utc.gte': removeTimeZoneFromISO(new Date()),
		'listing_count.gt': 0,
	}

	if (location && typeof location === 'object') {
		queryParams = { ...queryParams, lat: location.lat, lon: location.lon }
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
				console.log(json)
				dispatch(receiveEvents(json.events))
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
