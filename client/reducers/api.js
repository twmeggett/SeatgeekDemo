import * as actions from '../actions/api.js';

const defaultState = {
	isFetching: false,
	events: [],
	event: {},
	page: 1,
	hasMore: true,
	location: {
		lat: 40.7127837,
		lon: -74.00594130000002,
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
			page: state.page + 1,
		}
	case actions.REQUEST_EVENT:
		return {
			...state,
			isFetching: true,
			event: {},
		}
	case actions.RECEIVE_EVENT:
		return {
			...state,
			isFetching: false,
			event: action.event,
		}
	case actions.LIMIT_RECEIVED:
		return {
			...state,
			hasMore: false,
		}
	case actions.CLEAR_EVENTS:
		return {
			...state,
			events: [],
			page: 1,
		}
	case actions.UPDATE_LOCATION:
		return {
			...state,
			location: action.location,
			hasMore: true,
		}
    default:
		return state
  }
}
