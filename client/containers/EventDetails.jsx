import React from 'react'
import { connect } from 'react-redux'
import { goBack, push } from 'react-router-redux'
import { fetchEvent, requestEvent } from '../actions/api'
import Header from '../components/Header.jsx'
import EventDetails from '../components/EventDetails.jsx'
import RelEventList from './RelEventList.jsx'

const mapStateToProps = state => {
  return {
    event: state.api.event,
    hasMore: state.api.relHasMore,
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
      dispatch(goBack())
    },
    onHomeClick: () => {
      dispatch(push('/'))
    },
  }
}

class EventDetailsWrapper extends React.Component {
  componentDidMount() {
    const urlId = location.hash.split('/')[2];
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    if (this.props.event.id != urlId) {
      this.props.requestEvent();
      setTimeout(() => {
        this.props.fetchEvent(urlId)
      }, 2500);
    }
  }

  componentWillUpdate(nextProps) {
    const urlId = location.hash.split('/')[2];
    if (!nextProps.isFetching && nextProps.event.id && urlId != nextProps.event.id) {
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
            onHomeClick={this.props.onHomeClick}
            onHeaderClick={this.props.onHeaderClick} />
          <EventDetails event={this.props.event} />
          <div className={!this.props.event.id ? 'hide' : ''}>
            <div style={{ margin: '40px 0 25px 0', textAlign: 'center' }}>
              <h2> Related Events </h2>
            </div>
            <RelEventList />
            <div style={{ textAlign: 'center' }}>
              <p className={this.props.hasMore ? 'hide' : ''}>Sorry, no more results</p>
            </div>
          </div>
        </div>
      );
  }
}

const EventDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetailsWrapper)

export default EventDetailsContainer
