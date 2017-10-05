import * as actions from '../actions/api.js';

const defaultState = {
	isFetching: false,
	event: {},
	events: [],
	relEvents: [],
	page: 1,
	relPage: 1,
	hasMore: true,
	relHasMore: true,
	location: {
		lat: 38.9072,
		lon: -77.0369,
	},
}

export default function api(state = defaultState, action) {
  switch (action.type) {
    case actions.REQUEST_EVENTS:
		return {
			...state,
			isFetching: true,
		}
	case actions.RECEIVE_EVENTS:
		return {
			...state,
			isFetching: false,
			events: state.events.concat(action.events),
			page: action.page + 1,
			hasMore: action.limit > state.events.concat(action.events).length && action.events.length !== 0,
		}
	case actions.REL_RECEIVE_EVENTS:
		return {
			...state,
			isFetching: false,
			relEvents: state.relEvents.concat(action.events),
			relPage: state.relPage + 1,
			relHasMore: action.limit > state.relEvents.concat(action.events).length && action.events.length !== 0,
		}
	case actions.REQUEST_EVENT:
		return {
			...state,
			isFetching: true,
			event: {},
			relEvents: [],
			relPage: 1,
			relHasMore: true,
		}
	case actions.RECEIVE_EVENT:
		return {
			...state,
			isFetching: false,
			event: action.event,
		}
	case actions.UPDATE_LOCATION:
		return {
			...state,
			isFetching: true,
			location: action.location,
			hasMore: true,
			events: [],
			page: 1,
		}
    default:
		return state
  }
}
