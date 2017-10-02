import React from 'react'
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
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
    onHeaderClick: () => {
      dispatch(push('/'))
    },
  }
}

class EventDetailsWrapper extends React.Component {
  componentDidMount() {
    const urlId = location.pathname.split('/')[2];
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    if (this.props.event.id != urlId) {
      this.props.requestEvent();
      setTimeout(() => {
        this.props.fetchEvent(urlId)
      }, 2500);
    }
  }

  render() {
      return (
        <div>
          <Header
            info={<span><i className="fa fa-arrow-circle-left" aria-hidden="true"></i>Back</span>}
            onHeaderClick={this.props.onHeaderClick} />
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
