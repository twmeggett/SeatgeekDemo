import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import windowScrollBottom from '../util/windowScrollBottom.js'
import * as actions from '../actions/api'
import Events from '../components/Events.jsx'
import LoadingIcon from '../components/Loading-Icon.jsx'

const mapStateToProps = state => {
  return {
    recEvents: state.api.recEvents,
    event: state.api.event,
    page: state.api.page,
    location: state.api.location,
    hasMore: state.api.hasMore,
    isFetching: state.api.isFetching,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRecommendations: (page, latLon, recId) => {
      dispatch(actions.fetchEvents(page, latLon, recId))
    },
    requestEvents: () => {
      dispatch(actions.requestEvents())
    },
    onEventClick: id => {
      dispatch(push(`event/${id}`))
    },
  }
}

class EventsRecsWrapper extends React.Component {
  componentDidMount() {
    if (this.props.events.length === 0) {
      this.props.requestEvents();
      setTimeout(() => {
        this.props.fetchRecommendations(this.props.page, this.props.location, this.props.event.id)
      }, 2500);
    }
    windowScrollBottom.addEvent(() => {
      if (this.props.hasMore && !this.props.isFetching) {
        this.props.requestEvents();
        setTimeout(() => {
          this.props.fetchRecommendations(this.props.page, this.props.location, this.props.event.id)
        }, 1500);
      }
    })
  }

  componentWillUnmount() {
    windowScrollBottom.removeEvent();
  }

  render() {
      return (
        <div>
          <Events {...this.props} />
          <LoadingIcon hide={this.props.isFetching ? false : true} />
        </div>
      );
  }
}

const EventsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsRecsWrapper)

export default EventsList
