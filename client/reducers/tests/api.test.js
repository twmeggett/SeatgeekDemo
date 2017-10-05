import reducer from '../api'
import * as actions from '../../actions/api'

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

describe('api reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState)
  })

  it('should handle REQUEST_EVENTS and RECEIVE_EVENTS', () => {
    expect(
      reducer(
        defaultState,
        {
          type: actions.REQUEST_EVENTS,
        }
      )
    ).toEqual({
      ...defaultState,
      isFetching: true,
    })

    expect(
      reducer(
        {
          ...defaultState,
          isFetching: true,
          events: [ { test: true } ],
          page: 2,
          hasMore: true,
        },
        {
          type: actions.RECEIVE_EVENTS,
          events: [ { test: true }, { test: true } ],
          page: 2,
          limit: 3,
        }
      )
    ).toEqual({
        ...defaultState,
        isFetching: false,
        events: [ { test: true }, { test: true }, { test: true } ],
        page: 3,
        hasMore: false,
     })
  })

  it('should handle REL_RECEIVE_EVENTS', () => {
    expect(
      reducer(
        {
          ...defaultState,
          isFetching: true,
          relEvents: [ { test: true } ],
          relPage: 2,
          relHasMore: true,
        },
        {
          type: actions.REL_RECEIVE_EVENTS,
          events: [ { test: true }, { test: true } ],
          page: 2,
          limit: 3,
        }
      )
    ).toEqual({
        ...defaultState,
        isFetching: false,
        relEvents: [ { test: true }, { test: true }, { test: true } ],
        relPage: 3,
        relHasMore: false,
     })
  })

  it('should handle REQUEST_EVENT and RECEIVE_EVENT', () => {
    expect(
      reducer(
        defaultState,
        {
          type: actions.REQUEST_EVENT,
        }
      )
    ).toEqual({
      ...defaultState,
      isFetching: true,
    })

    expect(
      reducer(
        {
          ...defaultState,
          isFetching: true,
        },
        {
          type: actions.RECEIVE_EVENT,
          event: { test: true },
        }
      )
    ).toEqual({
        ...defaultState,
        event: { test: true },
     })
  })

  it('should handle UPDATE_LOCATION', () => {
    expect(
      reducer(
        {
          ...defaultState,
          hasMore: false,
          isFetching: false,
        },
        {
          type: actions.UPDATE_LOCATION,
          location: { lat: 10, long: 10 },
        }
      )
    ).toEqual({
      ...defaultState,
      location: { lat: 10, long: 10 },
      hasMore: true,
      isFetching: true,
    })
  })
})
