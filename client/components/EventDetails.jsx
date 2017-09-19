import React from 'react'
import PropTypes from 'prop-types'
import YouTubeLink from './YouTubeLink.jsx'
import formatDisplayDate from '../util/formatDisplayDate'
import staticMapSrc from '../util/staticMapSrc'
import '../styles/event-details-style.less'
require("font-awesome-webpack");

//offsets aren't working in bootstrap for some reason 
const Event = ({ event }) => {
  if (event.id) {
    return (
      <div className="event-details">
        <div className="container top-content">
          <div className="row">
            
            <div className="col-md-1 col-lg-2"></div>

            <div className="col-xs-12 col-md-5 col-lg-4">
              <img src={event.performers[0].image} />
            </div>

            <div className="col-xs-12 col-md-5 col-lg-4">
              <div className="info-container">
              <h2>{event.title}</h2>
                <div className="info-content">
                  <p className="venue">
                    <i className="fa fa-building-o" aria-hidden="true"></i>
                    {event.venue.name}
                  </p>
                  <p className="location">
                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                    {event.venue.display_location}
                  </p>
                  <p className="date">
                    <i className="fa fa-calendar-o" aria-hidden="true"></i>
                    {formatDisplayDate(event.datetime_local)}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-1 col-lg-2"></div>

            <div className="col-md-1 col-lg-2"></div>

            <div className="col-xs-12 col-md-5 col-lg-4">
              <div className="social-container">
                <div 
                  className="fb-share-button" 
                  data-href={event.url} 
                  data-layout="button_count" 
                  data-size="large" 
                  data-mobile-iframe="true">
                    <a className="fb-xfbml-parse-ignore" 
                      target="_blank" 
                      href={"https://www.facebook.com/sharer/sharer.php?u=" + event.url}>
                        <i className="fa fa-facebook-square" aria-hidden="true"> Share</i>
                    </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="container sub-info">
          <div className="row">
            
            <div className="col-md-1 col-lg-2"></div>

            <div className="col-xs-12 col-md-5 col-lg-4">
              <a href={event.venue.url} target="_blank">
                <img src={staticMapSrc(event)} />
              </a>
            </div>

            <div className="col-xs-12 col-md-5 offset-md-2 col-lg-4 offset-lg-1 sub-info">
              <h2>Performers</h2>
              {event.performers.map((performer, index) => (
                <YouTubeLink key={'performer' + index} name={performer.name} />
              ))}
            </div>

          </div>
        </div>
      </div>
    )
  }
  return (
    <div><p>Loading</p></div>
  )
}

Event.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    datetime_local: PropTypes.string.isRequired,
    performers: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string.isRequired,
      })
    ),
    venue: PropTypes.shape({
        name: PropTypes.string.isRequired,
        display_location: PropTypes.string.isRequired,
        location: PropTypes.shape({
          lat: PropTypes.number,
          lon: PropTypes.number,
        url: PropTypes.string,
        })
    }),
  })
}

export default Event