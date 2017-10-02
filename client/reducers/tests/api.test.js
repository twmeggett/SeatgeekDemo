import reducer from '../api'
import * as actions from '../../actions/api'

const defaultState = {
  isFetching: false,
  events: [],
  event: {},
  page: 1,
  hasMore: true,
  location: null,
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
        },
        {
          type: actions.RECEIVE_EVENTS,
          events: [ { test: true }, { test: true } ],
        }
      )
    ).toEqual({
        ...defaultState,
        isFetching: false,
        events: [ { test: true }, { test: true }, { test: true } ],
        page: 3,
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

  it('should handle LIMIT_RECEIVED', () => {
    expect(
      reducer(
        defaultState,
        {
          type: actions.LIMIT_RECEIVED,
        }
      )
    ).toEqual({
      ...defaultState,
      hasMore: false,
    })
  })

  it('should handle CLEAR_EVENTS', () => {
    expect(
      reducer(
        {
          ...defaultState,
          events: [ { test: true }, { test: true }, { test: true } ],
          page: 2,
        },
        {
          type: actions.CLEAR_EVENTS,
        }
      )
    ).toEqual({
      ...defaultState,
      events: [],
      page: 1,
    })
  })

  it('should handle UPDATE_LOCATION', () => {
    expect(
      reducer(
        {
          ...defaultState,
          hasMore: false,
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
    })
  })
})
