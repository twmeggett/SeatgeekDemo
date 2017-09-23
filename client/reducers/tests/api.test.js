import reducer from '../api'
import * as actions from '../../actions/api'

describe('api reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isFetching: false,
      events: [],
      event: {},
    })
  })

  it('should handle REQUEST_EVENTS and RECEIVE_EVENTS', () => {
    expect(
      reducer(
        {
          isFetching: false,
          events: [],
          event: {},
        },
        {
          type: actions.REQUEST_EVENTS,
        }
      )
    ).toEqual({
      isFetching: true,
      events: [],
      event: {},
    })

    expect(
      reducer(
        {
          isFetching: true,
          events: [ { test: true } ],
          event: {},
        },
        {
          type: actions.RECEIVE_EVENTS,
          events: [ { test: true }, { test: true } ],
        }
      )
    ).toEqual({
        isFetching: false,
        events: [ { test: true }, { test: true }, { test: true } ],
        event: {},
     })
  })

  it('should handle REQUEST_EVENT and RECEIVE_EVENT', () => {
    expect(
      reducer(
        {
          isFetching: false,
          events: [],
          event: {},
        },
        {
          type: actions.REQUEST_EVENT,
        }
      )
    ).toEqual({
      isFetching: true,
      events: [],
      event: {},
    })

    expect(
      reducer(
        {
          isFetching: true,
          events: [],
          event: {},
        },
        {
          type: actions.RECEIVE_EVENT,
          event: { test: true },
        }
      )
    ).toEqual({
        isFetching: false,
        events: [],
        event: { test: true },
     })
  })
})
