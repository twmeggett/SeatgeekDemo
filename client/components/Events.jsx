import React from 'react'
import PropTypes from 'prop-types'
import Event from './Event.jsx'
import Loading from './Loading.jsx'
import '../styles/event-list-style.less'

const Events = ({ events, onEventClick }) => {
  if (events) {
    return (
      <div className="container">
        <div className="row">
          {events.map((event) => (
            <div key={event.id} className="col-xs-12 col-lg-4 col-md-6">
              <Event key={event.id} event={event} onEventClick={onEventClick} />
            </div>
          ))}
        </div>
      </div>
    )
  }
  return <Loading />
}

Events.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      datetime_local: PropTypes.string.isRequired,
      performers: PropTypes.arrayOf(
        PropTypes.shape({
          image: PropTypes.string,
        })
      ),
      venue: PropTypes.shape({
          name: PropTypes.string.isRequired,
          display_location: PropTypes.string.isRequired,
      }),
    }).isRequired
  ).isRequired,
  onEventClick: PropTypes.func.isRequired,
}

export default Events
