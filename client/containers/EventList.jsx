import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import windowScrollBottom from '../util/windowScrollBottom.js'
import * as actions from '../actions/api'
import Header from '../components/Header.jsx'
import SubHeader from '../components/SubHeader.jsx'
import Events from '../components/Events.jsx'
import LoadingIcon from '../components/Loading-Icon.jsx'

const mapStateToProps = state => {
  return {
    events: state.api.events,
    page: state.api.page,
    location: state.api.location,
    hasMore: state.api.hasMore,
    isFetching: state.api.isFetching,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: (page, latLon) => {
      dispatch(actions.fetchEvents(page, latLon))
    },
    requestEvents: () => {
      dispatch(actions.requestEvents())
    },
    onEventClick: id => {
      dispatch(push(`event/${id}`))
    },
    onHeaderClick: () => {
      dispatch(push('/'))
    },
    onPlaceSelected: (place) => {
      const latLon = place ? {
        lat: place.geometry.location.lat(),
        lon: place.geometry.location.lng(),
      } : null;
      dispatch(actions.updateLocation(latLon))
      setTimeout(() => {
        dispatch(actions.fetchEvents(1, latLon))
      }, 2500);
    },
  }
}

class EventsListWrapper extends React.Component {
  componentDidMount() {
    if (this.props.hasMore && this.props.events.length === 0 && !this.props.isFetching) {
      this.props.requestEvents();
      setTimeout(() => {
        this.props.fetchEvents(this.props.page, this.props.location)
      }, 2500);
    }
    windowScrollBottom.addEvent(() => {
      if (this.props.hasMore && this.props.events.length !== 0 && !this.props.isFetching) {
        console.log(this.props)
        this.props.requestEvents();
        setTimeout(() => {
          this.props.fetchEvents(this.props.page, this.props.location)
        }, 1500);
      }
    })
  }

  componentWillUnmount() {
    windowScrollBottom.removeEvent();
  }

  onPlaceSelected(place) {
    this.props.onPlaceSelected(place)
  }

  onCurrentLocation() {
    this.props.onPlaceSelected(null)
  }

  render() {
      return (
        <div>
          <Header info={'SeatGeek Events Page'} onHeaderClick={this.props.onHeaderClick} />
          <SubHeader onPlaceSelected={this.onPlaceSelected.bind(this)} onCurrentLocation={this.onCurrentLocation.bind(this)} />
          <Events {...this.props} />
          <LoadingIcon hide={this.props.isFetching ? false : true} />
        </div>
      );
  }
}

const EventsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsListWrapper)

export default EventsList
