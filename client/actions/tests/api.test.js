import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import expect from 'expect'
import nock from 'nock'
import removeTimeZoneFromISO from '../../util/removeTimeZoneFromISO'
import * as actions from '../api'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('requestEvents', () => {
  it('should create an action to request events', () => {
    const expectedAction = {
      type: actions.REQUEST_EVENTS,
    }
    expect(actions.requestEvents()).toEqual(expectedAction)
  })
})

describe('receiveEvents', () => {
  it('should create an action to receive events', () => {
    const testEvents = [{ test: true }, { test: true }, { test: true }]
    const expectedAction = {
      type: actions.RECEIVE_EVENTS,
      events: testEvents,
      limit: 10,
      page: 2,
    }
    expect(actions.receiveEvents(testEvents, 10, 2)).toEqual(expectedAction)
  })
})

describe('requestEvent', () => {
  it('should create an action to request an event', () => {
    const expectedAction = {
      type: actions.REQUEST_EVENT,
    }
    expect(actions.requestEvent()).toEqual(expectedAction)
  })
})

describe('receiveEvent', () => {
  it('should create an action to receive an event', () => {
    const testEvent = { test: true }
    const expectedAction = {
      type: actions.RECEIVE_EVENT,
      event: testEvent,
    }
    expect(actions.receiveEvent(testEvent)).toEqual(expectedAction)
  })
})

describe('updateLocation', () => {
  it('should create an action to update location', () => {
    const location = { lat: 10, lon: 10 }
    const expectedAction = {
      type: actions.UPDATE_LOCATION,
      location,
    }
    expect(actions.updateLocation(location)).toEqual(expectedAction)
  })
})

describe('fetchEvents', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates REQUEST_EVENTS then RECIEVE_EVENTS when fetching events has been done', () => {
	const testEvents = [{ test: true }, { test: true }, { test: true }]
  const meta = {
    total: 100,
    page: 1,
  }
	const CLIENT_ID = 'NTMxNDQzOXwxNDcwMDkxNzg4';
	const url = 'https://api.seatgeek.com/2';
	const range = 10;
	const queryParams = {
    page: 1,
		client_id: CLIENT_ID,
		range: `${range}mi`,
		'datetime_utc.gte': removeTimeZoneFromISO(new Date()),
		geoip: true,
	}

    nock(url)
      .get('/events')
      .query(queryParams)
      .reply(200, { events: testEvents, meta })

    const expectedActions = [
      { type: actions.RECEIVE_EVENTS, events: testEvents, limit: meta.total, page: meta.page },
    ]
    const store = mockStore({ isFetching: false, events: [], page: 1, hasMore: true })

    return store.dispatch(actions.fetchEvents(1)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('fetchEvent', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates REQUEST_EVENT then RECIEVE_EVENT when fetching event has been done', () => {
	const testEvent = { id: 801255 };
	const CLIENT_ID = 'NTMxNDQzOXwxNDcwMDkxNzg4';
	const url = 'https://api.seatgeek.com/2';
	const queryParams = {
		client_id: CLIENT_ID,
	}

    nock(url)
      .get(`/events/${testEvent.id}`)
      .query(queryParams)
      .reply(200, testEvent)

    const expectedActions = [
      { type: actions.RECEIVE_EVENT, event: testEvent },
    ]
    const store = mockStore({ isFetching: false, event: {} })

    return store.dispatch(actions.fetchEvent(testEvent.id)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
