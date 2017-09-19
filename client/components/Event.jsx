import React from 'react'
import formatDisplayDate from '../util/formatDisplayDate'

const Event = ({ event, onEventClick }) => (
  <div className="event-list" onClick={() => onEventClick(event.id)}>
    <h2>{event.title}</h2>
    <div className="info-container">
      <div className="info-content">
        <p className="venue">{event.venue.name}</p>
        <p className="location">{event.venue.display_location}</p>
      </div>
    </div>
    <img src={event.performers[0].image} />
    <p className="date">{formatDisplayDate(event.datetime_local)}</p>
  </div>
)

export default Event
