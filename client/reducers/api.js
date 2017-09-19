import { REQUEST_EVENTS, RECEIVE_EVENTS, REQUEST_EVENT, RECEIVE_EVENT } from '../actions/api.js';

const defaultState = {
	isFetching: false,
	events: [],
	event: {},
}

export default function api(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_EVENTS:
		return {
			...state,
			isFetching: true,
			events: [],
		}
	case RECEIVE_EVENTS:
		return {
			...state,
			isFetching: false,
			events: state.events.concat(action.events),
		}
	case REQUEST_EVENT:
		return {
			...state,
			isFetching: true,
			event: {},
		}
	case RECEIVE_EVENT:
		return {
			...state,
			isFetching: false,
			event: action.event,
		}
    default:
		return state
  }
}
