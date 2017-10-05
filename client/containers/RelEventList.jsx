import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import windowScrollBottom from '../util/windowScrollBottom.js'
import * as actions from '../actions/api'
import Events from '../components/Events.jsx'
import LoadingIcon from '../components/Loading-Icon.jsx'

const mapStateToProps = state => {
  return {
    event: state.api.event,
    events: state.api.relEvents,
    page: state.api.relPage,
    hasMore: state.api.relHasMore,
    location: state.api.location,
    isFetching: state.api.isFetching,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: (page, latLon, relatedId) => {
      dispatch(actions.fetchEvents(page, latLon, relatedId))
    },
    requestEvents: () => {
      dispatch(actions.requestEvents())
    },
    onEventClick: id => {
      dispatch(push(`/event/${id}`))
      dispatch(actions.requestEvent())
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      setTimeout(() => {
        dispatch(actions.fetchEvent(id))
      }, 2500);
    },
  }
}

class RelEventsListWrapper extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.hasMore && !nextProps.isFetching && nextProps.events.length === 0 && nextProps.event.id) {
      this.props.requestEvents();
      setTimeout(() => {
        this.props.fetchEvents(this.props.page, this.props.location, nextProps.event.id)
      }, 2500);
    }

    windowScrollBottom.addEvent(() => {
      if (nextProps.hasMore && !nextProps.isFetching && nextProps.events.length !== 0) {
        this.props.requestEvents();
        setTimeout(() => {
          this.props.fetchEvents(this.props.page, this.props.location, nextProps.event.id)
        }, 1500);
      }
    })
  }

  componentWillUnmount() {
    windowScrollBottom.removeEvent();
  }

  render() {
      const events = this.props.events.filter((item) => {
        return item.id !== this.props.event.id
      })

      return (
        <div>
          <Events events={events} onEventClick={this.props.onEventClick} />
          <LoadingIcon hide={this.props.isFetching && this.props.hasMore ? false : true} />
        </div>
      );
  }
}

const RelEventList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RelEventsListWrapper)

export default RelEventList
