import * as actions from '../actions/api.js';

const defaultState = {
	isFetching: false,
	event: {},
	events: [],
	relEvents: [],
	modalEvents: [],
	page: 1,
	relPage: 1,
	modalPage: 1,
	hasMore: true,
	relHasMore: true,
	modalHasMore: true,
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
			hasMore: action.limit > state.events.concat(action.events).length,
		}
	case actions.REL_RECEIVE_EVENTS:
		return {
			...state,
			isFetching: false,
			relEvents: state.relEvents.concat(action.events),
			relPage: state.relPage + 1,
			relHasMore: action.limit > state.relEvents.concat(action.events).length,
		}
	case actions.MODAL_RECEIVE_EVENTS:
		return {
			...state,
			isFetching: false,
			modalEvents: state.modalEvents.concat(action.events),
			modalPage: action.modalPage + 1,
			modalHasMore: action.limit > state.modalEvents.concat(action.events).length,
		}
	case actions.RESET_REL_EVENTS:
		return {
			...state,
			relEvents: [],
			relPage: 1,
			relHasMore: true,
		}
	case actions.RESET_MODAL_EVENTS:
		return {
			...state,
			modalEvents: [],
			modalPage: 1,
			modalHasMore: true,
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
	case actions.CLEAR_EVENTS:
		return {
			...state,
			events: [],
			page: 1,
			hasMore: true,
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
