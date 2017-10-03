import React from 'react'
import formatDisplayDate from '../util/formatDisplayDate'

const Event = ({ event, onEventClick }) => (
  <div className="event" onClick={() => onEventClick(event.id)}>
    <h2>{event.title}</h2>
    <div className="info-container">
      <div className="info-content">
        <p className="venue">{event.venue.name}</p>
        <p className="location">{event.venue.display_location}</p>
      </div>
    </div>
    <img src={event.performers[0].image ? event.performers[0].image : 'http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg'} />
    <p className="date">{formatDisplayDate(event.datetime_local)}</p>
  </div>
)

export default Event
