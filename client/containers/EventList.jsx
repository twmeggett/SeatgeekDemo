import React from 'react'
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { fetchEvents } from '../actions/api';
import Header from '../components/Header.jsx';
import Events from '../components/Events.jsx';

const mapStateToProps = state => {
  return {
    events: state.api.events,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInitEvents: () => {
      dispatch(fetchEvents())
    },
    fetchLocationEvents: (location) => {
      dispatch(fetchEvents({ lat: location.lat, lon: location.lon }))
    },
    onEventClick: id => {
      dispatch(push(`event/${id}`))
    },
  }
}

class EventsListWrapper extends React.Component {
  componentDidMount() {
    this.props.fetchInitEvents()
  }

  render() {
      return (
        <div>
          <Header />
          <Events {...this.props} />
        </div>
      );
  }
}

const EventsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsListWrapper)

export default EventsList
