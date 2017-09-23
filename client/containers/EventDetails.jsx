import React from 'react'
import { connect } from 'react-redux';
import { fetchEvent, requestEvent } from '../actions/api';
import Header from '../components/Header.jsx';
import EventDetails from '../components/EventDetails.jsx';

const mapStateToProps = state => {
  return {
    event: state.api.event,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEvent: (id) => {
      dispatch(fetchEvent(id))
    },
    requestEvent: () => {
      dispatch(requestEvent())
    },
  }
}

class EventDetailsWrapper extends React.Component {
  componentDidMount() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.props.requestEvent();
    setTimeout(() => {
      this.props.fetchEvent(location.pathname.split('/')[2])
    }, 2500);
  }

  render() {
      return (
        <div>
          <Header />
          <EventDetails {...this.props} />
        </div>
      );
  }
}

const EventDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetailsWrapper)

export default EventDetailsContainer
